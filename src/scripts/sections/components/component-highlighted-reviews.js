import '@styles/sections/components/component-highlighted-reviews.scss'

window.addEventListener('DOMContentLoaded', () => {
  const { tns } = window.Scoutside.vendors
  if (tns) {
    const containers = document.querySelectorAll('[data-highlighted-reviews]')
    containers.forEach((container) => {
      const sliderEl = container.querySelector('[data-highlighted-reviews-slider]')
      const sliderNav = container.querySelector('[data-highlighted-reviews-slider-nav]')
      const slider = tns({
        container: sliderEl,
        mode: 'gallery',
        controls: false,
        loop: false,
        navContainer: sliderNav,
        navAsThumbnails: true,
        preventScrollOnTouch: 'auto',
        speed: 400
      })
      const nav = tns({
        container: sliderNav,
        center: true,
        controls: false,
        edgePadding: 20,
        loop: false,
        navPosition: 'bottom',
        navAsThumbnails: true,
        preventScrollOnTouch: 'auto',
        speed: 400,
        responsive: {
          768: {
            disable: true
          }
        }
      })
      slider.events.on('indexChanged', (info) => {
        if (info.navCurrentIndex === info.index) return
        nav.goTo(info.index)
      })
      nav.events.on('indexChanged', (info) => {
        slider.goTo(info.index)
      })
    })
  }
})