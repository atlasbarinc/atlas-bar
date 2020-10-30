<template>
  <div :class="_buildModifiers('c-modalCancel', modifiers)">
    <c-h class="c-modalCancel__heading c-modal__heading"
      tag="h2"
      level="2"
      v-if="content.cancel_heading"
      :text="content.cancel_heading"
      :modifiers="['isBolder']"
    />
    <c-h class="c-modalCancel__subheading"
      tag="h6"
      level="6"
      v-if="content.cancel_subheading"
      :text="content.cancel_subheading"
    />
    <c-cancelRadios class="c-modalCancel__radios"
      v-model="cancelModel"
      :delay="false"
      :content="{
        reason_1: content.cancel_reason_1,
        reason_2: content.cancel_reason_2,
        reason_3: content.cancel_reason_3,
        reason_4: content.cancel_reason_4,
        reason_5: content.cancel_reason_5,
        reason_other: content.cancel_reason_other
      }"
    />
    <c-button class="c-modalCancel__confirm"
      v-if="content.cancel_button_confirm"
      :text="content.cancel_button_confirm"
      :loading="loading.cancel"
      :attributes="{ disabled: loading.cancel || !cancelModel }"
      :modifiers="[ 'isDefault', 'isSecondary', 'hideTextLoading' ]"
      @click="handleCancel"
    />
    <c-button class="c-modalCancel__cancel"
      v-if="content.cancel_button_cancel"
      :text="content.cancel_button_cancel"
      :modifiers="[ 'isUnderline', 'isPrimary' ]"
      @click="UI_CLOSE_MODAL"
    />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { _buildUpdates } from '@vue/portal/utils'

import cH from '@shared/components/core/cH.vue'
import cButton from '@shared/components/core/cButton.vue'
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
    cH, cButton, cCancelRadios
  },
  data: () => ({
    cancelModel: false,
    loading: { cancel: false }
  }),
  computed: {
    item() {
      return this.$store.getters['customer/customerSubscriptionById'](this.settings.itemId)
    },
    updates() {
      const { item, settings } = this
      const { type } = settings
      let items = [item]
      if(type == 'bundle') {
        const bundleIdProp = item.properties.find(prop => prop.name == 'bundle_id')
        const bundleIdValue = bundleIdProp.value
        const children = this.$store.getters[`customer/customerSubscriptionsByBundle`](bundleIdValue)
        items = [ ...items, ...children ]
      }
      return _buildUpdates({ items, actions: ['cancel'], 
        values: { reason: this.cancelModel }
      })
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_MODAL', 'UI_CLOSE_SIDEBAR']),
    ...mapActions('customer', ['customerUpdateSubscriptions']),
    async handleCancel() {
      this.loading.cancel = true
      const { subscriptions, error, success } = await this.customerUpdateSubscriptions({ 
        addressId: this.item.addressId,
        updates: this.updates
      })
      this.loading.cancel = false
      this.UI_CLOSE_MODAL()
      this.UI_CLOSE_SIDEBAR()
    }
  }
}
</script>

<style lang="scss">
  .c-modalCancel {
    @include flex($direction: column);
    text-align: center;
  }
  .c-modalCancel__radios {
    margin-top: 30px;
  }
  .c-modalCancel__confirm {
    margin-top: 20px;
  }
  .c-modalCancel__cancel {
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