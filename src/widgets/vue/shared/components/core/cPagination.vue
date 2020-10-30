<template>
  <div :class="_buildModifiers('c-pagination', modifiers)"
    v-if="active && count > 1"
  >
    <button :class="_buildModifiers('c-pagination__arrow', [ 
        ...arrowModifiers('previous'), prevDisabled ? 'isDisabled' : ''
      ])"
      @click="updateDots('previous')"
    >
      <c-svg class="c-pagination__arrowIcon"
        name="chevron"
      />
    </button>
    <button class="c-pagination__dot"
      v-for="dot in visibleDots"
      :key="`dot-${dot}`"
      :class="dot === activeIndex 
        ? ' c-pagination__dot--isActive' : ''"
      @click="update(dot)"
    >
      <span class="c-pagination__dotText"
        v-html="dot + 1"
      />
    </button>
    <button :class="_buildModifiers('c-pagination__arrow', [ 
        ...arrowModifiers('next'), nextDisabled ? 'isDisabled' : ''
      ])"
      @click="updateDots('next')"
    >
      <c-svg class="c-pagination__arrowIcon"
        name="chevron"
      />
    </button>
  </div>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'

export default {
  props: {
    active: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      required: true
    },
    show: {
      type: Number,
      default: 4
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cSvg },
  data:(self = this) => ({
    activeIndex: self.active - 1,
    visibleDots: self.getDots()
  }),
  computed: {
    prevDisabled() {
      return this.visibleDots[0] === 0
    },
    nextDisabled() {
      return this.visibleDots[this.visibleDots.length - 1] === this.count - 1
    }
  },
  methods: {
    update(index) {
      this.activeIndex = index
      this.$emit('update', this.activeIndex + 1)
    },
    arrowModifiers(type) {
      let modifiers = []
      if(type === 'previous') {
        modifiers.push('isPrevious')
      } else {
         modifiers.push('isNext')
      }
      return modifiers
    },
    getDots() {
      let visibleArray = []
      for(let i = 0; i < this.count; i++) { 
        if(i < this.show) visibleArray.push(i) 
      }
      return visibleArray
    },
    updateDots(action) {
      let newArray = [ ...this.visibleDots ]
      if(action === 'previous' && !this.prevDisabled) {
        newArray.pop()
        newArray.unshift(this.visibleDots[0] - 1)
      }
      if(action === 'next' && !this.nextDisabled) {
        newArray.shift()
        newArray.push(this.visibleDots[this.visibleDots.length - 1] + 1)
      }
      this.visibleDots = newArray
    }
  },
  watch: {
    active: {
      handler(val) {
        this.activeIndex = val - 1
      }
    }
  }
}
</script>

<style lang="scss">
  .c-pagination {
    @include flex($justify: center, $align: center, $wrap: wrap);
  }
  .c-pagination__dot {
    @include flex($justify: center, $align: center);
    width: 40px;
    height: 40px;
    margin: 0 10px;
    position: relative;
    border: 2px solid #E5E5E5;
    border-radius: 50%;
    background-color: transparent;
    color: $color-black;
    transition-property: background-color, color, border-color;
    transition-duration: .15s;
    transition-timing-function: ease-in-out;
    @include media-mobile-down {
      margin: 0 5px;
    }
    &:not(.c-pagination__dot--isActive):hover {
      color: $color-primary;
      border-color: $color-primary;
    }
  }
  .c-pagination__dotText {
    color: inherit;
    font-family: $font-heading;
    font-size: 14px;
    font-weight: 600;
  }
  .c-pagination__dot--isActive {
    pointer-events: none;
    background-color: $color-primary;
    border-color: $color-primary;
    color: $color-white;
  }
  .c-pagination__arrow {
    @include button-unset;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    @include flex($justify: center);
    color: $color-primary;
    @include hover-fade;
    &.c-pagination__arrow--isPrevious { transform: rotate(90deg); }
    &.c-pagination__arrow--isNext { transform: rotate(-90deg); }
    &.c-pagination__arrow--isDisabled {
      pointer-events: none;
      color: #E5E5E5;
    }
  }
  .c-pagination__arrowIcon {
    width: 18px;
  }
</style>