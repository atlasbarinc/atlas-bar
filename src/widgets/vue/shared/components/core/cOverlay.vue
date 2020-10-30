<template>
  <transition :name="name">
    <div 
      :class="_buildModifiers('c-overlay', modifiers)"
      v-if="show"
      @click="$emit('close')"
    />
  </transition>
</template>

<script>

export default {
  props: {
    show: {
      type: [Boolean, String],
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    modifiers: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    name() {
      return `t-overlay-${this.type}`
    }
  }
}
</script>

<style lang="scss">
  .t-overlay-default-enter,
  .t-overlay-default-leave-to {
    opacity: 0;
  }
  .t-overlay-default-leave,
  .t-overlay-default-enter-to {
    opacity: 1;
  }
</style>