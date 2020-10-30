<template>
  <div :class="_buildModifiers('c-shipmentsGroups', modifiers)"
    v-if="address && content && shipments"
  >
    <div class="c-shipmentsGroups__group"
      v-for="(shipment, index) in shipments"
      :key="`shipment-${index}`"
    >
      <div class="c-shipmentsGroups__top">
        <div class="c-shipmentsGroups__charge">
          <c-h class="c-shipmentsGroups__chargeText"
            tag="h6"
            level="6"
            :text="chargeText(shipment)"
            :modifiers="['isBolder']"
          />
          <c-h class="c-shipmentsGroups__chargeDate"
            tag="h4"
            level="4"
            :text="_formatDate(shipment.date, 'MMM DD')"
            :modifiers="['isBolder']"
          />
        </div>
        <div class="c-shipmentsGroups__buttons">
          <c-button class="c-shipmentsGroups__button"
            v-if="content.box_button_add"
            :text="content.box_button_add"
            :modifiers="['isHollow', 'isPrimary']"
            @click="UI_SET_SIDEBAR({
              component: 'cSidebarProducts',
              content: sidebarContent.products,
              settings: {
                addressId: address.id
              }
            })"
          />
          <c-button class="c-shipmentsGroups__button"
            v-if="content.box_button_order"
            :text="content.box_button_order"
            :modifiers="['isDefault', 'isSecondary']"
            :attributes="{ disabled: orderDisabled(shipment) }"
            @click="UI_SET_MODAL({
              component: 'cModalOrder',
              content: modalContent.order,
              settings: {
                chargeId: shipment.charge.id
              }
            })"
          />
        </div>
      </div>
      <div class="c-shipmentsGroups__items">
        <div class="c-shipmentsGroups__itemWrapper"
          v-for="(subscription, index) in shipment.subscriptions"
          :key="`${subscription.id}-${index}`"
        >
          <c-shipmentsBundle class="c-shipmentsGroups__item"
            v-if="subscription.type == 'bundle'"
            :item="subscription"
            :count="subCount"
            type="subscription"
            :content="{
              bundle_tab_main: content.bundle_tab_main,
              bundle_tab_parts: content.bundle_tab_parts,
              bundle_button_schedule: content.bundle_button_schedule,
              bundle_button_delay: content.bundle_button_delay,
              bundle_button_remove: content.bundle_button_remove,
              bundle_button_edit: content.bundle_button_edit,
              bundle_upsell_link: content.bundle_upsell_link
            }"
          />
          <c-shipmentsProduct class="c-shipmentsGroups__item"
            v-if="subscription.type == 'product'"
            :item="subscription"
            :count="subCount"
            type="subscription"
            :content="{
              product_button_schedule: content.product_button_schedule,
              product_button_edit: content.product_button_edit,
              product_button_delay: content.product_button_delay
            }"
          />
        </div>
        <div class="c-shipmentsGroups__itemWrapper"
          v-for="(onetime, index) in shipment.onetimes"
          :key="`${onetime.id}-${index}`"
        >
          <c-shipmentsBundle class="c-shipmentsGroups__item"
            v-if="onetime.type == 'bundle'"
            :item="onetime"
            type="onetime"
            :content="{
              bundle_tab_main: content.bundle_tab_main,
              bundle_tab_parts: content.bundle_tab_parts,
              bundle_button_schedule: content.bundle_button_schedule,
              bundle_button_delay: content.bundle_button_delay,
              bundle_button_remove: content.bundle_button_remove,
              bundle_button_edit: content.bundle_button_edit,
              bundle_upsell_link: content.bundle_upsell_link
            }"
          />
          <c-shipmentsProduct class="c-shipmentsGroups__item"
            v-if="onetime.type == 'product'"
            :item="onetime"
            type="onetime"
            :content="{
              product_button_schedule: content.product_button_schedule,
              product_button_edit: content.product_button_edit,
              product_button_delay: content.product_button_delay
            }"
          />
        </div>
      </div>
      <div class="c-shipmentsGroups__bottom">
        <c-shipmentsDiscount class="c-shipmentsGroups__discount"
          :address="address"
          :shipment="shipment"
          :content="{
            placeholder: content.discount_placeholder,
            button_text: content.discount_button_text,
            button_success: content.discount_button_success
          }"
        />
        <c-shipmentsSummary class="c-shipmentsGroups__summary"
          :shipment="shipment"
          :content="{
            label_order: content.summary_label_order,
            label_subtotal: content.summary_label_subtotal,
            label_discount: content.summary_label_discount,
            label_tax: content.summary_label_tax,
            label_shipping: content.summary_label_shipping,
            label_total: content.summary_label_total
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapMutations } from 'vuex'
import { _buildShipments } from '@vue/portal/utils'

