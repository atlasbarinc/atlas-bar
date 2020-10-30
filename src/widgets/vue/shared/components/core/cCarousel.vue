<template>
  <div :class="'c-carousel'" ref="c-carousel">
    <div class="c-carousel__wrapper">
      <div :id="id" class="c-carousel__track">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: false
    },
    id: {
      type: String,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    slider: false,
    classList: '',
    defaultOptions: {
      preventScrollOnTouch: 'auto',
      items: 1,
      speed: 500,
      loop: true,
      mouseDrag: true,
      touch: true,
      autoplayButtonOutput: false,
      controls: false,
      nav: false,
      responsive: {
        768: {
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          mouseDrag: false
        }
      }
    }
  }),
  created() {
    this.classList = this._buildModifiers('c-carousel', this.modifiers)
  },
  mounted() {
    const { tns } = window.Scoutside.vendors
    if(tns) {
      this.slider = tns({ container: `#${this.id}`, 
        ...this.defaultOptions, ...this.options 
      })
    }
  },
  beforeDestroy() {
    if(this.slider) this.slider.destroy()
  }
}
</script>

<style lang="scss">
  .c-carousel__track {
    display: flex;
    transition-property: transform;
  }
  .c-carousel {
    .tns-visually-hidden {
      display: none;
    }
  }
</style>