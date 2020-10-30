import { apiService } from '@shared/services'

export default {
  async customerCreateOnetimes({ commit }, payload) {
    const { addressId, creates } = payload
    const apiClient = new apiService()
    const { data } = await apiClient.post('/v1/customer/onetimes', { 
      data: { addressId, creates }
    })
    const { charges, onetimes, error } = data
    if(charges) await commit('CUSTOMER_UPDATE_CHARGES', { charges, keys: ['id', 'addressId'] })
    if(onetimes) await commit('CUSTOMER_UPDATE_ONETIMES', { onetimes })
    return { onetimes, error }
  },
  async customerUpdateOnetimes({ commit }, payload) {
    const { addressId, updates } = payload
    const apiClient = new apiService()
    const { data } = await apiClient.put('/v1/customer/onetimes', { 
      data: { addressId, updates }
    })
    const { charges, onetimes, error } = data
    if(charges) await commit('CUSTOMER_UPDATE_CHARGES', { charges, keys: ['id', 'addressId'] })
    if(onetimes) await commit('CUSTOMER_UPDATE_ONETIMES', { onetimes })
    return { onetimes, error }
  },
  async customerDeleteOnetimes({ commit }, payload) {
    const { addressId, ids } = payload
    const apiClient = new apiService()
    const { data } = await apiClient.delete('/v1/customer/onetimes', { 
      data: { addressId, ids }
    })
    const { charges, onetimes, error } = data
    if(charges) await commit('CUSTOMER_UPDATE_CHARGES', { charges, keys: ['id', 'addressId'] })
    if(onetimes) await commit('CUSTOMER_UPDATE_ONETIMES', { onetimes })
    return { onetimes, error }
  }
}