export const _objectEmpty = object => {
  if(!object) return true
  return Object.keys(object).length <= 0
}