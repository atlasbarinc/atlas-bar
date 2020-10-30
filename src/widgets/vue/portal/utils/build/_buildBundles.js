export const _buildBundles = ({ items }) => {
  let itemList = []
  items.forEach(item => {
    const bundleTypeProp = item.properties.find(property => property.name == 'bundle_type')
    const bundleIdProp = item.properties.find(property => property.name == 'bundle_id')
    if(bundleTypeProp && bundleIdProp) {
      const bundleParent = bundleTypeProp.value == 'parent'
      const bundleParentId = bundleIdProp.value
      if(bundleParent) {
        const children = items.filter(childItem => {
          const childBundleTypeProp = childItem.properties.find(property => property.name == 'bundle_type')
          const childBundleIdProp = childItem.properties.find(property => property.name == 'bundle_id')
          if(childBundleTypeProp && childBundleIdProp) {
            const bundleChild = childBundleTypeProp.value == 'child'
            const bundleChildId = childBundleIdProp.value
            return bundleChild && (bundleChildId == bundleParentId)
          }
        })
        itemList.push({ ...item, type: 'bundle', children })
      }
    } else {
      itemList.push({ ...item, type: 'product' })
    }
  })
  return itemList
}