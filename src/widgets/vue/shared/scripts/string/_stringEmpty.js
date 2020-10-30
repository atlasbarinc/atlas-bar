export const _stringEmpty = str => {
  if(!str) return true
  else {
    const trimmedStr = str.trim()
    return trimmedStr === null || trimmedStr === ""
  }
}