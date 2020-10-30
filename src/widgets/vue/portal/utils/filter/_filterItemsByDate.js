import dayjs from 'dayjs'

export const _filterItemsByDate = ({ items, date }) => {
  if(!items) return []
  return items.filter(item => {
    return dayjs(item.scheduledAt).isSame(date, 'days')
  }) 
}