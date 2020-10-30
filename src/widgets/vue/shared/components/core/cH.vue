<template>
  <component :class="_buildModifiers(`c-h${level}`, modifiers)"
    :is="tag" 
    ref="c-h"
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
    tag: {
      type: String,
      required: true
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
  computed: {
    baseClass() {
      return `c-h${this.level}`
    }
  },
  mounted() {
    _registerClick(this, 'c-h')
  }
}
</script>