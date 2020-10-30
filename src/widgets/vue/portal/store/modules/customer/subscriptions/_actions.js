import { apiService } from '@shared/services'

export default {
  async customerCreateSubscriptions({ commit }, payload) {
    const { addressId, creates } = payload
    const apiClient = new apiService()
    const { data } = await apiClient.post('/v1/customer/subscriptions', { 
      data: { addressId, creates }
    })
    const { charges, onetimes, error } = data
    if(charges) await commit('CUSTOMER_UPDATE_CHARGES', { charges, keys: ['id', 'addressId'] })
    if(subscriptions) await commit('CUSTOMER_UPDATE_SUBSCRIPTIONS', { subscriptions })
    return { subscriptions, error }
  },
  async customerUpdateSubscriptions({ commit }, payload) {
    const { addressId, updates } = payload
    const apiClient = new apiService()
    const { data } = await apiClient.put('/v1/customer/subscriptions', { 
      data: { addressId, updates }
    })
    const { charges, subscriptions, error } = data
    if(charges) await commit('CUSTOMER_UPDATE_CHARGES', { charges, keys: ['id', 'addressId'] })
    if(subscriptions) await commit('CUSTOMER_UPDATE_SUBSCRIPTIONS', { subscriptions })
    return { subscriptions, error }
  },
  async customerDeleteSubscriptions({ commit }, payload) {
    const { addressId, ids } = payload
    const apiClient = new apiService()
    const { data } = await apiClient.delete('/v1/customer/subscriptions', { 
      data: { addressId, ids }
    })
    const { charges, subscriptions, error } = data
    if(charges) await commit('CUSTOMER_UPDATE_CHARGES', { charges, keys: ['id', 'addressId'] })
    if(subscriptions) await commit('CUSTOMER_UPDATE_SUBSCRIPTIONS', { subscriptions })
    return { subscriptions, error }
  }
}