export const _buildCharges = ({ charges }) => {
  if(!charges) return false
  const queued = charges.filter(charge => charge.status === 'QUEUED')
  const success = charges.filter(charge => charge.status === 'SUCCESS')
  const skipped = charges.filter(charge => charge.status === 'SKIPPED')
  const error = charges.filter(charge => charge.status === 'ERROR')
  return { queued, success, skipped, error }
}