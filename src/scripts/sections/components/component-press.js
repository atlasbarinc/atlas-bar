import '@styles/sections/components/component-press.scss'

window.addEventListener('DOMContentLoaded', () => {
  const { tns } = window.Scoutside.vendors
  if (tns) {
    const elements = document.querySelectorAll('[data-press]')
    elements.forEach((el) => {
      const slider = el.querySelector('[data-press-slider]')
      const nav = el.querySelector('[data-press-nav]')
      const activeSlider = tns({
        container: slider,
        mode: 'gallery',
        controls: false,
        navContainer: nav,
        navAsThumbnails: true,
        speed: 400
      })
      activeSlider.events.on('transitionStart', () => {
        const activeSlide = el.querySelector('.tns-slide-active')
        el.style.backgroundColor = activeSlide.getAttribute('data-color')
      })
    })
  }
})