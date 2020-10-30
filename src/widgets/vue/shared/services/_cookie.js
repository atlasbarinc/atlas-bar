import universalCookie from 'universal-cookie'
import dayjs from 'dayjs'

const Cookies = new universalCookie()

export default {
  getAll: () => {
    return Cookies.getAll()
  },
  getItem: ({ key }) => {
    return Cookies.get(key)
  },
  setItem: ({ key, value, options }) => {
    Cookies.set(key, JSON.stringify(value), { ...options })
  },
  removeItem: ({ key }) => {
    Cookies.remove(key)
  },
  getServerItem: ({ req, key }) => {
    if(req) {
      const ServerCookies = new universalCookie(req.headers.cookie)
      return ServerCookies.get(key)
    }
  }
}