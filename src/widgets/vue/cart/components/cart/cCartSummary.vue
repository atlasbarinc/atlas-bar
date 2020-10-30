<template>
  <div class="c-cart-summary">
    <div class="c-cart-summary__row">
      <span>Shipping</span>
      <span>FREE!</span>
    </div>
    <div class="c-cart-summary__row c-cart-summary__row--total">
      <span>Order Total</span>
      <span>${{ _formatMoney({ amount: totalPrice, cents: true }) }}</span>
    </div>
    <button class="c-cart-summary__button c-button c-button--isDefault c-button--isSecondary" @click="checkout"><span>Continue To Checkout <c-svg name="arrow" /></span></button>
    <p class="c-cart-summary__disclaimer">Taxes & Discounts Calculated at Checkout</p>
  </div>
</template>

<script>
  import cSvg from '@shared/components/core/cSvg.vue'

  export default { components: { cSvg },
    computed: {
      cart() {
        return this.$store.getters['cart']
      },
      totalPrice() {
        const childPrices = this.cart.items.reduce((total, item) => {
          return item.properties.bundle_type && item.properties.bundle_type === 'child' ? total + item.line_price : total
        }, 0)
        return this.cart.total_price - childPrices
      }
    },
    methods: {
      checkout() {
        this.$emit('checkout')
      }
    }
  }
</script>

<style lang="scss">
  .c-cart-summary {
    border-top: 1px solid $color-hr;
    flex-shrink: 0;
    margin-top: auto;
    padding: 20px 20px 49px;

    @include media-tablet-up {
      padding: 37px 45px 39px 25px;
    }
  }

  .c-cart-summary__row {
    @include flex($justify: space-between);
    font-family: $font-heading;
    font-size: 14px;
    line-height: 1.2;
    margin-bottom: 10px;
    padding-left: 20px;

    @include media-tablet-up {
      padding-left: 0;
    }

    &--total {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 24px;
    }
  }

  .c-cart-summary__disclaimer {
    font-family: $font-heading;
    font-size: 14px;
    line-height: 1.2;
    margin-bottom: 0;
    text-align: center;
  }

  .c-cart-summary__button {
    width: 100%;
  }
</style>