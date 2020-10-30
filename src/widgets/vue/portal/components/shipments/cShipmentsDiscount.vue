<template>
  <form :class="_buildModifiers('c-shipmentsDiscount', modifiers)"
    v-if="address && shipment && content"
    @submit.prevent="handleApply"
  >
    <input class="c-shipmentsDiscount__input"
      v-if="content.placeholder"
      v-model="discountModel"
      :placeholder="content.placeholder"
    />
    <c-button class="c-shipmentsDiscount__button"
      v-if="content.button_text"
      :loading="loading.apply"
      :success="status === 'success'"
      :text="{
        default: content.button_text,
        success: content.button_success
      }"
      :attributes="{ disabled }"
      :modifiers="['isUnderline', 'isSecondary']"
    />
  </form>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { apiService } from '@shared/services'

import cButton from '@shared/components/core/cButton.vue'

export default {
  props: {
    address: {
      type: Object,
      required: true
    },
    shipment: {
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
    cButton
  },
  data: () => ({
    discountModel: '',
    discountCode: '',
    loading: { apply: false },
    status: false
  }),
  computed: {
    disabled() {
      return this.status == 'success' || this._stringEmpty(this.discountModel)
        || this.discountCode.toLowerCase().trim() == this.discountModel.toLowerCase().trim()
    },
    modalContent() {
      const discount = this.$store.getters['customize/customizeModalByPrefix']('discount_')
      return { discount }
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_SET_MODAL']),
    ...mapActions('customer', ['customerUpdateAddressDiscount']),
    async handleApply() {
      this.loading.apply = true
      const { address, charges, error } = await this.customerUpdateAddressDiscount(
        { addressId: this.shipment.addressId, discountCode: this.discountModel }
      )
      if(!error) {
        this.status = 'success'
        this.discountCode = this.discountModel
      } else {
        this.UI_SET_MODAL({
          component: 'cModalDiscount',
          content: this.modalContent.discount,
          settings: { discountCode: this.discountModel }
        })
      }
      this.loading.apply = false
    }
  },
  watch: {
    discountModel: {
      handler(val) {
        this.status = false
      }
    }
  },
  async created() {
    const { discountId } = this.address
    if(discountId) {
      const apiClient = new apiService()
      const { data } = await apiClient.get('/v1/shop/discount/id', { params: { id: discountId }})
      const { discount, error } = data
      if(discount) {
        this.discountCode = discount.code
        this.discountModel = discount.code
      }
    }
  }
}
</script>

<style lang="scss">
  .c-shipmentsDiscount {
    height: 62px;
    width: 100%;
    padding: 10px 20px;
    @include flex ($justify: space-between, $wrap: nowrap);
  }
  .c-shipmentsDiscount__input {
    height: 100%;
    flex-grow: 1;
    @include input-unset;
    color: $color-primary;
    font-family: $font-heading;
    font-size: 16px;
    font-weight: 600;
    @include media-mobile-down {
      max-width: calc(100% - 80px);
    }
    &::placeholder { 
      color: rgab($color-primary, .75);
    }
  }
  .c-shipmentsDiscount__button {
    height: 100%;
    margin-left: 10px;
    padding: 0;
    border-bottom: 0;
    text-transform: uppercase;
  }
</style>