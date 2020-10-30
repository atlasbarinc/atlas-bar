<template>
  <transition :name="name">
    <div class="c-dialog" v-if="show">
      <div class="c-dialog__container o-container">
          <div class="c-dialog__click" 
            v-if="closable"
            @click="$emit('click')" 
          />
        <dialog :class="_buildModifiers('c-dialog__box', modifiers)"
          :open="show"
        >
          <button class="c-dialog__close"
            v-if="closable"
            @click="$emit('close')"
          >
            <c-svg class="c-dialog__closeIcon" 
              name="timesThick" 
            />
          </button>
          <slot />
        </dialog>
      </div>
    </div>
  </transition>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    closable: {
      type: Boolean,
      default: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cSvg },
  computed: {
    name() {
      return `t-dialog-${this.type}`
    }
  }
}
</script>

<style lang="scss">
  .c-dialog {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow-y: scroll;
    z-index: $z-index-modal;
    transition-duration: .15s;
    transition-timing-function: ease-in-out;
    transition-property: opacity;
  }
  .c-dialog__click {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
  }
  .c-dialog__container {
    padding: 50px 0;
  }
  .c-dialog__box {
    padding: 30px;
    position: relative;
    background-color: $color-white;
    border-radius: 20px;
    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.1);
    border: none;
    z-index: $z-index-modal;
    width: 100%;
    max-width: 600px;
    @include media-mobile-down {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      max-width: none;
      height: 100vh;
      border-radius: 0;
      overflow: scroll;
    }
  }
  .c-dialog__close {
    @include button-unset;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 20px;
    right: 20px;
    @include flex($justify: center);
    z-index: 1;
    transition: background-color .15s ease-in-out;
    @include hover-fade;
  }
  .c-dialog__closeIcon {
    width: inherit;
    height: inherit;
    color: $color-primary;
  }
  .t-dialog-default-enter,
  .t-dialog-default-leave-to {
    opacity: 0;
  }
  .t-dialog-default-leave,
  .t-dialog-default-enter-to {
    opacity: 1;
  }
</style>