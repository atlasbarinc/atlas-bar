<template>
  <c-accordion :class="_buildModifiers('c-ordersAccordion', modifiers)"
    v-if="content"
  >
    <c-accordionItem class="c-ordersAccordion__item"
      v-for="(order, index) in orderList"
      :key="`${order.number}-${index}`"
      :open="open === index"
    >
      <div class="c-ordersAccordion__trigger" slot="trigger">
        <div class="c-ordersAccordion__triggerTop">
          <div class="c-ordersAccordion__triggerDetails">
            <c-h class="c-ordersAccordion__detailsDate"
              v-if="order.processedAt"
              tag="time"
              level="6"
              :text="_formatDate(order.processedAt, 'MMM D, YYYY')"
              :modifiers="['isBolder']"
            />
            <span class="c-ordersAccordion__detailsInfo"
              v-html="buildInfo(order)"
            />
          </div>
          <div :class="_buildModifiers('c-ordersAccordion__triggerInfo', 
            infoModifiers(order))"
          >
            <c-h class="c-ordersAccordion__infoStatus"
              tag="h6"
              level="6"
              :text="content[order.shippingStatus]"
              :modifiers="['isSeven']"
            >
              <c-svg class="c-ordersAccordion__infoIcon"
                v-if="infoIcon(order)"
                slot="before"
                :name="infoIcon(order)"
              />
            </c-h>
            <c-a class="c-ordersAccordion__infoTrack"
              v-if="order.shippingStatus === 'transit' && order.trackingUrl"
              :attributes="{ target: '_blank' }"
              :url="order.trackingUrl"
              :text="content.track"
              :modifiers="['isUnderline']"
            />
          </div>
        </div>
        <div class="c-ordersAccordion__triggerBottom">  
          <c-h class="c-ordersAccordion__triggerAddress"
            tag="address"
            level="6"
            v-html="_buildAddress({
              address: order.shippingAddress,
              options: {
                hiddenFields: ['name', 'country'],
                provinceName: 'short',
                flatten: true 
              }
            })"
          />
          <div class="c-ordersAccordion__triggerCircle">
            <c-svg class="c-ordersAccordion__triggerIcon"
              name="chevron"
            />
          </div>
        </div>
      </div>
      <div class="c-ordersAccordion__content" slot="content">
        <div class="c-ordersAccordion__grid">
          <c-ordersItem class="c-ordersAccordion__gridItem"
            v-for="(item, index) in order.lineItems"
            :key="`item-${index}`"
            :item="item"
            :content="{ ships: content.ships }"
          />
        </div>
        <div class="c-ordersAccordion__contentBottom">
          <div class="c-ordersAccordion__billing">
            <div class="c-ordersAccordion__billingInfo">
              <c-h class="c-ordersAccordion__billingHeading"
                v-if="content.billing"
                tag="h6"
                level="6"
                :text="content.billing"
                :modifiers="['isSeven']"
              />
              <c-p class="c-ordersAccordion__billingStatus"
                tag="p"
                level="3"
                :text="billingStatus(order)"
                :modifiers="['isBolder']"
              />
            </div>
            <c-p class="c-ordersAccordion__billingAddress"
              tag="address"
              level="3"
              v-html="_buildAddress({
                address: order.shippingAddress,
                options: {
                  hiddenFields: ['name', 'country'],
                  provinceName: 'short'
                }
              })"
              :modifiers="['isBolder']"
            />
          </div>
          <div class="c-ordersAccordion__summary">
            <div class="c-ordersAccordion__summaryLine"
              v-for="line in summaryLines(order)"
              :key="line.key"
              :class="line.key === 'total' 
                ? 'c-ordersAccordion__summaryLine--isTotal' : ''
              "
            >
              <span class="c-ordersAccordion__summaryLabel"
                v-html="content[line.key]"
              />
              <span class="c-ordersAccordion__summaryValue"
                v-html="line.key === 'discount'
                  ? `- ${currencySymbol}${line.value}`
                  : `${currencySymbol}${line.value}`
                "
              />
            </div>
          </div>
        </div>
      </div>
    </c-accordionItem>
  </c-accordion>
</template>

<script>
import { mapGetters } from 'vuex'
import cAccordion from '@shared/components/core/cAccordion.vue'
import cAccordionItem from '@shared/components/core/cAccordionItem.vue'
import cH from '@shared/components/core/cH.vue'
import cP from '@shared/components/core/cP.vue'
import cSvg from '@shared/components/core/cSvg.vue'
import cOrdersItem from './cOrdersItem.vue'

export default {
  props: {
    orders: {
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
    },
    open: {
      type: [Number, Boolean],
      default: false
    }
  },
  components: { 
    cAccordion, cAccordionItem, cH, cP, cSvg,
    cOrdersItem 
  },
  computed: {
    currencySymbol() {
      return this.$store.getters['customize/customizeShopByKey']('currency_symbol')
    },
    orderList() {
      return this.orders.map(order => {
        const lineItems = order.lineItems.filter(lineItem => {
          return !lineItem.properties.find(property => {
            return property.name === 'bundle_type' && property.value === 'child'
          })
        })
        return { ...order, lineItems }
      })
    }
  },
  methods: {
    buildInfo(order) {
      const { currencySymbol, content, _formatMoney } = this
      const total = _formatMoney({ amount: order.total })
      let info = `${currencySymbol}${total} | ${content.name} #${order.number}`
      return info
    },
    delivered(order) {
      return this.shippingStatus !== 'delivered'
    },
    infoModifiers(order) {
      let modifiers = []
      const { shippingStatus } = order
      if(shippingStatus === 'processing') modifiers.push('isProcessing')
      if(shippingStatus === 'transit') modifiers.push('isTransit')
      if(shippingStatus === 'delivered') modifiers.push('isDelivered')
      return modifiers
    },
    infoIcon(order) {
      const { shippingStatus } = order
      if(shippingStatus === 'delivered') return 'check'
    },
    billingStatus(order) {
      let text = `${this.content.payment}: `
      const status = this.content[order.billingStatus]
      text += status ? status : ''
      return text
    },
    summaryLines(order) {
      return this._buildSummary({ item: order })
    }
  }
}
</script>

