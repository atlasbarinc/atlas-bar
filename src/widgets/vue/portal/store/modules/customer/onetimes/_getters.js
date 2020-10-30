export default {
  customerOnetimes: state => state.resources.onetimes,
  customerOnetimeById: state => id => {
    const { onetimes } = state.resources
    if(onetimes) {
      return onetimes.find(onetime => onetime.id === id)
    }
  },
  customerOnetimesByIds: state => ids => {
    const { onetimes } = state.resources
    if(onetimes) {
      return onetimes.filter(onetime => ids.includes(onetime.id))
    }
  },
  customerOnetimesByAddress: state => address => {
    const { onetimes } = state.resources
    if(onetimes && address) {
      return onetimes.filter(onetime => {
        return onetime.addressId === address.id
      })
    }
  },
  customerOnetimesByBundle: state => id => {
    const { onetimes } = state.resources
    const bundleChildren = onetimes.filter(onetime => {
      return onetime.properties.find(property => {
        return property.name === 'bundle_type' && property.value === 'child'
      })
    })
    return bundleChildren.filter(bundleChild => {
      return bundleChild.properties.find(property => {
        return property.name === 'bundle_id' && property.value === id
      })
    })
  }
}