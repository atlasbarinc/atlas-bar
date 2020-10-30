<template>
  <div :class="_buildModifiers('c-ordersEmpty', modifiers)"
    v-if="content"
  >
    <c-h class="c-ordersEmpty__preheading u-textCenter"
      tag="h6"
      level="6"
      v-if="content.preheading"
      :text="content.preheading"
      :modifiers="['isEyebrow']"
    />
    <c-h class="c-ordersEmpty__heading u-textCenter"
      tag="h3"
      level="3"
      v-if="content.heading"
      :text="content.heading"
      :modifiers="['isBolder']"
    />
    <c-a class="c-ordersEmpty__button"
      tag="a"
      type="button"
      v-if="content.button_url && content.button_text"
      :href="content.button_url"
      :text="content.button_text"
      :modifiers="['isDefault', 'isSecondary']"
    />
  </div>
</template>

<script>
import cH from '@shared/components/core/cH.vue'
import cA from '@shared/components/core/cA.vue'

export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cH, cA }
}
</script>

<style lang="scss">
  .c-ordersEmpty {
    margin-top: 40px;
    @include flex($direction: column);
    @include media-mobile-down {
      margin-top: 20px;
    }
  }
  .c-ordersEmpty__heading {
    @include media-mobile-down {
      margin: 5px 0 18px;
    }
  }
  .c-ordersEmpty__preheading {
    margin-bottom: 5px;
    color: $color-secondary;  
  }
  .c-ordersEmpty__button {
    min-width: 250px;
  }
</style>