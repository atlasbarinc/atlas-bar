import { _arrayMergeByKeys } from '@shared/scripts'

export default {
  CUSTOMER_UPDATE_ONETIMES(state, payload) {
    const { onetimes, keys } = payload
    const deleteOnetimes = onetimes.filter(onetime => onetime.status === 'DELETED')
    const deleteIds = deleteOnetimes.map(onetime => onetime.id)
    const prevOnetimes = [ ...state.resources.onetimes ].filter(onetime => !deleteIds.includes(onetime.id))
    const newOnetimes = onetimes.filter(onetime => onetime.status !== 'DELETED')
    const filteredOnetimes = _arrayMergeByKeys({ 
      prevArray: prevOnetimes, newArray: newOnetimes, keys 
    })
    state.resources.onetimes = [ ...filteredOnetimes, ...onetimes ]
  }
}