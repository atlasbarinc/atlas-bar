<template>
  <button :class="_buildModifiers(baseClass, extendedModifiers)"
    v-bind="attributes"
    @click="$emit('click')"
  >
    <slot name="before" />
    <span :class="`${baseClass}__text`"
      v-if="buttonText"
      v-html="buttonText"
    />
    <c-loading :class="`${baseClass}__loading`"
      v-if="loading"
      :modifiers="modifiers"
    />
    <c-svg :class="`${baseClass}__success`"
      v-if="success"
      name="success"
    />
    <slot />
  </button>
</template>

<script>
import cLoading from './cLoading.vue'
import cSvg from './cSvg.vue'

export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    url: {
      type: String,
      required: false,
    },
    text: {
      type: [Object, String, Number],
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    },
    attributes: {
      type: Object,
      default: () => ({})
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cLoading, cSvg },
  computed: {
    baseClass() {
      return `c-${this.type}`
    },
    extendedModifiers() {
      let modifiers = [ ...this.modifiers ]
      if(this.loading) modifiers.push('isLoading')
      if(this.success) modifiers.push('isSuccess')
      return modifiers
    },
    buttonText() {
      const { loading, success, text } = this
      const textDefault = text.default ? text.default : text
      if(loading) return text.loading ? text.loading : textDefault
      if(success) return text.success ? text.success : textDefault
      return textDefault
    }
  }
}
</script>

<style lang="scss">
  .c-button--isLoading {
    pointer-events: none;
  }
  .c-button__text {
    .c-button--isLoading.c-button--hideTextLoading & {
      opacity: 0;
    }
  }
  .c-button__loading {
    display: inline-flex;
    .c-button--hideTextLoading & {
      position: absolute;
    }
  }
  .c-button__success {
    width: 16px;
    margin-left: 10px;
  }
</style>