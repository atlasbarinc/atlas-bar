<template>
  <div :class="_buildModifiers('c-accordionItem', extendedModifiers)"
    ref="accordionItem"
  >
    <div :class="_buildModifiers('c-accordionItem__trigger', extendedModifiers)"
      ref="trigger"
      @click="toggleContent"
    >
      <slot name="trigger" />
    </div>
     <div :class="_buildModifiers('c-accordionItem__content', extendedModifiers)"
      ref="content"
      :style="contentStyle"
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
    duration: {
      type: Number,
      default: 350
    },
    setParent: {
      type: Boolean,
      default: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    },
  },
  data: () => ({
    maxHeight: 0,
    active: false,
    transition: false
  }),
  computed:{
    multipleOpen() {
      return this.$parent.multipleOpen
    },
    extendedModifiers() {
      let modifiers = [ ...this.modifiers]
      if(this.active) modifiers.push('isOpen')
      if(this.transition) modifiers.push('hasTransition')
      return modifiers
    },
    contentStyle() {
      const transition = this.transition 
        ? `max-height ${this.duration}ms ease-in-out`
        : ''
      return { 
        transition: transition,
        maxHeight: this.maxHeight !== 'none'
          ? `${this.maxHeight }px` : 'none'
      }
    }
  },
  methods:{
    changeHeight () {
      const content = this.$refs.content
      if(this.active && content) {
        this.maxHeight = content.scrollHeight
      }
    },
    toggleContent() {
      this.changeHeight()
      setTimeout(() => {
        if(!this.multipleOpen && this.$parent.closeAllItems) this.$parent.closeAllItems(this.$el)
        let maxHeight = this.$refs.content.scrollHeight
        if(this.maxHeight == '0') this.maxHeight = maxHeight
        else this.maxHeight = 0
        if(this.setParent) this.setParentAccordion()
        if(this.maxHeight !== 0) {
          setTimeout(() => this.maxHeight = 'none', this.duration)
        }
        this.active = !this.active
        setTimeout(() => {
          if (window.scrollY > this.$el.offsetTop) {
            this._eventScrollTo(this.$el, 350, { offset: -100 })
          }
        })
      })
    },
    setParentAccordion() {
      let component = null
      let parent = this.$parent
      while (parent && !component) {
        parent = parent.$parent
        if(parent) {
          if(parent.$options._componentTag === 'c-accordionItem') component = parent
        }
      }
      if(component) {
        component.changeHeight()
        component.maxHeight = component.maxHeight + this.maxHeight + 100
        component.setParentAccordion()
      }
    }
  },
  mounted() {
    if(this.open) setTimeout(() => this.toggleContent())
    setTimeout(() => this.transition = true, this.duration)
  }
}
</script>

<style lang="scss">
  .c-accordionItem {
    overflow: hidden;
    &:not(.c-accordionItem--hasTransition) * {
      transition: none !important;
    }
  }
  .c-accordionItem__trigger {
    width: 100%;
    &:hover { cursor: pointer; }
  }
</style>