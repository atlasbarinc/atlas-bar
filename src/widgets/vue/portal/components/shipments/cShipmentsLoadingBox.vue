<template>
  <div :class="_buildModifiers('c-shipmentsLoadingBox', modifiers)">
    <div class="c-shipmentsLoadingBox__trigger">
      <div class="c-shipmentsLoadingBox__triggerMain">
        <div class="c-shipmentsLoadingBox__triggerCount c-shipmentsLoadingBox__blockBase" />
        <div class="c-shipmentsLoadingBox__triggerShipping c-shipmentsLoadingBox__blockBase" />
        <div class="c-shipmentsLoadingBox__triggerAddress c-shipmentsLoadingBox__blockBase u-hideTabletUp" />
        <div class="c-shipmentsLoadingBox__triggerButton c-shipmentsLoadingBox__blockBase u-hideMobileDown" />
      </div>
      <div class="c-shipmentsLoadingBox__triggerCircle">
        <c-svg class="c-shipmentsLoadingBox__triggerIcon"
          name="chevron"
        />
      </div>
    </div>
    <div class="c-shipmentsLoadingBox__content" v-if="isOpen">
      <div class="c-shipmentsLoadingBox__contentAddresss c-shipmentsLoadingBox__blockBase u-hideTabletUp" />
      <div class="c-shipmentsLoadingBox__groups">
        <div class="c-shipmentsLoadingBox__group">
          <div class="c-shipmentsLoadingBox__top">
            <div class="c-shipmentsLoadingBox__charge">
              <div class="c-shipmentsLoadingBox__chargeText c-shipmentsLoadingBox__blockBase" />
              <div class="c-shipmentsLoadingBox__chargeDate c-shipmentsLoadingBox__blockBase" />
            </div>
            <div class="c-shipmentsLoadingBox__buttons">
              <div class="c-shipmentsLoadingBox__button" />
              <div class="c-shipmentsLoadingBox__button" />
            </div>
          </div>
          <div class="c-shipmentsLoadingBox__items">
            <div class="c-shipmentsLoadingBox__item">
              <div class="c-shipmentsLoadingBox__itemMain">
                <div class="c-shipmentsLoadingBox__itemImage" />
                <div class="c-shipmentsLoadingBox__itemDetails">
                  <div class="c-shipmentsLoadingBox__itemTitle c-shipmentsLoadingBox__blockBase" />
                  <div class="c-shipmentsLoadingBox__itemInterval c-shipmentsLoadingBox__blockBase" />
                  <div class="c-shipmentsLoadingBox__itemPrice c-shipmentsLoadingBox__blockBase" />
                </div>
              </div>
              <div class="c-shipmentsLoadingBox__itemActions">
                <div class="c-shipmentsLoadingBox__itemAction">
                  <div class="c-shipmentsLoadingBox__itemButton c-shipmentsLoadingBox__blockBase" />
                </div>
                <div class="c-shipmentsLoadingBox__itemAction">
                  <div class="c-shipmentsLoadingBox__itemButton c-shipmentsLoadingBox__blockBase" />
                </div>
                <div class="c-shipmentsLoadingBox__itemAction">
                  <div class="c-shipmentsLoadingBox__itemButton c-shipmentsLoadingBox__blockBase" />
                </div>
              </div>
            </div>
          </div>
          <div class="c-shipmentsLoadingBox__bottom">
            <div class="c-shipmentsLoadingBox__discount">
              <div class="c-shipmentsLoadingBox__discountLeft c-shipmentsLoadingBox__blockBase" />
              <div class="c-shipmentsLoadingBox__discountRight c-shipmentsLoadingBox__blockBase" />
            </div>
            <div class="c-shipmentsLoadingBox__summary">
              <div class="c-shipmentsLoadingBox__summaryLeft">
                <div class="c-shipmentsLoadingBox__summaryText c-shipmentsLoadingBox__blockBase" />
              </div>
              <div class="c-shipmentsLoadingBox__summaryRight c-shipmentsLoadingBox__blockBase" />
              <div class="c-shipmentsLoadingBox__summaryCircle">
                <c-svg class="c-shipmentsLoadingBox__summaryIcon"
                  name="chevron"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'

export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cSvg },
  computed: {
    isOpen() {
      return this.modifiers.includes('isOpen')
    }
  }
}
</script>

