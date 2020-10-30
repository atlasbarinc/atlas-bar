<template>
  <div :class="_buildModifiers('c-shipmentsEmpty', modifiers)"
    v-if="content && address"
  >
    <div class="c-shipmentsEmpty__box">
      <div class="c-shipmentsEmpty__items">
        <c-h class="c-shipmentsEmpty__heading"
          tag="h6"
          level="6"
          v-if="content.empty_heading_products"
          :text="content.empty_heading_products"
          :modifiers="['isBolder']"
        />
        <c-shipmentsEmptyItem class="c-shipmentsEmpty__item"
          v-for="(item, index) in items" 
          :key="`${item.id}-${index}`"
          :item="item"
          :activeIds="activateModel"
          :content="{ ships: content.empty_text_ships }"
          @update="handleUpdate"
        />
      </div>
      <div class="c-shipmentsEmpty__buttons">
        <c-button class="c-shipmentsEmpty__button"
          v-if="content.empty_button_reactivate"
          :text="content.empty_button_reactivate"
          :modifiers="['isHollow', 'isPrimary', 'hideTextLoading']"
          @click="handleActivate"
          :loading="loading.activate"
          :attributes="{ disabled: !activateModel.length > 0 || loading.activate }"
        />
        <c-button class="c-shipmentsEmpty__button"
          v-if="content.empty_button_add"
          :text="content.empty_button_add"
          :modifiers="['isDefault', 'isSecondary']"
          @click="UI_SET_SIDEBAR({
            component: 'cSidebarProducts',
            content: sidebarContent.products,
            settings: {
              addressId: address.id
            }
          })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { _sortItemsByCharge, _buildUpdates } from '@vue/portal/utils'

import cH from '@shared/components/core/cH.vue'
import cButton from '@shared/components/core/cButton.vue'
import cShipmentsEmptyItem from './cShipmentsEmptyItem.vue'

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
  data: () => ({ 
    activateModel: [],
    loading: { activate: false }
  }),
  components: {
    cH, cButton,
    cShipmentsEmptyItem
  },
  computed: {
    subscriptions() {
      return this.$store.getters['customer/customerSubscriptionsByAddress'](this.address)
    },
    subscriptionIds() {
      return this.subscriptions.map(subscription => subscription.id)
    },
    items() {
      const filteredSubscriptions =  this.subscriptions.filter(subscription => {
        return !subscription.properties.find(property => {
          return property.name === 'bundle_type' && property.value === 'child'
        })
      })
      return _sortItemsByCharge({ 
        items: filteredSubscriptions, order: 'ascending' 
      })
    },
    activateItems() {
      return this.$store.getters['customer/customerSubscriptionsByIds'](this.activateModel)
    },
    currencySymbol() {
      return this.$store.getters['customize/customizeShopByKey']('currency_symbol')
    },
    sidebarContent() {
      const products = this.$store.getters['customize/customizeSidebarByPrefix']('products_')
      return { products }
    },
  },
  methods: {
    ...mapMutations('ui', ['UI_SET_SIDEBAR']),
    ...mapActions('customer', ['customerUpdateSubscriptions']),
    handleUpdate(val) {
      const { ids, action } = val
      this.activateModel = this.activateModel.filter(item => ids.includes(item.id))
      if(action === 'add') this.activateModel = [ ...this.activateModel, ...ids]
    },
    async handleActivate() {
      this.loading.activate = true
      const { subscriptions, error, success } = await this.customerUpdateSubscriptions({ 
        addressId: this.address.id,
         updates: _buildUpdates({
          items: this.activateItems, actions: ['activate']
        })
      })
      this.loading.activate = false
    }
  },
  mounted() {
    this.activateModel = this.subscriptions.map(subscription => subscription.id)
  }
}
</script>

<style lang="scss">
  .c-shipmentsEmpty__box {
    @include box-card;
  }
  .c-shipmentsEmpty__heading {
    margin-bottom: 20px;
  }
  .c-shipmentsEmpty__buttons {
    @include flex;
    margin: 15px -5px 0;
  }
  .c-shipmentsEmpty__button {
    margin: 0 5px;
    padding: 12px 30px;
    font-size: 15px;
  }
</style>