import '@styles/sections/components/component-hero.scss'

window.addEventListener('DOMContentLoaded', () => {
  const { tns } = window.Scoutside.vendors
  if (tns) {
    const sliders = document.querySelectorAll('[data-hero-slider]')
    sliders.forEach((slider) => {
      tns({
        container: slider,
        mode: 'gallery',
        controls: false,
        loop: false,
        navContainer: '[data-hero-slider-nav]',
        navAsThumbnails: true,
        preventScrollOnTouch: 'auto',
        preventActionWhileRunning: true,
        speed: 400
      })
    })
  }

  const pdpHero = document.querySelector('[data-hero]')
  if (pdpHero) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.boundingClientRect.bottom < 0) {
        entry.target.classList.add('c-hero--isScrolled')
      } else {
        entry.target.classList.remove('c-hero--isScrolled')
      }
    })
    observer.observe(pdpHero)

    let scrollPosition = window.scrollY
    window.addEventListener('scroll', (event) => {
      if (pdpHero.classList.contains('c-hero--isScrolled')) {
        if (scrollPosition > window.scrollY) {
          pdpHero.classList.remove('c-hero--isSticky')
        } else {
          pdpHero.classList.add('c-hero--isSticky')
        }
      }
      scrollPosition = window.scrollY
    })
  }

})