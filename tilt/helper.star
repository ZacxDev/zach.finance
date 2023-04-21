def pref(repo_root_relative_path, suffix):
  return '{}/{}'.format(repo_root_relative_path, suffix)

def dep_list(repo_root_relative_path, suffixes):
  return [pref(repo_root_relative_path, s) for s in suffixes]

pp = {
  'web': '59',
}

def expose_resource(api, num, ports, link):
  pf = []
  for typ in ports:
    forward = pp[typ] + num + ':' + str(ports[typ])
    pf += [forward]

  links=[]
  if link != '':
    links=[link.format(pp[typ] + num)]

  k8s_resource(
    api,
    port_forwards=pf,
    resource_deps=[],
    links=links,
  )

