<template>
  <div :class="_buildModifiers('c-productSlideshow', modifiers)"
    v-if="product"
  >
    <c-carousel class='c-productSlideshow__carousel'
      :id="id"
      :options="{
        loop: true,
        nav: true,
        navAsThumbnails: true,
        navContainer: `#${id}-nav`
      }"
    >
      <div class="c-productSlideshow__slideWrapper"
        v-for="(image, index) in product.images"
        :key="`${product.id}-image-${index}`"
      >
        <div class="c-productSlideshow__slide">
          <c-img class="c-productSlideshow__slideImage"
            :src="image"
            :widths="[50, 150, 300, 500, 750]"
          />
        </div>
      </div>
    </c-carousel>
    <div :id="`${id}-nav`" class="c-productSlideshow__nav">
      <div class="c-productSlideshow__navItem"
        v-for="(image, index) in product.images"
        :key="`${product.id}-thumb-${index}`"
      >
        <c-img class="c-productSlideshow__navImage u-hideMobileDown"
          :src="image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import hyperid from 'hyperid'

import cCarousel from '@shared/components/core/cCarousel.vue'
import cImg from '@shared/components/core/cImg.vue'

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    cCarousel, cImg
  },
  computed: {
    id() {
      return `carousel-${hyperid({ urlSafe: true })()}`
    }
  }
}
</script>

<style lang="scss">
  .c-productSlideshow__carousel {
    overflow: hidden;
  }
  .c-productSlideshow__nav {
    margin-top: 15px;
    @include flex($justify: center);
  }
  .c-productSlideshow__navItem {
    min-width: 50px;
    width: 50px;
    height: 50px;
    margin: 5px 6px;
    border-radius: 50%;
    border: 2px solid $color-white;
    opacity: .5;
    overflow: hidden;
    transition: opacity .15s ease-in-out, border-color .15s ease-in-out;
    outline: none;
    @include media-mobile-down {
      position: relative;
      min-width: 14px;
      width: 14px;
      height: 14px;
      border-width: 1px;
      border-color: transparent;
      &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        min-width: 12px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid $color-primary;
      }
    }
    &:hover { 
      cursor: pointer;
      opacity: 1;
    }
    &.tns-nav-active {
      opacity: 1;
      border-color: $color-secondary;
      pointer-events: none;
      @include media-mobile-down {
        border-color: $color-primary;
      }
    }
  }
</style>