<style lang="scss">
  .c-ordersAccordion__item {
    @include box-card;
    padding: 0 !important;
    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }
  .c-ordersAccordion__trigger {
    padding: 25px;
    @include media-tablet-up {
      @include flex($justify: flex-start, $wrap: nowrap);
    }
    @include media-mobile-down {
      padding: 15px;
    }
  }
  .c-ordersAccordion__triggerTop,
  .c-ordersAccordion__triggerBottom {
    @include flex($justify: space-between, $align: flex-start, $wrap: nowrap);
    width: 100%;
    @include media-tablet-up {
      width: auto;
      align-items: center;
    }
  }
  .c-ordersAccordion__triggerBottom {
    flex-grow: 1;
  }
  .c-ordersAccordion__detailsDate {
    line-height: 1;
    margin-bottom: 10px;
    white-space: nowrap;
  }
  .c-ordersAccordion__detailsInfo {
    display: block;
    @include text-heading;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 30px;
    white-space: nowrap;
    @include media-tablet-up {
      margin-bottom: 0;
    }
  }
  .c-ordersAccordion__triggerInfo {
    margin-left: 20px;
    @include media-tablet-up {
      margin-left: 50px;
    }
    @include media-desktop-up {
      margin-left: 70px;
    }
  }
  .c-ordersAccordion__infoStatus {
    margin-bottom: 0 !important;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;
    .c-ordersAccordion__triggerInfo--isDelivered & {
      color: $color-secondary;
    }
  }
  .c-ordersAccordion__infoIcon {
    width: 16px;
    margin-right: 5px;
  }
  .c-ordersAccordion__infoTrack {
    display: block;
    margin-top: 6px;
    font-size: 14px;
    font-weight: 500;
    text-transform: capitalize;
  }
  .c-ordersAccordion__triggerAddress {
    width: 220px;
    max-width: calc(100% - 100px);
    font-weight: 800;
    margin-bottom: 0 !important;
    @include media-mobile-down {
      font-size: 18px;
    }
    @include media-tablet-up {
      width: auto;
      max-width: none;
      margin-left: 50px;
      font-weight: 800;
    }
    @include media-up(900px) {
      margin-left: 70px;
    }
  }
  .c-ordersAccordion__triggerCircle {
    min-width: 40px;
    width: 40px;
    height: 40px;
    border: 2px solid $color-primary;
    border-radius: 50%;
    @include flex($justify: center);
    margin-left: 20px;
  }
  .c-ordersAccordion__triggerIcon {
    color: $color-primary;
    width: 12px;
    height: auto;
    transition: transform .35s ease-in-out;
    transform-origin: 50%;
    .c-accordionItem__trigger--isOpen & {
      transform: rotate(180deg);
    }
  }
  .c-ordersAccordion__content {
    padding: 10px 25px 25px;
    @include media-mobile-down {
      padding: 10px 15px 15px;
    }
  }
  .c-ordersAccordion__grid { 
    @include grid($columns: 1fr, $auto-flow: row, $gap: 30px 20px);
    margin-bottom: 30px;
    @include media-tablet-up {
      grid-template-columns: 1fr 1fr;
    }
    @include media-desktop-up {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  .c-ordersAccordion__gridItem {
    width: 100%;
  }
  .c-ordersAccordion__contentBottom {
    @include flex($direction: column, $align: flex-start);
    @include box-card;
    padding: 20px;
    @include media-tablet-up {
      @include flex($justify: space-between, $wrap: nowrap);
    }
  }
  .c-ordersAccordion__billing {
    @include flex($direction: column, $align: flex-start);
    margin-bottom: 50px;
    @include media-tablet-up {
      @include flex($wrap: nowrap);
      margin-bottom: 0;
    }
  }
  .c-ordersAccordion__billingHeading {
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .c-ordersAccordion__billingStatus {
    margin-bottom: 30px;
    line-height: 1;
    text-transform: uppercase;
    @include media-tablet-up {
      margin-bottom: 0;
    }
  }
  .c-ordersAccordion__billingAddress {
    line-height: 1.5;
    margin-bottom: 0;
    @include media-tablet-up {
      margin-left: 40px;
    }
    @include media-up(900px) {
      margin-left: 80px;
    }
  }
  .c-ordersAccordion__summary {
    width: 100%;
    @include flex($justify: space-between);
    @include media-tablet-up {
      width: 200px;
    }
  }
  .c-ordersAccordion__summaryLine {
    width: 100%;
    @include flex($justify: space-between);
    margin-bottom: 5px;
    font-family: $font-body;
    font-size: 16px;
    font-weight: 600;
  }
  .c-ordersAccordion__summaryLabel,
  .c-ordersAccordion__summaryValue {
    .c-ordersAccordion__summaryLine--isTotal & {
      margin-top: 5px;
      font-family: $font-heading;
      font-size: 16px;
      font-weight: 900;
      text-transform: uppercase;
    }
  }
</style>