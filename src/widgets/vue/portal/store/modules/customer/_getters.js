import addressesGetters from './addresses/_getters'
import chargesGetters from './charges/_getters'
import onetimesGetters from './onetimes/_getters'
import ordersGetters from './orders/_getters'
import subscriptionsGetters from './subscriptions/_getters'

export default {
  customerReady: state => state.ready,
  customerRecharge: state => state.recharge,
  customerShopify: state => state.shopify,
  ...addressesGetters,
  ...chargesGetters,
  ...onetimesGetters,
  ...ordersGetters,
  ...subscriptionsGetters
}