export default {
  UI_SET_SIDEBAR(state, payload) {
    state.settings.preventScroll = true
    state.sidebar = { ...state.sidebar, ...payload }
  },
  UI_CLOSE_SIDEBAR(state, payload) {
    state.sidebar = { 
      component: false, content: false, settings: {},
      modifiers: [], side: 'right' 
    }
    if(!state.modal.component) state.settings.preventScroll = false
  },
  UI_SET_MODAL(state, payload) {
    state.settings.preventScroll = true
    state.modal = { ...state.modal, ...payload }
  },
  UI_CLOSE_MODAL(state, payload) {
    state.modal = { 
      component: false, content: false, settings: {},
      modifiers: [], side: 'right' 
    }
    if(!state.sidebar.component) state.settings.preventScroll = false
  }
}