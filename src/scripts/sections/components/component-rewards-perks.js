import '@styles/sections/components/component-rewards-perks.scss'

function setTierMembership() {
  const interval = setInterval(() => {
    if (window.loyaltylion && window.loyaltylion.customer) {
      clearInterval(interval)

      const customer = window.loyaltylion.customer
      const activeTierIndex = window.loyaltylion.program.loyaltyTiers.findIndex(tier => tier.id === customer.loyaltyTierMembership.loyaltyTierId)
      const event = new CustomEvent('tierMembership', { detail: { index: activeTierIndex }})
      document.querySelectorAll('[data-lion-tier-card]')[activeTierIndex].classList.add('isActive')
      document.querySelector('[data-perks-slider]').dispatchEvent(event)
    }
  }, 500)
}

window.addEventListener('DOMContentLoaded', () => {
  setTierMembership()
  const { tns } = window.Scoutside.vendors
  if (tns) {
    const slider = document.querySelector('[data-perks-slider]')
    const perkSlider = tns({
      container: slider,
      controls: false,
      preventScrollOnTouch: 'auto',
      mouseDrag: true,
      navAsThumbnails: true,
      navPosition: 'bottom',
      speed: 400,
      loop: false,
      responsive: {
        768: {
          disable: true
        }
      }
    })
    slider.addEventListener('tierMembership', (event) => {
      if (window.innerWidth >= 768) return
      perkSlider.goTo(event.detail.index)
    })
  }
})