export const _filterItemsByStatus = ({ items, status }) => {
  return items.filter(item => {
    const cancelled = item.status === "CANCELLED"
    const noCharge = item.scheduledAt === null
    if(status === "active") return !cancelled && !noCharge
    if(type === 'inactive') return cancelled || noCharge
  })
}