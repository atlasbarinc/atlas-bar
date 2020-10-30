
import '@styles/sections/components/component-reviews-slider.scss'

window.addEventListener('DOMContentLoaded', () => {
  const { tns } = window.Scoutside.vendors
  if (tns) {
    const sliders = document.querySelectorAll('[data-reviews-slider]')
    sliders.forEach((slider) => {
      tns({
        container: slider,
        center: true,
        controls: false,
        edgePadding: 60,
        nav: false,
        preventScrollOnTouch: 'auto',
        swipeAngle: 30,
        speed: 400,
        responsive: {
          415: {
            edgePadding: 0,
            fixedWidth: 310,
            mouseDrag: true,
            swipeAngle: false,
          }
        }
      })
    })
  }
})