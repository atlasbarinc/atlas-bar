export const _formatMoney = ({ amount, cents, strip }) => {
  let output = ''
  if (!amount || amount === 0) output = '0.00'
  const str = amount.toString()
  if(str.indexOf('.') >= 0) {
    output = parseFloat(amount).toFixed(2).toString()
  } else {
    if(!cents) output = `${str}.00`
    else {
      output = `${str.substring(0, str.length - 2)}.${str.substring(str.length - 2)}`
    }
  }
  if(strip) output = output.replace('.00', '')
  return output
};