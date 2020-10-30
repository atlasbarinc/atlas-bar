<template>
  <div :class="_buildModifiers('c-cart', modifiers)">
    <c-overlay class="c-cart__overlay"
      :show="show"
      @close="show = false"
    />
    <c-drawer class="c-cart__drawer"
      :show="show"
      @close="show = false"
      side="right"
    >
      <c-cartHeader />
      <c-cartEmpty v-if="cart.item_count === 0" />
      <c-cartItems v-if="cart.item_count" @changeQuantity="changeQuantity"/>
      <c-cartSummary v-if="cart.item_count" @checkout="checkout" />
    </c-drawer>
  </div>
</template>

<script>
import cOverlay from '@shared/components/core/cOverlay.vue'
import cDrawer from '@shared/components/core/cDrawer.vue'
import cCartHeader from './cart/cCartHeader.vue'
import cCartItems from './cart/cCartItems.vue'
import cCartSummary from './cart/cCartSummary.vue'
import cCartEmpty from './cart/cCartEmpty.vue'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { 
    cOverlay, cDrawer,
    cCartHeader,
    cCartItems,
    cCartSummary,
    cCartEmpty
  },
  data: () => ({ show: false }),
  computed: {
    cart() {
      return this.$store.getters['cart']
    }
  },
  methods: {
    hasProp(properties, propKey) {
      return Object.keys(properties).some(key => key.toLowerCase().indexOf(propKey.toLowerCase()) !== -1 )
    },
    cartContainProp(propKey) {
      return this.cart.items.some((item) => {
        return this.hasProp(item.properties, propKey)
      })
    },
    updateCartCount() {
      const count = this.cart.items.reduce((total, item) => {
        return item.properties.bundle_type && item.properties.bundle_type === 'child' ? total : total + item.quantity
      }, 0)
      const cartCount = document.querySelector('[data-cart-count]')
      cartCount.innerHTML = count
      if (count > 0) {
        cartCount.classList.remove('u-hide')
      } else {
        cartCount.classList.add('u-hide')
      }
    },
    async validateBundleInCart(json) {
      const queue = []
      json.items.forEach((item) => {
        const hasType = this.hasProp(item.properties, 'bundle_type')
        const hasId = this.hasProp(item.properties, 'bundle_id')
        if (!hasType && !hasId) return

        if ((hasType && !hasId) || (!hasType && hasId)) {
          // If Bundle Type but no Bundle ID, remove it.
          // If Bundle ID but no Bundle Type, remove it.
          queue.push(item.key)
        }

        const bundleType = item.properties.bundle_type
        const bundleId = item.properties.bundle_id

        if (bundleType === 'parent') {
          const children = json.items.filter(item => item.properties.bundle_type === 'child' && item.properties.bundle_id === bundleId)
          // Remove Parent with no Children
          if (!children) queue.push(item.key)

          // Remove Parent and Children if not matching quantities (verify with property?)
          const quantity = children.reduce((total, child) => {
            return total + child.quantity
          }, 0)
          if (quantity !== 15 && quantity !== 30) {
            queue.push(item.key)
            children.forEach(child => queue.push(child.key))
          }
        }
        if (bundleType === 'child') {
          // Remove Children with no Parent
          const hasParent = json.items.some(item => item.properties.bundle_type === 'parent' && item.properties.bundle_id === bundleId)
          if (!hasParent) queue.push(item.key)
        }
      })

      if (queue.length) {
        // Remove items and get new cart.
        for (const job of queue) {
          await fetch('/cart/change.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({ id: job, quantity: 0 })
          })
        }
        this.getCart()
      }
    },
    async validateBundleInApp(discount) {
      // Request cart data from /cart?view=bundle
      const hashResponse = await fetch('/cart?view=bundle') 
      const hash = await hashResponse.json()
      hash.discount = discount 
      hash.token = this.cart.token

      // Send data to app
      const appResponse = await fetch(`${window.Scoutside.api.bundle_url}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hash)
      })
      const json = await appResponse.json()

      if (json.token) return json.token
      this.getCart()
      return false
    },
    async getCart() {
      const response = await fetch('/cart.js')
      const json = await response.json()

      // Check Bundle Structure
      await this.validateBundleInCart(json)
      this.$store.commit('setCart', json)
    },
    async changeQuantity({ id, quantity }) {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ id, quantity })
      })
      const json = await response.json()

      // Check Bundle Structure
      this.validateBundleInCart(json)

      this.$store.commit('setCart', json)
    },
    async checkout() {
      const hasSubscription = this.cartContainProp('subscription')
      const hasBundle = this.cartContainProp('bundle_id')
      const discount = await cookies.get('ab_discount')
      if (hasSubscription) {
        if (hasBundle) {
          // Check Bundle Structure
          const token = await this.validateBundleInApp(discount)
          if (token) window.location = `https://checkout.rechargeapps.com/r/checkout/${token}?myshopify_domain=${window.Shopify.shop}`
          return
        }
        let rechargeURL = `https://checkout.rechargeapps.com/r/checkout?myshopify_domain=${window.Shopify.shop}&cart_token=${this.cart.token}`
        if (discount) rechargeURL = `${rechargeURL}&discount_code=${discount}`
        window.location = rechargeURL
      } else {
        let shopifyURL = '/checkout'
        if (discount) shopifyURL = `${shopifyURL}?discount=${discount}`
        window.location = shopifyURL
      }
    },
    async addToCart(event) {
      event.preventDefault()

      const id = event.target.querySelector('[name="id"]').value
      const quantity = event.target.querySelector('[name="quantity"]').value
      const data = { items: [{ id, quantity }]}

      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      // Activate Cart Drawer
      this.show = true
    },
    async addTrialToCart(event) {
      event.preventDefault()
      const id = event.target.querySelector('[name="id"]').value
      if (this.cart.items.some(item => item.id == id)) {
        this.show = true
        return
      }
      const quantity = event.target.querySelector('[name="quantity"]').value
      const bundle_parent = window.Scoutside.trial.parent
      const bundle_items = window.Scoutside.trial.children.map((child) => {
        const child_item = window.Scoutside.bundle.items.products.find(product => product.product_id === child.id)
        return { id: child_item.id, qty: child.qty }
      })
      const bundle_id = Date.now()
      const bundle = []
      bundle.push(bundle_id)
      // Push Bundle Parent
      bundle.push([
        bundle_parent.id,
        bundle_parent.sub_price,
      ].join('|'))
      // Push Bundle Children
      bundle_items.forEach((item) => {
        bundle.push([
          item.id,
          item.qty,
        ].join('|'))
      })
      const data = {
        items: [
          {
            id,
            quantity,
            properties: {
              subscription_id: id,
              shipping_interval_unit_type: window.Scoutside.trial.unit,
              shipping_interval_frequency: window.Scoutside.trial.frequency,
              charge_delay: window.Scoutside.trial.frequency,
              recurring_bundle: btoa(bundle.join('||')),
              _recurring_frequency: bundle_parent.frequency,
              _recurring_unit: bundle_parent.unit,
              _recurring_size: bundle_parent.size,
              _recurring_title: encodeURI(bundle_parent.title),
              _recurring_type: encodeURI(bundle_parent.type),
              _recurring_image: bundle_parent.image
            }
          }
        ]
      }

      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      await this.getCart()
      this.checkout()
    },
    setDiscountCookie() {
      const params = window.location.search ? window.location.search.substring(1) : false
      if (params) {
        const paramsArray = params.split('&')
        paramsArray.forEach(param => {
          const split = param.split('=')
          if (split[0] === 'discount' && split[1]) {
            cookies.set('ab_discount', split[1], {
              path: '/',
              maxAge: 24*60*60
            })
          }
        })
      }
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        const body = document.querySelector('[data-body]')
        if(val) this.getCart()
        if(val) body.classList.add('o-body--noScroll')
        else body.classList.remove('o-body--noScroll')
      }
    },
    cart: {
      handler() {
        this.updateCartCount()
      }
    }
  },
  async mounted() {
    const cartTriggers = document.querySelectorAll('[data-cart-trigger]')
    cartTriggers.forEach(trigger => trigger.addEventListener('click', () => {
      this.show = !this.show
    }))

    document.addEventListener('cart:open', () => this.show = true)

    document.querySelectorAll('[data-add-form]').forEach((form) => {
      form.addEventListener('submit', this.addToCart)
    })

    document.querySelectorAll('[data-trial-form]').forEach((form) => {
      form.addEventListener('submit', this.addTrialToCart)
    })

    this.setDiscountCookie()

    await this.getCart()

    const params = window.location.search ? window.location.search.substring(1) : false
    if (params) {
      const paramsArray = params.split('&')
      paramsArray.forEach(param => {
        const split = param.split('=')
        if (split[0] === 'cart') {
          this.show = true
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .c-cart__drawer {
    @include flex($direction: column, $align: stretch, $wrap: nowrap);
    background-color: $color-white;
    z-index: $z-index-sidebar;

    @include media-tablet-up {
      width: 423px;
    }
  }
</style>