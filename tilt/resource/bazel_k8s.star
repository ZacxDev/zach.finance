load('../bazel.star', 'bazel_k8s', 'bazel_build')

def run_target(target, repo_root_relative_path):
  last_index = target.rindex('/')
  svc = target[last_index+1:]

  define_k8s_resource(svc, target)
  run_bazel_target(
    svc,
    "{}:image".format(target),
    repo_root_relative_path
  )

def define_k8s_resource(svc, target):
  bazelK8sTarget = '{}:k8s'.format(target)
  k8sYaml = bazel_k8s(bazelK8sTarget, svc)
  k8s_yaml(k8sYaml)
  k8s_resource(
    workload=svc,
    labels=["internal-service"],
  )

def run_bazel_target(svc, target, repo_root_relative_path):
  bazel_build(
    svc,
    target,
    svc,
    repo_root_relative_path
  )

