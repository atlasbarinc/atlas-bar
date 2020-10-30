import { 
  _countryInfo,
  _countryProvince,
  _objectEmpty
} from "../"

export const _buildAddress = ({ address, options = {}}) => {
  if(_objectEmpty(address)) return false

  const { hiddenFields, flatten, countryName, provinceName } = options

  const keys = Object.keys(address);
  const prefix = keys[0].includes('shipping') ? "shipping_"
    : keys[0].includes('shipping') ? "shipping_" : ""

  const hidden = hiddenFields ? hiddenFields : []

  const country = _countryInfo(address[`${prefix}country`])
  const province = _countryProvince(country, address[`${prefix}province`])

  let countryKey = 'name'
  let provinceKey = 0

  if(countryName) {
    if(countryName === 'short') countryKey = 'shortName'
  }
  const countryText = country[countryKey]

  if(provinceName) {
    if(provinceName === 'short') provinceKey = [1]
  }
  const provinceText = province[provinceKey]

  const fields = {
    firstName: address[`${prefix}firstName`] || false,
    lastName: address[`${prefix}lastName`] || false,
    company: address[`${prefix}company`] || false,
    address1: address[`${prefix}address1`] || false,
    address2: address[`${prefix}address2`] || false,
    city: address[`${prefix}city`] || false,
    province: address[`${prefix}province`] || false,
    zip: address[`${prefix}zip`] || false,
    country: address[`${prefix}country`] || false
  }

  let output = ''
  
  if(!hidden.includes('name') && (fields.firstName || fields.lastName)) {
    output += fields.firstName ? `${fields.firstName} ` : ''
    output += fields.lastName ? `${fields.lastName}` : ''
    output += '<br/>'
  }

  if(!hidden.includes('company') && fields.company) {
    output += fields.company ? `${fields.company} ` : ''
    output += '<br/>'
  }

  if(!hidden.includes('address1') && fields.address1) {
    output += fields.address1 ? `${fields.address1} ` : ''
    output += '<br/>'
  }

  if(!hidden.includes('address2') && fields.address2) {
    output += fields.address2 ? `${fields.address2} ` : ''
    output += '<br/>'
  }

  if(!hidden.includes('region') && (fields.province|| fields.city && fields.city)) {
    output += !hidden.includes('city') && fields.city
      ? `${fields.city}` : ''
    output += !hidden.includes('province')
      ? !hidden.includes('city') ? `, ${provinceText} ` : `${provinceText} `
      :  ''
    output += fields.zip ? `${fields.zip}` : ''
    output += '<br/>'
  }

  if(!hidden.includes('country') & fields.country) {
    output += fields.country ? `${countryText} ` : ''
  }

  if(flatten) {
    output = output.replace(/<br\/>/g, '').trim()
    if(output[output.length - 1] === ',') output = output.slice(0, -1);
  }

  return output
}