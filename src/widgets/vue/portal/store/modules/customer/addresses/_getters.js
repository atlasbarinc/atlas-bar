import { _sortItemsByCharge, _buildCharges } from '@vue/portal/utils'

export default {
  customerAddresses: state => state.resources.addresses,
  customerAddressById: state => id => {
    const { addresses } = state.resources
    if(addresses) {
      return addresses.find(address => address.id === id)
    }
  },
  customerAddressItems: (state, getters) => address => {
    const subscriptions = getters.customerSubscriptionsByAddress(address)
    const onetimes = getters.customerOnetimesByAddress(address)
    return { subscriptions, onetimes }
  },
  customerAddressesWithStatus: (state, getters) => {
    const { addresses } = state.resources
    if(addresses) {
      let output = { active: [], inactive: [], empty: [] }
      addresses.forEach(address => {
        const charges = getters.customerChargesByAddress(address)
        const firstQueued = charges.queued[0]
        const lastSuccess = charges.success[charges.success.length - 1]
          ? charges.success[charges.success.length - 1] : { scheduledAt: false }
        if(firstQueued) output.active.push({ ...address, date: firstQueued.scheduledAt })
        else {
          const { subscriptions, onetimes } = getters.customerAddressItems(address)
          const emptyAddress = [ ...subscriptions, ...onetimes ].length < 1
          if(emptyAddress) output.empty.push({ ...address, date: lastSuccess.scheduledAt })
          else output.inactive.push({ ...address, date: lastSuccess.scheduledAt })
        }
      })
      return output
    }
  }
}