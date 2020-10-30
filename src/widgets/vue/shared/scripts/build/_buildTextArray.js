export const _buildTextArray = (text, splitChar = /[\n\r]/) => {
  if(!text) return []
  if(!splitChar) return [ text ]
  if(text && splitChar) {
    const test = text.split(splitChar)
    return text.split(splitChar)
  }
}