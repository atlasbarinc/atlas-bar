<template>
  <component :class="_buildModifiers(`c-p${level}`, modifiers)"
    :is="tag" 
    ref="c-p"
    @click="$emit('click')"
  >
    {{ text }}
    <slot />
  </component>
</template>

<script>
import { _registerClick } from '@shared/scripts'

export default {
  props: {
    tag: {
      type: String,
      default: 'p'
    },
    level: {
      type: String,
      requried: true
    },
    text: {
      type: [String, Number],
      required: false
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  mounted() {
    _registerClick(this, 'c-p')
  }
}
</script>