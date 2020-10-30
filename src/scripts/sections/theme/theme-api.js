import Cookies from 'universal-cookie'
import axios from 'axios'
import https from 'https'
import { _buildHeaders } from '@scripts/utils'

const cookies = new Cookies()
const agent = new https.Agent({ rejectUnauthorized: false })

const cookieOptions = {
  path: '/'
}

const removeCookies = async() => {
  await Promise.all([
    cookies.remove('ss_api_url', cookieOptions),
    cookies.remove('ss_api_key', cookieOptions),
    cookies.remove('ss_customer_token', cookieOptions),
    cookies.remove('ss_access_token', cookieOptions)
  ])
}

const setCookies = async() => {
  const { api } = window.Scoutside
  await Promise.all([
    cookies.set('ss_api_url', api.base_url, cookieOptions),
    cookies.set('ss_api_key', api.api_key, cookieOptions),
    cookies.set('ss_customer_token', api.customer_token, cookieOptions)
  ])
}

const apiInit = async() => {
  await removeCookies()
  await setCookies()
  const { api } = window.Scoutside
  const baseUrl = api.base_url
  const ready = api.ready
  const headers = await _buildHeaders()
  if(!ready) {
    const { customer } = window.Scoutside
    if(customer) {
      const shopifyId = await btoa(customer.shopify_id)
      if(shopifyId) {
        const tokenData = await axios.post(`${baseUrl}/v1/auth/token`, { shopifyId }, { 
          headers, customerhttpsAgent: agent
        })
        const token = tokenData ? tokenData.data.token : false
        if(token) await cookies.set('ss_access_token', token, cookieOptions)
      }
    }
    window.Scoutside.api.ready = true
  }
}

apiInit()