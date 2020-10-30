export const _buildGroups = ({ charges }) => {
  let groups = []
  if(!charges) return []
  else {
    charges.queued.forEach(queued => {
      let group = { queued }
      let count = 0
      count += queued.lineItems.length
      const queuedDate = queued.scheduledAt
      const skippedMatch = charges.skipped.find(skipped => {
        const skippedDate = skipped.scheduledAt.isSame
        return dayjs(queuedDate).isSame(skippedDate, 'day')
      })
      if(skippedMatch) {
        group = { ...group, skipped }
        count += queued.lineItems.length
      }
      groups.push({ ...group, count, date: queuedDate })
    })
    charges.skipped.forEach(skipped => {
      let group = { skipped }
      count += skipped.lineItems.length
      const skippedDate = skipped.scheduledAt
      const queuedMatch = charges.queued.find(queued => {
        const queuedDate = queued.scheduledAt.isSame
        return dayjs(skippedDate).isSame(queuedDate, 'day')
      })
      if(!queuedMatch) {
        groups.push({ ...group, count, date: skippedDate })
      }
    })
  }
  let groupsWithBundles = groups.map(group => {
    let lineItems = []
    group.queued.lineItems.forEach(lineItem => {
      const bundleTypeProp = lineItem.properties.find(property => property.name == 'bundle_type')
      const bundleIdProp = lineItem.properties.find(property => property.name == 'bundle_id')
      if(bundleTypeProp && bundleIdProp) {
        const bundleParent = bundleTypeProp.value == 'parent'
        const bundleParentId = bundleIdProp.value
        if(bundleParent) {
          const children = group.queued.lineItems.filter(childItem => {
            const childBundleTypeProp = childItem.properties.find(property => property.name == 'bundle_type')
            const childBundleIdProp = childItem.properties.find(property => property.name == 'bundle_id')
            if(childBundleTypeProp && childBundleIdProp) {
              const bundleChild = bundleTypeProp.value == 'child'
              const bundleChildId = bundleIdProp.value
              return bundleChild && (bundleChildId == bundleParentId)
            }
          })
          lineItems.push({ ...lineItem, type: 'bundle', children })
        }
      } else {
        lineItems.push({ ...lineItem, type: 'product' })
      }
    })
    return { ...group, queued: { ...group.queued, lineItems }}
  })
}