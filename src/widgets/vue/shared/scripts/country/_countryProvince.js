export const _countryProvince = (country, province) => {
  const { provinces } = country
  if(provinces) {
    return provinces.find(items => {
      const names = items.map(item => item.toLowerCase())
      return names.includes(province.toLowerCase())
    })
  }
}