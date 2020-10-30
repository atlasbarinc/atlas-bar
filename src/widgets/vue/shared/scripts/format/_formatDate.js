import dayjs from 'dayjs'

export const _formatDate = (date, format) => {
  if(format) return dayjs(date).format(format)
  else return date
};