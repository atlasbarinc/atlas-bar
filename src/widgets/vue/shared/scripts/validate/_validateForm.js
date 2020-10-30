import { _arrayRemoveDuplicates } from '@shared/scripts'

export const _validateForm = items => {
  console.log('heyyy')
  let errors = {}
  let messagesArray = []
  items.forEach(item => {
    const { name, value, reference, rules, messages } = item
    let itemError = false
    rules.forEach((rule, index) => {
      const validationFunction = require(`./_${rule}`)[`_${rule}`]
      let isValid = true

      console.log('vf', validationFunction)

      switch(rule) {
        case 'validateMatch':
          isValid = validationFunction(value, reference)
          break;
        case 'validatePostcode':
          isValid = validationFunction(value, reference)
          break;
        default:
          isValid = validationFunction(value)
      }

      if(!isValid) {
        errors[name] = true
        if(!itemError) messagesArray.push(messages[index])
        else messagesArray.splice(messagesArray.length - 1, 1, messages[index])
        itemError = true
      }
    })
  })
  return {
    hasErrors: Object.keys(errors).length > 0,
    errors,
    messages: _arrayRemoveDuplicates(messagesArray)
  }
}