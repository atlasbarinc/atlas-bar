import '@styles/sections/components/component-rewards-hero.scss'
import smoothscroll from 'smoothscroll-polyfill';
import { _buildHeaders } from '@scripts/utils'

function setTierMembership() {
  const interval = setInterval(() => {
    if (window.loyaltylion && window.loyaltylion.customer) {
      clearInterval(interval)

      const customer = window.loyaltylion.customer
      const activeTier = window.loyaltylion.program.loyaltyTiers.find(tier => tier.id === customer.loyaltyTierMembership.loyaltyTierId)
      document.querySelectorAll('[data-lion-membership]').forEach((tierEl) => {
        tierEl.innerHTML = `${activeTier.name} Member`
      })
    }
  }, 500)
}

async function setAccountDate() {
  const date = document.querySelector('[data-account-date]')
  if (!date) return
  const interval = setInterval(async() => {
    const { api } = window.Scoutside
    if (api.ready) {
      clearInterval(interval)

      const headers = await _buildHeaders()
      const account = await fetch(`${api.base_url}/v1/customer/account`, {
        headers
      })
      const json = await account.json()
      const createdAt = new Date(json.shopifyCustomer.createdAt)
      const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(createdAt)
      const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(createdAt)
      date.innerHTML = `${month}. ${year}`
    }
  }, 500)
}

function setScrollLinks() {
  smoothscroll.polyfill()
  document.querySelectorAll('[data-scroll-links]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault() 
      const id = event.currentTarget.getAttribute('href')
      if (id.indexOf('#') !== 0) return window.location.href = id
      const el = document.querySelector(id)
      scroll({
        top: el.offsetTop,
        behavior: 'smooth'
      })
    })
  }) 
}

window.addEventListener('DOMContentLoaded', () => {
  setTierMembership()
  setAccountDate()
  setScrollLinks()
});
