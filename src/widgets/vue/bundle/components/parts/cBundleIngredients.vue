<template>
  <div v-if="show">
    <c-overlay class="c-bundle-ingredients__overlay" :show="show" />
    <div class="c-bundle-ingredients">
      <button class="c-bundle-ingredients__close-button" aria-label="Close" @click="closeModal"><c-svg name="timesThick" /></button>
      <p class="c-bundle-ingredients__close-label">Close</p>
      <div class="c-bundle-ingredients__images">
        <c-carousel
          :id="`ingredientsModal-${item.id}`"
          :options="{
            mode: 'gallery',
            controls: true,
            controlsContainer: `[data-bundle-ingredients-controls]`,
            nav: true,
            autoplay: false
          }"
        >
          <div class="c-bundle-ingredients__image" :style="`background-color: ${item.primary_color}`" v-for="image in item.images">
            <img :srcset="`${image.modal_2x} 2x, ${image.modal_1x} 1x`"
                :src="image.modal_1x"
                alt="">
          </div>
        </c-carousel>
        <div class="c-bundle-ingredients__images-controls" data-bundle-ingredients-controls>
          <button class="c-slider__control c-slider__control--prev"><c-svg name="chevron" /></button>
          <button class="c-slider__control c-slider__control--next"><c-svg name="chevron" /></button>
        </div>
      </div>
      <div class="c-bundle-ingredients__details">
        <div class="c-bundle-ingredients__detail">
          <h3 class="c-bundle-ingredients__heading">{{ item.title }}</h3>
          <div class="c-bundle-ingredients__description" v-html="item.description"></div>
          <div class="c-bundle-ingredients__meta">
            <div class="c-bundle-ingredients__meta-column c-bundle-ingredients__meta-column--carbs">
              <p class="c-bundle-ingredients__meta-heading">Net Carb Calculation</p>
              <div class="c-bundle-ingredients__meta-carb-row">
                <span class="c-bundle-ingredients__meta-carb-sign"></span>
                <span class="c-bundle-ingredients__meta-carb-value">{{ item.total_carbs }}</span>
                <span class="c-bundle-ingredients__meta-carb-title">Total Carbs</span>
              </div>
              <div class="c-bundle-ingredients__meta-carb-row" v-for="carbs in item.carb_details">
                <span class="c-bundle-ingredients__meta-carb-sign">-</span>
                <span class="c-bundle-ingredients__meta-carb-value">{{ carbs.split(',')[0] }}</span>
                <span class="c-bundle-ingredients__meta-carb-title">{{ carbs.split(',')[1] }}</span>
              </div>
              <div class="c-bundle-ingredients__meta-carb-row">
                <span class="c-bundle-ingredients__meta-carb-sign">=</span>
                <span class="c-bundle-ingredients__meta-carb-value">{{ item.net_carbs }}</span>
                <span class="c-bundle-ingredients__meta-carb-title">Net Carbs</span>
              </div>
            </div>
            <div class="c-bundle-ingredients__meta-column c-bundle-ingredients__meta-column--nutrition">
              <img :srcset="`${item.nutrition_label}w_840 2x, ${item.nutrition_label}w_420 1x`" :src="`${item.nutrition_label}w_420`" alt="">
            </div>
            <div class="c-bundle-ingredients__meta-column c-bundle-ingredients__meta-column--ingredients">
              <p class="c-bundle-ingredients__meta-ingredients-heading">Ingredients:</p>
              <p class="c-bundle-ingredients__meta-ingredients-content">{{ item.ingredients }}</p>
            </div>
          </div>
        </div>
        <div class="u-hideMobileDown c-bundle-ingredients__desktop-button"><button class="c-button c-button--isDefault c-button--isPrimaryAlt u-hideMobileDown" type="button" @click="addProduct">Add To Box</button></div>
        <div class="c-bundle-ingredients__close-text-container"><button class="c-bundle-ingredients__close-text" type="button" @click="closeModal">View All Bars</button></div>
        <div class="u-hideTabletUp c-bundle-ingredients__mobile-button"><button class="c-button c-button--isDefault c-button--isSecondaryAlt" type="button" @click="addProduct">Add To Box</button></div>
      </div>
    </div>
  </div>
</template>

<script>
  import cOverlay from '@shared/components/core/cOverlay.vue'
  import cSvg from '@shared/components/core/cSvg.vue'
  import cCarousel from '@shared/components/core/cCarousel.vue'

  export default {
    props: {
      item: Object,
      show: Boolean
    },
    components: { cSvg, cOverlay, cCarousel },
    methods: {
      addProduct() {
        this.$emit('addProduct')
      },
      closeModal() {
        this.$emit('closeModal')
      }
    }
  }
</script>

