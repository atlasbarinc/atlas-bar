<template>
  <div class="c-bundle__items-wrapper">
    <div class="c-bundle__items-container">
      <h1 class="u-textCenter u-hideTabletUp">Choose {{ bundleSize }} Bars</h1>
      <c-bundleFilter
        @setFilter="setFilter"
        :activeFilter="activeFilter"
        :filters="filters"
      />
      <ul class="c-bundle__items">
        <c-bundle-item v-for="item in items" :key="item.id"
          @addProduct="addProduct(item, 1)"
          @decreaseQuantity="decreaseQuantity(item)"
          @increaseQuantity="increaseQuantity(item)"
          @changeQuantity="changeQuantity(item, $event)"
          @openModal="openModal(item)"
          :item="item"
          :quantity="itemQuantity(item.id)"
          :show="activeFilter ? item.tags.includes(activeFilter) : true"
          :bestSeller="item.tags.includes('Best Seller')"
          :bundleContainsItem="bundleContainsItem(item.id)"
          :isDisabled="totalQuantity === bundleSize"
        />
      </ul>
    </div>
    <div class="c-bundle__box">
      <div :class="_buildModifiers('c-bundle__box-container', boxModifiers)">
        <div class="c-bundle__box-header">
          <button class="c-bundle__box-heading" @click="boxOpen = !boxOpen">My Box <span class="c-bundle__box-expand"><c-svg name="chevron" /></span></button>
          <h2 class="c-bundle__box-subheading">{{ totalQuantity < bundleSize ? `Choose ${bundleSize} Bars` : 'Your Box Is Full!' }}</h2>
          <div class="c-bundle__box-prebuilt-container">
            <div :class="_buildModifiers('c-bundle__box-prebuilt', [prebuiltOpen ? 'isOpen' : ''])">
              <div class="c-bundle__box-prebuilt-label" @click="prebuiltOpen = !prebuiltOpen"><span>{{ activePrebuilt || "Choose a Bundle" }}</span><c-svg name="chevron" /></div>
              <ul class="c-bundle__box-prebuilt-options">
                <li v-for="prebuilt in prebuilts" class="c-bundle__box-prebuilt-option" @click="setPrebuilt(prebuilt.title)">{{ prebuilt.title }}</li>
              </ul>
            </div>
          </div>
          <div class="c-bundle__box-upgrade" v-if="upgradeSize || isUpgraded">
            <button v-if="!isUpgraded" class="c-bundle__box-upgrade-button" @click="applyUpgrade(upgradeSize)">Upgrade to {{ upgradeSize.size }}-ct Value Pack <span v-if="upgradeSavings > 1">to save ${{ upgradeSavings }}</span></button>
            <span v-if="isUpgraded" class="c-bundle__box-upgrade-success"><c-svg name="checkThin" /></span><span v-if="isUpgraded">Success! You've upgraded to the {{ bundleSize }}-ct {{ sizeTitle }}</span>
          </div>
        </div>
        <ul class="c-bundle__box-items">
          <li class="c-bundle__box-item" v-for="item in bundleItems">
            <figure class="c-bundle__box-item-image">
              <img :src="itemSrc(item.id)" :alt="itemTitle(item.id)">
            </figure>
            <div class="c-bundle__box-item-details">
              <p class="c-bundle__box-item-title">{{ itemTitle(item.id) }}</p>
              <button class="c-bundle__box-item-remove" type="button" @click="removeProduct(item)">Remove</button>
            </div>
            <c-quantity-selector class="c-bundle__box-quantity-selector"
              @decreaseQuantity="decreaseQuantity(item)"
              @increaseQuantity="increaseQuantity(item)"
              @changeQuantity="changeQuantity(item, $event)"
              :quantity="item.quantity"
              :isDisabled="totalQuantity === bundleSize" />
          </li>
        </ul>
        <div class="c-bundle__box-empty">
          <button class="c-bundle__box-empty-button" type="button" @click="clearBox" v-show="bundleItems.length > 0">Empty Box</button>
        </div>
      </div>
      <div class="c-bundle__box-progress">
        <button class="c-bundle__box-progress-button" type="button" @click="nextStep" :disabled="totalQuantity !== bundleSize">
          <div class="c-bundle__box-progress-bar" :style="`width: ${(totalQuantity / bundleSize) * 100}%`"></div>
          <span class="c-bundle__box-progress-label">{{ bundleProgress }} <c-svg name="arrow" v-show="totalQuantity === bundleSize" /></span>
        </button>
      </div>
    </div>
    <c-bundle-prompt
      @primaryAction="acceptPrebuilt"
      @secondaryAction="declinePrebuilt"
      :show="showPrompt"
      heading="Please Note"
      description="Selecting this bundle will replace all of the bars you've added into your box."
      primaryText="Yes, Replace With This Bundle"
      secondaryText="No Thanks, I'll Add My Own"
    />
    <c-bundle-ingredients
      @addProduct="addProductFromModal"
      @closeModal="showModal = false"
      :item="modalItem"
      :show="showModal" />
  </div>
