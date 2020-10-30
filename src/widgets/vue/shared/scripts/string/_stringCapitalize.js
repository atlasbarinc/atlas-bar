export const _stringCapitalize = str => {
  if(!str) return false
  return `${str[0].toUpperCase()}${str.slice(1)}`
}