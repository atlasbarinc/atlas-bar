<template>
  <div :class="_buildModifiers('c-sidebarFlavors', modifiers)"
    v-if="content"
  >
    <div class="c-sidebarFlavors__top">
      <c-p class="c-sidebarFlavors__address"
        tag="address"
        level="1"
        v-if="address"
        :text="_buildAddress({
          address,
          options: {
            hiddenFields: ['name', 'country'],
            provinceName: 'short',
            flatten: true
          }
        })"
      />
    </div>
    <div class="c-sidebarFlavors__main">
      <div class="c-sidebarFlavors__gridContainer">
        <c-bundleFilter class="c-sidebarFlavors__filters"
          @setFilter="setFilter"
          :activeFilter="activeFilter"
          :filters="filters"
        />
        <div class="c-sidebarFlavors__productGrid">
          <c-bundleProduct v-for="product in products" :key="product.id"
            @addProduct="addProduct"
            @decreaseQuantity="decreaseQuantity"
            @increaseQuantity="increaseQuantity"
            @changeQuantity="changeQuantity"
            @openModal="openModal(product)"
            :bestSellerImage="bundleContent.images.best_seller"
            :isAvailable="isAvailable(product)"
            :isDisabled="isFull"
            :isInBox="isInBox(product)"
            :product="product"
            :quantity="getQuantityInBox(product)"
            :show="activeFilter ? product.tags.includes(activeFilter) : true"
            :showNutrition="true"
          />
        </div>
      </div>

      <div class="c-sidebarFlavors__aside">
        <c-bundleBox
          @addProduct="addProduct"
          @removeProduct="removeProduct"
          @decreaseQuantity="decreaseQuantity"
          @increaseQuantity="increaseQuantity"
          @changeQuantity="changeQuantity"
          @clearBox="clearBox"
          @saveBox="saveBox"
          @swapParent="swapParent"
          @applyPrebuilt="applyPrebuilt"
          :bundleSize="bundleSize"
          :totalQuantity="totalQuantity"
          :isFull="isFull"
          :box="box"
          :parent="size"
          :parents="sizes.products"
          :fullMessage="boxFullMessage"
          :prebuilts="prebuilts"
        />
      </div>
    </div>
    <c-bundleIngredients
      @addProduct="addProductFromModal"
      @closeModal="showModal = false"
      :item="processedModalItem"
      :show="showModal" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { _buildUpdates } from '@vue/portal/utils'

import cP from '@shared/components/core/cP.vue'
import cSvg from '@shared/components/core/cSvg.vue'
import cBundleFilter from '@vue/bundle/components/parts/cBundleFilter.vue'
import cBundleProduct from '@vue/bundle/components/parts/cBundleProduct.vue'
import cBundleBox from '@vue/bundle/components/parts/cBundleBox.vue'
import cBundleIngredients from '@vue/bundle/components/parts/cBundleIngredients.vue'

