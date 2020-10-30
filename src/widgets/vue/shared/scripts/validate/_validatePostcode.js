import postcode from 'postcode-validator'

export const _validatePostcode = (input, reference) => {
  if(reference == 'United States') {
    return postcode.validate(input, 'US')
  }
  else return true
}