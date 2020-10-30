<template>
  <ul class="c-cart-items">
    <li v-for="item in items" :class="_buildModifiers('c-cart-item', [
      isBundleType(item.properties, 'child') ? 'isBundleChild' : ''
    ])">
      <div class="c-cart-item__container" v-if="isBundleType(item.properties, 'child')">
        <div class="c-cart-item__image"><img :src="item.featured_image.url" alt=""></div>
        <div class="c-cart-item__details">
          <p class="c-cart-item__label"><span>{{ item.title }}</span></p>
          <p class="c-cart-item__detail">x{{ item.quantity }}</p>
        </div>
      </div>
      <div class="c-cart-item__container" v-else>
        <div class="c-cart-item__image"><img :src="item.featured_image.url" alt=""></div>
        <div class="c-cart-item__details">
          <p class="c-cart-item__label"><span>{{ item.title.replace('Auto renew', '') }}</span><span>${{ _formatMoney({ amount: item.line_price, cents: true }) }}</span></p>
          <p class="c-cart-item__detail" v-if="isBundleType(item.properties, 'parent')">x{{ item.quantity }} <span v-if="hasVariantTitle(item.variant_title)">{{ item.variant_title }}</span></p>
          <p class="c-cart-item__detail" v-if="hasVariantTitle(item.variant_title)">{{ item.variant_title }}</p>
          <p class="c-cart-item__detail">
            <span v-if="isSubscription(item.properties)">Subscription</span>
            <span v-else>One-Time Purchase</span>
          </p>
          <div class="c-cart-item__actions">
            <c-quantitySelector
              v-if="!isBundleType(item.properties, 'parent') && !isTrial(item.properties)"
              :quantity="item.quantity"
              @decreaseQuantity="changeQuantity(item.key, item.quantity - 1)"
              @increaseQuantity="changeQuantity(item.key, item.quantity + 1)"
              @changeQuantity="changeQuantity(item.key, $event)"
            />
            <button type="button" class="c-cart-item__remove" @click="changeQuantity(item.key, 0)">Remove</button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import cQuantitySelector from '@shared/components/parts/cQuantitySelector.vue'

export default {
  components: {cQuantitySelector},
  computed: {
    items() {
      return this.$store.getters['cartByKey']('items')
    }
  },
  methods: {
    hasVariantTitle(title) {
      return title && title.toLowerCase() !== 'default title'
    },
    isSubscription(properties) {
      return properties && Object.keys(properties).some(key => key.toLowerCase().indexOf('subscription') !== -1)
    },
    isBundleType(properties, type) {
      return properties && Object.entries(properties).some((property) => {
        return property[0].toLowerCase() === 'bundle_type' && property[1].toLowerCase() === type.toLowerCase()
      })
    },
    isTrial(properties) {
      return properties && Object.keys(properties).some(key => key.toLowerCase() === 'recurring_bundle')
    },
    changeQuantity(id, quantity) {
      this.$emit('changeQuantity', { id, quantity })
    }
  }
}
</script>

<style lang="scss">
  .c-cart-items {
    overflow-y: auto;
  }

  .c-cart-item {
    border-top: 1px solid $color-hr;

    &:first-child {
      border-top: 0 none;
    }

    &:last-child {
      border-bottom: 1px solid $color-hr;
    }

    &--isBundleChild {
      border: 0 none;
    }
  }

  .c-cart-item__container {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 100px 1fr;
    padding: 32px 20px;

    .c-cart-item--isBundleChild & {
      grid-template-columns: 50px 1fr;
      padding: 10px 20px 10px 70px;
    }
  }

  .c-cart-item__image {
    img {
      display: block;
    }
  }

  .c-cart-item__details {
    @include flex($align: stretch, $direction: column, $wrap: nowrap);
    height: 100%;
    width: 100%;
  }

  .c-cart-item__label {
    @include flex($justify: space-between, $wrap: nowrap);
    font-family: $font-heading;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
    margin: 0 0 4px;
    width: 100%;

    .c-cart-item--isBundleChild & {
      font-size: 14px;
      font-weight: 400;
    }
  }

  .c-cart-item__detail {
    font-family: $font-heading;
    font-size: 14px;
    line-height: 1.4;
    margin: 0 0 4px;
  }

  .c-cart-item__actions {
    @include flex($justify: space-between, $wrap: nowrap);
    margin-top: auto;

    .c-quantitySelector__container {
      background-color: rgba(247, 247, 247, 0.9);
      height: 30px;
      width: 100px;
    }

    .c-quantitySelector__button {
      height: 26px;
      width: 26px;
      
      .c-svg {
        width: 9px;
      }
    }

    .c-quantitySelector__label {
      font-size: 14px;
    }
  }

  .c-cart-item__remove {
    appearance: none;
    background: transparent;
    border: 0 none;
    font-family: $font-heading;
    font-size: 12px;
    font-weight: bold;
    margin-left: auto;
    padding: 0;
    text-decoration: underline;
  }

</style>