import { _arrayRemoveDuplicates } from './_arraryRemoveDuplicates'

export const _arrayMergeByKeys = ({ prevArray, newArray, keys }) => {
  const keysArray = keys ? keys : ['id']
  if(!prevArray || !newArray) return []
  
  const keyMap = {}
  keysArray.forEach(key => {
    keyMap[key] = _arrayRemoveDuplicates(newArray.map(newItem => newItem[key]))
  })

  let filterIds = []
  prevArray.forEach(prevItem => {
    keysArray.forEach(key => {
      if(keyMap[key].includes(prevItem[key])) filterIds.push(prevItem.id)
    })
  })
  filterIds = _arrayRemoveDuplicates(filterIds)

  const filteredItems = prevArray.filter(item => !filterIds.includes(item.id))
  return filteredItems
}