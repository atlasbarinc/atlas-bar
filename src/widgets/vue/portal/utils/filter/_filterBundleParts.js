export const _filterBundleParts = ({ items }) => {
  return items.filter(item => {
    const bundleTypeProperty = item.properties.find(property => property.name === 'bundle_type')
    if(bundleTypeProperty) return bundleTypeProperty.value !== 'child'
    else return true
  })
}