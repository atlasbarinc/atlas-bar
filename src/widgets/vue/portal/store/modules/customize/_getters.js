export default {
  customizeShop: state => state.shop,
  customizeShopByKey: state => key => state.shop[key],
  customizeShopByPrefix: state => prefix => {
    let output = {}
    Object.keys(state.shop).forEach(key => {
      if(key.startsWith(prefix)) output[key] = state.shop[key]
    })
    return output
  },
  customizeContentByKey: state => key => state.content[key],
  customizePartByKey: state => key => state.content.parts[key],
  customizePartByPrefix: state => prefix => {
    let output = {}
    Object.keys(state.content.parts).forEach(key => {
      if(key.startsWith(prefix)) output[key] = state.content.parts[key]
    })
    return output
  },
  customizeSidebarByPrefix: state => prefix => {
    let output = {}
    Object.keys(state.content.sidebars).forEach(key => {
      if(key.startsWith(prefix)) output[key] = state.content.sidebars[key]
    })
    return output
  },
  customizeModalByPrefix: state => prefix => {
    let output = {}
    Object.keys(state.content.modals).forEach(key => {
      if(key.startsWith(prefix)) output[key] = state.content.modals[key]
    })
    return output
  }
}