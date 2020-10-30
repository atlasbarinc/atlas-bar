<template>
  <div :class="_buildModifiers('c-shipmentsUpsell', modifiers)"
    v-if="content"
    ref="c-shipmentsUpsell"
  >
    <c-h class="c-sidebarUpsell__heading"
      v-if="content.heading"
      tag="h4"
      level="4"
      :modifiers="['isBolder']"
      :text="content.heading"
    />
    <div class="c-shipmentsUpsell__carouselWrapper">
      <c-carousel class="c-shipmentsUpsell__carousel"
        :id="id"
        :options="{
          controls: true,
          controlsContainer: `#${id}-controls`,
          nav: true,
          navContainer: `#${id}-nav`,
          gutter: 20,
          loop: false,
          responsive: {
            768: { items: 2, gutter: 40 },
            900: { items: 3, gutter: 45 },
            1200: { items: 4, gutter: 50 }
          }
        }"
      >
        <div class="c-shipmentsUpsell__slideWrapper"
          v-for="(product, index) in products"
          :key="`${product.id}-${index}`"
        >
          <div class="c-shipmentsUpsell__slide">
            <c-img class="c-shipmentsUpsell__slideImage"
              :src="product.images[0]"
              :widths="[200, 400]"
            />
            <div class="c-shipmentUpsell__slideReviews yotpo bottomLine yotpo-small" 
              :data-appkey="yotpo.appKey" 
              data-domain="https://atlasbars-dev.myshopify.com/" 
              :data-product-id="product.id"
            />
            <c-h class="c-shipmentsUpsell__slideTitle"
              tag="h4"
              level="4"
              :modifiers="['isBolder']"
              :text="product.title"
            />
            <div class="c-shipmentsUpsell__slidePrice"
              v-html="`${currencySymbol}${_formatMoney({ amount: product.defaultPrice })}`"
            />
            <c-button class="c-shipmentsUpsell__slideButton u-fullWidth"
              v-if="content.button"
              :text="content.button"
              :modifiers="['isHollow', 'isSecondary']"
              :data-product-id="product.id"
            />
          </div>
        </div>
      </c-carousel>
      <div :id="`${id}-controls`" class="c-shipmentsUpsell__controls u-hideMobileDown">
        <button class="c-shipmentsUpsell__control">
          <c-svg class="c-shipmentsUpsell__controlIcon"
            name="chevron"
          />
        </button>
        <button class="c-shipmentsUpsell__control">
          <c-svg class="c-shipmentsUpsell__controlIcon"
            name="chevron"
          />
        </button>
      </div>
      <div :id="`${id}-nav`" class="c-shipmentsUpsell__nav u-hideTabletUp">
        <button class="c-shipmentsUpsell__navItem"
          v-for="(product, index) in products"
          :key="`${product.id}-${index}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import hyperid from 'hyperid'
import { mapMutations } from 'vuex'

import cH from '@shared/components/core/cH.vue'
import cCarousel from '@shared/components/core/cCarousel.vue'
import cSvg from '@shared/components/core/cSvg.vue'
import cImg from '@shared/components/core/cImg.vue'
import cButton from '@shared/components/core/cButton.vue'

export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({ yotpo: false }),
  components: {
    cH, cCarousel, cSvg, cImg, cButton
  },
  computed: {
    id() {
      return `carousel-${hyperid({ urlSafe: true })()}`
    },
    products() {
      const { collection } = this.content
      if(collection) {
        return this.$store.getters['products/productsByIds'](collection)
      }
    },
    currencySymbol() {
      return this.$store.getters['customize/customizeShopByKey']('currency_symbol')
    },
    sidebarContent() {
      const add = this.$store.getters['customize/customizeSidebarByPrefix']('add_')
      return { add }
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_SET_SIDEBAR']),
    setYotpo() {
      const yotpoInterval = setInterval(() => {
        const { yotpo, Yotpo } = window
        if(yotpo && Yotpo) {
          this.yotpo = new Yotpo.API(yotpo)
          yotpo.refreshWidgets()
          clearInterval(yotpoInterval)
        }
      }, 250)
    },
    setClicks() {
      const cShipmentsUpsell = this.$refs['c-shipmentsUpsell']
      if(cShipmentsUpsell) {
        const buttons = cShipmentsUpsell.querySelectorAll('.c-shipmentsUpsell__slideButton')
        buttons.forEach(button => button.addEventListener('click', () => {
          const productId = button.dataset.productId
          this.UI_SET_SIDEBAR({
            component: 'cSidebarAdd',
            content: this.sidebarContent.add,
            settings: { productId }
          })
        }))
      }
    }
  },
  mounted() {
    this.setYotpo()
    this.setClicks()
  }
}
</script>

<style lang="scss">
  .c-shipmentsUpsell {
    max-width: 1200px;
    padding: 0 80px;
    @include media-mobile-down {
      padding: 0;
    }
  }
  .c-sidebarUpsell__heading {
    margin-bottom: 30px;
  }
  .c-shipmentsUpsell__carouselWrapper {
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
  .c-shipmentsUpsell__carousel {
    position: relative;
    overflow: hidden;
    @include media-mobile-down {
      margin: 0 auto;
      width: calc(100vw - 120px);
      overflow: visible;
    }
  }
  .c-shipmentsUpsell__slideWrapper {
    display: flex !important;
  }
  .c-shipmentsUpsell__slide {
    @include box-card;
    border: none;
  }
  .c-shipmentsUpsell__slideImage {
    margin-bottom: 10px;
  }
  .c-shipmentUpsell__slideReviews {
    pointer-events: none;
    margin: 0 auto 10px;
    .yotpo-bottomline { 
      float: unset;
    }
    .yotpo-stars { margin: auto; }
    .yotpo-icon-star {
      color: $color-secondary;
      font-size: 20px;
    }
    .text-m { display: none };
  }
  .c-shipmentsUpsell__slideTitle,
  .c-shipmentsUpsell__slidePrice {
    text-align: center;
    font-family: $font-heading;
    font-size: 16px;
    margin-bottom: 5px;
  }
  .c-shipmentsUpsell__slideButton {
    margin-top: 14px;
    padding: 14px 0;
    border-width: 2px;
    font-size: 15px;
  }
  .c-shipmentsUpsell__controls {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 160px);
    @include flex($justify: space-between);
    z-index: 1;
    pointer-events: none;
  }
  .c-shipmentsUpsell__control {
    @include button-unset;
    min-width: 35px;
    width: 35px;
    height: 35px;
    border: 2px solid $color-primary;
    border-radius: 50%;
    @include flex($justify: center);
    @include hover-fade;
    pointer-events: auto;
  }
  .c-shipmentsUpsell__controlIcon {
    width: 12px;
    height: auto;
    position: relative;
    color: $color-primary;
    transform-origin: 50%;
    .c-shipmentsUpsell__control:first-child & { 
      transform: rotate(90deg); 
      left: -1px;
    }
    .c-shipmentsUpsell__control:last-child & { 
      transform: rotate(270deg);
      left: 1px; 
    }
  }
  .c-shipmentsUpsell__nav {
    width: 100%;
    margin-top: 40px;
    @include flex($justify: center);
  }
  .c-shipmentsUpsell__navItem {
    @include button-unset;
    width: 10px;
    height: 10px;
    margin: 0 8px;
    border-radius: 50%;
    border: 2px solid transparent;
    background-color: $color-secondary;
    @include hover-fade;
    &.tns-nav-active {
      pointer-events: none;
      background-color: transparent;
      border-color: $color-secondary;
    }

  }

</style>