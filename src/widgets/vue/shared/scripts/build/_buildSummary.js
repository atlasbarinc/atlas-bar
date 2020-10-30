export const _buildSummary = ({ item }) => {
  if(!item) return []
  const { subtotal, discount, shipping, tax, total } = item
  let output = []
  output.push({ key: 'subtotal', value: subtotal })
  output.push({ key: 'discount', value: discount })
  output.push({ key: 'shipping', value: shipping })
  output.push({ key: 'tax', value: tax })
  output.push({ key: 'total', value: total })
  return output
}