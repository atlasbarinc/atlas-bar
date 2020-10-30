import { _stringEmpty } from '@shared/scripts'

export const _validateRequired = input => {
  return !_stringEmpty(input)
}