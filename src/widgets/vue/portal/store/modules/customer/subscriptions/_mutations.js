import { _arrayMergeByKeys } from '@shared/scripts'

export default {
  CUSTOMER_UPDATE_SUBSCRIPTIONS(state, payload) {
    const { subscriptions, keys } = payload
    const deleteSubscriptions = subscriptions.filter(onetime => onetime.status === 'DELETED')
    const deleteIds = deleteSubscriptions.map(onetime => onetime.id)
    const prevSubscriptions = [ ...state.resources.subscriptions ].filter(onetime => !deleteIds.includes(onetime.id))
    const newSubscriptions = subscriptions.filter(onetime => onetime.status !== 'DELETED')
    const filteredSubscriptions = _arrayMergeByKeys({ 
      prevArray: prevSubscriptions, newArray: newSubscriptions, keys 
    })
    state.resources.subscriptions = [ ...filteredSubscriptions, ...subscriptions ]
  }
}