</template>

<script>
  import cSvg from '@shared/components/core/cSvg.vue'
  import cOverlay from '@shared/components/core/cOverlay.vue'
  import cQuantitySelector from '@shared/components/parts/cQuantitySelector.vue'
  import cBundleFilter from '../parts/cBundleFilter.vue'
  import cBundleItem from '../parts/cBundleItem.vue'
  import cBundlePrompt from '../parts/cBundlePrompt.vue'
  import cBundleIngredients from '../parts/cBundleIngredients.vue'

  export default {
    data: () => ({
      boxOpen: false,
      filterOpen: false,
      prebuiltOpen: false,
      showPrompt: false,
      showModal: false,
      modalItem: null,
      isUpgraded: false,
      activeFilter: null,
      activePrebuilt: null,
    }),
    components: {
      cSvg, cOverlay, cQuantitySelector,
      cBundleFilter, cBundleItem, cBundlePrompt, cBundleIngredients },
    computed: {
      content() {
        return this.$store.getters['contentByKey']('items')
      },
      items() {
        return this.content.products
      },
      sizes() {
        return this.$store.getters['contentByKey']('sizes').products
      },
      bundleItems() {
        return this.$store.getters['bundleByKey']('items')
      },
      bundleSize() {
        return this.$store.getters['bundleByKey']('size')
      },
      filters() {
        return this.content.filters.map(filter => filter.trim())
      },
      prebuilts() {
        return this.$store.getters['contentByKey']('prebuilts')
      },
      bundleProgress() {
        if (this.totalQuantity === this.bundleSize) {
          return 'Next Step'
        } else if (this.totalQuantity < this.bundleSize && this.totalQuantity !== 0) {
          const remaining = this.bundleSize - this.totalQuantity
          const unit = remaining === 1 ? 'Bar' : 'Bars'
          return `${remaining} ${unit} Remaining`
        } else {
          return 'Add Bars To Your Box'
        }
      },
      totalQuantity() {
        return this.bundleItems.reduce((total, item) => {
          return total + item.quantity
        }, 0)
      },
      boxModifiers() {
        const modifiers = []
        if (this.boxOpen) modifiers.push('isOpen')
        return modifiers
      },
      upgradeSize() {
        return this.sizes.find(size => size.size > this.bundleSize)
      },
      upgradeSavings() {
        if (this.upgradeSize) {
          const currentSize = this.sizes.find(size => size.size === this.bundleSize)
          const currentAvg = (currentSize.price / currentSize.size).toFixed(2)
          const totalCost = currentAvg * this.upgradeSize.size
          return (totalCost - this.upgradeSize.price).toFixed(2)
        }
      },
      sizeTitle() {
        return this.sizes.find(size => size.size === this.bundleSize).title
      }
    },
    methods: {
      nextStep() {
        this.$store.commit('nextStep')
      },
      addProduct(product, quantity) {
        this.$store.commit('addProduct', {...product, quantity})
        this.activePrebuilt = null
      },
      removeProduct(item) {
        this.$store.commit('removeProduct', item)
        this.activePrebuilt = null
      },
      bundleContainsItem(id) {
        return this.bundleItems.some(item => item.id === id)
      },
      itemQuantity(id) {
        const item = this.bundleItems.find(item => item.id === id)
        return item ? item.quantity : 0
      },
      itemTitle(id) {
        return this.items.find(item => item.id === id).title
      },
      itemSrc(id) {
        return this.items.find(item => item.id === id).wrapper_image
      },
      increaseQuantity(item) {
        const newItem = this.bundleItems.find(oldItem => oldItem.id === item.id)
        newItem.quantity++
        this.$store.commit('addProduct', newItem)
        this.activePrebuilt = null
      },
      decreaseQuantity(item) {
        const newItem = this.bundleItems.find(oldItem => oldItem.id === item.id)
        newItem.quantity--
        if (newItem.quantity < 1) {
          this.$store.commit('removeProduct', newItem)
        } else {
          this.$store.commit('addProduct', newItem)
        }
        this.activePrebuilt = null
      },
      changeQuantity(item, value) {
        const newItem = this.bundleItems.find(oldItem => oldItem.id === item.id)
        const remaining = this.bundleSize - this.totalQuantity
        newItem.quantity = (this.totalQuantity - newItem.quantity + value) > this.bundleSize ? (remaining + newItem.quantity) : value
        if (newItem.quantity < 1) {
          this.$store.commit('removeProduct', newItem)
        } else {
          this.$store.commit('addProduct', newItem)
        }
        this.activePrebuilt = null
      },
      clearBox() {
        this.$store.commit('clearProducts')
      },
      setFilter(value) {
        this.activeFilter = value
        this.filterOpen = false
      },
      setPrebuilt(value) {
        this.activePrebuilt = value
        this.prebuiltOpen = false
        if (this.bundleItems.length === 0) {
          this.acceptPrebuilt()
        } else {
          this.showPrompt = true
        }
      },
      acceptPrebuilt() {
        const activePrebuilt = this.activePrebuilt
        const bundle = this.prebuilts.find(prebuilt => prebuilt.title === activePrebuilt)
        this.clearBox()
        const multiplier = this.bundleSize / 15
        let unavailableQuantity = 0;
        bundle.items.forEach(item => {
          const newItem = this.items.find(searchedItem => searchedItem.product_id == item.id)
          if (newItem.available) {
            this.addProduct(newItem, item.qty * multiplier)
          } else {
            unavailableQuantity = unavailableQuantity + (item.qty * multiplier)
          }
        })
        if (unavailableQuantity) {
          for (let i = 0; unavailableQuantity > 0; unavailableQuantity--) {
            this.increaseQuantity(this.bundleItems[i])
            i === this.bundleItems.length - 1 ? i = 0 : i++
          }
        }
        this.showPrompt = false
        this.activePrebuilt = activePrebuilt
      },
      declinePrebuilt() {
        this.activePrebuilt = null
        this.showPrompt = false
      },
      applyUpgrade(size) {
        this.$store.commit('setSize', size.size)
        if (this.activePrebuilt) {
          const activePrebuilt = this.activePrebuilt
          this.bundleItems.forEach((item) => {
            this.addProduct(item, item.quantity * 2)
          })
          this.activePrebuilt = activePrebuilt
        }
        this.isUpgraded = true
      },
      openModal(item) {
        this.showModal = true
        this.modalItem = item
      },
      addProductFromModal() {
        this.addProduct(this.modalItem, this.itemQuantity(this.modalItem.id) + 1)
        this.showModal = false
      }
    },
    mounted() {
      this.modalItem = this.items[0]
    }
  }
