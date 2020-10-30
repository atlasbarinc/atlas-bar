<template>
  <c-accordion :class="_buildModifiers('c-shipmentsAccordion', modifiers)"
    v-if="content"
  >
    <c-accordionItem class="c-shipmentsAccordion__item"
      v-for="(address, index) in addressList"
      :key="`${address.id}-${index}`"
      :open="open === index"
    >
      <div class="c-shipmentsAccordion__trigger" slot="trigger">
        <div class="c-shipmentsAccordion__triggerMain">
          <c-h class="c-shipmentsAccordion__triggerCount"
            tag="h6"
            level="6"
            :modifiers="['isEyebrow']"
            :text="countText(address.count)"
          />
          <c-h class="c-shipmentsAccordion__triggerShipping"
            v-if="content.box_ships"
            tag="h4"
            level="4"
            :modifiers="['isBolder']"
            :text="content.box_ships"
          >
            <span class="c-shipmentsAccordion__triggerAddress"
              v-html="address.address1"
            />
          </c-h>
          <c-button class="c-shipmentsAccordion__triggerButton u-hideMobileDown"
             v-if="content.box_edit_shipping"
            :text="content.box_edit_shipping"
            :modifiers="['isUnderline', 'isPrimary']"
            @click.native.stop="UI_SET_SIDEBAR({ 
              component: 'cSidebarShipping',
              content: sidebarContent.shipping,
              settings: { addressId: address.id }
            })"
          />
        </div>
        <div class="c-ordersAccordion__triggerCircle">
          <c-svg class="c-ordersAccordion__triggerIcon"
            name="chevron"
          />
        </div>
      </div>
      <div class="c-shipmentsAccordion__content" slot="content">
        <c-button class="c-shipmentsAccordion__contentAddress u-hideTabletUp"
          v-if="content.box_edit_shipping"
          :text="content.box_edit_shipping"
          :modifiers="['isUnderline', 'isPrimary']"
          @click.native.stop="UI_SET_SIDEBAR({ 
            component: 'cSidebarShipping',
            content: sidebarContent.shipping,
            settings: { addressId: address.id }
          })"
        />
        <c-shipmentsGroups class="c-shipmentsAccordion__groups"
          v-if="address.count > 0"
          :address="address"
          :content="{
            box_charges_single: content.box_charges_single,
            box_charges_multi: content.box_charges_multi,
            box_button_add: content.box_button_add,
            box_button_order: content.box_button_order,

            bundle_tab_main: content.bundle_tab_main,
            bundle_tab_parts: content.bundle_tab_parts,
            bundle_button_schedule: content.bundle_button_schedule,
            bundle_button_delay: content.bundle_button_delay,
            bundle_button_remove: content.bundle_button_remove,
            bundle_button_edit: content.bundle_button_edit,
            bundle_upsell_link: content.bundle_upsell_link,

            product_button_schedule: content.product_button_schedule,
            product_button_edit: content.product_button_edit,
            product_button_delay: content.product_button_delay,
            discount_placeholder: content.discount_placeholder,
            discount_button_text: content.discount_button_text,
            discount_button_success: content.discount_button_success,
            summary_label_order: content.summary_label_order,
            summary_label_subtotal: content.summary_label_subtotal,
            summary_label_discount: content.summary_label_discount,
            summary_label_tax: content.summary_label_tax,
            summary_label_shipping: content.summary_label_shipping,
            summary_label_total: content.summary_label_total
          }"
        />
        <c-shipmentsEmpty classs="c-shipmentsAccordion__empty"
          v-else
          :address="address"
          :content="{
            empty_heading_products: content.empty_heading_products,
            empty_text_ships: content.empty_text_ships,
            empty_button_reactivate: content.empty_button_reactivate,
            empty_button_add: content.empty_button_add,
            empty_text_disclaimer: content.empty_text_disclaimer
          }"
        />
      </div>
    </c-accordionItem>
  </c-accordion>
</template>

<script>
import { mapMutations } from 'vuex'
import { _filterItemsByStatus, _filterBundleParts } from '@vue/portal/utils'

import cAccordion from '@shared/components/core/cAccordion.vue'
import cAccordionItem from '@shared/components/core/cAccordionItem.vue'
import cH from '@shared/components/core/cH.vue'
import cButton from '@shared/components/core/cButton.vue'
import cSvg from '@shared/components/core/cSvg.vue'
import cShipmentsGroups from './cShipmentsGroups.vue'
import cShipmentsEmpty from './cShipmentsEmpty.vue'

export default {
  props: {
    addresses: {
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
    cAccordion, cAccordionItem, cH, cButton, cSvg,
    cShipmentsGroups, cShipmentsEmpty
  },
  computed: {
    addressList() {
      return this.addresses.map(address => {
        const charges = this.$store.getters['customer/customerChargesByAddress'](address)
        const addressItems = this.$store.getters['customer/customerAddressItems'](address)
        const itemsArray = [ ...addressItems.subscriptions, ...addressItems.onetimes ]
        let filteredItems = _filterItemsByStatus({ items: itemsArray, status: 'active' })
        filteredItems = _filterBundleParts({ items: filteredItems })
        return { ...address, charges, count: filteredItems.length, items: filteredItems }
      })
    },
    sidebarContent() {
      const shipping = this.$store.getters['customize/customizeSidebarByPrefix']('shipping_')
      return { shipping }
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_SET_SIDEBAR']),
    countText(count) {
      const { box_count_single, box_count_multi, box_count_empty } = this.content
      if(box_count_single && box_count_multi && box_count_empty) {
        if(count === 1) return box_count_single.replace('{{ count }}', count)
        else if(count > 1) return box_count_multi.replace('{{ count }}', count)
        else return box_count_empty
      }
    }
  }
}
</script>

<style lang="scss">
  .c-shipmentsAccordion {
    width: 100%;
    max-width: 840px;
    margin: 0 auto;
  }
  .c-shipmentsAccordion__item {
    @include box-card;
    padding: 0 !important;
    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }
  .c-shipmentsAccordion__trigger {
    padding: 25px;
    @include flex($justify: space-between, $align: flex-start, $wrap: nowrap);
    @include media-mobile-down {
      padding: 15px;
    }
  }
  .c-shipmentsAccordion__triggerCount {
    font-weight: 800;
    @include media-mobile-down {
      font-size: 12px;
    }
  }
  .c-shipmentsAccordion__triggerShipping {
    @include media-mobile-down {
      font-size: 28px;
    }
  }
  .c-shipmentsAccordion__triggerAddress {
    color: $color-secondary;
    @include media-mobile-down {
      display: block;
    }
  }
  .c-shipmentsAccordion__triggerCircle {
    min-width: 40px;
    width: 40px;
    height: 40px;
    border: 2px solid $color-primary;
    border-radius: 50%;
    @include flex($justify: center);
    margin-left: 20px;
  }
  .c-shipmentsAccordion__triggerIcon {
    color: $color-primary;
    width: 12px;
    height: auto;
    transition: transform .35s ease-in-out;
    transform-origin: 50%;
    .c-accordionItem__trigger--isOpen & {
      transform: rotate(180deg);
    }
  }
  .c-shipmentsAccordion__triggerButton {
    margin-top: 20px;
    @include media-mobile-down {
      margin-top: 10px;
    }
    .c-button__text {
      text-transform: uppercase;
    }
  }
  .c-shipmentsAccordion__content {
    padding: 10px 25px 25px;
    @include media-mobile-down {
      padding: 0 15px 15px;
    }
  }
  .c-shipmentsAccordion__contentAddress {
    margin-bottom: 30px;
  }
</style>