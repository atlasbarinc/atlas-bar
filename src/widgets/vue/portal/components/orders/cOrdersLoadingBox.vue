<template>
  <div :class="_buildModifiers('c-ordersLoadingBox', modifiers)">
    <div class="c-ordersLoadingBox__box">
      <div class="c-ordersLoadingBox__trigger">
        <div class="c-ordersLoadingBox__triggerTop">
          <div class="c-ordersLoadingBox__triggerDetails">
            <div class="c-ordersLoadingBox__detailsDate c-ordersLoadingBox__blockBase" />
            <div class="c-ordersLoadingBox__detailsInfo c-ordersLoadingBox__blockBase" />
          </div>
          <div class="c-ordersLoadingBox__triggerInfo">
            <div class="c-ordersLoadingBox__infoStatus c-ordersLoadingBox__blockBase" />
            <div class="c-ordersLoadingBox__infoTrack c-ordersLoadingBox__blockBase" />
          </div>
        </div>
        <div class="c-ordersLoadingBox__triggerBottom">
          <div class="c-ordersLoadingBox__triggerAddress">
            <div class="c-ordersLoadingBox__triggerAddress1 c-ordersLoadingBox__blockBase" />
            <div class="c-ordersLoadingBox__triggerAddress2 c-ordersLoadingBox__blockBase u-hideTabletUp" />
          </div>
          <div class="c-ordersLoadingBox__triggerCircle">
            <c-svg class="c-ordersLoadingBox__triggerIcon"
              name="chevron"
            />
          </div>
        </div>
      </div>
      <div class="c-ordersLoadingBox__content" v-if="isOpen">
        <div class="c-ordersLoadingBox__grid">
          <div class="c-ordersLoadingBox__gridItem"
            v-for="n in 3"
            :key="`order-item-${n}`"
          >
            <div class="c-ordersLoadingBox__itemImage" />
            <div class="c-ordersLoadingBox__itemDetails">
              <div class="c-ordersLoadingBox__itemTitle" />
              <div class="c-ordersLoadingBox__itemInterval" />
              <div class="c-ordersLoadingBox__itemPrice" />
            </div>
          </div>
        </div>
        <div class="c-ordersLoadingBox__bottom">
          <div class="c-ordersLoadingBox__billing">
            <div class="c-ordersLoadingBox__billingInfo">
              <div class="c-ordersLoadingBox__billingHeading" />
              <div class="c-ordersLoadingBox__billingStatus" />
            </div>
            <div class="c-ordersLoadingBox__billingAddress">
              <div class="c-ordersLoadingBox__billingAddress1" />
              <div class="c-ordersLoadingBox__billingAddress2" />
            </div>
          </div>
          <div class="c-ordersLoadingBox__summary">
            <div class="c-ordersLoadingBox__summaryLine"
              v-for="n in 5"
              :key="`order-summary-${n}`"
            >
              <div class="c-ordersLoadingBox__summaryLabel" />
              <div class="c-ordersLoadingBox__summaryValue" />
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
  .c-ordersLoadingBox__blockBase {
    @include gradient-shimmer;
    border-radius: 3px;
  }
  .c-ordersLoadingBox__heading {
    width: 300px;
    height: 44px;
    margin-bottom: 40px;
  }
  .c-ordersLoadingBox__subheading {
    width: 140px;
    height: 20px;
    margin-bottom: 10px;
  }
  .c-ordersLoadingBox__box {
    width: 100%;
    padding: 30px;
    background-color: $color-white;
    border-radius: 20px;
    border: 1px solid #E5E5E5;
    @include media-mobile-down {
      padding: 15px;
    }
  }
  .c-ordersLoadingBox__trigger {
    @include media-tablet-up {
      @include flex($justify: flex-start, $wrap: nowrap);
    }
  }
  .c-ordersLoadingBox__triggerTop,
  .c-ordersLoadingBox__triggerBottom {
    @include flex($justify: space-between, $align: flex-start, $wrap: nowrap);
    width: 100%;
    @include media-tablet-up {
      width: auto;
      align-items: center;
    }
  }
  .c-ordersLoadingBox__triggerBottom {
    flex-grow: 1;
  }
  .c-ordersLoadingBox__detailsDate,
  .c-ordersLoadingBox__infoStatus {
    width: 100px;
    height: 20px;
    margin-bottom: 5px;
    @include media-tablet-up {
      width: 140px;
      margin-bottom: 10px;
    }
  }
  .c-ordersLoadingBox__detailsInfo,
  .c-ordersLoadingBox__infoTrack {
    width: 105px;
    height: 16px;
    margin-bottom: 30px;
    @include media-tablet-up {
      width: 145px;
      margin-bottom: 0;
    }
  }
  .c-ordersLoadingBox__triggerInfo {
    margin-left: 20px;
    @include media-tablet-up {
      margin-left: 50px;
    }
    @include media-desktop-up {
      margin-left: 70px;
    }
  }
  .c-ordersLoadingBox__triggerAddress1,
  .c-ordersLoadingBox__triggerAddress2 {
    width: 160px;
    height: 22px;
    @include media-tablet-up {
      width: 200px;
      margin-left: 50px;
    }
    @include media-up(900px) {
      width: 340px;
      margin-left: 70px;
    }
  }
  .c-ordersLoadingBox__triggerAddress2 {
    width: 130px;
    margin-top: 10px;
  } 
  .c-ordersLoadingBox__triggerCircle {
    min-width: 40px;
    width: 40px;
    height: 40px;
    border: 2px solid #E5E5E5;
    border-radius: 50%;
    @include flex($justify: center);
    margin-left: 20px;
  }
  .c-ordersLoadingBox__triggerIcon {
    color: #E5E5E5;
    width: 12px;
    height: auto;
    transition: transform .35s ease-in-out;
    transform-origin: 50%;
    .c-ordersLoadingBox--isOpen & {
      transform: rotate(180deg);
    }
  }
  .c-ordersLoadingBox__grid { 
    @include grid($columns: 1fr, $auto-flow: row, $gap: 30px 20px);
    margin-top: 30px;
    margin-bottom: 30px;
    @include media-tablet-up {
      grid-template-columns: 1fr 1fr;
    }
    @include media-desktop-up {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  .c-ordersLoadingBox__gridItem {
    width: 100%;
    @include flex($align: flex-start, $wrap: nowrap);
    @include box-card;
    padding: 20px;
  }
  .c-ordersLoadingBox__itemImage {
    width: 86px;
    height: 86px;
    @include gradient-shimmer;
    border-radius: 3px;
  }
  .c-ordersLoadingBox__itemDetails {
    margin-left: 30px;
  }
  .c-ordersLoadingBox__itemTitle {
    width: 150px;
    height: 18px;
    margin-bottom: 8px;
    @include gradient-shimmer;
    border-radius: 3px;
    @include media-desktop-up {
      width: 172px;
    }
  }
  .c-ordersLoadingBox__itemInterval,
  .c-ordersLoadingBox__itemPrice {
    width: 130px;
    height: 16px;
    margin-bottom: 8px;
    @include gradient-shimmer;
    border-radius: 3px;
    @include media-desktop-up {
      width: 160px;
    }
  }
  .c-ordersLoadingBox__itemPrice {
    width: 60px;
  }
  .c-ordersLoadingBox__bottom {
    @include flex($direction: column, $align: flex-start);
    @include box-card;
    padding: 20px;
    @include media-tablet-up {
      @include flex($justify: space-between, $wrap: nowrap);
    }
  }
  .c-ordersLoadingBox__billing {
    @include flex($direction: column, $align: flex-start);
    margin-bottom: 50px;
    @include media-tablet-up {
      @include flex($wrap: nowrap);
      margin-bottom: 0;
    }
  }
  .c-ordersLoadingBox__billingHeading,
  .c-ordersLoadingBox__billingAddress1 {
    width: 140px;
    height: 20px;
    margin-bottom: 8px;
    @include gradient-shimmer;
    border-radius: 3px;
  }
  .c-ordersLoadingBox__billingStatus, 
  .c-ordersLoadingBox__billingAddress2 {
    width: 160px;
    height: 16px;
    @include gradient-shimmer;
    border-radius: 3px;
  }
  .c-ordersLoadingBox__billingAddress {
    @include media-mobile-down {
      margin-top: 40px;
    }
    @include media-tablet-up {
      margin-left: 40px;
    }
    @include media-up(900px) {
      margin-left: 80px;
    }
  }
  .c-ordersLoadingBox__summary {
    width: 100%;
    @include flex($justify: space-between);
    @include media-tablet-up {
      width: 200px;
    }
  }
  .c-ordersLoadingBox__summaryLine {
    width: 100%;
    @include flex($justify: space-between);
    margin-bottom: 8px;
    .c-ordersLoadingBox__summaryLine:last-child {
      margin-top: 12px;
    }
  }
  .c-ordersLoadingBox__summaryLabel,
  .c-ordersLoadingBox__summaryValue {
    width: 42px;
    height: 14px;
    @include gradient-shimmer;
    border-radius: 3px;
  } 
  .c-ordersLoadingBox__summaryLabel {
    .c-ordersLoadingBox__summaryLine:nth-child(1) & {
      width: 60px;
    }
    .c-ordersLoadingBox__summaryLine:nth-child(2),
    .c-ordersLoadingBox__summaryLine:nth-child(3) & {
      width: 64px;
    }
    .c-ordersLoadingBox__summaryLine:nth-child(4) & {
      width: 30px;
    }
    .c-ordersLoadingBox__summaryLine:nth-child(5) & {
      width: 50px;
      height: 20px;
    }
  }
  .c-ordersLoadingBox__summaryValue {
    .c-ordersLoadingBox__summaryLine:nth-child(2) & {
      width: 60px;
    }
    .c-ordersLoadingBox__summaryLine:nth-child(5) & {
      height: 20px;
    }
  }
</style>