<style lang="scss">
  .c-bundle-ingredients__overlay {
    z-index: 20;
  }

  .c-bundle-ingredients {
    @include shadow-base();
    background-color: $color-white;
    height: 100%;
    left: 0;
    overflow-y: auto;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20;

    @include media-tablet-up {
      border-radius: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      height: auto;
      left: 50%;
      max-height: 95vh;
      max-width: 95vw;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    @include media-desktop-up {
      max-width: 1240px;
      width: calc(100% - 200px);
    }
  }

  .c-bundle-ingredients__close-label {
    background-color: white;
    font-family: $font-heading;
    font-size: 16px;
    font-weight: 900;
    margin: 0;
    padding: 11px 20px;

    @include media-tablet-up {
      display: none;
    }
  }

  .c-bundle-ingredients__close-button {
    @include flex();
    background: none;
    border: 0 none;
    color: $color-secondary;
    position: absolute;
    padding: 0;
    right: 20px;
    top: 13px;

    @include media-tablet-up {
      top: 15px;
    }
  }
  
  .c-bundle-ingredients__images {
    position: relative; 

    div {
      height: 100%;
    }

    .tns-nav {
      bottom: 0;
      height: auto;
      position: absolute;
      width: 100%;
      z-index: 1;
    }
    
    .tns-nav button {
      background-color: $color-white;

      &.tns-nav-active {
        background-color: transparent;
        border-color: $color-white;
      }
    }
  }

  .c-bundle-ingredients__images-controls {
    height: 0 !important;

    .c-slider__control {
      border-color: $color-white;
      color: $color-white;

      .c-svg {
        width: 12px;
      }

      &--prev {
        left: 27px;

        svg {
          transform: rotate(90deg);
        }
      }

      &--next {
        right: 27px;

        svg {
          transform: rotate(-90deg);
        }
      }
    }
  }

  .c-bundle-ingredients__image {
    height: 510px !important;
    width: 100%;

    @include media-tablet-up {
      height: 100% !important;
    }

    &.tns-fadeOut {
      z-index: 0;
    }

    img {
      height: 100%;
      left: 0;
      object-fit: cover;
      object-position: center;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }

  .c-bundle-ingredients__image-bg-alt {
    bottom: 50%;
    height: 100%;
    position: absolute;
    transform: skewY(-10deg);
    width: 100%;
  }

  .c-bundle-ingredients__details {
    padding-bottom: 100px;

    @include media-tablet-up {
      overflow-y: auto;
      padding: 40px 60px 20px;
    }
  }

  .c-bundle-ingredients__detail {
    padding: 0 20px;

    @include media-tablet-up {
      padding: 0;
    }
  }

  .c-bundle-ingredients__heading {
    margin: 30px 0;
    text-align: center;

    @include media-tablet-up {
      margin: 0 0 20px;
    }
  }

  .c-bundle-ingredients__description {
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
  }

  .c-bundle-ingredients__meta {
    @include media-desktop-up {
      display: grid;
      border: 1px solid $color-border;
      border-radius: 20px;
      grid-template-columns: 1fr 1fr;
      padding-bottom: 28px;
    }
  }

  .c-bundle-ingredients__meta-column {
    @include flex($direction: column, $wrap: nowrap);
    border-top: 1px solid $color-border;
    padding: 20px 0;

    @include media-desktop-up {
      border: 0 none;
    }

    &--carbs {
      @include media-desktop-up {
        border-right: 1px solid $color-border;
        order: 1;
        padding: 0 20px 0 12px;
      }
    }

    &--nutrition {
      @include media-desktop-up {
        grid-column: 1 / span 2;
        order: 0;
        padding: 26px 40px 15px;
      }
    }

    &--ingredients {
      align-items: flex-start;

      @include media-tablet-down {
        padding-bottom: 0;
      }

      @include media-desktop-up {
        order: 2;
        padding: 0 12px 0 20px;
      }
    }
  }

  .c-bundle-ingredients__meta-heading {
    font-size: 18px;
    font-weight: 700;
    margin-top: 0;
    text-align: center;
  }

  .c-bundle-ingredients__meta-carb-row {
    display: grid;
    font-size: 18px;
    grid-template-columns: 15px 50px 1fr;
    width: 200px;

    &:last-child {
      border-top: 1px solid $color-border;
      margin-top: 5px;
      padding-top: 5px;
    }
  }

  .c-bundle-ingredients__meta-carb-value {
    font-weight: 700;
    text-align: right;
  }

  .c-bundle-ingredients__meta-carb-title {
    padding-left: 20px;
  }

  .c-bundle-ingredients__meta-ingredients-heading {
    font-size: 14px;
    font-weight: 700;
    margin: 0;

    @include media-tablet-up {
      font-size: 18px;
      margin-bottom: 18px;
    }
  }

  .c-bundle-ingredients__meta-ingredients-content {
    font-size: 13px;
    margin: 0;
  }
  
  .c-bundle-ingredients__mobile-button {
    @include shadow-small-reverse();
    background-color: $color-white;
    bottom: 0;
    padding: 20px;
    position: fixed;
    width: 100%;
    z-index: 1;

    .c-button {
      width: 100%;
    }
  }

  .c-bundle-ingredients__desktop-button {
    .c-button {
      display: flex;
      margin: 20px auto 10px;
      max-width: 388px;
      width: 100%;
    }
  }

  .c-bundle-ingredients__close-text-container {
    margin: 30px 0;
    text-align: center;

    @include media-tablet-up {
      margin: 0;
    }
  }

  .c-bundle-ingredients__close-text {
    appearance: none;
    background-color: transparent;
    border: 0 none;
    color: $color-secondary;
    font-weight: 700;
    font-size: 16px;
    text-decoration: underline;

    @include media-tablet-up {
      color: $color-primary;
    }
  }

</style>