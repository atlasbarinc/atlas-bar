export default {
  PRODUCTS_SET_CATALOG(state, payload) {
    const { catalog } = payload
    if(catalog) state.catalog = [ ...catalog ]
  },
  PRODUCTS_SET_INVENTORY(state, payload) {
    const { inventory } = payload
    if(inventory) state.inventory = { ...inventory }
  }
}