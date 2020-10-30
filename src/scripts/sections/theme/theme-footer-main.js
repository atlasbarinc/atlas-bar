import '@styles/sections/theme/theme-footer-main.scss';

document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('[data-footer-newsletter]')
  const newsletterMessages = document.querySelector('[data-footer-newsletter-messages]')
  const config = { subtree: true, childList: true }
  const newsletterObserver = new MutationObserver((mutationsList) => {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList') {
        const type = mutation.target.dataset.type
        if (type === 'error') {
          newsletterForm.querySelector('[data-type="success"]').style.display = 'none'
          newsletterForm.classList.remove('isSuccess')
          newsletterForm.classList.add('isError')
        }
        if (type === 'success') {
          newsletterForm.classList.remove('isError')
          newsletterForm.classList.add('isSuccess')
        }
      }
    })
  })

  newsletterObserver.observe(newsletterMessages, config)
})