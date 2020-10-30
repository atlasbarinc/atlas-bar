import map from './map'

export const _countryInfo = country => {
  const mapKeys = Object.keys(map)
  const countryKey = mapKeys.find(key => {
    const names = map[key].map(name => name.toLowerCase())
    return names.includes(country.toLowerCase())
  })
  if(!countryKey) return false
  else return require(`./data/${countryKey}`).default
}