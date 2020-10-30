<template>
  <div :class="_buildModifiers('c-sidebarEdit', modifiers)"
    v-if="content && item && address"
  >
    <c-h class="c-sidebarEdit__heading c-sidebar__heading"
      v-if="heading"
      tag="h3"
      level="3"
      :text="heading"
      :modifiers="['isBolder']"
    />
    <c-p class="c-sidebarEdit__address"
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
    <div class="c-sidebarEdit__main">
      <c-productSlideshow class="c-sidebarEdit__slideshow"
        :product="product"
      />
      <div class="c-sidebarEdit__info">
        <c-h class="c-sidebarEdit__title"
          v-if="product.title"
          v-html="product.title"
          tag="h3"
          level="3"
          :modifiers="['isBolder']"
        />
        <span class="c-sidebarEdit__price u-block"
          v-if="price"
          v-html="price"
        />
        <c-variantSelect class="c-sidebarEdit__variants"
          v-model="variantModel"
          v-if="product.variants.length > 1"
          :product="product"
          :variant="variantModel"
        />
        <c-quantity class="c-sidebarEdit__quantity"
          v-model="quantityModel"
          :label="content.edit_label_quantity"
          :quantity="quantityModel"
        />
        <c-button class="c-sidebarEdit__button"
          v-if="content.edit_button_text"
          @click="handleSave"
          :loading="loading.edit"
          :success="status === 'success'"
          :text="{
            default: content.edit_button_text,
            success: content.edit_button_success
          }"
          :modifiers="['isDefault', 'isSecondary', 'hideTextLoading']"
          :attributes="{ disabled: loading.edit || loading.remove || saveDisabled }"
        />
        <c-button class="c-sidebarEdit__remove"
          v-if="content.edit_button_remove"
          @click="handleRemove"
          :loading="loading.remove"
          :text="content.edit_button_remove"
          :modifiers="['isUnderline', 'isPrimary']"
          :attributes="{ disabled: loading.remove || loading.edit }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import cH from '@shared/components/core/cH.vue'
import cP from '@shared/components/core/cP.vue'
import cButton from '@shared/components/core/cButton.vue'
import cQuantity from '@shared/components/core/cQuantity.vue'
import cVariantSelect from '@shared/components/parts/cVariantSelect.vue'
import cProductSlideshow from '@vue/portal/components/parts/cProductSlideshow.vue'

export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    settings: {
      type: Object,
      requried: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    loading: { edit: false, remove: false },
    status: false,
    variantModel: false,
    quantityModel: false
  }),
  components: { 
    cH, cP, cButton, cQuantity,
    cVariantSelect, cProductSlideshow
  },
  computed: {
    ...mapGetters('customize', ['customizeShop']),
    item() {
      const { resource, itemId } = this.settings
      if(resource && itemId) {
        const key = this._stringCapitalize(resource)
        return this.$store.getters[`customer/customer${key}ById`](itemId)
      }
    },
    product() {    
      const { productId } = this.item
      if(productId) return this.$store.getters['products/productById'](productId)
    },
    address() {
      if(this.item) {
        return this.$store.getters['customer/customerAddressById'](this.item.addressId)
      }
    },
    price() {
      const { variantModel, product, customizeShop, _formatMoney } = this
      let price = 0
      if(product) {
        if(variantModel) price = variantModel.price
        else price = product.defaultPrice
      }
      return `${customizeShop.currency_symbol}${_formatMoney({ amount: price })}`
    },
    productInventory() {
      if(this.product) {
        return this.$store.getters['products/productsInventoryById'](this.product.id)
      }
    },
    variantInventory() {
      const { productInventory, variantModel } = this
      if(productInventory && variantModel) {
        return productInventory[variantModel.id]
      }
    },
    heading() {
      const { resource } = this.settings
      if(resource) return this.content[`edit_heading_${resource}`]
    },
    saveDisabled() {
      const variantMatch = this.variantModel.id == this.item.variantId
      const quantityMatch = this.quantityModel == this.item.quantity
      return variantMatch && quantityMatch
    },
    updatesData() {
      const { item, variantModel, quantityModel } = this
      let price = this.variantModel.price
      if(item.isSubscription && variantModel.subscriptionPrice) {
        price = variantModel.subscriptionPrice
      }
      return {
        id: item.id,
        shopify_variant_id: variantModel.id,
        quantity: quantityModel,
        price
      }
    },
    modalContent() {
      const cancel = this.$store.getters['customize/customizeModalByPrefix']('cancel_')
      return { cancel }
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_SIDEBAR', 'UI_SET_MODAL']),
    ...mapActions('customer', [
      'customerUpdateOnetimes', 'customerDeleteOnetimes', 
      'customerUpdateSubscriptions'
    ]),
    async handleSave() {
      this.loading.edit = true
      const { addressId, isSubscription } = this.item
      const key = isSubscription ? 'Subscriptions' : 'Onetimes'
      const { onetimes, subscriptions, error, success } = await this[`customerUpdate${key}`]({
        addressId,
        updates: [ this.updatesData ]
      })
      this.loading.edit = false
      this.status = 'success'
    },
    async handleRemove() {
      const { id, addressId, isSubscription } = this.item
      if(!isSubscription) {
        this.loading.remove = true
        const { onetimes, subscriptions, error, success } = await this.customerDeleteOnetimes({
          addressId,
          ids: [ id ]
        })
        this.UI_CLOSE_SIDEBAR()
        this.loading.remove = false
      } else {
        this.UI_SET_MODAL({
          component: 'cModalCancel',
          content: this.modalContent.cancel,
          settings: {
            subscriptionId: this.settings.itemId
          }
        })
      }
    }
  },
  watch: {
    variantModel: {
      deep: true,
      handler() {
        this.status = false
      }
    },
    quantityModel: {
      handler() {
        this.status = false
      }
    }
  },
  created() {
    const { item, product } = this
    if(item && product) {
      const variant = product.variants.find(variant => variant.id == item.variantId)
      this.variantModel = variant
      this.quantityModel = this.item.quantity
    }
  }
}
</script>

<style lang="scss">
  .c-sidebarEdit__address {
    margin-top: -10px;
    font-weight: 700;
  }
  .c-sidebarEdit__main {
    margin-top: 44px;
    @include flex($align: flex-start, $wrap: nowrap);
    @include media-mobile-down {
      flex-direction: column;
    }
  }
  .c-sidebarEdit__slideshow {
    width: 50%;
    max-width: 550px;
    @include media-mobile-down {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .c-sidebarEdit__info {
    width: 100%;
    max-width: 400px;
    padding-left: 50px;
    @include media-mobile-down {
      padding-left: 0;
    }
  }
  .c-sidebarEdit__title {
    @include media-mobile-down {
      font-size: 30px;
    }
  }
  .c-sidebarEdit__price {
    margin-bottom: 24px;
    color: $color-secondary;
    font-family: $font-heading;
    font-size: 23px;
    font-weight: 700;
    @include media-mobile-down {
      font-size: 20px;
    }
  }
  .c-sidebarEdit__quantity {
    margin-bottom: 24px;
  }
  .c-sidebarEdit__button {
    margin-bottom: 30px;
  }
  .c-sidebarEdit__remove {
    opacity: .9;
    &:disabled { opacity: .5 };
    @include media-mobile-down {
      display: block;
    }
    .c-button__text {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
</style>

// 4842134339722