<template>
  <div :class="_buildModifiers('c-shipmentsLoadingUpsell', modifiers)">
    <div class="c-shipmentsLoadingUpsell__carouselWrapper">
      <div class="c-shipmentsLoadingUpsell__carousel">
        <div class="c-shipmentsLoadingUpsell__slide"
          v-for="n in 4"
          :key="`slide-${n}`"
        >
          <div class="c-shipmentsLoadingUpsell__slideImage" />
          <div class="c-shipmentsLoadingUpsell__slideTitle c-shipmentsLoadingUpsell__blockBase" />
          <div class="c-shipmentsLoadingUpsell__slidePrice c-shipmentsLoadingUpsell__blockBase" />
          <div class="c-shipmentsLoadingUpsell__slideButton c-shipmentsLoadingUpsell__blockBase" />
        </div>
      </div>
      <div class="c-shipmentsLoadingUpsell__controls">
        <div class="c-shipmentsLoadingUpsell__control">
          <c-svg class="c-shipmentsLoadingUpsell__controlIcon"
            name="chevron"
          />
        </div>
        <div class="c-shipmentsLoadingUpsell__control">
          <c-svg class="c-shipmentsLoadingUpsell__controlIcon"
            name="chevron"
          />
        </div>
      </div>
      <div class="c-shipmentsLoadingUpsell__nav u-hideTabletUp">
        <div class="c-shipmentsLoadingUpsell__navItem" 
          v-for="n in 6"
          :key="`nav-${n}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'

export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cSvg },
}
</script>

<style lang="scss">
  .c-shipmentsLoadingUpsell__blockBase {
    @include gradient-shimmer;
    border-radius: 3px;
  }
  .c-shipmentsLoadingUpsell__carouselWrapper {
    position: relative;
    @include media-mobile-down {  
      width: 100vw;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      padding-left: 20px;
      overflow: hidden;
    }
  }
  .c-shipmentsLoadingUpsell__controls {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 160px);
    @include flex($justify: space-between);
    z-index: 1;
    pointer-events: none;
  }
  .c-shipmentsLoadingUpsell__control {
    min-width: 35px;
    width: 35px;
    height: 35px;
    border: 2px solid #E5E5E5;
    border-radius: 50%;
    @include flex($justify: center);
  }
  .c-shipmentsLoadingUpsell__controlIcon {
    width: 12px;
    height: auto;
    position: relative;
    color: #E5E5E5;
    transform-origin: 50%;
    .c-shipmentsLoadingUpsell__control:first-child & { 
      transform: rotate(90deg); 
      left: -1px;
    }
    .c-shipmentsLoadingUpsell__control:last-child & { 
      transform: rotate(270deg);
      left: 1px; 
    }
  }
  .c-shipmentsLoadingUpsell__carousel {
    @include grid($columns: 1fr 1fr, $auto-flow: row, $gap: 20px);
    position: relative;
    overflow: hidden;
    @include media-mobile-down {
      width: calc(200vw - 220px);
    }
    @include media-tablet-up {
      grid-template-columns: 1fr 1fr;
      grid-gap: 40px;
    }
    @include media-up(900px) {
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 45px;
    }
    @include media-desktop-up {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 50px;
    }
  }
  .c-shipmentsLoadingUpsell__slide {
    width: 100%;
    @include flex($direction: column);
    @include box-card;
    border: none;
    @include media-down(899px) {
      &:nth-child(4) { display: none; }
    }
    @include media-tablet-down {
      &:nth-child(3) { display: none; }
    }
  }
  .c-shipmentsLoadingUpsell__slideImage {
    width: 100%;
    margin-bottom: 20px;
    @include gradient-shimmer;
    border-radius: 3px;
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }
  .c-shipmentsLoadingUpsell__slideTitle,
  .c-shipmentsLoadingUpsell__slidePrice {
    height: 20px;
    width: 120px;
    max-width: 100%;
    margin-bottom: 8px;
  }
  .c-shipmentsLoadingUpsell__slidePrice {
    height: 18px;
    width: 100px;
    max-width: 100%; 
  }
  .c-shipmentsLoadingUpsell__slideButton {
    width: 100%;
    height: 50px;
    border-radius: 40px;
    @include gradient-shimmer;
    margin-top: 20px;
  }
  .c-shipmentsLoadingUpsell__nav {
    width: 100%;
    margin-top: 40px;
    @include flex($justify: center);
  }
  .c-shipmentsLoadingUpsell__navItem {
    width: 10px;
    height: 10px;
    margin: 0 8px;
    border-radius: 50%;
    border: 2px solid transparent;
    &:not(:nth-child(2)) {
      @include gradient-shimmer;
    }
    &:nth-child(2) {
      border-color: #E5E5E5;
    }
  }
</style>