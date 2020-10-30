<template>
  <div :class="_buildModifiers('c-tabs', modifiers)" 
    ref="tabs"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    closeAllItems(el) {
      let children = this.$children
      children.map((item, index) => {
        if(item.$el !== el) {
          item.closeContent()
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .c-tabs {
    position: relative;
  }
</style>