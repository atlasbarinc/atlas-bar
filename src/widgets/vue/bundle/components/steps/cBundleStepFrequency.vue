<template>
  <div class="c-bundle__split-container">
    <div class="c-bundle__split-image" :style="`background-image: url(${this.content.background})`"></div>
    <div class="c-bundle__split-content">
      <h1 class="c-bundle__header c-h3 u-textCenter">{{ content.title }}</h1>
      <p class="c-bundle__description-text u-textCenter" v-if="content.description">{{ content.description }}</p>
      <div class="c-bundle__sets">
        <div :class="_buildModifiers('c-bundle__set', [subscription ? 'isActive' : ''])" @click="subscription = true">
          <span class="c-bundle__popular">Most Popular</span>
          <input class="c-bundle__hidden-radio" type="radio" :value="true" v-model="subscription">
          <div class="c-bundle__set-header"><span class="c-bundle__set-title">Subscribe & Save</span><span class="c-bundle__set-price">${{ parent.sub_price }}</span><span class="c-bundle__set-radio"></span></div>
          <ul class="c-bundle__set-info-list">
            <li class="c-bundle__set-info">{{ parent.size }} Bars</li>
            <li class="c-bundle__set-info">${{ barSubAverage(parent) }} Per Bar</li>
          </ul>
          <ul class="c-bundle__intervals" v-if="subscription">
            <li :class="_buildModifiers('c-bundle__interval', [interval == frequency ? 'isActive' : ''])" v-for="interval in frequencies">
              <input :id="`interval-${interval}`" class="c-bundle__hidden-radio" type="radio" :value="interval" v-model="frequency">
              <label :for="`interval-${interval}`" class="c-bundle__interval-label">Every <span class="c-bundle__interval-label-frequency">{{ interval }} {{ unit }}</span></label>
            </li>
          </ul>
        </div>
        <div :class="_buildModifiers('c-bundle__set', [!subscription ? 'isActive' : ''])" @click="subscription = false">
          <input class="c-bundle__hidden-radio" type="radio" :value="false" v-model="subscription">
          <div class="c-bundle__set-header"><span class="c-bundle__set-title">One-Time Purchase</span><span class="c-bundle__set-price">${{ parent.price }}</span><span class="c-bundle__set-radio"></span></div>
          <ul class="c-bundle__set-info-list">
            <li class="c-bundle__set-info">{{ parent.size}} Bars</li>
            <li class="c-bundle__set-info">${{ barAverage(parent) }} Per Bar</li>
          </ul>
        </div>
      </div>
      <c-button class="c-bundle__button"
        :disabled="loading"
        :loading="loading"
        :modifiers="['isDefault', 'isSecondary']"
        :text="''"
        @click="checkout">
        Checkout <c-svg name="arrow" />
      </c-button>
      <ul class="c-bundle__icons">
        <li class="c-bundle__icon"><c-svg name="truck" />Free Shipping</li>
        <li class="c-bundle__icon"><c-svg name="calendar" />Skip or Cancel Anytime</li>
        <li class="c-bundle__icon"><c-svg name="heart" />Happiness Guaranteed</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import cSvg from '@shared/components/core/cSvg.vue'
  import cButton from '@shared/components/core/cButton.vue'
  import Cookies from 'universal-cookie'
  const cookies = new Cookies()

  export default {
    components: { cSvg, cButton },
    data: () => ({
      loading: false
    }),
    computed: {
      content() {
        return this.$store.getters['contentByKey']('frequency')
      },
      subscription: {
        get() {
          return this.$store.getters['bundleByKey']('subscription')
        },
        set(value) {
          this.$store.commit('setSubscription', value)
        }
      },
      frequency: {
        get() {
          return this.$store.getters['bundleByKey']('frequency')
        },
        set(value) {
          this.$store.commit('setFrequency', value)
        }
      },
      sizes() {
        const sizes = this.$store.getters['contentByKey']('sizes')
        return sizes.products
      },
      size() {
        return this.$store.getters['bundleByKey']('size')
      },
      parent() {
        return this.sizes.find((size) => size.size === this.size)
      },
      frequencies() {
        return this.parent.subscription_frequencies
      },
      unit() {
        return this.parent.subscription_unit
      }
    },
    methods: {
      barAverage(item) {
        return (item.price / item.size).toFixed(2)
      },
      barSubAverage(item) {
        return (item.sub_price / item.size).toFixed(2)
      },
      async checkout() {
        this.loading = true
        const discount = await cookies.get('ab_discount')
        const bundle = this.$store.getters['bundle']

        // Add products to cart (one-time vs subscription)
        const bundleId = Date.now()
        const cartData = {}
        cartData.items = bundle.items.reverse().map(item => { 
          const obj = {
            id: item.id,
            quantity: item.quantity,
            properties: {
              bundle_id: bundleId,
              bundle_type: 'child'
            }
          }
          if (bundle.subscription) {
            obj.properties.shipping_interval_frequency = bundle.frequency
            obj.properties.shipping_interval_unit_type = this.unit.toLowerCase().replace('s', '')
            obj.properties.subscription_id = item.subscription_id
          }
          return obj
        })
        const parent = {
          id: bundle.subscription ? this.parent.subscription_variant_id : this.parent.id,
          quantity: 1,
          properties: {
            bundle_id: bundleId,
            bundle_type: 'parent'
          }
        }
        if (bundle.subscription) {
          parent.properties.shipping_interval_frequency = bundle.frequency
          parent.properties.shipping_interval_unit_type = this.unit.toLowerCase().replace('s', '')
          parent.properties.subscription_id = this.parent.subscription_id
        }
        cartData.items.push(parent)

        const addRequest = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cartData)
        })
        const cartResponse = await fetch('/cart.js')
        const cartJSON = await cartResponse.json()

        if (bundle.subscription || cartJSON.items.some(item => Object.keys(item.properties).includes('subscription_id'))) {
          // Request cart encrypted data
          const cartRequest = await fetch('/cart?view=bundle')
          const bundleData = await cartRequest.json()
          bundleData.discount = discount
          bundleData.token = cartJSON.token

          // Send data to Bundle App
          const bundleRequest = await fetch(`${window.Scoutside.api.bundle_url}/api/cart`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bundleData)
          });
          const response = await bundleRequest.json();

          // Direct to Recharge Checkout
          if (response.token) {
            window.location = `https://checkout.rechargeapps.com/r/checkout/${response.token}?myshopify_domain=${bundleData.domain}`
          }
        } else {
          let shopifyURL = '/checkout'
          if (discount) shopifyURL = `${shopifyURL}?discount=${discount}`
          window.location = shopifyURL
        }
      }
    }
  }
