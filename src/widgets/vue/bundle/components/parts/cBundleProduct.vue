<template>
  <div class="c-bundleProduct" v-show="show">
    <div class="c-bundleProduct__bestseller" v-if="isBestSeller">
      <img :src="bestSellerImage" alt="Best Seller">
    </div>
    <div class="c-bundleProduct__background" :style="`background-color: ${primaryColor}`">
      <ul class="c-bundleProduct__icons">
        <li class="c-bundleProduct__icon" v-for="badge in badges">
          <c-svg :name="badge.icon" /><span class="c-bundleProduct__tooltip">{{ badge.label }}</span></span>
        </li>
      </ul>
      <div class="c-bundleProduct__image">
        <img :src="wrapperImage" :alt="product.title">
        <img class="c-bundleProduct__imageHover" :src="barImage" alt="">
      </div>
      <p class="c-bundleProduct__title">{{ product.title }}</p>
      <p class="c-bundleProduct__description">{{ shortDescription }}</p>
        <div class="c-bundleProduct__actionContainer" v-if="!isAvailable">
          <button :class="_buildModifiers('c-bundleProduct__actionAdd', ['isSoldOut'])" type="button" disabled :style="`background-color: ${secondaryColor}; border-color: ${secondaryColor}`">
            <span>Sold Out</span>
          </button>
        </div>
        <div class="c-bundleProduct__actionContainer" v-else-if="!isInBox">
          <button class="c-bundleProduct__actionAdd" type="button" @click="addProduct(product.id, 1)" :disabled="isDisabled">
            <span><c-svg name="plusThick" /> Add To Box</span>
          </button>
        </div>
        <div class="c-bundleProduct__actionContainer" v-else>
          <c-quantity-selector
            @decreaseQuantity="decreaseQuantity(product.id)"
            @increaseQuantity="increaseQuantity(product.id)"
            @changeQuantity="changeQuantity(product.id, $event)"
            :quantity="quantity"
            :isDisabled="isDisabled" />
        </div>
        <button class="c-bundleProduct__smallLink" v-if="showNutrition" @click="openModal">View Ingredients & Nutrition Info</button>
      </div>
    </div>
  </div>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'
import cQuantitySelector from '@shared/components/parts/cQuantitySelector.vue'

export default {
  props: {
    bestSellerImage: {
      type: String,
      required: true
    },
    isAvailable: {
      type: Boolean,
      required: true
    },
    isDisabled: {
      type: Boolean,
      required: true
    },
    isInBox: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    },
    showNutrition: {
      type: Boolean,
      default: true
    }
  },
  components: {
    cSvg,
    cQuantitySelector
  },
  computed: {
    isBestSeller() {
      return this.product.tags.includes('Best Seller')
    },
    badges() {
      return this.product.tags.map(tag => {
        if (tag.toLowerCase() === 'plant-based') return { icon: 'plant', label: 'Plant-Based' }
        if (tag.toLowerCase() === 'contains peanuts') return { icon: 'peanut', label: 'Contains Peanuts' }
        if (tag.toLowerCase() === 'contains almonds') return { icon: 'almond', label: 'Contains Almonds' }
        if (tag.toLowerCase() === 'grass-fed whey') return { icon: 'cow', label: 'Grass-Fed Whey' }
        return false
      }).filter(tag => tag)
    },
    primaryColor() {
      return this.getMetafieldValue('details', 'primary_color')
    },
    secondaryColor() {
      return this.getMetafieldValue('details', 'secondary_color')
    },
    barImage() {
      return JSON.parse(this.getMetafieldValue('images', 'bar'))[0].cloudinary_src + 'w_265'
    },
    wrapperImage() {
      return JSON.parse(this.getMetafieldValue('images', 'wrapper'))[0].cloudinary_src + 'w_265'
    },
    shortDescription() {
      return this.getMetafieldValue('details', 'short_description')
    }
  },
  methods: {
    addProduct(id, quantity) {
      this.$emit('addProduct', id, quantity)
    },
    decreaseQuantity(id) {
      this.$emit('decreaseQuantity', id)
    },
    increaseQuantity(id) {
      this.$emit('increaseQuantity', id) 
    },
    changeQuantity(id, value) {
      this.$emit('changeQuantity', id, value)
    },
    openModal() {
      this.$emit('openModal')
    },
    getMetafieldValue(namespace, key) {
      const metafield = this.product.metafields.find(field => field.namespace === namespace && field.key === key)
      return metafield ? metafield.value : false
    }
  }
}
</script>

