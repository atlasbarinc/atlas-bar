import dayjs from 'dayjs'

export const _buildCreates = ({ type, items, values }) => {  
  return items.map(item => {
    const { date,  } = values
    const tomorrow = dayjs().add(1, 'day')
    const dateValue = date ? date : tomorrow
    let intervalFrequency = false
    let intervalUnit = false
    let creates = { 
      ...values, 
      price: item.price,
      next_charge_scheduled_at: dayjs(dateValue).format('YYYY-MM-DDT00:00:00')
    }
    if(type === 'subscription') {
      const { subscriptionPrice } = item
      if(subscriptionPrice) creates.price = subscriptionPrice
      const { frequency, unit } = values.interval
      intervalFrequency = frequency ? frequency : 30
      intervalUnit = unit ? unit : 'day'
      creates.order_interval_frequency = intervalFrequency
      creates.charge_interval_frequency = intervalFrequency
      creates.order_interval_unit = intervalUnit
      creates.properties = [
        ...item.properties,
        { name: 'shipping_interval_frequency', value: intervalFrequency },
        { name: 'shipping_interval_unit_type', value: intervalUnit }
      ]
    }
    return creates
  })
}