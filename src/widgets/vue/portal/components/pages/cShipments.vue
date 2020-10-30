<template>
  <div :class="_buildModifiers('c-shipments', modifiers)">
    <c-shipmentsLoading class="c-shipments__loading" 
      v-if="!ready"
    />
    <div class="c-shipments__content" v-if="ready">
      <c-shipmentsLoyalty class="c-shipments__loyalty" 
        :content="{
          heading: content.loyalty_heading,
          label_tier: content.loyalty_label_tier,
          label_no_tier: content.loyalty_label_no_tier,
          text_tier: content.loyalty_text_tier,
          text_tier: content.loyalty_text_tier,
          label_points: content.loyalty_label_points,
          text_points: content.loyalty_text_points,
          button_view: content.loyalty_button_view,
          button_earn: content.loyalty_button_earn,
          text_refer: content.loyalty_text_refer,
          link_refer: content.loyalty_link_refer,
          image: content.loyalty_image,
        }"
      />
      <div class="c-shipments__list">
        <c-shipmentsAccordion class="c-shipments__accordion"
          :open="0"
          :addresses="addresses"
          :content="{
            box_count_single: content.box_count_single,
            box_count_multi: content.box_count_multi,
            box_count_empty: content.box_count_empty,
            box_ships: content.box_ships,
            box_edit_shipping: content.box_edit_shipping,
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
            empty_heading_products: content.empty_heading_products,
            empty_text_ships: content.empty_text_ships,
            empty_button_reactivate: content.empty_button_reactivate,
            empty_button_add: content.empty_button_add,
            empty_text_disclaimer: content.empty_text_disclaimer,
            empty_text_disclaimer: content.empty_text_disclaimer,
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
      </div>
      <div class="c-shipments__bottom o-container">
        <c-shipmentsUpsell class="c-shipments__upsell"
          :content="{
            heading: content.upsells_heading,
            collection: content.upsells_collection,
            button: content.upsells_button
          }"
        />
      </div>
    </div>  
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { _sortItemsByCharge } from '@vue/portal/utils'

import cShipmentsLoading from '../shipments/cShipmentsLoading.vue'
import cShipmentsLoyalty from '../shipments/cShipmentsLoyalty.vue'
import cShipmentsAccordion from '../shipments/cShipmentsAccordion.vue'
import cShipmentsUpsell from '../shipments/cShipmentsUpsell.vue'

export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { 
    cShipmentsLoading, cShipmentsLoyalty, cShipmentsAccordion,
    cShipmentsUpsell
  },
  data: () => ({ ready: false, error: false }),
  computed: {
    ...mapGetters('customer', ['customerAddressesWithStatus', 'customerChargeError']),
    addresses() {
      const active = _sortItemsByCharge({
        items: this.customerAddressesWithStatus.active, order: 'ascending'
      })
      const inactive = _sortItemsByCharge({ 
        items: [
          ...this.customerAddressesWithStatus.inactive, 
          ...this.customerAddressesWithStatus.empty
        ],
        order: 'ascending' 
      })
      return [ ...active, ...inactive]
    },
    content() {
      return this.$store.getters['customize/customizeContentByKey']('shipments')
    },
    modalContent() {
      const error = this.$store.getters['customize/customizeModalByPrefix']('error_')
      return { error }
    },
  },
  methods: {
    ...mapMutations('ui', ['UI_SET_MODAL']),
    ...mapActions('customer', ['customerSetResources']),
  },
  watch: {
    customerChargeError: {
      immediate: true,
      handler(val) {
        if(val) {
          this.UI_SET_MODAL({
            component: 'cModalError',
            content: this.modalContent.error,
            settings: { closable: false }
          })
        }
      }
    }
  },
  async created() {
    const { success, error } = await this.customerSetResources({
      resources: [ 'addresses', 'charges', 'onetimes', 'subscriptions' ]
    })
    if(error) this.error = error
    this.ready = true
  },
}
</script>

<style lang="scss">
  .c-shipments__list {
    max-width: 1240px;
    margin: 0 auto;
    padding: 30px 0 80px;
    @include media-desktop-up {
      padding-top: 40px;
    }
  }
  .c-shipments__bottom {
    padding-bottom: 60px;
    @include media-mobile-down {
      width: 100%;
    }
  }
</style>