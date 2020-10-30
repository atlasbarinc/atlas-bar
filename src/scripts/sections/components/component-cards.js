import '@styles/sections/components/component-cards.scss'

window.addEventListener('DOMContentLoaded', () => {
  const { tns } = window.Scoutside.vendors
  if (tns) {
    const sliders = document.querySelectorAll('[data-cards-slider]')
    sliders.forEach((slider) => {
      tns({
        container: slider,
        center: true,
        controls: false,
        disable: false,
        edgePadding: 30,
        navPosition: 'bottom',
        navAsThumbnails: true,
        preventScrollOnTouch: 'auto',
        speed: 400,
        responsive: {
          480: { edgePadding: 120 },
          768: {
            disable: true
          }
        }
      })
    })
  }
})