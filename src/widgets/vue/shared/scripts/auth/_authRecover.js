import axios from 'axios'

export const _authRecover = async({ email }) => {
  const payload = {
    email,
    form_type: 'recover_customer_password'
  }
  const response = await axios.post('/account/recover', payload)
  return response
}