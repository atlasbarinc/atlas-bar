import '@styles/sections/components/component-rewards-rewards.scss'

window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[data-lion-rewards-list]')
  if (!container) return
  const config = { subtree: true, childList: true }
  const llObserver = new MutationObserver((mutationsList) => {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList') {
        document.querySelectorAll('.lion-reward-item__redeem-button').forEach(el => {
          if (el.classList.contains('lion-reward-item__redeem-button--disabled')) {
            el.closest('.lion-reward-item').classList.add('lion-reward-item--disabled')
          } else {
            el.closest('.lion-reward-item').classList.remove('lion-reward-item--disabled')
          }
        })
      }
    })
  })
  llObserver.observe(container, config)
})