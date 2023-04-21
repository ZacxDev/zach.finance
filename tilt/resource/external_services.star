def run_container_registry():
  k8s_yaml('k8s/registry_deployment.yaml')
  default_registry('localhost:30050')
  k8s_resource(
    'registry',
    port_forwards='30050:5000',
    labels=['external-service'],
  )

