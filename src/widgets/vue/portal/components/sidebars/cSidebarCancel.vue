<template>
  <div :class="_buildModifiers('c-sidebarCancel', modifiers)"
    v-if="content && address"
  >
    <c-p class="c-sidebarCancel__address"
      tag="address"
      level="1"
      :modifiers="['isBolder']"
      v-html="_buildAddress({
        address: address,
        options: {
          hiddenFields: ['name', 'country'],
          provinceName: 'short',
          flatten: true
        }
      })"
    />
    <div class="c-sidebarCancel__items">
      <c-sidebarCancelItem class="c-sidebarCancel__item"
        v-for="(item, index) in items" 
        :key="`${item.id}-${index}`"
        :item="item"
      />
    </div>
    <c-cancelRadios class="c-sidebarCancel__radios"
      v-model="cancelModel"
      :loading="loading"
      :disabled="loading.delay || loading.cancel"
      @delay="handleDelay"
      :content="{
        reason_1: content.cancel_reason_1,
        reason_2: content.cancel_reason_2,
        reason_3: content.cancel_reason_3,
        reason_4: content.cancel_reason_4,
        reason_5: content.cancel_reason_5,
        reason_other: content.cancel_reason_other,
        delay_heading: content.cancel_delay_heading,
        delay_button: content.cancel_delay_button
      }"
    />
    <c-button class="c-sidebarCancel__cancelButton"
      v-if="content.cancel_submit_button"
      @click="handleCancel"
      :loading="loading.cancel"
      :text="content.cancel_submit_button"
      :modifiers="['isDefault', 'isPrimary', 'hideTextLoading']"
      :attributes="{ disabled: !cancelModel || loading.cancel || loading.delay }"
    />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { _sortItemsByCharge, _buildUpdates } from '@vue/portal/utils'

import cP from '@shared/components/core/cP.vue'
import cButton from '@shared/components/core/cButton.vue'
import cSidebarCancelItem from './cSidebarCancelItem.vue'
import cCancelRadios from '../parts/cCancelRadios.vue'

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
    cP, cButton,
    cSidebarCancelItem, cCancelRadios
  },
  data: () => ({ 
    cancelModel: false,
    loading: { delay: false, cancel: false } 
  }),
  computed: {
    address() {
      return this.$store.getters['customer/customerAddressById'](this.settings.addressId)
    },
    subscriptions() {
      return this.$store.getters['customer/customerSubscriptionsByAddress'](this.address)
    },
    onetimes() {
      return this.$store.getters['customer/customerOnetimesByAddress'](this.address)
    },
    items() {
      const filteredSubscriptions =  this.subscriptions.filter(subscription => {
        return !subscription.properties.find(property => {
          return property.name === 'bundle_type' && property.value === 'child'
        })
      })
      const filteredOnetimes = this.onetimes.filter(onetime => {
        return !onetime.properties.find(property => {
          return property.name === 'bundle_type' && property.value === 'child'
        })
      })
      return _sortItemsByCharge({ 
        items: [ ...filteredSubscriptions, ...filteredOnetimes ], order: 'ascending'
      })
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_SIDEBAR']),
    ...mapActions('customer', ['customerUpdateAddressItems']),
    async handleDelay() {
      this.loading.delay = true
      const { subscriptions, onetimes, error, success } = await this.customerUpdateAddressItems({ 
        addressId: this.settings.addressId,
        updatesOnetimes: _buildUpdates({
          items: this.onetimes, actions: ['delay'], values: { frequency: 1, unit: 'month'}
        }),
         updatesSubscriptions: _buildUpdates({
          items: this.subscriptions, actions: ['delay'], values: { frequency: 1, unit: 'month'}
        })
      })
      this.loading.delay = false
      this.UI_CLOSE_SIDEBAR()
    },
    async handleCancel() {
      this.loading.cancel = true
      const { subscriptions, onetimes, error, success } = await this.customerUpdateAddressItems({ 
        addressId: this.settings.addressId,
        updatesOnetimes: _buildUpdates({
          items: this.onetimes, actions: ['cancel'], values: { reason: this.cancelModel }
        }),
        updatesSubscriptions: _buildUpdates({
          items: this.subscriptions, actions: ['cancel'], values: { reason: this.cancelModel }
        })
      })
      this.loading.cancel = false
      this.UI_CLOSE_SIDEBAR()
    }
  }
}
</script>

<style lang="scss">
  .c-sidebarCancel__address {
    margin-top: -10px;
    font-weight: 700;
  }
  .c-sidebarCancel__items {
    margin-bottom: 20px;
  }
  .c-sidebarCancel__cancelButton {
    margin-top: 30px;
  }
</style>