# -*- mode: Python -*-

update_settings(max_parallel_updates=3)

load('ext://configmap', 'configmap_from_dict')
load(
  'tilt/helper.star',
  'expose_resource',
)
load('tilt/resource/k8s_misc.star', 'load_namespace')
load(
  'tilt/resource/bazel_k8s.star',
  'run_target',
)
load(
  'tilt/resource/external_services.star',
  'run_container_registry',
)

print("context is: {}\n".format(k8s_context()))

allow_k8s_contexts('k3d-dev-cluster')

# disable share button.
disable_snapshots()

cfgDevCluster='devCluster'
cfgK8sNamespace='k8sNamespace'
cfgAppOrigins='appOrigins'

config.define_string_list(cfgAppOrigins)

for cfgKey in [
  cfgDevCluster,
  cfgK8sNamespace,
]:
  config.define_string(cfgKey)

cfg=config.parse()

devCluster = cfg[cfgDevCluster]
namespace = cfg[cfgK8sNamespace]
appOrigins = cfg[cfgAppOrigins]

if not devCluster == '':
  allow_k8s_contexts(devCluster)

local('cue vet tilt_config.json tilt_config.cue')

load_namespace(namespace)

v2_api_deps_on = []

# Only create local registry if we are not in microk8s (microk8s has a built-in registry)
if k8s_context() != "microk8s":
  run_container_registry()
  v2_api_deps_on += ['registry']

should_live_reload=True

service_targets = [
  '//api.zach.finance/api-gateway',
]

for target in service_targets:
  run_target(
    target,
    ''
  )

exposed_services = [
  ['api-gateway',             '001', {'web': 443}, 'localhost:59001'],
]

# port forward local services
for svc, num, ports, link in exposed_services:
  expose_resource(svc, num, ports, link)

# Run frontend
local_resource(
  'zach.finance',
  serve_cmd='cd zach.finance && npm run dev',
  deps = [
    'zach.finance/package.json',
  ],
  readiness_probe=probe(
    period_secs=15,
    http_get=http_get_action(port=5173, path="/")
  ),
  links=['http://localhost:5173'],
  labels=['frontend'],
)

local_resource(
  'graphql go',
  cmd='go generate ./...',
  deps=[
    'api.zach.finance/api-gateway/graph',
  ],
  labels=['generate'],
  allow_parallel=True,
)

local_resource(
  'bazel test',
  cmd='bazel test',
  labels=['test'],
  allow_parallel=True,
)

k8s_yaml(configmap_from_dict("dev-env", namespace, {
  "ALLOWED_ORIGINS": '|'.join(appOrigins),
}))

