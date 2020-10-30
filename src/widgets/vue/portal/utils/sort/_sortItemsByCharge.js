import dayjs from 'dayjs'

export const _sortItemsByCharge = ({ items, order }) => {
  return items.sort((a,b) =>  {
    const aDate = dayjs(a.scheduledAt)
    const bDate = dayjs(b.scheduledAt)
    const sameDate = dayjs(aDate).isSame(bDate, 'day')
    let aBefore = false;
    if(!sameDate) aBefore = dayjs(aDate).isBefore(bDate, 'day')
    if(!order || order === 'ascending') return aBefore ? -1 : 1
    else return aBefore ? 1 : -1
  })
}