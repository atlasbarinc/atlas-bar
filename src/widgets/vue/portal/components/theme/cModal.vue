<template>
  <div :class="_buildModifiers('c-modal', modal.modifiers)"
    ref="c-modal"
  >
    <c-overlay class="c-modal__overlay" 
      :show="show"
      @click="modal.settings.closable !== false ? UI_CLOSE_MODAL : ''"
      slot="overlay"
    />
    <c-dialog class="c-modal__dialog"
      :show="show"
      :modifiers="modal.modifiers"
      :closable="modal.settings.closable !== false"
      @close="UI_CLOSE_MODAL"
      @click="UI_CLOSE_MODAL"
    >
      <component class="c-modal__content" 
        :is="modalComponent"
        :content="modal.content"
        :settings="modal.settings"
      />
    </c-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import cOverlay from '@shared/components/core/cOverlay.vue'
import cDialog from '@shared/components/core/cDialog.vue'

export default {
  data: () => ({
    modalComponent: false
  }),
  components: { 
    cOverlay, cDialog
  },
  computed: {
    show() {
      return this.modalComponent ? true : false
    },
    modal() {
      return this.$store.getters['ui/uiByKey']('modal')
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_MODAL'])
  },
  watch: {
    "modal.component": {
      immediate: true,
      handler(val) {
        this.modalComponent = val 
          ? require(`../modals/${val}.vue`).default 
          : false
      }
    },
    "$route": {
      handler(val) {
        this.UI_CLOSE_MODAL()
      }
    }
  }
}
</script>

<style lang="scss">
  .c-modal {
    z-index: $z-index-modal;
    position: relative;
  }
  .c-modal__overlay {
    z-index: 1;
  }
  .c-modal__content {
    border-radius: 5px;
    overflow: hidden;
    z-index: 2;
  }
  .c-modal__heading {
    @include media-mobile-down {
      font-size: 34px;
    }
  }
</style>