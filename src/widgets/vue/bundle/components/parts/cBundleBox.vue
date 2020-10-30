<template>
  <div class="c-bundleBox">
    <div :class="_buildModifiers('c-bundleBox__container', modifiers)">
      <div class="c-bundleBox__header">
        <button class="c-bundleBox__heading" @click="boxOpen = !boxOpen">My Box <span class="c-bundleBox__expand"><c-svg name="chevron" /></span></button>
        <h2 class="c-bundleBox__subheading">{{ isFull ? 'Your Box Is Full!' : `Choose ${bundleSize} Bars` }}</h2>
        <div class="c-bundleBox__prebuiltContainer" v-if="prebuilts.length">
          <div :class="_buildModifiers('c-bundleBox__prebuilt', [
            prebuiltOpen ? 'isOpen' : ''
          ])">
            <div class="c-bundleBox__prebuiltLabel" @click="prebuiltOpen = !prebuiltOpen">
              <span>{{ activePrebuilt || "Choose a Bundle" }}</span><c-svg name="chevron" />
            </div>
            <ul class="c-bundleBox__prebuiltOptions">
              <li v-for="prebuilt in prebuilts" class="c-bundleBox__prebuiltOption" @click="setPrebuilt(prebuilt.title)">{{ prebuilt.title }}</li>
            </ul>
          </div>
        </div>
        <div class="c-bundleBox__swap" v-if="isSwappable">
          <button v-if="!isSwapped" class="c-bundleBox__swapButton" @click="swapParent">{{ swapMessage }}</button>
          <span v-if="isSwapped" class="c-bundleBox__swapSuccess"><c-svg name="checkThin" /></span><span v-if="isSwapped">{{ swapSuccess }}</span>
        </div>
      </div>
      <ul class="c-bundleBox__items">
        <li class="c-bundleBox__item" v-for="item in box">
          <div class="c-bundleBox__itemImage">
            <img :src="item.image" :alt="item.title">
          </div>
          <div class="c-bundleBox__itemDetails">
            <p class="c-bundleBox__itemTitle">{{ item.title }}</p>
            <button class="c-bundleBox__itemRemove" type="button" @click="removeProduct(item.product_id)">Remove</button>
          </div>
          <c-quantitySelector class="c-bundleBox__quantitySelector"
            @decreaseQuantity="decreaseQuantity(item.product_id)"
            @increaseQuantity="increaseQuantity(item.product_id)"
            @changeQuantity="changeQuantity(item.product_id, $event)"
            :quantity="item.quantity"
            :isDisabled="isFull"
          />
        </li>
      </ul>
      <div class="c-bundleBox__empty">
        <button class="c-bundleBox__emptyButton"
          type="button"
          @click="clearBox"
          v-show="box.length > 0"
        >Empty Box</button>
      </div>
    </div>
    <div class="c-bundleBox__progress">
      <button class="c-bundleBox__progressButton"
        type="button"
        :disabled="!isFull || isSaving"
        @click="saveBox"
      >
        <div :class="_buildModifiers('c-bundleBox__progressBar', [
            isFull ? 'isFull' : ''
          ])"
          :style="`width: ${(totalQuantity / bundleSize) * 100}%`"></div>
        <span class="c-bundleBox__progressLabel">{{ bundleProgress }} <c-svg name="arrow" v-show="isFull" /></span>
      </button>
    </div>
    <c-bundlePrompt
      @primaryAction="acceptPrebuilt"
      @secondaryAction="declinePrebuilt"
      :show="confirmPrebuilt"
      heading="Please Note"
      description="Selecting this bundle will replace all of the bars you've added into your box."
      primaryText="Yes, Replace With This Bundle"
      secondaryText="No Thanks, I'll Add My Own"
    />
  </div>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'
import cQuantitySelector from '@shared/components/parts/cQuantitySelector.vue'
import cBundlePrompt from '@vue/bundle/components/parts/cBundlePrompt.vue'

