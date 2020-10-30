import { _stringEmpty } from '../string'

export const _buildModifiers = (base, modifierArray = []) => {
  let modifiers = ''
  modifierArray.forEach(modifier => {
    if(modifier && !_stringEmpty(modifier)) {
      modifiers += modifier ? ` ${base}--${modifier}` : ''
    }
  })
  return base
    ? base += modifiers
    : modifiers
}