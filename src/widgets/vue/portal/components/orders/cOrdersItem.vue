<template>
  <div :class="_buildModifiers('c-ordersItem', modifiers)"
    v-if="item && content"
  >
    <c-img class="c-ordersItem__image"
      :src="image"
    />
    <div class="c-ordersItem__details">
      <c-h class="c-ordersItem__title"
        v-if="item.productTitle"
        tag="h6"
        level="6"
        :text="item.productTitle"
        :modifiers="['isBolder']"
      />
      <c-p class="c-ordersItem__interval"
        v-if="interval"
        tag="p"
        level="3"
        :text="interval"
        :modifiers="['isBolder']"
      />
      <c-p class="c-ordersItem__variant"
        v-if="item.variantTitle"
        tag="p"
        level="3"
        :text="item.variantTitle.replace(/\//g, '•')"
        :modifiers="['isBolder']"
      />
      <c-p class="c-ordersItem__price"
        v-if="quantityPrice"
        tag="p"
        level="3"
        :text="quantityPrice"
        :modifiers="['isBolder']"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cImg from '@shared/components/core/cImg.vue'
import cH from '@shared/components/core/cH.vue'
import cP from '@shared/components/core/cP.vue'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    content: {
      type: Object,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cImg, cH, cP },
  computed: {
    ...mapGetters('customize', ['customizeShop']),
    product() {
      return this.$store.getters['products/productById'](this.item.productId)
    },
    image() {
      return this.product ? this.product.images[0] : false
    },
    alt() {
      return `${this.customizeShop.shop_name} ${this.item.productTitle}`
    },
    interval() {
      const { item, customizeShop, content } = this
      const { frequency, unit } = item
      const activeInterval = customizeShop.intervals.find(interval => {
        if(!frequency || !unit) return interval.frequency == 0
        else return interval.frequency == frequency
      })
      if(activeInterval) {
        let text = activeInterval.text
        if(frequency && unit && content.ships) text = `${content.ships} ${text}`
        return text
      }
    },
    price() {
      const currencySymbol = this.customizeShop.currency_symbol
      const price = this._formatMoney({ amount: this.item.price })
      return `${currencySymbol}${price}`
    },
    quantityPrice() {
      return `${this.item.quantity} x ${this.price}`
    }
  }
}
</script>

<style lang="scss">
  .c-ordersItem {
    @include flex($align: flex-start, $wrap: nowrap);
    @include box-card;
    padding: 20px;
  }
  .c-img.c-ordersItem__image {
    width: 86px;
    color: lighten($color-black, 10%);
  }
  .c-ordersItem__details {
    margin-left: 30px;
  }
  .c-ordersItem__title,
  .c-ordersItem__interval,
  .c-ordersItem__variant,
  .c-ordersItem__price {
    font-family: $font-body;
    margin-bottom: 0;
  }
  .c-ordersItem__title {
    font-size: 16px;
  }

</style>