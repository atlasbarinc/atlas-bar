<template>
  <div class="c-bundle__split-container">
    <div class="c-bundle__split-image" :style="`background-image: url(${this.content.background})`"></div>
    <div class="c-bundle__split-content">
      <h1 class="c-bundle__header c-h3 u-textCenter">{{ content.title }}</h1>
      <p class="c-bundle__description-text u-textCenter" v-if="content.description">{{ content.description }}</p>
      <ul class="c-bundle__pack-container">
        <li v-for="size in sizes">
          <input type="radio" class="c-bundle__hidden-radio" :id="`size-${size.size}`" :value="size.size" v-model="sizeSelection" />
          <label :for="`size-${size.size}`" class="c-bundle__size-label">
            <span v-if="isDefault(size.size)" class="c-bundle__popular">Most Popular</span>
            <div>
              <p class="c-bundle__pack-label">{{ size.title }}</p>
              <h2 class="c-bundle__pack-title">{{ size.size }} Bars</h2>
              <p class="c-bundle__pack-info">Starting at <strong>${{ barAverage(size) }}</strong> per bar</p>
            </div>
            <div class="c-bundle__radio">
              <c-svg v-if="size.size === bundleSize" name="checkThin" />
            </div>
          </label>
        </li>
      </ul>
      <button class="c-bundle__button c-button c-button--isDefault c-button--isSecondary" @click="nextStep" :disabled="bundleSize === 0"><span>Next Step <c-svg name="arrow" /></span></button>
      <p class="c-bundle__small-text">Not sure? You can change the box size at any time.</p>
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

  export default {
    components: { cSvg },
    computed: {
      content() {
        return this.$store.getters['contentByKey']('sizes')
      },
      sizeSelection: {
        get() {
          return this.bundleSize
        },
        set(value) {
          this.$store.commit('setSize', value)
          this.$store.commit('clearProducts')
        }
      },
      sizes() {
        return this.content.products
      },
      bundleSize() {
        return this.$store.getters['bundleByKey']('size')
      }
    },
    methods: {
      nextStep() {
        this.$store.commit('nextStep')
      },
      isDefault(size) {
        return this.sizes.some((product) => product.size === size && product.selected)
      },
      barAverage(size) {
        return (size.sub_price / size.size).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .c-bundle__size-label {
    align-items: center;
    border: 2px solid $color-primary;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 34px;
    padding: 22px 30px;
    cursor: pointer;
    position: relative;

    @include media-tablet-up {
      flex-direction: column;
      margin-bottom: 0;
      padding: 40px 16px 28px;
      text-align: center;
      width: 212px;
    }

    .c-bundle__hidden-radio:checked + & {
      border-color: $color-secondary;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }

  .c-bundle__pack-container {
    width: 100%;
    @include media-tablet-up {
      display: flex;
      flex-shrink: 0;
      justify-content: space-between;
      margin: 50px 0;
      max-width: 466px;
    }
  }

  .c-bundle__pack-label {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.1em;
    line-height: 1.2;
    margin: 0;
    text-transform: uppercase;

    @include media-tablet-up {
      font-size: 13px;
    }
  }

  .c-bundle__pack-title {
    font-size: 28px;
    font-weight: 900;
    line-height: 1.2;
    margin: 10px 0;

    @include media-tablet-up {
      font-size: 36px;
      margin: 17px 0;
    }
  }

  .c-bundle__pack-info {
    color: $color-black;
    font-family: $font-heading;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    margin: 0;
  }

  .c-bundle__radio {
    align-items: center;
    border: 1px solid $color-primary;
    border-radius: 9999px;
    display: flex;
    height: 26px;
    justify-content: center;
    width: 26px;

    @include media-tablet-up {
      margin-top: 25px;
    }

    .c-bundle__hidden-radio:checked + .c-bundle__size-label & {
      background-color: $color-secondary;
      border-color: $color-secondary;
      color: $color-white;
    }
  }

  .c-bundle__small-text {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
  }
</style>