<template>
  <li class="c-bundle__item" v-show="show">
    <div class="c-bundle__item-best-seller" v-if="bestSeller"><img :src="content.images.best_seller" alt="Best Seller"></div>
    <div class="c-bundle__item-background" :style="`background-color: ${item.primary_color}`">
      <ul class="c-bundle__item-icons">
        <li class="c-bundle__item-icon" v-for="badge in badges">
          <c-svg :name="badge.icon" /><span class="c-bundle__item-icon-tooltip">{{ badge.label }}</span></span>
        </li>
      </ul>
      <div class="c-bundle__item-image">
        <img :src="item.wrapper_image" :alt="item.title">
        <img class="c-bundle__item-image-hover" :src="item.bar_image" alt="">
      </div>
      <p class="c-bundle__item-title">{{ item.title }}</p>
      <p class="c-bundle__item-description">{{ item.short_description }}</p>
      <div class="c-bundle__item-action-container" v-if="!item.available">
        <button :class="_buildModifiers('c-bundle__item-action-atc', ['isSoldOut'])" type="button" disabled :style="`background-color: ${item.secondary_color}; border-color: ${item.secondary_color}`">
          <span>Sold Out</span>
        </button>
      </div>
      <div class="c-bundle__item-action-container" v-else-if="!bundleContainsItem">
        <button class="c-bundle__item-action-atc" type="button" @click="addProduct" :disabled="isDisabled">
          <span><c-svg name="plusThick" /> Add To Box</span>
        </button>
      </div>
      <div class="c-bundle__item-action-container" v-else>
        <c-quantity-selector
          @decreaseQuantity="decreaseQuantity"
          @increaseQuantity="increaseQuantity"
          @changeQuantity="changeQuantity"
          :quantity="quantity"
          :isDisabled="isDisabled" />
      </div>
      <button class="c-bundle__item-small-link" @click="openModal">View Ingredients & Nutrition Info</button>
    </div>
  </li>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'
import cQuantitySelector from '@shared/components/parts/cQuantitySelector.vue'

export default {
  props: {
    item: Object,
    quantity: Number,
    show: Boolean,
    bestSeller: Boolean,
    bundleContainsItem: Boolean,
    isDisabled: Boolean
  },
  components: { cSvg, cQuantitySelector },
  computed: {
    content() {
      return this.$store.getters['contentByKey']('items')
    },
    badges() {
      return this.item.tags.map(tag => {
        if (tag.toLowerCase() === 'plant-based') return { icon: 'plant', label: 'Plant-Based' }
        if (tag.toLowerCase() === 'contains peanuts') return { icon: 'peanut', label: 'Contains Peanuts' }
        if (tag.toLowerCase() === 'contains almonds') return { icon: 'almond', label: 'Contains Almonds' }
        if (tag.toLowerCase() === 'grass-fed whey') return { icon: 'cow', label: 'Grass-Fed Whey' }
        return false
      }).filter(tag => tag)
    }
  },
  methods: {
    addProduct() {
      this.$emit('addProduct')
    },
    decreaseQuantity() {
      this.$emit('decreaseQuantity')
    },
    increaseQuantity() {
      this.$emit('increaseQuantity')
    },
    changeQuantity($event) {
      this.$emit('changeQuantity', $event)
    },
    openModal() {
      this.$emit('openModal')
    }
  }
}
</script>

<style lang="scss">
.c-bundle__item {
  color: $color-white;
  padding-top: 90px;  
  position: relative;
  text-align: center;
}

.c-bundle__item-best-seller {
  position: absolute;
  right: 0;
  top: 0;
  width: 37px;

  @include media-tablet-up {
    width: 50px;
  }
}

.c-bundle__item-background {
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

.c-bundle__item-icons {
  position: absolute;
  right: 8px;
  top: 8px;

  @include media-tablet-up {
    right: 12px;
    top: 16px;
  }
}

.c-bundle__item-icon {
  @include flex($justify: center);
  border: 1px solid $color-white;
  border-radius: 9999px;
  height: 26px;
  margin-bottom: 8px;
  opacity: 0.5;
  padding: 4px;
  position: relative;
  width: 26px;

  &:hover {
    opacity: 1;
  }

  .c-svg {
    height: 100%;
    width: 100%;
  }
}

.c-bundle__item-icon-tooltip {
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

  .c-bundle__item-icon:hover & {
    display: block;
  }
}

.c-bundle__item-image {
  margin-top: -90px;
  position: relative;
  width: 76px;

  @include media-tablet-up {
    width: 84px;
  }
}

.c-bundle__item-image-hover {
  left: 50%;
  position: absolute;
  z-index: -1;
  top: 10px;
  transform: translateX(-50%);
  transition: transform 0.3s;
  width: 80%;

  .c-bundle__item-background:hover & {
    transform: translateX(-50%) translateY(-30px);
  }
}

.c-bundle__item-title {
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

.c-bundle__item-description {
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

.c-bundle__item-action-container {
  @include flex($justify: center, $wrap: nowrap);
  margin-top: auto;
  margin-bottom: 14px;
  width: 100%;

  @include media-tablet-up {
    margin-top: 0;
    width: 137px;
  }
}

.c-bundle__item-action-atc {
  @include flex($justify: center, $wrap: nowrap);
  appearance: none;
  background-color: transparent;
  border: 2px solid $color-white;
  border-radius: 36px;
  color: $color-white;
  font-family: $font-heading;
  font-size: 14px;
  font-weight: 700;
  height: 40px;
  letter-spacing: -0.01em;
  line-height: 1.2;
  max-width: 137px;
  padding: 0 13px;
  width: 100%;

  &:hover {
    background-color: $color-white;
    color: $color-primary;
  }

  .c-svg {
    height: 11px;
    margin-right: 4px;
    width: 11px;
  }
}

.c-bundle__item-action-atc--isSoldOut:hover {
  color: $color-white;
  cursor: default;
}

.c-bundle__item-small-link {
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