<style lang="scss">
  .c-shipmentsLoadingBox__blockBase {
    @include gradient-shimmer;
    border-radius: 3px;
  }
  .c-shipmentsLoadingBox {
    @include box-card;
    padding: 0 !important;
    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }
  .c-shipmentsLoadingBox__trigger {
    padding: 25px;
    @include flex($justify: space-between, $align: flex-start, $wrap: nowrap);
    @include media-mobile-down {
      padding: 15px;
    }
  }
  .c-shipmentsLoadingBox__triggerCount {
    width: 190px;
    height: 16px;
    margin-bottom: 15px;
  }
  .c-shipmentsLoadingBox__triggerShipping {
    width: 175px;
    height: 26px;
    @include media-tablet-up {
      width: 520px;
      height: 32px;
    }
  }
  .c-shipmentsLoadingBox__triggerAddress {
    width: 240px;
    height: 26px;
    margin-top: 8px;
  }
  .c-shipmentsLoadingBox__triggerButton {
    height: 20px;
    width: 180px;
    margin-top: 30px;
  }
  .c-shipmentsLoadingBox__triggerCircle {
    min-width: 40px;
    width: 40px;
    height: 40px;
    border: 2px solid #E5E5E5;
    border-radius: 50%;
    @include flex($justify: center);
    margin-left: 20px;
  }
  .c-shipmentsLoadingBox__triggerIcon {
    color: #E5E5E5;
    width: 12px;
    height: auto;
    transition: transform .35s ease-in-out;
    transform-origin: 50%;
    .c-shipmentsLoadingBox--isOpen & {
      transform: rotate(180deg);
    }
  }
  .c-shipmentsLoadingBox__contentAddress {
    height: 20px;
    width: 180px;
    margin-top: 30px;
  }
  .c-shipmentsLoadingBox__groups {
    padding: 10px 25px 25px;
    border-radius: 20px;
  }
  .c-shipmentsLoadingBox__group {
    &:not(:last-child) { margin-bottom: 30px; }
    @include box-card;
  }
  .c-shipmentsLoadingBox__top {
    @include flex($justify: space-between);
    margin-bottom: 20px;
    @include media-mobile-down {
      flex-direction: column;
      text-align: center;
    }
  }
  .c-shipmentsLoadingBox__chargeText {
    width: 200px;
    height: 20px;
    margin-bottom: 8px;
  }
  .c-shipmentsLoadingBox__chargeDate {
    width: 90px;
    height: 28px;
    @include media-mobile-down { margin: auto; }
  }
  .c-shipmentsLoadingBox__buttons {
    @include flex($wrap: nowrap);
    margin: 0 -5px;
    @include media-mobile-down {
      flex-direction: column;
      margin-top: 14px;
    }
  }
  .c-shipmentsLoadingBox__button {
    margin: 0 5px;
    border-radius: 40px;
    @include gradient-shimmer;
    &:first-child { width: 200px; height: 54px; }
    &:last-child { width: 168px; height: 54px; }
    @include media-mobile-down {
      width: 220px !important;
      max-width: 100%;
      margin: 5px auto;
      &:first-child { order: 1; }
    }
  }
  .c-shipmentsLoadingBox__item {
    @include box-card;
    margin-bottom: 30px;
  }
  .c-shipmentsLoadingBox__itemMain {
    width: 100%;
    @include flex($justify: flex-start, $align: flex-start);
    margin-bottom: 20px;
    @include media-mobile-down {
      flex-direction: column;
      align-items: center;
    }
  }
  .c-shipmentsLoadingBox__itemImage {
    width: 150px;
    height: 150px;
    @include gradient-shimmer;
    @include media-mobile-down {
      margin-bottom: 10px;
    }
  }
  .c-shipmentsLoadingBox__itemDetails {
    padding-left: 50px;
    @include media-tablet-down {
      padding-left: 20px;
    }
    @include media-mobile-down {
      padding-left: 0;
      text-align: center;
    }
  }
  .c-shipmentsLoadingBox__itemTitle {
    width: 200px;
    height: 32px;
    margin-bottom: 14px;
  }
  .c-shipmentsLoadingBox__itemInterval {
    width: 90px;
    height: 22px;
    margin-bottom: 14px;
    @include media-mobile-down { margin: 0 auto 14px };
  }
  .c-shipmentsLoadingBox__itemPrice {
    width: 80px;
    height: 22px;
    @include media-mobile-down { margin: 0 auto 14px };
  }
  .c-shipmentsLoadingBox__itemActions {
    @include flex($justify: center);
    margin: 0 -40px;
    @include media-tablet-down {
      margin: 0 -30px;
    }
    @include media-down(600px) {
      flex-direction: column;
    }
  }
  .c-shipmentsLoadingBox__itemAction {
    padding: 0 40px;
    position: relative;
    @include media-down(600px) {
      &:not(:last-child) { margin-bottom: 10px; }
    }
    @include media-tablet-down {
      padding: 0 30px;
    }
    @include media-up(601px) {
      &:not(:first-child):before {
        content: '|';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #E5E5E5;
        font-size: 24px;
      }
    }
  }
  .c-shipmentsLoadingBox__itemButton {
    width: 100px;
    height: 20px;
  }
  .c-shipmentsLoadingBox__bottom {
    @include flex($justify: space-between, $align: flex-start, $wrap: nowrap);
    @include media-mobile-down {
      flex-direction: column;
    }
  }
  .c-shipmentsLoadingBox__discount,
  .c-shipmentsLoadingBox__summary {
    width: calc(50% - 6px);
    min-height: 62px;
    @include flex ($justify: space-between);
    border-radius: 32px;
    border: 1px solid #E5E5E5;
    padding: 0 20px;
    @include media-mobile-down {
      width: 100%;
      min-height: 60px;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
  .c-shipmentsLoadingBox__summary {
    @include media-mobile-down {
      padding-right: 10px;
    }
  }
  .c-shipmentsLoadingBox__discountLeft {
    width: 54px;
    height: 20px;
  }
  .c-shipmentsLoadingBox__discountRight {
    width: 74px;
    height: 20px;
  }
  .c-shipmentsLoadingBox__summaryLeft {
    flex-grow: 1;
  }
  .c-shipmentsLoadingBox__summaryText {
    width: 100px;
    height: 20px;
  }
  .c-shipmentsLoadingBox__summaryRight {
    width: 54px;
    height: 20px;
  }
  .c-shipmentsLoadingBox__summaryCircle {
    min-width: 40px;
    width: 40px;
    height: 40px;
    border: 2px solid #E5E5E5;
    border-radius: 50%;
    @include flex($justify: center);
    margin-left: 20px;
  }
  .c-shipmentsLoadingBox__summaryIcon {
    color: #E5E5E5;
    width: 12px;
    height: auto;
    transition: transform .35s ease-in-out;
    transform-origin: 50%;
  }
</style>