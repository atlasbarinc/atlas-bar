<template>
  <div :class="_buildModifiers('c-modalError', modifiers)"
    v-if="content"
  >
    <c-h class="c-modalError__heading c-modal__heading"
      tag="h2"
      level="2"
      v-if="content.error_heading"
      :text="content.error_heading"
      :modifiers="['isBolder']"
    />
    <c-p class="c-modalError__text"
      tag="p"
      level="2"
      v-if="content.error_text"
      :text="content.error_text"
      :modifiers="['isBolder']"
    />
    <c-button class="c-modalError__confirm"
      v-if="content.error_button_confirm"
      :text="content.error_button_confirm"
      :modifiers="[ 'isDefault', 'isSecondary', 'hideTextLoading' ]"
      @click="handleSupport"
    />
    <c-button class="c-modalError__cancel"
      v-if="content.error_button_cancel"
      :text="content.error_button_cancel"
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
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_MODAL']),
    handleSupport() {
      const { error_button_link } = this.content
      if(error_button_link) {
        window.open(error_button_link, "_blank")
      } else this.UI_CLOSE_MODAL()
    }
  }
}
</script>

<style lang="scss">
  .c-modalError {
    @include flex($direction: column);
    text-align: center;
  }
  .c-modalError__confirm {
    margin-top: 20px;
  }
  .c-modalError__cancel {
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