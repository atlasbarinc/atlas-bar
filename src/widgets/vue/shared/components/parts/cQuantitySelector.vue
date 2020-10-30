<template>
  <div class="c-quantitySelector__container">
    <button class="c-quantitySelector__button" type="button" @click="decreaseQuantity"><c-svg name="minus" /></button>
    <input class="c-quantitySelector__label" :value="quantity" @input="changeQuantity">
    <button class="c-quantitySelector__button" type="button" @click="increaseQuantity" :disabled="isDisabled"><c-svg name="plus" /></button>
  </div>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'

export default {
  props: {
    quantity: Number,
    isDisabled: Boolean
  },
  components: { cSvg },
  methods: {
    decreaseQuantity() {
      this.$emit('decreaseQuantity')
    },
    increaseQuantity() {
      this.$emit('increaseQuantity')
    },
    changeQuantity(event) {
      const value = Number.isInteger(parseInt(event.target.value)) ? parseInt(event.target.value) : this.quantity
      this.$emit('changeQuantity', value)
      this.$nextTick(() => {
        event.target.value = this.quantity
      })
    }
  }
}
</script>

<style lang="scss">
.c-quantitySelector__container {
  @include flex($justify: space-between, $wrap: nowrap);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 36px;
  height: 40px;
  padding: 2px;
  width: 100%;
}

.c-quantitySelector__button {
  @include flex($justify: center, $wrap: nowrap);
  background-color: $color-white;
  border: 0 none;
  border-radius: 9999px;
  flex-shrink: 0;
  height: 32px;
  width: 32px;
  
  &:hover {
    color: $color-secondary;
  }
}

.c-quantitySelector__label {
  background: transparent;
  border: 0 none;
  color: $color-primary;
  font-family: $font-heading;
  font-weight: 700;
  text-align: center;
  width: 100%;

  @include media-tablet-up {
    font-size: 14px;
  }
}
</style>