export default {
  props: {
    settings: {
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
    loading: { save: false },
    status: false,
    activeFilter: null,
    box: [],
    size: {},
    boxFullMessage: 'Save Changes',
    showModal: false,
    modalItem: null
  }),
  components: {
    cP, cSvg,
    cBundleFilter, cBundleProduct, cBundleBox, cBundleIngredients
  },
  computed: {
    ...mapGetters('customize', ['customizeShop']),
    bundleContent() {
      return this.$store.getters['bundle/contentByKey']('items')
    },
    bundleSize() {
      return this.size.size
    },
    filters() {
      return this.bundleContent.filters.map(filter => filter.trim())
    },
    products() {
      return this.$store.getters['products/productsByIds'](this.content.flavors_collection)
    },
    sizes() {
      return this.$store.getters['bundle/contentByKey']('sizes')
    },
    multiplier() {
      return this.bundleSize / Math.min(...this.sizes.products.map(size => size.size))
    },
    prebuilts() {
      return this.$store.getters['bundle/contentByKey']('prebuilts')
    },
    item() {
      const { itemId, resource } = this.settings
      const key = resource == 'subscription' ? 'Subscription' : 'Onetime'
      return this.$store.getters[`customer/customer${key}ById`](itemId)
    },
    address() {
      return this.$store.getters['customer/customerAddressById'](this.item.addressId)
    },
    totalQuantity() {
      return this.box.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    },
    isFull() {
      return this.bundleSize === this.totalQuantity
    },
    processedModalItem() {
      if (this.modalItem === null) return null
      const nutritionLabel = this.getMetafield(this.modalItem, 'images', 'nutrition_label')
      const carbDetails = this.getMetafield(this.modalItem, 'details', 'carb_details')
      const item = {}
      item.id = this.modalItem.variants[0].id
      item.product_id = this.modalItem.id
      item.title = this.modalItem.title
      item.description = this.modalItem.body
      item.primary_color = this.getMetafield(this.modalItem, 'details', 'primary_color')
      item.secondary_color = this.getMetafield(this.modalItem, 'details', 'secondary_color')
      item.total_carbs = this.getMetafield(this.modalItem, 'details', 'total_carbs')
      item.net_carbs = this.getMetafield(this.modalItem, 'details', 'net_carbs')
      item.carb_details = carbDetails ? JSON.parse(carbDetails) : false
      item.ingredients = this.getMetafield(this.modalItem, 'details', 'ingredients')
      item.nutrition_label = nutritionLabel ? JSON.parse(nutritionLabel)[0].cloudinary_src : false
      item.images = this.modalItem.images.map(image => {
        return {
          'modal_2x': image,
          'modal_1x': image
        }
      })
      return item
    }
  },
  methods: {
    openModal(product) {
      this.showModal = true
      this.modalItem = product
    },
    addProductFromModal() {
      this.addProduct(this.processedModalItem.product_id, this.getQuantityInBox(this.modalItem) + 1)
      this.showModal = false
    },
    setFilter(value) {
      this.activeFilter = value
    },
    getMetafield(product, namespace, key) {
      const metafield = product.metafields.find(field => {
        return field.namespace === namespace && field.key === key
      })
      return metafield ? metafield.value : false
    },
    getMetafieldImage(product, namespace, key, append) {
      const metafield = this.getMetafield(product, namespace, key)
      return metafield ? JSON.parse(metafield)[0].cloudinary_src + append : false
    },
    isAvailable(product) {
      const inventory = this.$store.getters['products/productsInventoryById'](product.id)
      return inventory ? inventory.available : false
    },
    isInBox(product) {
      return this.box.some(item => product.id === item.product_id)
    },
    getQuantityInBox(product) {
      const item = this.box.find(item => product.id === item.product_id)
      return item ? item.quantity : 0
    },
    addProduct(id, quantity) {
      if(this.isFull) return
      const box = this.box
      const index = this.box.findIndex(item => item.product_id === id)
      if (index !== -1) {
        this.box[index].quantity = quantity
      } else {
        const product = this.products.find(product => product.id === id)
        this.box.push({
          id: product.variants[0].id,
          product_id: product.id,
          quantity: quantity || 1,
          title: product.title,
          image: this.getMetafieldImage(product, 'images', 'wrapper', '')
        })
      }
      this.box = [...box]
    },
    removeProduct(id) {
      const box = this.box
      const index = this.box.findIndex(item => item.product_id === id)
      if (index > -1) box.splice(index, 1)
      this.box = [...box]
    },
    decreaseQuantity(id) {
      const item = this.box.find(item => item.product_id === id)
      item.quantity--
      if (item.quantity < 1) {
        this.removeProduct(id)
      } else {
        this.addProduct(id, item.quantity)
      }
    },
    increaseQuantity(id) {
      const item = this.box.find(item => item.product_id === id)
      item.quantity++
      this.addProduct(id, item.quantity)
    },
    changeQuantity(id, value) {
      const item = this.box.find(item => item.product_id === id)
      const remaining = this.bundleSize - this.totalQuantity
      const quantity = (this.totalQuantity - item.quantity + value) > this.bundleSize ? (remaining + item.quantity) : value
      if (quantity < 1) {
        this.removeProduct(item.id)
      } else {
        this.addProduct(item.id, quantity)
      }
    },
    swapParent(newParent) {
      let i = 0
      while(this.totalQuantity > newParent.size) {
        if (this.box[i].quantity > 1) this.decreaseQuantity(this.box[i].product_id)
        i === this.box.length - 1 ? i = 0 : i++
      } 
      this.size = newParent
      this.size.price = newParent.sub_price
      this.size.quantity = this.item.quantity
    },
    applyPrebuilt(title) {
      const bundle = this.prebuilts.find(prebuilt => prebuilt.title === title)
      this.clearBox()
      let unavailableQuantity = 0;
      bundle.items.forEach(item => {
        const newItem = this.products.find(product => product.id == item.id)
        if (newItem && this.isAvailable(newItem)) {
          this.addProduct(newItem.id, Math.floor(item.qty * this.multiplier))
        } else {
          unavailableQuantity = unavailableQuantity + Math.floor(item.qty * this.multiplier)
        }
      })
      if (unavailableQuantity && this.box) {
        for (let i = 0; unavailableQuantity > 0; unavailableQuantity--) {
          this.increaseQuantity(this.box[i].product_id)
          i === this.box.length - 1 ? i = 0 : i++
        }
      }
    },
    clearBox() {
      this.box = []
    },
    async saveBox() {
      this.boxFullMessage = 'Saving...'
      const requestData = {
        oldBundle: {},
        newBundle: {},
        domain: window.Shopify.shop
      }
      requestData.addressId = this.address.id
      requestData.oldBundle.parent = {
        id: this.item.variantId,
        subscription_id: this.item.id,
        next_charge_scheduled_at: this.item.next_charge_scheduled_at,
        order_interval_unit: this.item.order_interval_unit,
        order_interval_frequency: this.item.order_interval_frequency,
        charge_interval_frequency: this.item.charge_interval_frequency,
        bundle_id: this.item.properties.find(property => property.name === "bundle_id").value
      }
      requestData.oldBundle.children = this.settings.children.map((child) => {
        return { subscription_id: child.id }
      })
      requestData.newBundle.parent = {
        id: this.size.id,
        price: this.size.price,
        quantity: this.size.quantity,
        bundle: this.size.bundle,
        hash: this.size.hash
      }
      requestData.newBundle.children = this.box.map((item) => {
        return {
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity
        }
      })

      const editRequest = await fetch(`${window.Scoutside.api.bundle_url}/api/recharge/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      if(editRequest.status === 200) {
        // Success Message
        this.boxFullMessage = 'Save Complete!'
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        // Error Handling
        this.boxFullMessage = 'Please Try Again'
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    }
  },
  watch: {
  },
  created() {
    const sizeProduct = this.settings.size ? this.settings.size : this.sizes.products.find(product => product.id == this.item.variantId)
    this.box = this.settings.children.map((child) => {
      const item = this.products.find(product => product.id == child.productId)
      return {
        id: child.variantId,
        product_id: item.id,
        quantity: child.quantity,
        title: item.title,
        image: this.getMetafieldImage(item, 'images', 'wrapper', '')
      }
    })
    this.size.id = this.settings.size ? this.settings.size.id : this.item.variantId
    this.size.price = this.settings.size ? this.settings.size.sub_price : this.item.price
    this.size.quantity = this.item.quantity
    this.size.size = sizeProduct.size
    this.size.bundle = sizeProduct.bundle
    this.size.hash = sizeProduct.hash
  }
}
</script>

<style lang="scss">
.c-sidebarFlavors__top {
  margin-bottom: 30px;
}

.c-sidebarFlavors__address {
  font-size: 20px;
  text-transform: capitalize;
  margin: 0;
}

.c-sidebarFlavors__main {
  margin-left: -15px;
  margin-right: -15px;
  @include media-tablet-up {
    align-items: flex-start;
    display: flex;
    margin: 0;
  }
}

.c-sidebarFlavors__gridContainer {
  padding: 20px 20px 140px;
  @include media-tablet-up {
    padding: 0;
    width: 100%;
  }
}

.c-sidebarFlavors__filters {
  &.c-bundleFilter__container {
    background-color: $color-sidebar;
  }

  .c-bundleFilter__options {
    @include media-mobile-down {
      background-color: $color-sidebar;
    }
  }
}

.c-sidebarFlavors__productGrid {
  display: grid;
  grid-gap: 40px 20px;
  grid-template-columns: repeat(auto-fill, 156px);
  justify-content: center;
  margin-top: 40px;

  @include media-tablet-up {
    grid-template-columns: repeat(auto-fill, 236px);
  }
}

.c-sidebarFlavors__aside {
  @include media-tablet-up {
    flex-shrink: 0;
    margin-left: 47px;
    position: sticky;
    top: 70px;
    width: 393px;
    z-index: 10;
  }

  .c-bundleBox__progressBar--isFull {
    background-color: $color-primary;
  }
}

</style>