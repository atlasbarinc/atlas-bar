<template>
  <div :class="_buildModifiers('c-shipmentsLoading', modifiers)">
    <div class="c-shipmentsLoading__loyalty u-fullScreenWidth">
      <div class="c-shipmentsLoading__loyaltyMain o-container">
        <div class="c-shipmentsLoading__loyaltyLeft">
          <div class="c-shipmentsLoading__loyaltyHeading c-shipmentsLoading__blockBase" />
          <div class="c-shipmentsLoading__loyaltyText c-shipmentsLoading__blockBase" />
          <div class="c-shipmentsLoading__loyaltyText c-shipmentsLoading__loyaltyText--isLast c-shipmentsLoading__blockBase" />
          <div class="c-shipmentsLoading__loyaltyButtons u-hideMobileDown">
            <div class="c-shipmentsLoading__loyaltyButton" />
            <div class="c-shipmentsLoading__loyaltyButton" />
          </div>
        </div>
        <div class="c-shipmentsLoading__loyaltyRight u-hideMobileDown"
          ref="loyaltyRight"
        >
          <div class="c-shipmentsLoading__loyaltyImage" 
            :style="imageStyles"
          />
          <c-svg class="c-shipmentsLoading__loyaltyDiagonal"
            name="diagonal"
          />
          <div class="c-shipmentsLoading__loyaltyRefer">
            <div class="c-shipmentsLoading__loyaltyLabel c-shipmentsLoading__blockBase" />
            <div class="c-shipmentsLoading__loyaltyLink c-shipmentsLoading__blockBase" />
          </div>
        </div>
      </div>
    </div>
    <div class="c-shipmentsLoading__list">
      <c-shipmentsLoadingBox class="c-shipmentsLoading__listBox" 
        :modifiers="['isOpen']"
      />
      <c-shipmentsLoadingBox class="c-shipmentsLoading__listBox" />
    </div>
    <div class="c-shipmentsLoading__bottom o-container">
      <div class="c-shipmentsLoading__upsell">
        <div class="c-shipmentsLoading__upsellHeading c-shipmentsLoading__blockBase" />
        <c-shipmentsLoadingCarousel class="c-shipmentsLoading__upsellCarousel" />
      </div>
    </div>
  </div>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'
import cShipmentsLoadingBox from './cShipmentsLoadingBox.vue'
import cShipmentsLoadingCarousel from './cShipmentsLoadingCarousel.vue'

export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { 
    cSvg, cShipmentsLoadingBox, cShipmentsLoadingCarousel
  },
  data: () => ({
    imageStyles: false
  }),
  methods: {
    setImageStyles() {
      const { loyaltyRight } = this.$refs
      if(loyaltyRight) {
        const windowWidth = window.innerWidth
        const offsetLeft = loyaltyRight.offsetLeft
        const imageWidth = windowWidth - offsetLeft + 1
        this.imageStyles = `width: ${imageWidth}px;`  
      }
    }
  },
  mounted() {
    const refsInterval = setInterval(() => {
      const { loyaltyRight } = this.$refs
      if(loyaltyRight) {
        this.setImageStyles()
        clearInterval(refsInterval)
      }
    }, 150)
    window.addEventListener('resize', this.setImageStyles)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setImageStyles)
  }
}
</script>

<style lang="scss">
  .c-shipmentsLoading__blockBase {
    @include gradient-shimmer;
    border-radius: 3px;
  }
  .c-shipmentsLoading__loyalty {
    @include flex($align: stretch, $wrap: nowrap);
    position: relative;
    background-color: #FAFAFA;
    border-bottom: 1px solid #E5E5E5;
    margin-bottom: 30px;
    @include media-desktop-up {
      margin-bottom: 40px;
    }
  }
  .c-shipmentsLoading__loyaltyMain {
    @include flex($wrap: nowrap, $align: stretch);
  }
  .c-shipmentsLoading__loyaltyLeft {
    flex-grow: 1;
    padding: 70px 60px 70px 0;
    @include media-tablet-down { padding: 70px 10px 70px 0; }
    @include media-mobile-down { 
      padding: 30px 0; 
      text-align: center;
    }
  }
  .c-shipmentsLoading__loyaltyHeading {
    width: 280px;
    height: 28px;
    margin: 0 auto 10px;
    @include media-tablet-up {
      margin: 0 0 16px;
    }
    @include media-desktop-up {
      width: 320px;
      height: 34px;
    }
  }
  .c-shipmentsLoading__loyaltyText {
    width: 250px;
    height: 20px;
    margin: 0 auto 8px;
    &.c-shipmentsLoading__loyaltyText--isLast {
      margin-bottom: 0;
      width: 230px;
    }
    @include media-tablet-up {
      width: 320px;
      height: 24px;
      margin: 0 0 12px;
      &.c-shipmentsLoading__loyaltyText--isLast {
        width: 310px;
      }
    }
    @include media-desktop-up {
      width: 380px;
      height: 28px;
      &.c-shipmentsLoading__loyaltyText--isLast {
        width: 370px;
      }
    }
  }
  .c-shipmentsLoading__loyaltyButtons {
    @include flex($wrap: wrap);
    margin-top: 24px;
    margin: 0 -15px;
  }
  .c-shipmentsLoading__loyaltyButton {
    margin: 20px 15px 0;
    @include gradient-shimmer;
    border-radius: 40px;
    &:first-child { width: 194px; height: 50px; }
    &:last-child { width: 170px; height: 50px; }
    @include media-desktop-up {
      &:first-child { width: 225px; height: 56px; }
      &:last-child { width: 200px; height: 56px; }
    }
  }
  .c-shipmentsLoading__loyaltyRight {
    position: relative;
    @include flex($direction: column, $justify: flex-end);
  }
  .c-shipmentsLoading__loyaltyImage {
    position: absolute !important;
    left: 0;
    height: 100%;
    min-width: 100%;
    @include gradient-shimmer($color: #F2F2F2);
    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 70px;
      background-color: $color-white;
      position: absolute;
      bottom: 0;
    }
  }
  .c-shipmentsLoading__loyaltyRefer {
    width: 100%;
    @include flex($justify: flex-end, $wrap: nowrap);
    height: 70px;
    padding-left: 60px;
    z-index: 1;
    @include media-tablet-down {
      padding-left: 40px;
    }
  }
  .c-shipmentsLoading__loyaltyLabel {
    width: 168px;
    height: 22px;
    @include media-desktop-up {
      width: 200px;
      height: 26px;
    }
  }
  .c-shipmentsLoading__loyaltyLink {
    width: 110px;
    height: 16px;
    margin-left: 30px;
    @include media-desktop-up {
      width: 128px;
      height: 20px;
      margin-left: 40px;
    }
  }
  .c-shipmentsLoading__loyaltyDiagonal {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 90px;
    transform: rotate(180deg);
    color: #FAFAFA;
    z-index: 2;
  }
  .c-shipmentsLoading__list {
    width: 100%;
    max-width: 840px;
    margin: 0 auto 80px;
  } 
  .c-shipmentsLoading__listBox {
    margin-bottom: 40px;
  }
  .c-shipmentsLoading__bottom {
    @include media-mobile-down {
      width: 100%;
    }
  }
  .c-shipmentsLoading__upsell {
    max-width: 1200px;
    padding: 0 80px;
  }
  .c-shipmentsLoading__upsellHeading {
    width: 400px;
    height: 32px; 
    margin-bottom: 36px;
  }

  
</style>