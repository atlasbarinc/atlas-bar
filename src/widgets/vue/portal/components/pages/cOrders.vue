<template>
  <div :class="_buildModifiers('c-orders', modifiers)">
    <c-ordersLoading class="c-orders__loading" 
      v-if="!ready"
    />
    <div class="c-orders__content" v-if="ready">
      <c-ordersEmpty class="c-orders__empty"
        v-if="!orders"
        :content="{
          preheading: content.empty_preheading,
          heading: content.empty_heading,
          button_text: content.empty_button_text,
          button_url: content.empty_button_url
        }"
      />
      <div class="c-orders__list" 
        v-if="orders"
      >
        <c-h class="c-orders__heading u-hideMobileDown"
          v-if="content.page_heading"
          tag="h4"
          level="4"
          :text="content.page_heading"
          :modifiers="['isBolder']"
        />
        <c-h class="c-orders__subheading"
          v-if="content.last_heading"
          tag="h6"
          level="6"
          :modifiers="['isSeven']"
          :text="content.last_heading"
        />
        <c-ordersAccordion class="c-orders__accordion"
          :orders="[orders[0]]"
          :open="0"
          :content="{
            name: content.order_name,
            processing: content.order_processing,
            transit: content.order_transit,
            track: content.order_track,
            delivered: content.order_delivered,
            ships: content.order_ships,
            billing: content.order_billing,
            payment: content.order_payment,
            paid: content.order_paid,
            subtotal: content.order_subtotal_label,
            discount: content.order_discount_label,
            shipping: content.order_shipping_label,
            tax: content.order_tax_label,
            total: content.order_total_label
          }"
        />
        <span class="c-orders__scrollTo" ref="scrollTo" />
        <c-h class="c-orders__subheading"
          v-if="activeOrders.length > 0 && content.previous_heading"
          tag="h6"
          level="6"
          :modifiers="['isSeven']"
          :text="content.previous_heading"
        />
        <c-ordersAccordion class="c-orders__accordion"
          v-if="activeOrders.length > 0"
          :orders="activeOrders"
          :content="{
            name: content.order_name,
            processing: content.order_processing,
            transit: content.order_transit,
            track: content.order_track,
            delivered: content.order_delivered,
            ships: content.order_ships,
            billing: content.order_billing,
            payment: content.order_payment,
            paid: content.order_paid,
            subtotal: content.order_subtotal_label,
            discount: content.order_discount_label,
            shipping: content.order_shipping_label,
            tax: content.order_tax_label,
            total: content.order_total_label
          }"
        />
        <c-pagination class="c-orders__pagination"
          :active="activePagination"
          :count="paginationCount"
          @update="updatePagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import cH from '@shared/components/core/cH.vue'
import cPagination from '@shared/components/core/cPagination.vue'
import cOrdersLoading from '../orders/cOrdersLoading.vue'
import cOrdersEmpty from '../orders/cOrdersEmpty.vue'
import cOrdersAccordion from '../orders/cOrdersAccordion.vue'

export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { 
    cH, cPagination,
    cOrdersLoading, cOrdersEmpty, cOrdersAccordion
  },
  data: () => ({ 
    activePagination: 1, ready: false, error: false 
  }),
  computed: {
    ...mapGetters('customer', ['customerOrders']),
    content() {
      return this.$store.getters['customize/customizeContentByKey']('orders')
    },
    orders() {
      return this.customerOrders ? this.customerOrders.length > 0 
        ? this.customerOrders : false
        : false
    },
    activeOrders() {
      if(this.orders) {
        let prevOrders = [ ...this.orders ]
        prevOrders.shift()
        const startIndex = (this.activePagination - 1) * 5
        const endIndex = this.activePagination  * 5
        return prevOrders.slice(startIndex, endIndex)
      }
    },
    paginationCount() {
      if(this.orders) {
        let prevOrders = [ ...this.orders ]
        prevOrders.shift()
        return Math.ceil(prevOrders.length / 5)
      }
    }
  },
  methods: {
    ...mapActions('customer', ['customerSetResources']),
    updatePagination(index) {
      this.activePagination = index
      const { scrollTo } = this.$refs
      setTimeout(() => {
        const outOfViewport = this._domOutOfViewport(scrollTo)
        if(outOfViewport.any) this._eventScrollTo(scrollTo, 350)
      })
    }
  },
  async created() {
    const { success, error } = await this.customerSetResources({
      resources: [ 'orders' ]
    })
    if(error) this.error = error
    this.ready = true
  }
}
</script>

<style lang="scss">
  .c-orders {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 0 60px;
  }
  .c-orders__heading {
    color: $color-secondary;
    margin-bottom: 30px;
  }
  .c-orders__accordion {
    margin-bottom: 60px;
  }
  .c-orders__scrollTo {
    display: block;
    height: 50px;
    margin-top: -50px;
    opacity: 0;
    z-index: $z-index-behind;
  }
</style>