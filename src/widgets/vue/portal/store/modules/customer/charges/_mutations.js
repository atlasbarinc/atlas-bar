import { _arrayMergeByKeys } from '@shared/scripts'

export default {
  CUSTOMER_UPDATE_CHARGES(state, payload) {
    const prevCharges = [ ...state.resources.charges ]
    const { charges, keys } = payload
    const filteredCharges = _arrayMergeByKeys({ 
      prevArray: prevCharges, newArray: charges, keys 
    })
    state.resources.charges = [ ...filteredCharges, ...charges ]
  }
}