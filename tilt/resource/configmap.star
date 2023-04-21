def get_routing_v_1_configmap(all_services):
  routingCFData = {}

  for _, svc in enumerate(all_services):
    routingCFDataLineKey = svc.upper().replace('-', '_') + "_SERVICE_URL"
    # TODO: replace 50051 with a port value pulled from map
    routingCFDataLine = "dns:" + svc + ":50051"
    routingCFData[routingCFDataLineKey] = routingCFDataLine

  return routingCFData

def create_service_configmaps():
  k8s_yaml('k8s/config/file-upload.yaml')
  k8s_yaml('k8s/config/mailgun-interface.yaml')
  k8s_yaml('k8s/config/notification.yaml')
  k8s_yaml('k8s/config/slack-interface.yaml')
  k8s_yaml('k8s/secret/location.yaml')
  k8s_yaml('k8s/secret/mailgun-interface.yaml')
  k8s_yaml('k8s/secret/oauth-2-interface.yaml')
  k8s_yaml('k8s/secret/slack-interface.yaml')
  k8s_yaml('k8s/secret/stripe-interface.yaml')
  k8s_yaml('k8s/secret/ziptax-interface.yaml')
