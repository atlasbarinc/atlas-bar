import dayjs from 'dayjs'
import { 
  _filterItemsByDate,
  _buildBundles
} from '@vue/portal/utils'

export const _buildShipments = ({ address, subscriptions, onetimes }) => {  
  let groups = []
  const charges = address.charges.queued.filter(charge => charge.scheduledAt)
  if(charges) {
    groups = charges.map(charge => {
      let subscriptionItems =  _filterItemsByDate({ items: subscriptions, date: charge.scheduledAt })
      let onetimeItems = _filterItemsByDate({ items: onetimes, date: charge.scheduledAt })
      subscriptionItems = _buildBundles({ items: subscriptionItems })
      onetimeItems = _buildBundles({ items: onetimeItems })
      const count = subscriptionItems.length + onetimeItems.length
      return {
        addressId: address.id,
        date: charge.scheduledAt, 
        charge,
        count,
        subscriptions: subscriptionItems,
        onetimes: onetimeItems,
      }
    })
  }
  return groups.sort((a,b) =>  {
    const aDate = dayjs(a.date)
    const bDate = dayjs(b.date)
    const sameDate = dayjs(aDate).isSame(bDate, 'day')
    let aBefore = false;
    if(!sameDate) aBefore = dayjs(aDate).isBefore(bDate, 'day')
    return aBefore ? -1 : 1
  })
}