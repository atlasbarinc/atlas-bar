<template>
  <div :class="_buildModifiers('c-sidebarProducts', modifiers)"
    v-if="content && products"
  >
    <div class="c-sidebarProducts__list">
      <div class="c-sidebarProducts__item"
        v-for="(product, index) in products"
        :key="`${product.id}-${index}`"
      >
        <c-img class="c-sidebarProducts__itemImage"
          :src="product.images[0]"
          :widths="[50, 150, 200]"
        />
        <div class="c-shipmentUpsell__itemReviews yotpo bottomLine yotpo-small" 
          :data-appkey="yotpo.appKey" 
          data-domain="https://atlasbars-dev.myshopify.com/" 
          :data-product-id="product.id"
        />
        <c-h class="c-sidebarProducts__itemTitle"
          tag="h4"
          level="4"
          :modifiers="['isBolder']"
          :text="product.title"
        />
        <div class="c-sidebarProducts__itemPrice"
          v-html="`${currencySymbol}${_formatMoney({ amount: product.defaultPrice })}`"
        />
        <c-button class="c-sidebarProducts__itemButton u-fullWidth"
          v-if="content.products_button_view"
          :text="content.products_button_view"
          :modifiers="['isHollow', 'isSecondary']"
          @click="UI_SET_SIDEBAR({
            component: 'cSidebarAdd',
            content: { ...sidebarContent.add,
              add_back: sidebarContent.add.add_back_products
            },
            settings: {
              productId: product.id,
              addressId: settings.addressId,
              backAction: () => UI_SET_SIDEBAR({
                component: 'cSidebarProducts',
                content,
                settings: {
                  addressId: settings.addressId
                }
              })
            }
          })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import cH from '@shared/components/core/cH.vue'
import cImg from '@shared/components/core/cImg.vue'
import cButton from '@shared/components/core/cButton.vue'

export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    cImg, cH, cButton
  },
  data: () => ({ yotpo: false }),
  computed: {
    products() {
      const { products_collection } = this.content
      if(products_collection) {
        return this.$store.getters['products/productsByIds'](products_collection)
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
    }
  },
  mounted() {
    this.setYotpo()
  }
}
</script>

<style lang="scss">
  .c-sidebarProducts__list {
    @include flex($justify: flex-start, $align: stretch);
    margin: 0 -10px;
    @include media-xs {
      flex-direction: column;
      justify-content: flex-start;
      align-content: center;
    }
  }
  .c-sidebarProducts__item {
    @include box-card;
    @include flex($direction: column, $justify: space-between);
    border: none;
    width: 100%;
    margin: 10px 10px;
    @include media-xs {
      margin: 10px auto;
    }
    @include media-mobile-down {
      max-width: 220px;
    }
    @include media-tablet-up {
       width: calc((100% / 2) - 20px);
    }
    @include media-up(900px) {
       width: calc((100% / 3) - 20px);
    }
    @include media-desktop-up {
      width: calc((100% / 4) - 20px);
    }
  }
  .c-sidebarProducts__itemImage {
    margin-bottom: 10px;
  }
  .c-shipmentUpsell__itemReviews {
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
  .c-sidebarProducts__itemTitle,
  .c-sidebarProducts__itemPrice {
    text-align: center;
    font-family: $font-heading;
    font-size: 16px;
    margin-bottom: 5px;
  }
  .c-sidebarProducts__itemButton {
    margin-top: 14px;
    padding: 14px 0;
    border-width: 2px;
    font-size: 15px;
  }
</style>