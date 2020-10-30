<template>
  <div :class="_buildModifiers('c-accordion', modifiers)" 
    ref="accordion"
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
    },
    mutlipleOpen: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    closeAllItems(el) {
      let children = this.$children
      children.map((item, index) => {
        if(item.$el !== el) {
          item.maxHeight = 0
          item.active = false
        }
      })
    }
  }
}
</script>