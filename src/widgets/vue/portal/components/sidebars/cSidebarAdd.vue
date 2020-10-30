<template>
  <div :class="_buildModifiers('c-sidebarAdd', modifiers)"
    v-if="content && product"
  >
    <div class="c-sidebarAdd__main">
      <c-productSlideshow class="c-sidebarAdd__slideshow"
        :product="product"
      />
      <div class="c-sidebarAdd__info">
        <c-h class="c-sidebarAdd__title"
          v-if="product.title"
          v-html="product.title"
          tag="h3"
          level="3"
          :modifiers="['isBolder']"
        />
        <span class="c-sidebarAdd__price u-block"
          v-if="price"
          v-html="price"
        />
        <c-variantSelect class="c-sidebarAdd__variants"
          v-model="variantModel"
          v-if="product.variants.length > 1"
          :product="product"
          :variant="variantModel"
        />
        <div class="c-sidebarAdd__actions">
          <c-addressSelect class="c-sidebarAdd__address"
            v-model="addressModel"
            :label="content.add_label_address"
            :address="address"
          />
          <c-button class="c-sidebarAdd__button"
            v-if="content.add_button_add && !variantSoldout"
            :loading="loading.add"
            :text="content.add_button_add"
            :modifiers="['isDefault', 'isSecondary', 'hideTextLoading']"
            :attributes="{ disabled: loading.add || loading.now }"
            @click="handleAdd"
          />
          <c-button class="c-sidebarAdd__button"
            v-if="content.add_button_now && !variantSoldout"
            :loading="loading.now"
            :text="content.add_button_now"
            :modifiers="['isDefault', 'isPrimary', 'hideTextLoading']"
            :attributes="{ disabled: loading.now || loading.add }"
            @click="handleNow"
          />
          <c-button class="c-sidebarAdd__button"
            v-if="content.add_button_soldout && variantSoldout"
            :text="content.add_button_soldout"
            :modifiers="['isHollow', 'isPrimary']"
            :attributes="{ disabled: true }"
          />
        </div>
      </div>
    </div>
    <div class="c-sidebarAdd__details"
      v-if="product.body"
    >
      <c-h class="c-sidebarAdd__detailsHeading"
        v-if="content.add_heading_details"
        :text="content.add_heading_details"
        tag="h4"
        level="4"
        :modifiers="['isBolder']"
      />
      <div class="c-sidebarAdd__detailsContent">
        <c-h class="c-sidebarAdd__detailsTitle"
          v-if="product.title"
          :text="product.title"
          tag="h5"
          level="5"
          :modifiers="['isBolder']"
        />
        <div class="c-sidebarAdd__detailsBody"
          v-html="product.body"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { _buildCreates, _sortItemsByCharge } from '@vue/portal/utils'

import cH from '@shared/components/core/cH.vue'
import cButton from '@shared/components/core/cButton.vue'
import cVariantSelect from '@shared/components/parts/cVariantSelect.vue'
import cAddressSelect from '@vue/portal/components/parts/cAddressSelect.vue'
import cProductSlideshow from '@vue/portal/components/parts/cProductSlideshow.vue'

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
  data: () => ({
    loading: { add: false, now: false },
    variantModel: false,
    addressModel: false
  }),
  components: { 
    cH, cButton, cVariantSelect,
    cAddressSelect, cProductSlideshow 
  },
  computed: {
    ...mapGetters('customize', ['customizeShop']),
    product() {    
      const { productId } = this.settings
      if(productId) return this.$store.getters['products/productById'](productId)
    },
    address() {
      const { addressId } = this.settings
      if(addressId) return this.$store.getters['customer/customerAddressById'](addressId)
    },
    charges() {
      return this.$store.getters['customer/customerChargesByAddress'](this.addressModel)
    },
    nextCharge() {
      const { charges } = this
      if(charges) {
        if(charges.queued.length > 0) {
          const orderedCharges = _sortItemsByCharge({ items: charges.queued })
          return orderedCharges[0]
        }
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
    variantSoldout() {
      const { variantInventory, variantModel } = this
      if(variantInventory && variantModel.inventory_policy == 'deny') {
        return variantInventory < 0
      }
    },
    createsData() {
      const { addressModel, variantModel, product } = this
      return {
        quantity: 1,
        shopify_variant_id: variantModel.id,
        product_title: product.title,
        shopify_product_id: product.id
      }
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_SIDEBAR']),
    ...mapActions('customer', ['customerCreateOnetimes']),
    async handleAdd() {
      this.loading.add = true
      let date = false
      if(this.nextCharge) date = this.nextCharge.scheduledAt
      const { onetime, error, success } = await this.customerCreateOnetimes({
        addressId: this.addressModel.id,
        creates: _buildCreates({ 
          type: 'onetime', 
          items: [ this.variantModel ],
          values: { date, ...this.createsData }
        })
      })
      this.UI_CLOSE_SIDEBAR()
      this.loading.add = false
    },
    async handleNow() {
      this.loading.now = true
      const { onetime, error, success } = await this.customerCreateOnetimes({
        addressId: this.addressModel.id,
        creates: _buildCreates({ 
          type: 'onetime', 
          items: [ this.variantModel ],
          values: { date: dayjs(), ...this.createsData }
        })
      })
      this.UI_CLOSE_SIDEBAR()
      this.loading.now = false
    }
  },
  created() {
    if(this.product) {
      this.variantModel = this.product.variants[0]
    }
  }
}
</script>

<style lang="scss">
  .c-sidebarAdd__main {
    margin-top: 44px;
    @include flex($align: flex-start, $wrap: nowrap);
    @include media-mobile-down {
      flex-direction: column;
    }
  }
  .c-sidebarAdd__slideshow {
    width: 50%;
    max-width: 550px;
    @include media-mobile-down {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .c-sidebarAdd__info {
    width: 100%;
    max-width: 400px;
    padding-left: 50px;
    @include media-mobile-down {
      padding-left: 0;
    }
  }
  .c-sidebarAdd__title {
    @include media-mobile-down {
      font-size: 30px;
    }
  }
  .c-sidebarAdd__price {
    margin-bottom: 24px;
    color: $color-secondary;
    font-family: $font-heading;
    font-size: 23px;
    font-weight: 700;
    @include media-mobile-down {
      font-size: 20px;
    }
  }
  .c-sidebarAdd__details {
    margin-top: 50px;
  }
  .c-sidebarAdd__detailsHeading {
    margin-bottom: 30px;
  }
  .c-sidebarAdd__detailsContent {
    @include box-card;
  }
  .c-sidebarAdd__detailsBody {
    font-family: $font-body;
    font-size: 20px;
    line-height: 1.5;
    @include media-mobile-down {
      font-size: 17px;
    }
  }
  .c-sidebarAdd__actions {
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #E6E6E6;
  }
  .c-sidebarAdd__button {
    width: 100%;
    margin-bottom: 18px;
    &:last-of-type { margin-bottom: 0; }
    .c-button { padding: 15px 0; }
    .c-button__text {
      font-size: 16px;
      font-weight: 700;
    }
  }
</style>