import cH from '@shared/components/core/cH.vue'
import cButton from '@shared/components/core/cButton.vue'
import cShipmentsProduct from './cShipmentsProduct.vue'
import cShipmentsBundle from './cShipmentsBundle.vue'
import cShipmentsDiscount from './cShipmentsDiscount.vue'
import cShipmentsSummary from './cShipmentsSummary.vue'

export default {
  props: {
    address: {
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
  components: { 
    cH, cButton,
    cShipmentsProduct, cShipmentsBundle, 
    cShipmentsDiscount, cShipmentsSummary
  },
  computed: {
    subscriptions() {
      return this.$store.getters['customer/customerSubscriptionsByAddress'](this.address)
    },
    onetimes() {
      return this.$store.getters['customer/customerOnetimesByAddress'](this.address)
    },
    shipments() {
      return _buildShipments({ address: this.address, subscriptions: this.subscriptions, onetimes: this.onetimes })
    },
    subCount() {
      let total = 0
      this.shipments.forEach(shipment => total += shipment.subscriptions.length)
      return total
    },
    sidebarContent() {
      const products = this.$store.getters['customize/customizeSidebarByPrefix']('products_')
      return { products }
    },
    modalContent() {
      const order = this.$store.getters['customize/customizeModalByPrefix']('order_')
      return { order }
    },
  },
  methods: {
    ...mapMutations('ui', ['UI_SET_SIDEBAR', 'UI_SET_MODAL']),
    chargeText(shipment) {
      const { box_charges_multi, box_charges_single } = this.content
      return shipment.count > 1 ? box_charges_multi : box_charges_single
    },
    orderDisabled(shipment) {
      return !dayjs().isBefore(shipment.date, 'day')
    }
  }
}
</script>

<style lang="scss">
  .c-shipmentsGroups__group {
    &:not(:last-child) { margin-bottom: 30px; }
    @include box-card;
  }
  .c-shipmentsGroups__top {
    @include flex($justify: space-between);
    margin-bottom: 20px;
    @include media-mobile-down {
      flex-direction: column;
      text-align: center;
    }
  }
  .c-shipmentsGroups__chargeText {
    margin-bottom: 0;
    font-size: 18px;
    display: inline-block;
  }
  .c-shipmentsGroups__chargeDate {
    color: $color-secondary;
    text-transform: uppercase;
    font-size: 28px;
    display: inline-block;
  }
  .c-shipmentsGroups__buttons {
    @include flex($wrap: nowrap);
    margin: 0 -5px;
    @include media-mobile-down {
      flex-direction: column;
      margin-top: 10px;
    }
  }
  .c-shipmentsGroups__button {
    font-size: 13px;
    margin: 0 5px;
    @include media-mobile-down {
      width: 220px;
      max-width: 100%;
      margin: 5px auto;
      &:first-child { order: 1; }
    }
  }
  .c-shipmentsGroups__item {
    margin-bottom: 30px;
  }
  .c-shipmentsGroups__bottom {
    @include flex($justify: space-between, $align: flex-start, $wrap: nowrap);
    @include media-mobile-down {
      flex-direction: column;
    }
  }
  .c-shipmentsGroups__discount,
  .c-shipmentsGroups__summary {
    width: calc(50% - 6px);
    min-height: 62px;
    @include flex ($justify: space-between);
    border-radius: 32px;
    border: 1px solid #E5E5E5;
    @include media-mobile-down {
      width: 100%;
      min-height: 60px;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
</style>