<template>
  <div :class="_buildModifiers('c-cartHeader', modifiers)">
    <h3 class="c-cartHeader__label c-h3 u-textCenter"
      v-html="content.header_text
        ? content.header_text : '{{ header_text }}'
      "
    />
  </div>
</template>

<script>
export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    content() {
      return this.$store.getters['contentByPrefix']('header_')
    }
  }
}
</script>

<style lang="scss">
  .c-cartHeader {
    border-bottom: 1px solid $color-hr;
    flex-shrink: 0;
    padding: 24px 20px;
  }
  .c-cartHeader__label {
    font-size: 24px;
    margin-bottom: 0;

    @include media-tablet-up {
      font-size: 18px;
    }
  }
</style>