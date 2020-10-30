export default {
  productsCatalog: state => state.catalog,
  productsInventory: state => state.inventory,
  productsByKey: state => key => state[key],
  productById: state => id => state.catalog.find(product => {
    return product.id == id
  }),
  productsByIds: state => ids => {
    return ids.map(id => {
      return state.catalog.find(product => product.id == id)
    }).filter(id => id)
  },
  productsInventoryById: state => id => state.inventory[id]
}