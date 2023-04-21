load('ext://configmap', 'configmap_from_dict')

def load_namespace(namespace):
  nsYaml = local('cue export --out yaml -t namespace={} k8s/cue/namespace.cue'.format(namespace))
  k8s_yaml(nsYaml)
