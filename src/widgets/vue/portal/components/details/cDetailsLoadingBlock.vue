<template>
  <div :class="_buildModifiers('c-detailsLoadingBlock', modifiers)">
    <div class="c-detailsLoadingBlock__heading c-detailsLoadingBlock__blockBase"
      v-if="heading"
    />
    <div class="c-detailsLoadingBlock__inner">
      <div class="c-detailsLoadingBlock__content">
        <div class="c-detailsLoadingBlock__text c-detailsLoadingBlock__blockBase" />
        <div class="c-detailsLoadingBlock__text c-detailsLoadingBlock__blockBase" 
          v-if="multiLine"
        />
        <div class="c-detailsLoadingBlock__text c-detailsLoadingBlock__blockBase" 
          v-if="multiLine"
        />
      </div>
      <div class="c-detailsLoadingBlock__button c-detailsLoadingBlock__blockBase" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: Boolean,
      default: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    multiLine() {
      return this.modifiers.includes('isSingle')
    }
  }
}
</script>

<style lang="scss">
  .c-detailsLoadingBlock__blockBase {
    @include gradient-shimmer;
    border-radius: 3px;
  }
  .c-detailsLoadingBlock {
    height: 100%;
    width: 100%;
    @include flex($direction: column, $justify: stretch, $align: stretch, $wrap: nowrap);
    &.c-detailsLoadingBlock--isSingle { margin-bottom: 30px; }
  }
  .c-detailsLoadingBlock__heading {
    width: 140px;
    max-width: 100%;
    height: 18px;
    margin-bottom: 15px;
    border-radius: 3px;
  }
  .c-detailsLoadingBlock__inner {
    min-height: 110px;
    padding: 15px;
    border-radius: 20px;
    @include flex($justify: space-between, $wrap: nowrap);
    background-color: $color-white;
    border: 1px solid #E5E5E5;
    @include media-tablet-up {
      padding: 25px;
    }
  }
  .c-detailsLoadingBlock__text {
    width: 140px;
    height: 20px;
    &:not(:last-child) { margin-bottom: 12px; }
    &:nth-child(2) { width: 150px; }
    &:nth-child(3) { width: 140px; }
  }
  .c-detailsLoadingBlock__button {
    width: 46px;
    height: 20px;
  }
  .c-detailsLoading__blockGroup {
    .c-detailsLoadingBlock:nth-child(1) {
      .c-detailsLoadingBlock__heading { width: 60px; }
      .c-detailsLoadingBlock__text { width: 200px; }
    }
    .c-detailsLoadingBlock:nth-child(2) {
      .c-detailsLoadingBlock__heading { width: 100px; }
      .c-detailsLoadingBlock__text { width: 70px; }
    }
    .c-detailsLoadingBlock:nth-child(3) {
      .c-detailsLoadingBlock__heading { width: 160px; } 
      .c-detailsLoadingBlock__text { width: 36px; }
    }
  }
  .c-detailsLoading__blockPlans {
    .c-detailsLoadingBlock:nth-child(1) {
      .c-detailsLoadingBlock__heading { width: 200px; }
      .c-detailsLoadingBlock__text { width: 200px; }
      .c-detailsLoadingBlock__text:nth-child(2) { width: 150px; }
      .c-detailsLoadingBlock__text:nth-child(3) { width: 100px; }
      .c-detailsLoadingBlock__button { width: 60px; }
    }
    .c-detailsLoadingBlock:nth-child(1) {
      .c-detailsLoadingBlock__button { width: 90px; }
      .c-detailsLoadingBlock__text { width: 180px; }
      .c-detailsLoadingBlock__text:nth-child(2) { width: 160px; }
      .c-detailsLoadingBlock__text:nth-child(3) { width: 100px; }
    }
  }
</style>