<template>
  <span :class="classList"
    v-if="svg" 
    v-html="svg"
  />
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    svg: false,
    classList: false
  }),
  created() {
    this.svg = require(`@shared/assets/svg/_${this.name}`).default
    this.classList = this._buildModifiers('c-svg', this.modifiers)
  }
}
</script>

<style lang="scss">
  .c-svg {
    display: inline-flex;
    text-align: center;
    pointer-events: none;
    svg {
      width: inherit;
      height: inherit;
    }
  }
</style>