import '@styles/sections/components/component-ingredients.scss'

window.addEventListener('DOMContentLoaded', () => {
  const { tns } = window.Scoutside.vendors
  if (tns) {
    const containers = document.querySelectorAll('[data-ingredients]')
    containers.forEach((container) => {
      const contentSlider = container.querySelector('[data-ingredients-content-slider]')
      const imageSlider = container.querySelector('[data-ingredients-image-slider]') 
      const imageSliderNext = container.querySelector('[data-ingredients-image-slider-next]')
      const imageSliderPrev = container.querySelector('[data-ingredients-image-slider-prev]')
      const content = tns({
        container: contentSlider,
        controls: false,
        loop: false,
        nav: false,
        speed: 400,
        touch: false
      })
      const image = tns({
        container: imageSlider,
        controls: true,
        mode: 'gallery',
        navPosition: 'bottom',
        navAsThumbnails: true,
        nextButton: imageSliderNext,
        prevButton: imageSliderPrev,
        preventActionWhenRunning: true,
        preventScrollOnTouch: 'auto',
        speed: 400
      }) 
      image.events.on('indexChanged', (info) => {
        container.style.backgroundColor = info.slideItems[info.displayIndex - 1].getAttribute('data-item-color')
        content.goTo(info.displayIndex - 1)
      })
    })
  }

  const triggers = document.querySelectorAll('[data-expand-trigger]')
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const container = trigger.closest('[data-expand]')
      container.classList.toggle('expand-active')
    })
  })
})