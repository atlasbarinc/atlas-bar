<template>
  <div :class="_buildModifiers('c-detailsBlock', modifiers)">
    <c-h class="c-detailsBlock__heading"
      v-if="heading"
      tag="h6"
      level="6"
      :modifiers="['isEyebrow']"
      :text="heading"
    />
    <div class="c-detailsBlock__inner">
      <slot />
    </div>
  </div>
</template>

<script>
import cH from '@shared/components/core/cH.vue'

export default {
  props: {
    heading: {
      type: [String, Boolean],
      default: false
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cH }
}
</script>

<style lang="scss">
  .c-detailsBlock {
    height: 100%;
    width: 100%;
    @include flex($direction: column, $justify: stretch, $align: stretch, $wrap: nowrap);
  }
  .c-detailsBlock__heading {
    margin-bottom: 15px;
  }
  .c-detailsBlock__inner {
    min-height: 100px;
    @include flex($justify: space-between, $wrap: nowrap);
    @include box-card;
  }
</style>