import dayjs from 'dayjs'

export default {
  getItem: (key) => {
    const value = JSON.parse(localStorage.getItem(key))
    if(value) {
      const expires = value.expires
      if(expires) {
        const expired = dayjs(expires).isBefore(dayjs())
        if(expired) { 
          cookieStorage.removeItem(key)
          return false
        }
      }
      return value
    }
  },
  setItem: (key, value) => {
    const expires = value.expires
      ? value.expires
      : dayjs().add(1, 'week')
    localStorage.setItem(key, JSON.stringify({ 
      ...value, expires
    }))
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
  }
}