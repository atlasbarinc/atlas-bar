<template>
  <div :class="_buildModifiers('c-shipmentsProduct', modifiers)"
    v-if="item && type"
  >
    <div class="c-shipmentsProduct__main">
      <c-img class="c-shipmentsProduct__image"
        :src="image"
      />
      <div class="c-shipmentsProduct__details">
        <c-h class="c-shipmentsProduct__title"
          tag="h4"
          level="4"
          :text="item.productTitle"
          :modifiers="['isBolder']"
        />
        <c-p class="c-shipmentsProduct__interval"
          v-if="interval"
          tag="p"
          level="2"
          v-html="interval"
          :modifiers="['isBolder']"
        />
        <c-p class="c-shipmentsProduct__variant"
          v-if="item.variantTitle"
          tag="p"
          level="2"
          :text="item.variantTitle.replace(/\//g, '•')"
          :modifiers="['isBolder']"
        />
        <c-p class="c-shipmentsProduct__price"
          v-if="quantityPrice"
          tag="p"
          level="2"
          :text="quantityPrice"
          :modifiers="['isBolder']"
        />
      </div>
    </div>
    <div class="c-shipmentsProduct__actions">
      <div class="c-shipmentsProduct__action">
        <button class="c-shipmentsProduct__actionButton"
          v-if="content.product_button_edit"
          v-html="content.product_button_edit"
          @click="UI_SET_SIDEBAR({
            component: 'cSidebarEdit',
            content: sidebarContent.edit,
            settings: { 
              itemId: item.id,
              type: item.type,
              resource: item.isSubscription
                ? 'subscription'
                : 'onetime'
            }
          })"
        />
      </div>
      <div class="c-shipmentsProduct__action">
        <button class="c-shipmentsProduct__actionButton"
          v-if="content.product_button_schedule"
          v-html="content.product_button_schedule"
          @click="UI_SET_SIDEBAR({
            component: 'cSidebarSchedule',
            content: sidebarContent.schedule,
            settings: { 
              itemId: item.id,
              type: item.type,
              resource: item.isSubscription
                ? 'subscription'
                : 'onetime'
            }
          })"
        />
      </div>
      <div class="c-shipmentsProduct__action">
        <button class="c-shipmentsProduct__actionButton"
          v-if="content.product_button_delay"
          v-html="content.product_button_delay"
          @click="UI_SET_MODAL({
            component: 'cModalDelay',
            content: modalContent.delay,
            settings: { 
              itemId: item.id,
              type: item.type,
              resource: item.isSubscription
                ? 'subscription'
                : 'onetime'
            }
          })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import cImg from '@shared/components/core/cImg.vue'
import cH from '@shared/components/core/cH.vue'
import cP from '@shared/components/core/cP.vue'
import cButton from '@shared/components/core/cButton.vue'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    type: {
      type: String,
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
    cImg, cH, cP, cButton 
  },
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
        return `<span>Delivery:</span> ${text}`
      }
    },
    price() {
      const currencySymbol = this.customizeShop.currency_symbol
      const price = this._formatMoney({ amount: this.item.price })
      return `${currencySymbol}${price}`
    },
    quantityPrice() {
      return `${this.item.quantity} x ${this.price}`
    },
    sidebarContent() {
      const edit = this.$store.getters['customize/customizeSidebarByPrefix']('edit_')
      const schedule = this.$store.getters['customize/customizeSidebarByPrefix']('schedule_')
      return { edit, schedule }
    },
    modalContent() {
      const delay = this.$store.getters['customize/customizeModalByPrefix']('delay_')
      return { delay }
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_SET_SIDEBAR', 'UI_SET_MODAL'])
  }
}
</script>

<style lang="scss">
  .c-shipmentsProduct {
    @include box-card;
  }
  .c-shipmentsProduct__main {
    width: 100%;
    @include flex($justify: flex-start, $align: flex-start);
    margin-bottom: 20px;
    @include media-mobile-down {
      flex-direction: column;
      align-items: center;
    }
  }
  .c-img.c-shipmentsProduct__image {
    width: 150px;
    @include media-mobile-down {
      margin-bottom: 10px;
    }
  }
  .c-shipmentsProduct__details {
    padding-left: 50px;
    @include media-tablet-down {
      padding-left: 20px;
    }
    @include media-mobile-down {
      padding-left: 0;
      text-align: center;
    }
  }
  .c-shipmentsProduct__title {
    margin-bottom: 0;
    @include media-mobile-down {
      font-size: 24px;
    }
  }
  .c-shipmentsProduct__interval,
  .c-shipmentsProduct__variant,
  .c-shipmentsProduct__price {
    font-size: 20px;
    margin-bottom: 0;
    @include media-mobile-down {
      font-size: 17px;
    }
  }
  .c-shipmentsProduct__interval {
    span {
      font-weight: 500 !important;
    }
  }
  .c-shipmentsProduct__actions {
    @include flex($justify: center);
    margin: 0 -40px;
    @include media-tablet-down {
      margin: 0 -30px;
    }
    @include media-down(600px) {
      flex-direction: column;
    }
  }
  .c-shipmentsProduct__action {
    padding: 0 40px;
    position: relative;
    @include media-down(600px) {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    @include media-tablet-down {
      padding: 0 30px;
    }
    @include media-up(601px) {
      &:not(:first-child):before {
        content: '|';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #E5E5E5;
        font-size: 24px;
      }
    }
  }
  .c-shipmentsProduct__actionButton {
    @include button-unset;
    padding: 0 0 1px;
    border-bottom: 2px solid $color-primary;
    color: $color-primary;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    &:hover {
      border-color: transparent;
      cursor: pointer;
    }
  }
</style>