<template>
  <div :class="_buildModifiers('c-detailsLoading', modifiers)">
    <div class="c-detailsLoading__heading c-detailsLoading__blockBase u-hideMobileDown" />
    <div class="c-detailsLoading__box c-detailsLoading__box--isFirst">
      <c-detailsLoadingBlock class="c-detailsLoading__block"
        :heading="true"
        :modifiers="['isSingle']"
      />
      <div class="c-detailsLoading__blockGroup">
        <c-detailsLoadingBlock class="c-detailsLoading__block"
          v-for="n in 3"
          :key="`details-item-${n}`"
          :heading="true"
        />
      </div>
    </div>
    <div class="c-detailsLoading__box">
      <div class="c-detailsLoading__blockPlans">
        <c-detailsLoadingBlock class="c-detailsLoading__block"
          :heading="true"
          :modifiers="['isSingle']"
        />
         <c-detailsLoadingBlock class="c-detailsLoading__block"
          :heading="false"
          :modifiers="['isSingle']"
        />
      </div>
    </div>
  </div>
</template>

<script>
import cDetailsLoadingBlock from './cDetailsLoadingBlock.vue'

export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cDetailsLoadingBlock }
}
</script>

<style lang="scss">
  .c-detailsLoading__blockBase {
    @include gradient-shimmer;
    border-radius: 3px;
  }
  .c-detailsLoading__heading {
    width: 340px;
    max-width: 100%;
    height: 36px;
    margin-bottom: 28px;
  }
  .c-detailsLoading__box {
    width: 100%;
    padding: 25px;
    background-color: $color-white;
    border-radius: 20px;
    border: 1px solid #E5E5E5;
    @include media-mobile-down {
      padding: 15px;
    }
    &:not(.c-detailsLoading__box--isFirst) { margin-top: 40px; }
  }
  .c-detailsLoading__blockGroup {
    @include grid($columns: 1fr, $auto-flow: row, $gap: 30px 20px);
    @include media-tablet-up {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>