export const _registerClick = (vm, key) => {
  const ref = vm.$refs[key]
  if(ref) {
    const el = ref.$el
    if(el) {
      el.addEventListener('click', () => vm.$emit('click'))
    }
  }
}