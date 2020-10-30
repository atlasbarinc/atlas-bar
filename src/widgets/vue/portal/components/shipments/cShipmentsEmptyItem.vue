<template>
  <button :class="_buildModifiers('c-shipmentsEmptyItem', modifiers)"
    v-if="item && content"
    @click="handleUpdate"
  >
    <div class="c-shipmentsEmptyItem__main">
      <c-radio class="c-shipmentsEmptyItem__radio"
        ref="radio"
        :uncheck="true"
        :active="isActive ? item.id : ''"
        :modifiers="['isBlack', 'hideText']"
        :attributes="{
          name: item.id,
          value: item.id
        }"
      />
      <c-img class="c-shipmentsEmptyItem__image"
        :src="image"
      />
      <div class="c-shipmentsEmptyItem__details">
        <span class="c-shipmentsEmptyItem__interval u-block"
          v-if="interval"
          v-html="interval"
        />
        <span class="c-shipmentsEmptyItem__title u-block"
          v-if="item.productTitle"
          v-html="item.productTitle"
        />
        <span class="c-shipmentsEmptyItem__variant u-block"
          v-if="_stringEmpty(item.variantTitle)"
          v-html="item.variantTitle"
        />
        <span class="c-shipmentsEmptyItem__price u-block"
          v-if="quantityPrice"
          v-html="quantityPrice"
        />
      </div>
    </div>
    <div class="c-shipmentsEmptyItem__parts"
      v-if="parts"
    >
      <div class="c-shipmentsEmptyItem__part"
        v-for="part in parts"
        :key="part.id"
      >
        <span class="c-shipmentsEmptyItem__partCount"
          v-html="`${part.quantity}x`"
        />
        <span class="c-shipmentsEmptyItem__partTitle"
          v-html="part.productTitle"
        />
      </div>
    </div>
  </button>
</template>

<script>
import { mapGetters } from 'vuex'
import cRadio from '@shared/components/core/cRadio.vue'
import cImg from '@shared/components/core/cImg.vue'
import cH from '@shared/components/core/cH.vue'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    activeIds: {
      type: Array,
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
  components: {
    cRadio, cImg, cH
  },
  computed: {
    ...mapGetters('customize', ['customizeShop']),
    isActive() {
      return this.activeIds.includes(this.item.id)
    },
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
      const { item, content, customizeShop } = this
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
    quantityPrice() {
      const { item, customizeShop, _formatMoney } = this
      const currencySymbol = customizeShop.currency_symbol
      const price = `${currencySymbol}${_formatMoney({ amount: item.price })}`
      return `${item.quantity} x ${price}`
    },
    parts() {
      const bundleProperty = this.item.properties.find(property => property.name === 'bundle_id')
      if(bundleProperty) {
        return this.$store.getters['customer/customerSubscriptionsByBundle'](bundleProperty.value)
      }
    },
    itemIds() {
      let ids = [ this.item.id ]
      if(this.parts) ids = [ ...ids, ...this.parts.map(part => part.id) ]
      return ids
    }
  },
  methods: {
    handleUpdate(val) {
      if(this.isActive) this.$emit('update', { ids: this.itemIds, action: 'remove' })
      else this.$emit('update', { ids: this.itemIds, action: 'add' })
    }
  }
}
</script>

<style lang="scss">
  .c-shipmentsEmptyItem {
    @include button-unset;
    width: 100%;
    margin-bottom: 10px;
    @include hover-fade($opacity: .75);
  }
  .c-shipmentsEmptyItem__main {
    @include flex($align: flex-start, $wrap: nowrap);
  }
  .c-shipmentsEmptyItem__radio {
    width: auto;
    position: relative;
    top: 35px;
    transform: translateY(-50%);
    margin-right: 20px;
  }
  .c-img.c-shipmentsEmptyItem__image {
    width: 70px;
    color: lighten($color-black, 10%);
    border-radius: 3px;
  }
  .c-shipmentsEmptyItem__details {
    padding-left: 15px;
    @include media-tablet-up {
      padding-left: 20px;
    }
  }
  .c-shipmentsEmptyItem__interval,
  .c-shipmentsEmptyItem__title,
  .c-shipmentsEmptyItem__variant,
  .c-shipmentsEmptyItem__quantity,
  .c-shipmentsEmptyItem__price {
    margin-bottom: 0;
    line-height: 1.25;
    text-transform: capitalize;
  }
  .c-shipmentsEmptyItem__interval,
  .c-shipmentsEmptyItem__variant {
    font-family: $font-heading;
    font-weight: 500;
    font-size: 16px;
    text-transform: capitalize;
  }
  .c-shipmentsEmptyItem__title {
    margin: 4px 0 6px;
    font-family: $font-heading;
    font-size: 18px;
    font-weight: 900;
  }
  .c-shipmentsEmptyItem__price {
    font-family: $font-body;
    font-size: 20px;
    font-weight: 600;
  }
  .c-shipmentsEmptyItem__parts {
    @include grid($columns: 1fr, $auto-flow: row, $gap: 0 24px);
    @include media-tablet-up {
      grid-template-columns: 1fr 1fr;
    }
    margin-top: 30px;
  }
  .c-shipmentsEmptyItem__partCount,
  .c-shipmentsEmptyItem__partTitle {
    font-family: $font-heading;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    opacity: .6;
  }
  .c-shipmentsEmptyItem__partCount {
    font-weight: 800;
    padding-right: 4px;
  }
</style>