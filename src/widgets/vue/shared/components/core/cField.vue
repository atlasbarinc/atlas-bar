<template>
  <div :class="_buildModifiers('c-field', modifiers)">
    <label class="c-field__label"
      v-if="label"
      v-html="label"
    />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: [String, Boolean],
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    extendedModifiers() {
      let modifiers = [ ...this.modifiers ]
      if(this.error) modifiers.push('hasError')
      return modifiers
    }
  }
}
</script>

<style lang="scss">
  .c-field {
    width: 100%;
    margin-bottom: 20px;
  }
  .c-field__label {
    display: block;
    margin-bottom: 10px;
    font-family: $font-heading;
    font-size: 22px;
    font-weight: 800;
    @include media-mobile-down {
      font-size: 20px;
    }
  }
</style>