<template>
  <div :class="_buildModifiers('c-sidebarActivate', modifiers)"
    v-if="content && address"
  >
    <c-h class="c-sidebarActivate__address"
      tag="address"
      level="5"
      v-html="_buildAddress({
        address: address,
        options: {
          hiddenFields: ['name', 'country'],
          provinceName: 'short',
          flatten: true
        }
      })"
    />
    <div class="c-sidebarActivate__items">
      <c-sidebarActivateItem class="c-sidebarActivate__item"
        v-for="(item, index) in items" 
        :key="`${item.id}-${index}`"
        :item="item"
        :activeIds="activateModel"
        :content="{ ships: content.activate_ships }"
        @update="handleUpdate"
      />
    </div>
    <div class="c-sidebarActivate__total"
      v-if="content.activate_total && total"
    >
      <span class="c-sidebarActivate__totalLabel"
        v-html="content.activate_total"
      />
      <span class="c-sidebarActivate__totalValue"
        v-html="total"
      />
    </div>
    <c-button class="c-sidebarActivate__button"
      v-if="content.activate_button"
      @click="handleActivate"
      :loading="loading.activate"
      :text="content.activate_button"
      :modifiers="['isDefault', 'isSecondary', 'hideTextLoading']"
      :attributes="{ disabled: !activateModel.length > 0 || loading.activate }"
    />
    <div class="c-sidebarActivate__disclaimers"
      v-if="content.activate_disclaimer"
    >
      <c-p class="c-sidebarActivate__disclaimer"
        v-for="(disclaimer, index) in _buildTextArray(content.activate_disclaimer)"
        :key="`disclaimer-${index}`"
        tag="p"
        level="3"
        :text="disclaimer"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { _sortItemsByCharge, _buildUpdates } from '@vue/portal/utils'
import cH from '@shared/components/core/cH.vue'
import cP from '@shared/components/core/cP.vue'
import cButton from '@shared/components/core/cButton.vue'
import cSidebarActivateItem from './cSidebarActivateItem.vue'

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
    cH, cP, cButton,
    cSidebarActivateItem
  },
  data: () => ({ 
    activateModel: [],
    loading: { activate: false }
  }),
  computed: {
    address() {
      return this.$store.getters['customer/customerAddressById'](this.settings.addressId)
    },
    subscriptions() {
      return this.$store.getters['customer/customerSubscriptionsByAddress'](this.address)
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
    total() {
      let total = 0
      const checkedSubscriptions = this.subscriptions.filter(subscription => {
        return this.activateModel.includes(subscription.id)
      })
      checkedSubscriptions.forEach(subscription => total += subscription.total)
      return `${this.currencySymbol}${this._formatMoney({ amount: total })}`
    },
    disclaimers() {
      const { activate_disclaimer } = this.content
      if(activate_disclaimer) return this._buildTextArray(activate_disclaimer)
      else return []
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_SIDEBAR']),
    ...mapActions('customer', ['customerUpdateAddressItems']),
    handleUpdate(val) {
      const { ids, action } = val
      this.activateModel = this.activateModel.filter(item => ids.includes(item.id))
      if(action === 'add') this.activateModel = [ ...this.activateModel, ...ids]
    },
    async handleActivate() {
      this.loading.activate = true
      const { subscriptions, onetimes, error, success } = await this.customerUpdateAddressItems({ 
        addressId: this.settings.addressId,
         updatesSubscriptions: _buildUpdates({
          items: this.activateItems, actions: ['activate']
        })
      })
      this.loading.activate = false
      this.UI_CLOSE_SIDEBAR()
    }
  },
  mounted() {
    this.activateModel = this.subscriptions.map(subscription => subscription.id)
  }
}
</script>

<style lang="scss">
  .c-sidebarActivate__address {
    margin-top: -14px;
    font-size: 22px;
  }
  .c-sidebarActivate__items {
    margin: 30px 0 0;
    width: 100%;
    max-width: 680px;
  }
  .c-sidebarActivate__item {
    &:not(:last-child) { margin-bottom: 40px; }
  }
  .c-sidebarActivate__total {
    width: 100%;
    max-width: 320px;
    margin-top: 30px;
    @include flex($justify: space-between);
  }
  .c-sidebarActivate__totalLabel,
  .c-sidebarActivate__totalValue {
    font-family: $font-heading;
    font-size: 20px;
    font-weight: 800;
  }
  .c-sidebarActivate__totalValue {
    font-weight: 600;
  }
  .c-sidebarActivate__button {
    width: 100%;
    max-width: 320px;
    margin-top: 30px;
  }
  .c-sidebarActivate__disclaimers {
    max-width: 420px;
    margin-top: 40px;
  }
  .c-sidebarActivate__disclaimer {
    font-weight: 600;
    line-height: 1.25;
  }
</style>