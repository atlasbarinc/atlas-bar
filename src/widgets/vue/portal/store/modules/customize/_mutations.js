export default {
  CUSTOMIZE_SET_STATE(state, payload) {
    const { content, shop } = payload
    state.shop = { ...shop }
    state.content = { ...content }
  }
}