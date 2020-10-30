import '@styles/snippets/components/component-welcome.scss';
import { _buildHeaders } from '@scripts/utils'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('[data-welcome-box]')
  if (!box) return
  const getNextChargeDate = setInterval(async() => {
    const { api } = window.Scoutside
    if (api.ready) {
      clearInterval(getNextChargeDate)

      const headers = await _buildHeaders()
      const charges = await fetch(`${api.base_url}/v1/customer/resources?resources[]=charges`, {
        headers
      })
      const json = await charges.json()
      if(!json || (json && json.resources.charges.length === 0)) return
      const nextDate = json.resources.charges.reduce((a, b) => {
        if (a.status !== "QUEUED") return b
        if (b.status !== "QUEUED") return a
        return dayjs(a.scheduled_at).isBefore(dayjs(b.scheduled_at)) ? a : b
      })
      if (!nextDate || (nextDate && nextDate.status !== "QUEUED")) return
      const date = box.querySelector('[data-welcome-date]')
      date.innerHTML = dayjs(nextDate.scheduled_at).format('MMMM Do')
      box.classList.remove('u-hide')
    }
  }, 500)
})