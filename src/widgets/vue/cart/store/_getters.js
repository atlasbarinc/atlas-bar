export default {
  contentByKey: state => key => state.content[key],
  contentByPrefix: state => prefix => {
    const content = {}
    Object.keys(state.content).forEach(key => {
      if(key.startsWith(prefix)) content[key] = state.content[key]
    })
    return content
  },
  cart: state => state.cart,
  cartByKey: state => key => state.cart[key]
}