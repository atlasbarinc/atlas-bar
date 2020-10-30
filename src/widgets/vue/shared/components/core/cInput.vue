<template>
  <input :class="_buildModifiers('c-input', extendedModifiers)"
    ref="input"
    v-bind="attributes"
    @input="update"
  />
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false
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
    extendedModifiers() {
      let modifiers = [ ...this.modifiers ]
      if(this.attributes.disabled) modifiers.push('isDisabled')
      if(this.error) modifiers.push('hasError')
      return modifiers
    }
  },
  methods: {
    update() {
      this.$emit('input', this.$refs.input.value)
    }
  }
}
</script>