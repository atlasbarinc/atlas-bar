import map from './map'

export const _countryList = () => {
  return Object.keys(map).map(key => map[key][0])
}