<template>
  <div :class="_buildModifiers('c-modalOrder', modifiers)"
    v-if="content && charge"
  >
    <c-h class="c-modalOrder__heading c-modal__heading"
      tag="h2"
      level="2"
      v-if="content.order_heading"
      :text="content.order_heading"
      :modifiers="['isBolder']"
    />
    <c-p class="c-modalOrder__text"
      tag="p"
      level="2"
      v-if="content.order_text"
      :text="content.order_text"
      :modifiers="['isBolder']"
    />
    <c-button class="c-modalOrder__confirm"
      v-if="content.order_button_confirm"
      :text="content.order_button_confirm"
      :loading="loading.order"
      :modifiers="[ 'isDefault', 'isSecondary', 'hideTextLoading' ]"
      @click="handleOrder"
    />
    <c-button class="c-modalOrder__cancel"
      v-if="content.order_button_cancel"
      :text="content.order_button_cancel"
      :modifiers="[ 'isUnderline', 'isPrimary' ]"
      @click="UI_CLOSE_MODAL"
    />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import dayjs from 'dayjs'

import cH from '@shared/components/core/cH.vue'
import cP from '@shared/components/core/cP.vue'
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
    cH, cP, cButton
  },
  data: () => ({
    loading: { order: false }
  }),
  computed: {
    charge() {
      const { chargeId } = this.settings
      if(chargeId) return this.$store.getters['customer/customerChargeById'](chargeId)
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_MODAL']),
    ...mapActions('customer', ['customerUpdateChargesDate']),
    async handleOrder() {
      this.loading.order = true
      const { charges, onetimes, subscriptions, error } = await this.customerUpdateChargesDate({
        addressId: this.charge.addressId,
        updates: [{ 
          id: this.charge.id, 
          next_charge_date: dayjs().format('YYYY-MM-DDT00:00:00')
        }]
      })
      if(!error) {
        this.loading.order = false
        this.UI_CLOSE_MODAL()
      }
    }
  }
}
</script>

<style lang="scss">
  .c-modalOrder {
    @include flex($direction: column);
    text-align: center;
  }
  .c-modalOrder__confirm {
    margin-top: 20px;
  }
  .c-modalOrder__cancel {
    margin-top: 40px;
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