<style lang="scss">
.c-bundleProduct {
  color: $color-white;
  padding-top: 90px;  
  position: relative;
  text-align: center;
}
.c-bundleProduct__bestseller {
  position: absolute;
  right: 0;
  top: 0;
  width: 37px;

  @include media-tablet-up {
    width: 50px;
  }
}
.c-bundleProduct__background {
  @include flex($direction: column)
  border-radius: 20px;
  height: 100%;
  padding: 0 10px 15px;
  position: relative;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.45);
  }

  @include media-tablet-up {
    padding: 0 30px 29px;
  }
}
.c-bundleProduct__icons {
  position: absolute;
  right: 8px;
  top: 8px;

  @include media-tablet-up {
    right: 12px;
    top: 16px;
  }
}
.c-bundleProduct__icon {
  @include flex($justify: center);
  border: 1px solid $color-white;
  border-radius: 9999px;
  height: 26px;
  margin-bottom: 8px;
  opacity: 0.5;
  padding: 5px;
  position: relative;
  width: 26px;

  &:hover {
    opacity: 1;
  }

  .c-svg {
    width: 100%;
  }
}
.c-bundleProduct__tooltip {
  background-color: $color-primary;
  border-radius: 5px;
  color: $color-white;
  display: none;
  font-size: 12px;
  font-weight: 400;
  line-height: 19px;
  padding: 0 8px;
  position: absolute;
  top: -24px;
  white-space: nowrap;
  z-index: 5;

  &:after {
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 4px solid $color-primary;
    bottom: -4px;
    content: '';
    height: 0;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 0;
  }

  .c-bundleProduct__icon:hover & {
    display: block;
  }
}
.c-bundleProduct__image {
  margin-top: -90px;
  position: relative;
  width: 76px;

  @include media-tablet-up {
    width: 84px;
  }
}
.c-bundleProduct__imageHover {
  left: 50%;
  position: absolute;
  z-index: -1;
  top: 10px;
  transform: translateX(-50%);
  transition: transform 0.3s;
  width: 80%;

  .c-bundleProduct__background:hover & {
    transform: translateX(-50%) translateY(-30px);
  }
}
.c-bundleProduct__title {
  font-family: $font-heading;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.04;
  margin: 10px 0 16px;
  padding: 0 6px;

  @include media-tablet-up {
    font-size: 21px;
  }
}
.c-bundleProduct__description {
  display: none;

  @include media-tablet-up {
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    margin: auto 0;
    padding-bottom: 14px;
  }
}
.c-bundleProduct__actionContainer {
  @include flex($justify: center, $wrap: nowrap);
  margin-top: auto;
  margin-bottom: 14px;
  width: 100%;

  @include media-tablet-up {
    margin-top: 0;
    width: 137px;
  }
}
.c-bundleProduct__actionAdd {
  @include flex($justify: center, $wrap: nowrap);
  appearance: none;
  background-color: transparent;
  border: 2px solid $color-white;
  border-radius: 36px;
  color: $color-white;
  font-family: $font-heading;
  font-size: 14px;
  font-weight: 800;
  height: 40px;
  letter-spacing: -0.01em;
  padding: 0 16px;

  &:hover {
    background-color: $color-white;
    color: $color-primary;
  }

  @include media-tablet-up {
    width: 137px;
  }

  &--isSoldOut:hover {
    color: $color-white;
    cursor: default
  }

  .c-svg {
    margin-right: 4px;
  }
}
.c-bundleProduct__smallLink {
  appearance: none;
  background-color: transparent;
  border: 0 none;
  color: $color-white;
  font-family: $font-heading;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.4;
  text-decoration: underline;

  @include media-tablet-up {
    font-size: 10px;
  }
}
</style>