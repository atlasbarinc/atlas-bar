import { apiService } from '@shared/services'

export default {
  async customerUpdateChargesDate({ commit }, payload) {
    try {
      const { addressId, updates } = payload
      const apiClient = new apiService()
      const { data } = await apiClient.put(`/v1/customer/charges/date`, { data: { addressId, updates }})
      const { charges, onetimes, subscriptions, error } = data
      if(charges) await commit('CUSTOMER_UPDATE_CHARGES', { charges, keys: ['id', 'addressId'] })
      if(onetimes) await commit('CUSTOMER_UPDATE_ONETIMES', { onetimes })
      if(subscriptions) await commit('CUSTOMER_UPDATE_SUBSCRIPTIONS', { subscriptions })
      return { charges, onetimes, subscriptions, error }
    } catch {
      return { error: 'ACTION_ERROR' }
    }
  }
}