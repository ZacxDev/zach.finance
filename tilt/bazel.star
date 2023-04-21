load("helper.star", "dep_list")

BAZEL_RUN_CMD = "bazel run --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64"

def bazel_k8s(target, service):
  pwd = os.getcwd()
  return local("bazel run --define service={service} --define pwd={pwd} %s".format(
  service=service,
  pwd=pwd,
  ) % target)

def bazel_build(image, target, api, repo_root_relative_path):
  # Bazel puts the image at bazel/{dirname}, so transform
  dest = target.replace('//', 'bazel/')
  internal_deps = target.replace('//', '').replace(':image', '')

  deps=[internal_deps]

  command = "{run_cmd} {target} -- --norun && docker tag {dest} $EXPECTED_REF".format(
    run_cmd=BAZEL_RUN_CMD,
    target=target,
    dest=dest
  )

  custom_build(
    image,
    command=command,
    deps=deps,
  )

