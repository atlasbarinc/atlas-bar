<template>
  <div :class="_buildModifiers('c-modalDelay', modifiers)"
    v-if="content && (item || address)"
  >
    <c-h class="c-modalDelay__heading c-modal__heading"
      tag="h2"
      level="2"
      v-if="content.delay_heading"
      :text="content.delay_heading"
      :modifiers="['isBolder']"
    />
    <c-p class="c-modalDelay__text"
      tag="p"
      level="2"
      v-if="content.delay_text"
      :text="content.delay_text"
      :modifiers="['isBolder']"
    />
    <c-button class="c-modalDelay__confirm"
      v-if="content.delay_button_confirm"
      :text="content.delay_button_confirm"
      :loading="loading.delay"
      :modifiers="[ 'isDefault', 'isSecondary', 'hideTextLoading' ]"
      @click="handleDelay"
    />
    <c-button class="c-modalDelay__cancel"
      v-if="content.delay_button_cancel"
      :text="content.delay_button_cancel"
      :modifiers="[ 'isUnderline', 'isPrimary' ]"
      @click="UI_CLOSE_MODAL"
    />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { _buildUpdates } from '@vue/portal/utils'

import cH from '@shared/components/core/cH.vue'
import cP from '@shared/components/core/cP.vue'
import cButton from '@shared/components/core/cButton.vue'

export default {
  props: {
    type: {
      type: String,
      default: 'item'
    },
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
    loading: { delay: false }
  }),
  computed: {
    item() {
      const { resource, itemId } = this.settings
      if(resource && itemId) {
        const key = this._stringCapitalize(resource)
        return this.$store.getters[`customer/customer${key}ById`](itemId)
      }
    },
    address() {
      const { addressId } = this.settings
      if(addressId) {
        return this.$store.getters['customer/customerAddressById'](addressId)
      }
    },
    updates() {
      const { item, settings } = this
      const { type, resource } = settings
      let items = [item]
      if(type == 'bundle') {
        const bundleIdProp = item.properties.find(prop => prop.name == 'bundle_id')
        const bundleIdValue = bundleIdProp.value
        const key = resource == 'subscription' ? 'Subscriptions' : 'Onetimes'
        const children = this.$store.getters[`customer/customer${key}ByBundle`](bundleIdValue)
        items = [ ...items, ...children ]
      }
      return _buildUpdates({ items, actions: ['delay'], 
        values: { frequency: 2, unit: 'week' }
      })
    },
    subscriptions() {
      return this.$store.getters['customer/customerSubscriptionsByAddress'](this.address)
    },
    onetimes() {
      return this.$store.getters['customer/customerOnetimesByAddress'](this.address)
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_MODAL', 'UI_CLOSE_SIDEBAR']),
    ...mapActions('customer', ['customerUpdateOnetimes', 'customerUpdateSubscriptions', 'customerUpdateAddressItems']),
    async handleDelay() {
      const { item, settings } = this
      const { type, action, resource } = settings
      if(this.settings.action !== 'address') {
        const key = resource == 'subscription' ? 'Subscriptions' : 'Onetimes'
        this.loading.delay = true
        const { subscriptions, onetimes, error } = await this[`customerUpdate${key}`]({
          addressId: item.addressId, updates: this.updates
        })
      } else {
        const { subscriptions, onetimes, error, success } = await this.customerUpdateAddressItems({ 
          addressId: this.settings.addressId,
          updatesOnetimes: _buildUpdates({
            items: this.onetimes, actions: ['delay'], values: { frequency: 1, unit: 'month'}
          }),
          updatesSubscriptions: _buildUpdates({
            items: this.subscriptions, actions: ['delay'], values: { frequency: 1, unit: 'month'}
          })
        })
      }
      this.loading.delay = false
      this.status = 'success'
      this.UI_CLOSE_MODAL()
      this.UI_CLOSE_SIDEBAR()
    }
  }
}
</script>

<style lang="scss">
  .c-modalDelay {
    @include flex($direction: column);
    text-align: center;
  }
  .c-modalDelay__confirm {
    margin-top: 20px;
  }
  .c-modalDelay__cancel {
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