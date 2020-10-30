export default {
  async productsSyncInventory({ commit }) {
    try {
      const { inventory } = window.Scoutside.products
      if(inventory) {
        commit('PRODUCTS_SET_INVENTORY', { inventory })
        return { success: 'ACTION_SUCCESS' }
      }
    } catch {
      return { error: 'ACTION_ERROR' }
    }
  }
}