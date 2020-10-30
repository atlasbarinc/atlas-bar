import addressesMutations from './addresses/_mutations'
import chargesMutations from './charges/_mutations'
import onetimesMutations from './onetimes/_mutations'
import subscriptionsMutations from './subscriptions/_mutations'

export default {
  CUSTOMER_SET_READY(state) {
    state.ready = true
  },
  CUSTOMER_SET_RECHARGE(state, payload) {
    if(payload) state.recharge = { ...payload }
  },
  CUSTOMER_SET_SHOPIFY(state, payload) {
    if(payload) state.shopify = { ...payload }
  },
  CUSTOMER_SET_RESOURCES(state, payload) {
    if(payload) state.resources = { ...state.resources, ...payload }
  },
  ...addressesMutations,
  ...chargesMutations,
  ...onetimesMutations,
  ...subscriptionsMutations
}