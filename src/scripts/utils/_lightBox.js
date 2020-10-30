const open = (trigger) => {
  const body = document.querySelector('[data-body]')
  const overlay = document.querySelector('[data-overlay]')
  const id = trigger.getAttribute('data-lightbox-trigger')
  body.classList.add('o-body--noScroll')
  overlay.classList.remove('c-overlay--isInactive')
  document.querySelector(`[data-lightbox="${id}"]`).classList.add('c-lightbox__container--isActive')
}

const close = () => {
  const body = document.querySelector('[data-body]')
  const overlay = document.querySelector('[data-overlay]')
  const lightboxes = document.querySelectorAll('[data-lightbox]')
  body.classList.remove('o-body--noScroll')
  overlay.classList.add('c-overlay--isInactive')
  lightboxes.forEach((el) => {
    el.classList.remove('c-lightbox__container--isActive')
  })
}

export const _lightBox = () => {
  const triggers = document.querySelectorAll('[data-lightbox-trigger]')
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      open(trigger)
    })
  })

  const closeButtons = document.querySelectorAll('[data-lightbox-close]')
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      close()
    })
  })

  const overlays = document.querySelectorAll('[data-overlay]')
  overlays.forEach((overlay) => {
    overlay.addEventListener('click', () => {
      close()
    })
  })
}