</script>

<style lang="scss">
  .c-bundle__box-prebuilt-container {
    height: 50px;
    position: relative;

    &:last-child {
      margin-bottom: 20px;
    }
  }
  .c-bundle__box-prebuilt {
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
  .c-bundle__box-prebuilt-label {
    @include flex($justify: space-between, $wrap: nowrap);
    height: 50px;
    padding: 5px 28px;
    .c-bundle__box-prebuilt--isOpen & {
      padding: 5px 29px;
    }
    .c-svg {
      margin-left: auto;
      width: 8px;
      .c-bundle__box-prebuilt--isOpen & {
        transform: rotate(-180deg);
      }
    }
  }
  .c-bundle__box-prebuilt-options {
    background-color: $color-white;
    border-radius: 0 0 28px 28px;
    display: none;
    overflow: hidden;

    .c-bundle__box-prebuilt--isOpen & {
      display: block;
    }
  }
  .c-bundle__box-prebuilt-option {
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
  .c-bundle__items-wrapper {
    @include media-up(1024px) {
      display: flex;
      margin: 0 auto;
      max-width: 1440px;
      padding:  70px 100px;
      width: 100%;
    }
  }
  .c-bundle__items-container {
    padding: 20px 20px 140px;
    @include media-up(1024px) {
      padding: 0;
      width: 100%;
    }
  }
  .c-bundle__items {
    display: grid;
    grid-gap: 40px 20px;
    grid-template-columns: repeat(auto-fill, 156px);
    justify-content: center;
    margin-top: 40px;

    @include media-tablet-up {
      grid-template-columns: repeat(auto-fill, 236px);
    }
  }
  .c-bundle__box {
    position: relative;
    z-index: 10;
    @include media-up(1024px) {
      @include flex($direction: column, $wrap: nowrap);
      background-color: $color-white;
      border-radius: 20px;
      box-shadow: 0 12px 34px rgba(0, 0, 0, 0.15);
      flex-shrink: 0;
      height: 80vh;
      margin-left: 47px;
      max-height: 840px;
      overflow: hidden;
      position: sticky;
      top: 20px;
      width: 393px;
    }
  }
  .c-bundle__box-container {
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

    @include media-up(1024px) {
      background-color: transparent;
      box-shadow: none;
      height: calc(100% - 60px);
      padding: 0;
      position: static;
      transform: none;
    }
  }
  .c-bundle__box-header {
    border-bottom: 1px solid $color-border;
    padding: 12px;
    position: relative;
    @include media-up(1024px) {
      padding: 0 28px 15px;
    }
  }
  .c-bundle__box-heading {
    @include flex($justify: space-between);
    background-color: transparent;
    border: 0 none;
    font-family: $font-heading;
    font-size: 18px;
    font-weight: 900;
    margin: 0 0 24px 0;
    padding: 0;
    width: 100%;
    @include media-up(1024px) {
      color: $color-secondary;
      display: block;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.1em;
      margin: 43px 0 15px;
      text-align: center;
      text-transform: uppercase;
    }
  }
  .c-bundle__box-subheading {
    text-align: center;
    @include media-up(1024px) {
      font-size: 34px;
    }
  }
  .c-bundle__box-expand {
    @include flex($justify: center);
    border: 2px solid $color-primary;
    border-radius: 36px;
    height: 36px;
    width: 36px;

    .c-svg {
      transform: rotate(-180deg);
      transition: transform 0.5s;
      width: 12px;

      .c-bundle__box-container--isOpen & {
        transform: rotate(0);
      }
    }

    @include media-up(1024px) {
      display: none;
    }
  }
  .c-bundle__box-upgrade {
    @include flex($justify: center, $wrap: nowrap);
    font-family: $font-body;
    font-size: 14px;
    font-weight: 400;
    margin-top: 15px;
  }
  .c-bundle__box-upgrade-button {
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
  .c-bundle__box-upgrade-success {
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
  .c-bundle__box-items {
    height: 100%;
    overflow: auto;
    padding: 10px 0;
  }
  .c-bundle__box-item {
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
  .c-bundle__box-item-image {
    flex-shrink: 0;
    margin-right: 15px;
    padding: 0 18px;
    width: 70px;
  }
  .c-bundle__box-item-details {
    margin-right: 9px; 
    width: 100%;
    @include media-up(1024px) {
      margin-right: 20px;
    }
  }
  .c-bundle__box-item-title {
    font-family: $font-heading;
    font-size: 16px;
    font-weight: 800;
    line-height: 1.15;
    margin: 0 0 4px;
  }
  .c-bundle__box-item-remove {
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
  .c-bundle__box-empty {
    @include flex($direction: column, $wrap: nowrap);
    background-color: $color-white;
    bottom: 60px;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
    flex-shrink: 0;
    padding: 0 15px;
    position: fixed;
    width: 100%;
    @include media-up(1024px) {
      box-shadow: none;
      border-top: 1px solid $color-border;
      margin-top: auto;
      position: static;
    }
  }
  .c-bundle__box-empty-button {
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
  .c-bundle__box-progress {
    background-color: $color-white;
    bottom: 0;
    position: fixed;
    width: 100%;
    @include media-up(1024px) {
      margin-top: auto;
      position: static;
    }
  }
  .c-bundle__box-progress-bar {
    background-color: $color-secondary;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: width 0.2s;
    width: 0;
  }
  .c-bundle__box-progress-label {
    position: relative;
  }
  .c-bundle__box-progress-button {
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
    @include media-up(1024px) {
      width: 100%;
    }
  }
  .c-bundle__box-quantity-selector {
    &.c-quantitySelector__container {
      background-color: rgba(247, 247, 247, 0.9);
      height: 30px;
      max-width: 90px;
    }
    .c-quantitySelector__button {
      width: 26px;
      height: 26px;
    }
  }
</style>