export default vm => {
  const { $store, $router, $route } = vm
  const customer = $store.state.customer
  const currentRoute = $route.name
  let route = false
  if(!currentRoute) route = !customer.recharge ? 'details' : 'shipments'
  else if(!customer.recharge && route == 'shipments') route = 'details'
  return route ? $router.push({ name: route }) : false
}
