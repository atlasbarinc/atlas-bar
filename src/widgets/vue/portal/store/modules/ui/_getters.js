export default {
  uiByKey: state => key => state[key],
  uiSettingByKey: state => key => state.settings[key]
}