import dayjs from 'dayjs'

export const _buildUpdates = ({ items = [], actions = [], values = {} }) => {
  return items.map(item => {
    const { id, scheduledAt } = item
    const tomorrow = dayjs().add(1, 'day')
    let dateValue = false
    let intervalFrequency = false
    let intervalUnit = false
    let updates = { id, ...values }
    switch(true) {
      case actions.includes('activate'):
        updates.status = 'ACTIVE'
        break;
      case actions.includes('cancel'):
        updates.status = 'CANCELLED'
        break;
      case actions.includes('delay'):
        intervalFrequency = values.frequency ? values.frequency : 1
        intervalUnit = values.unit ? values.unit : 'month'
        dateValue = scheduledAt ? dayjs(scheduledAt).add(intervalFrequency, intervalUnit) : tomrorow
        updates.next_charge_scheduled_at = dayjs(dateValue).format('YYYY-MM-DDT00:00:00')
      default:
        if(values.date) {
          dateValue = values.date
          updates.next_charge_scheduled_at = dayjs(dateValue).format('YYYY-MM-DDT00:00:00')
        }
        if(values.interval && item.isSubscription) {
          const { frequency, unit } = values.interval
          intervalFrequency = frequency ? frequency : 30
          intervalUnit = unit ? unit : 'day'
          updates.order_interval_frequency = intervalFrequency
          updates.charge_interval_frequency = intervalFrequency
          updates.order_interval_unit = intervalUnit
          updates.properties = [
            ...item.properties,
            { name: 'shipping_interval_frequency', value: intervalFrequency },
            { name: 'shipping_interval_unit_type', value: intervalUnit }
          ]
        }
    }
    return updates
  })
}