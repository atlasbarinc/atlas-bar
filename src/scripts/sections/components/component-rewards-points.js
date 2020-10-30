import '@styles/sections/components/component-rewards-points.scss'

window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[data-lion-rules-list]')
  if (!container) return
  const config = { subtree: true, childList: true }
  const llObserver = new MutationObserver((mutationsList) => {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList') {
        const rulesButtons = document.querySelector('#rulesButtons')
        if (!rulesButtons) return
        const json = JSON.parse(rulesButtons.innerHTML)
        if (!json.buttons.length) return;
        json.buttons.forEach(button => {
          const rule = container.querySelector('.lion-rules-list').children[button.index]
          if (rule.classList.contains('lion-rule-item--completed-forever')) return
          if (rule.querySelector('.lion-action-button')) return
          const link = document.createElement('a')
          link.href = button.link
          link.target = "_blank"
          const div = document.createElement('div')
          div.setAttribute('class', 'lion-action-button lion-action-button--tile lion-rule-item__button') 
          div.setAttribute('data-testid', 'rule-item-button')
          div.innerText = button.label
          link.appendChild(div)
          rule.querySelector('.lion-rule-item__content').appendChild(link)
        })
      }
    })
  })
  llObserver.observe(container, config)
})