export default {
  props: {
    bundleSize: {
      type: Number,
      required: true
    },
    totalQuantity: {
      type: Number,
      required: true
    },
    box: {
      type: Array,
      required: true
    },
    parent: {
      type: Object,
      required: true
    },
    parents: {
      type: Array,
      default: () => ([])
    },
    prebuilts: {
      type: Array,
      default: () => ([])
    },
    isFull: {
      type: Boolean,
      required: true
    },
    fullMessage: {
      type: String,
      default: 'Next Step'
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    cSvg,
    cQuantitySelector,
    cBundlePrompt
  },
  data: () => ({
    boxOpen: false,
    prebuiltOpen: false,
    activePrebuilt: null,
    confirmPrebuilt: false,
    isSwapped: false,
    isSaving: false
  }),
  computed: {
    bundleProgress() {
      if (this.isFull) {
        return this.fullMessage
      } else if (this.totalQuantity !== 0) {
        const remaining = this.bundleSize - this.totalQuantity
        const unit = remaining === 1 ? 'Bar' : 'Bars'
        return `${remaining} ${unit} Remaining`
      } else {
        return 'Add Bars To Your Box'
      }
    },
    isSwappable() {
      return this.parents.length > 1
    },
    swapMessage() {
      const newParent = this.parents.find(product => product.id != this.parent.id)
      if (newParent.size > this.parent.size) {
        return `Want more? Swap to a ${newParent.size}-ct for $${newParent.sub_price}`
      } else {
        return `Want less? Swap to a ${newParent.size}-ct for $${newParent.sub_price}`
      }
    },
    swapSuccess() {
      return `Success! You've swapped to the ${this.bundleSize}-ct`
    },
    multiplier() {
      return this.bundleSize / Math.min(...this.parents.map(parent => parent.size))
    }
  },
  methods: {
    removeProduct(id) {
      this.$emit('removeProduct', id)
    },
    increaseQuantity(id) {
      this.$emit('increaseQuantity', id)
    },
    decreaseQuantity(id) {
      this.$emit('decreaseQuantity', id)
    },
    setPrebuilt(prebuilt) {
      this.activePrebuilt = prebuilt
      this.prebuiltOpen = false
      this.confirmPrebuilt = true
    },
    acceptPrebuilt() {
      const prebuilt = this.activePrebuilt
      this.confirmPrebuilt = false
      this.$emit('applyPrebuilt', prebuilt)
      this.$nextTick(() => {
        this.activePrebuilt = prebuilt
      })
    },
    declinePrebuilt() {
      this.activePrebuilt = null
      this.confirmPrebuilt = false
    },
    changeQuantity(id, value) {
      this.$emit('changeQuantity', id, value)
    },
    clearBox() {
      this.$emit('clearBox')
    },
    saveBox() {
      this.isSaving = true
      this.$emit('saveBox')
    },
    swapParent() {
      this.isSwapped = true
      const oldSize = this.bundleSize
      const newParent = this.parents.find(product => product.id != this.parent.id)
      this.$emit('swapParent', newParent)
      this.$nextTick(() => {
        if (this.activePrebuilt && oldSize < newParent.size) {
          const activePrebuilt = this.activePrebuilt
          this.box.forEach((item) => {
            this.$emit('addProduct', item.product_id, Math.floor(item.quantity * this.multiplier))
          })
          this.$nextTick(() => this.activePrebuilt = activePrebuilt)
        }
      })
    }
  },
  watch: {
    box: {
      handler() {
        this.activePrebuilt = null
      }
    },
    boxOpen: {
      handler(value) {
        if(value) {
          this.modifiers.push('isOpen')
        } else {
          this.modifiers.splice(this.modifiers.indexOf('isOpen'), 1)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.c-bundleBox__prebuiltContainer {
  height: 50px;
  position: relative;

  &:last-child {
    margin-bottom: 20px;
  }
}
.c-bundleBox__prebuilt {
  border: 2px solid $color-primary;
  border-radius: 28px;
  cursor: pointer;
  font-family: $font-heading;
  font-size: 14px;
  font-weight: 700;
  position: absolute;
  width: 100%;
  &--isOpen {
    border: 1px solid $color-border;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
}
.c-bundleBox__prebuiltLabel {
  @include flex($justify: space-between, $wrap: nowrap);
  height: 50px;
  padding: 5px 28px;
  .c-bundleBox__prebuilt--isOpen & {
    padding: 5px 29px;
  }
  .c-svg {
    margin-left: auto;
    width: 8px;
    .c-bundleBox__prebuilt--isOpen & {
      transform: rotate(-180deg);
    }
  }
}
.c-bundleBox__prebuiltOptions {
  background-color: $color-white;
  border-radius: 0 0 28px 28px;
  display: none;
  overflow: hidden;

  .c-bundleBox__prebuilt--isOpen & {
    display: block;
  }
}
.c-bundleBox__prebuiltOption {
  @include flex($justify: space-between, $wrap: nowrap);
  border-top: 1px solid $color-border;
  height: 50px;
  padding: 5px 29px;
  position: relative;
  &:before {
    border: 1px solid $color-primary;
    border-radius: 9999px;
    content: '';
    height: 16px;
    position: absolute;
    right: 24px;
    width: 16px;
  }
  &:hover {
    background-color: $color-primary;
    color: $color-white;
  }
  &:hover:before {
    border-color: $color-white;
  }
  &:hover:after {
    background-color: $color-white;
    border-radius: 9999px;
    content: '';
    height: 8px;
    position: absolute;
    right: 28px;
    width: 8px;
  }
}
.c-bundleBox {
  position: relative;
  z-index: 10;
  @include media-tablet-up {
    @include flex($direction: column, $wrap: nowrap);
    background-color: $color-white;
    border-radius: 20px;
    box-shadow: 0 12px 34px rgba(0, 0, 0, 0.15);
    height: 80vh;
    max-height: 840px;
    overflow: hidden;
    width: 100%;
  }
}
.c-bundleBox__container {
  background-color: $color-white;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 120px;
  position: fixed;
  top: 100%;
  transform: translateY(-120px);
  transition: transform 0.5s, top 0.5s;
  width: 100%;

  &--isOpen {
    transform: translateY(0);
    top: 0;
  }

  @include media-tablet-up {
    background-color: transparent;
    box-shadow: none;
    height: calc(100% - 60px);
    padding: 0;
    position: static;
    transform: none;
  }
}
.c-bundleBox__header {
  border-bottom: 1px solid $color-border;
  padding: 12px;
  position: relative;
  @include media-tablet-up {
    padding: 0 28px 15px;
  }
}
.c-bundleBox__heading {
  @include flex($justify: space-between);
  background-color: transparent;
  border: 0 none;
  font-family: $font-heading;
  font-size: 18px;
  font-weight: 900;
  margin: 0 0 24px 0;
  padding: 0;
  width: 100%;
  @include media-tablet-up {
    color: $color-secondary;
    display: block;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.1em;
    margin: 43px 0 15px;
    text-align: center;
    text-transform: uppercase;
  }
}
.c-bundleBox__subheading {
  text-align: center;
  @include media-tablet-up {
    font-size: 34px;
  }
}
.c-bundleBox__expand {
  @include flex($justify: center);
  border: 2px solid $color-primary;
  border-radius: 36px;
  height: 36px;
  width: 36px;

  .c-svg {
    transform: rotate(-180deg);
    transition: transform 0.5s;
    width: 12px;

    .c-bundleBox__container--isOpen & {
      transform: rotate(0);
    }
  }

  @include media-tablet-up {
    display: none;
  }
}
.c-bundleBox__upgrade {
  @include flex($justify: center, $wrap: nowrap);
  font-family: $font-body;
  font-size: 14px;
  font-weight: 400;
  margin-top: 15px;
}
.c-bundleBox__upgradeButton {
  background-color: transparent;
  border: 0 none;
  display: block;
  font-family: $font-body;
  font-size: 14px;
  padding: 0;
  text-decoration: underline;
  width: 100%;
  &:hover {
    color: $color-secondary;
    text-decoration: none;
  }
}
.c-bundleBox__upgradeSuccess {
  @include flex($justify: center, $wrap: nowrap);
  background-color: $color-secondary;
  border-radius: 9999px;
  color: $color-white;
  height: 18px;
  margin-right: 5px;
  width: 18px;

  .c-svg {
    width: 12px;
  }
}
.c-bundleBox__items {
  height: 100%;
  overflow: auto;
  padding: 10px 0;
}
.c-bundleBox__item {
  @include flex($justify: space-between, $wrap: nowrap);
  padding: 8px 15px;

  .c-bundle__action-quantity-container {
    background-color: rgba(247, 247, 247, 0.9);
    flex-shrink: 0;
    height: 30px;
    width: 94px;
  }
  .c-bundle__action-quantity-button {
    height: 26px;
    width: 26px;
  }
}
.c-bundleBox__itemImage {
  flex-shrink: 0;
  margin-right: 15px;
  padding: 0 18px;
  width: 70px;
}
.c-bundleBox__itemDetails {
  margin-right: 9px; 
  width: 100%;
  @include media-tablet-up {
    margin-right: 20px;
  }
}
.c-bundleBox__itemTitle {
  font-family: $font-heading;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 4px;
}
.c-bundleBox__itemRemove {
  background-color: transparent;
  border: 0 none;
  color: #ABABAB;
  display: block;
  font-family: $font-heading;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.01em;
  padding: 0;
  text-decoration: underline;
}
.c-bundleBox__empty {
  @include flex($direction: column, $wrap: nowrap);
  background-color: $color-white;
  bottom: 60px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  padding: 0 15px;
  position: fixed;
  width: 100%;
  @include media-tablet-up {
    box-shadow: none;
    border-top: 1px solid $color-border;
    margin-top: auto;
    position: static;
  }
}
.c-bundleBox__emptyButton {
  @include flex
  align-self: flex-end;
  background-color: $color-white;
  border: 1px solid $color-border;
  border-radius: 33px;
  font-family: $font-heading;
  font-size: 12px;
  font-weight: 700;
  height: 33px;
  line-height: 1.25;
  margin: 15px 0;
  padding: 0 17px;
}
.c-bundleBox__progress {
  background-color: $color-white;
  bottom: 0;
  position: fixed;
  width: 100%;
  @include media-tablet-up {
    margin-top: auto;
    position: static;
  }
}
.c-bundleBox__progressBar {
  background-color: $color-secondary;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: all 0.2s;
  width: 0;
}
.c-bundleBox__progressLabel {
  position: relative;
}
.c-bundleBox__progressButton {
  background-color: $color-secondary;
  border: 0 none;
  color: $color-white;
  font-family: $font-heading;
  font-size: 18px;
  font-weight: 800;
  height: 60px;
  position: relative;
  width: 100vw;
  &:disabled {
    background-color: lighten($color-secondary, 25%);
  }
  @include media-tablet-up {
    width: 100%;
  }
}
.c-bundleBox__swap {
  @include flex($justify: center, $wrap: nowrap);
  font-family: $font-body;
  font-size: 14px;
  font-weight: 400;
  margin-top: 15px;
}
.c-bundleBox__swapButton {
  background-color: transparent;
  border: 0 none;
  display: block;
  font-family: $font-body;
  font-size: 14px;
  padding: 0;
  text-decoration: underline;
  width: 100%;
  &:hover {
    color: $color-secondary;
    text-decoration: none;
  }
}
.c-bundleBox__swapSuccess {
  @include flex($justify: center, $wrap: nowrap);
  background-color: $color-secondary;
  border-radius: 9999px;
  color: $color-white;
  height: 18px;
  margin-right: 5px;
  width: 18px;

  .c-svg {
    width: 12px;
  }
}
.c-bundleBox__quantitySelector.c-quantitySelector__container {
  background-color: rgba(247, 247, 247, 0.9);
}
</style>