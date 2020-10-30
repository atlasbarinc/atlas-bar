import { _stringEmpty } from '@shared/scripts'

export const _validateEmail = input => {
  if(_stringEmpty(input)) return false
  else {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.toLowerCase())
  }
}