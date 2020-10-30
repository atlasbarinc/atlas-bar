export const _arrayRemoveDuplicates = array => {
  let uniqueValues = []
  array.forEach(value => {
    if(!uniqueValues.includes(value)) uniqueValues.push(value)
  })
  return uniqueValues
}