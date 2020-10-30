<template>
  <div :class="_buildModifiers('c-tabsItem', extendedModifiers)"
    v-if="showTab" 
    ref="tabsItem"
  >
    <div :class="_buildModifiers('c-tabsItem__trigger', extendedModifiers)"
      ref="trigger"
      @click="toggleContent"
      :style="tabsStyle"
    >
      <slot name="trigger" />
    </div>
    <div :class="_buildModifiers('c-tabsItem__content', extendedModifiers)"
      ref="content"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    active: false
  }),
  computed: {
    showTab() {
      return typeof this.index == 'number' && typeof this.count == 'number'
    },
    extendedModifiers() {
      let modifiers = [ ...this.modifiers]
      if(this.active) modifiers.push('isOpen')
      return modifiers
    },
    tabsStyle() {
      const width = 100 / this.count
      const left = width * this.index
      return {
        width: `${width}%`,
        left: `${left}%`
      }
    }
  },
  methods: {
    toggleContent() {
      setTimeout(() => {
        this.$parent.closeAllItems(this.$el)
        this.active = true
      })
    },
    closeContent() {
      this.active = false
    }
  },
  mounted() {
    if(this.open) this.active = true
  }
}
</script>

<style lang="scss">
  .c-tabsItem {
    position: relative;
    width: 100%;
    &:not(.c-tabsItem--isOpen) {
      position: absolute;
      top: 0;
    }
  }
  .c-tabsItem__trigger {
    position: relative;
    z-index: 1;
    &:hover { cursor: pointer };
    &.c-tabsItem__trigger--isOpen {
      pointer-events: none;
      z-index: 3;
    }
  }
  .c-tabsItem__content {
    position: absolute;
    z-index: -1;
    opacity: 0;
    &.c-tabsItem__content--isOpen {
      position: relative;
      z-index: 2;
      opacity: 1;
    }
  }
</style>