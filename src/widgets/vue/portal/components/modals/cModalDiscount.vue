<template>
  <div :class="_buildModifiers('c-modalDiscount', modifiers)"
    v-if="content && discountCode"
  >
    <c-h class="c-modalDiscount__heading c-modal__heading"
      tag="h2"
      level="2"
      v-if="content.discount_heading"
      :text="content.discount_heading"
      :modifiers="['isBolder']"
    />
    <c-p class="c-modalDiscount__text"
      tag="p"
      level="2"
      v-if="text"
      :text="text"
      :modifiers="['isBolder']"
    />
    <c-button class="c-modalDiscount__confirm"
      v-if="content.discount_button_confirm"
      :text="content.discount_button_confirm"
      :modifiers="[ 'isDefault', 'isSecondary', 'hideTextLoading' ]"
      @click="handleSupport"
    />
    <c-button class="c-modalDiscount__cancel"
      v-if="content.discount_button_cancel"
      :text="content.discount_button_cancel"
      :modifiers="[ 'isUnderline', 'isPrimary' ]"
      @click="UI_CLOSE_MODAL"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import cH from '@shared/components/core/cH.vue'
import cP from '@shared/components/core/cP.vue'
import cButton from '@shared/components/core/cButton.vue'

export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    cH, cP, cButton
  },
  data: () => ({
    loading: { delay: false }
  }),
  computed: {
    discountCode() {
      return this.settings.discountCode
    },
    text() {
      const { discount_text } = this.content
      const { discountCode } = this.settings
      if(discount_text) {
        return discount_text.replace('{{ discount_code }}', `"${discountCode}"`)
      }
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_MODAL']),
    handleSupport() {
      const { discount_button_link } = this.content
      if(discount_button_link) {
        window.open(discount_button_link, "_blank")
      } else this.UI_CLOSE_MODAL()
    }
  }
}
</script>

<style lang="scss">
  .c-modalDiscount {
    @include flex($direction: column);
    text-align: center;
  }
  .c-modalDiscount__confirm {
    margin-top: 20px;
  }
  .c-modalDiscount__cancel {
    margin-top: 40px;
    padding: 0 0 1px;
    border-bottom: 2px solid $color-primary;
    color: $color-primary;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    &:hover {
      border-color: transparent;
      cursor: pointer;
    }
  }
</style>