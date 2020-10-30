export default async (app) => {
  const { dispatch, commit } = app.$store
  const { bundle } = window.Scoutside
  
  const sizeIndex = bundle.sizes.products.findIndex(size => size.selected === true)

  // SET BASE DATA
  await Promise.all([
    commit('setContent', bundle),
    commit('setSize', sizeIndex !== -1 ? bundle.sizes.products[sizeIndex].size : 0),
    commit('setFrequency', bundle.frequency.frequency)
  ])
}