<template>
  <div :class="_buildModifiers('c-radioGroup', modifiers)">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    update(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
  .c-radioGroup {
    .c-radio { margin-bottom: 24px; }
  }
</style>