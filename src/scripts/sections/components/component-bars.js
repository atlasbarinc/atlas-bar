import '@styles/sections/components/component-bars.scss'

window.addEventListener('DOMContentLoaded', () => {
  const { tns } = window.Scoutside.vendors
  if (tns) {
    const containers = document.querySelectorAll('[data-bars]')
    containers.forEach((container) => {
      const slider = container.querySelector('[data-bars-slider]')
      const prevEl = container.querySelector('[data-bars-slider-prev]')
      const nextEl = container.querySelector('[data-bars-slider-next]')
      const button = container.querySelector('[data-bars-button]')
      const activeSlider = tns({
        edgePadding: 70,
        container: slider,
        mouseDrag: true,
        navPosition: 'bottom',
        navAsThumbnails: true,
        preventScrollOnTouch: 'auto',
        preventActionWhenRunning: true,
        prevButton: prevEl,
        nextButton: nextEl,
        responsive: {
          375: { edgePadding: 80 },
          425: { edgePadding: 120 },
          540: { edgePadding: 180 },
          768: {
            items: 3,
            center: true,
            edgePadding: 0
          }
        }
      })
      activeSlider.events.on('indexChanged', (info) => {
        info.slideItems.forEach(slide => slide.classList.remove('active-slide'))
        info.slideItems[info.index].classList.add('active-slide')
        container.style.backgroundColor = info.slideItems[info.index].getAttribute('data-item-color')
        button.setAttribute('data-lightbox-trigger', `bars-${info.slideItems[info.index].getAttribute('data-item-id')}`)
      })
    })
  }
})