import vueScrollTo from 'vue-scrollto'

export const _eventScrollTo = (element, duration, options) => {
  vueScrollTo.scrollTo(element, duration, options)
}