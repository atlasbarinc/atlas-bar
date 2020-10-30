import '@styles/sections/components/component-home-hero.scss'

window.addEventListener('DOMContentLoaded', () => {
  const { tns } = window.Scoutside.vendors
  if (tns) {
    const sliders = document.querySelectorAll('[data-home-hero-slider]')
    sliders.forEach((slider) => {
      const speed = slider.getAttribute('data-slider-speed') || 5000
      tns({
        container: slider,
        controls: false,
        preventScrollOnTouch: 'auto',
        mouseDrag: true,
        navAsThumbnails: true,
        navPosition: 'bottom',
        autoplayTimeout: speed,
        autoplayButtonOutput: false,
        speed: 400
      })
    })
  }
})