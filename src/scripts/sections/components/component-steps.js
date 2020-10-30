import '@styles/sections/components/component-steps.scss'

window.addEventListener('DOMContentLoaded', () => {
  const { tns } = window.Scoutside.vendors
  if (tns) {
    const sliders = document.querySelectorAll('[data-steps-container]')
    sliders.forEach((container) => {
      const sliderEl = container.querySelector('[data-steps-slider]')
      const prevEl = container.querySelector('[data-steps-slider-prev]')
      const nextEl = container.querySelector('[data-steps-slider-next]')
      const timing = sliderEl.getAttribute('data-slider-speed') || 5000
      tns({
        container: sliderEl,
        controls: false,
        center: true,
        edgePadding: 50,
        preventScrollOnTouch: 'auto',
        loop: false,
        rewind: true,
        navPosition: 'bottom',
        navAsThumbnails: true,
        autoplay: true,
        autoplayTimeout: timing,
        autoplayButtonOutput: false,
        speed: 400,
        prevButton: prevEl,
        nextButton: nextEl,
        responsive: {
          768: {
            edgePadding: 150
          },
          1024: {
            controls: true,
            edgePadding: 0
          }
        }
      })
    })
  }
})