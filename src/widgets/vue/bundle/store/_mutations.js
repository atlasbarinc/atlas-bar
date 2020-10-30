export default {
  setContent(state, content) {
    state.content = content
  },
  nextStep(state) {
    state.bundle.step = state.bundle.step + 1
  },
  goToStep(state, step) {
    state.bundle.step = step
  },
  addProduct(state, product) {
    const bundle = state.bundle
    const index = bundle.items.findIndex((item) => {
      return item.id === product.id
    })
    index > -1 ? bundle.items[index] = product : bundle.items.push(product) 
    state.bundle = {...bundle}
  },
  removeProduct(state, product) {
    const bundle = state.bundle
    const index = bundle.items.findIndex((item) => {
      return item.id === product.id
    })
    if (index > -1) {
      bundle.items.splice(index, 1)
    }
    state.bundle = {...bundle}
  },
  clearProducts(state) {
    state.bundle.items = []
  },
  setSize(state, size) {
    state.bundle.size = size
  },
  setFrequency(state, frequency) {
    state.bundle.frequency = frequency
  },
  setSubscription(state, subscription) {
    state.bundle.subscription = subscription
  },
  resetBundle(state) {
    const resetBundle = {}
    const sizeIndex = state.content.sizes.products.findIndex(size => size.selected === true)
    resetBundle.items = []
    resetBundle.step = 1
    resetBundle.frequency = state.content.frequency.frequency
    resetBundle.size = sizeIndex !== -1 ? state.content.sizes.products[sizeIndex].size : 0
    resetBundle.subscription = true
    state.bundle = resetBundle
  }
}