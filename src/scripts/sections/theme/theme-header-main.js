import '@styles/sections/theme/theme-header-main.scss';

window.addEventListener('DOMContentLoaded', () => {
  const mobileButton = document.querySelector('[data-header-mobile]')
  const mobileMenu = document.querySelector('[data-header-mobile-menu]')
  const shopButton = document.querySelector('[data-header-shop]')
  const shopMenu = document.querySelector('[data-header-shop-menu]')
  const header = document.querySelector('[data-header]')
  const body = document.querySelector('[data-body]')
  const openSubMenu = () => {
    shopButton.classList.add('isActive')
    shopMenu.classList.add('isActive')
    shopMenu.setAttribute('aria-hidden', false)
  }
  const closeSubMenu = () => {
    shopButton.classList.remove('isActive')
    shopMenu.classList.remove('isActive')
    shopMenu.setAttribute('aria-hidden', true)
  }
  mobileButton.addEventListener('click', (event) => {
    if (mobileMenu.classList.contains('isActive')) {
      body.classList.remove('o-body--noScroll')
    } else {
      body.classList.add('o-body--noScroll')
    }
    mobileMenu.classList.toggle('isActive')
    mobileButton.classList.toggle('isActive')
  })
  if (shopButton) {
    shopButton.addEventListener('mouseenter', (event) => {
      openSubMenu()
    })
    shopButton.addEventListener('focus', (event) => {
      openSubMenu()
    })
    shopButton.addEventListener('click', (event) => {
      event.preventDefault()
    })
    header.addEventListener('mouseleave', (event) => {
      closeSubMenu()
    })
  }

  let scrollPosition = window.scrollY
  window.addEventListener('scroll', (event) => {
    if (window.scrollY > header.offsetHeight && !header.classList.contains('c-header--isSticky')) {
      header.classList.add('c-header--isHidden')
      setTimeout(() => { header.classList.add('c-header--isSticky') }, 100)
    }
    if (window.scrollY <= 0) {
      header.classList.remove('c-header--isSticky')
      header.classList.remove('c-header--isHidden')
    }
    if (header.classList.contains('c-header--isSticky')) {
      if (scrollPosition > window.scrollY) {
        header.classList.remove('c-header--isHidden')
      } else {
        header.classList.add('c-header--isHidden')
      }
    }
    scrollPosition = window.scrollY
  })
})