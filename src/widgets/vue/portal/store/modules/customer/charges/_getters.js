import { _buildCharges } from '@vue/portal/utils'

export default {
  customerCharges: state => state.resources.charges,
  customerChargeError: state => {
    const { charges } = state.resources
    if(charges) {
      return charges.find(charge => charge.status === 'ERROR')
    }
  },
  customerChargeById: state => id => {
    const { charges } = state.resources
    if(charges) {
      return charges.find(charge => charge.id === id)
    }
  },
  customerChargesByItemId: state => id => {
    const { charges } = state.resources
    if(charges) {
      return charges.filter(charge => charge.lineItems.find(lineItem => {
        return lineItem.itemId === id
      }))
    }
  },
  customerChargesByAddress: state => address => {
    const { charges } = state.resources
    if(charges) {
      const addressCharges = charges.filter(charge => charge.addressId === address.id)
      return { raw: addressCharges, ..._buildCharges({ charges: addressCharges }) }
    }
  },
  customerChargeItems: (state, getters) => charge => {
    const ids = charge.lineItems.map(lineItem => lineItem.itemId)
    const subscriptions = getters.customerSubscriptionsByIds(ids)
    const onetimes = getters.customerOnetimesByIds(ids)
    return [ ...subscriptions, ...onetimes ]
  }
}