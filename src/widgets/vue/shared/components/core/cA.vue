<template>
  <component :class="_buildModifiers(baseClass, modifiers)"
    :is="tag" 
    ref="c-a"
    v-bind="attributes"
    @click="$emit('click')"
  >
    <slot name="before" />
    {{ text }}
    <slot />
  </component>
</template>

<script>
import { _registerClick } from '@shared/scripts'

export default {
  props: {
    type: {
      type: String,
      default: 'a'
    },
    tag: {
      type: String,
      default: 'a'
    },
    url: {
      type: [String, Boolean],
      default: false
    },
    text: {
      type: [String, Number],
      required: false
    },
    attributes: {
      type: Object,
      default: () => ({})
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    baseClass() {
      return `c-${this.type}`
    }
  },
  mounted() {
    _registerClick(this, 'c-a')
  }
}
</script>