</script>

<style lang="scss">
.c-bundle__sets {
  width: 100%;

  @include media-tablet-up {
    margin: auto 0;
    max-width: 500px;
  }
}
.c-bundle__set {
  background-color: $color-white;
  border: 2px solid $color-primary;
  border-radius: 20px;
  margin-bottom: 30px;
  padding: 20px 17px;
  position: relative;
  width: 100%;
  @include media-tablet-up {
    padding: 30px 27px;
  }
  &--isActive {
    border-color: $color-secondary;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  &:last-child {
    @include media-tablet-up {
      margin-bottom: 0;
    }
  }
}
.c-bundle__intervals {
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 23px;
  padding: 0 7px;
  @include media-tablet-up {
    grid-gap: 18px;
    grid-template-columns: repeat(4, 1fr);
  }
}
.c-bundle__interval {
  @include flex($justify: center, $wrap: nowrap);
  background-color: $color-white;
  border: 1px solid $color-primary;
  border-radius: 7px;
  color: $color-primary;
  font-family: $font-heading;
  font-size: 12px;
  font-weight: 700;
  height: 45px;
  letter-spacing: 0.05em;
  padding: 4px;
  text-align: center;
  text-transform: uppercase;
  &--isActive {
    background-color: $color-primary;
    color: $color-white;
  }
}
.c-bundle__interval-label-frequency {
  @include media-tablet-up {
    display: block;
  }
}
.c-bundle__set-header {
  @include flex($wrap: nowrap);
  font-family: $font-heading;
  font-size: 16px;
  font-weight: 700;
}
.c-bundle__set-title {
  margin-right: auto;
}
.c-bundle__set-price {}
.c-bundle__set-radio {
  border: 1px solid $color-primary;
  border-radius: 9999px;
  height: 20px;
  margin-left: 14px;
  position: relative;
  width: 20px;

  .c-bundle__set--isActive &:after {
    background-color: $color-primary;
    border-radius: 9999px;
    content: '';
    height: 10px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 10px;
  }
}
.c-bundle__set-info-list {
  display: flex;
  font-family: $font-heading;
  font-size: 13px;
}
.c-bundle__set-info {
  &:after {
    content: '•';
    margin: 0 6px;
  }
  &:last-child:after {
    content: none;
  }
}
</style>