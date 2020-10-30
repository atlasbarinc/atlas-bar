<template>
  <div :class="_buildModifiers('c-select', extendedModifiers)">
    <span class="c-select__label"
      v-if="label && showLabel"
      v-html="`${label}:`"
    />
    <span class="c-select__text" 
      v-html="activeOption.text" 
    />
    <select class="c-select__element"
      ref="select" 
      @change="update"
    >
      <option v-for="(option, index) in options" 
        :key="`option-${index}`"
        :value="option.value"
        :selected="option.value === activeOption.value"
        v-html="option.text"
      />
    </select>
    <span class="c-select__icon">
      <c-svg class="c-select__iconChevron" 
        v-if="icon === 'selectChevron'"
        name="selectChevron"
      />
      <c-svg class="c-select__iconSort" 
        v-if="icon === 'selectSort'"
        name="selectSort"
      />
      <slot name="icon" />
    </span>
    <input class="c-select__input"
      v-bind="attributes"
      @input="updateSelect"
    />
  </div>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'

export default {
  props: {
    label: {
      type: [String, Boolean],
      default: false
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    attributes: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array,
      required: true
    },
    error: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Boolean],
      default: 'selectChevron'
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cSvg },
  computed: {
    activeOption() {
      if(this.options) {
        const activeOption = this.options.find(option => option.value === this.attributes.value)
        return activeOption ? activeOption : this.options[0]
      }
    },
    extendedModifiers() {
      let modifiers = [ ...this.modifiers ]
      if(this.attributes.disabled) modifiers.push('isDisabled')
      if(this.label && this.showLabel) modifiers.push('hasLabel')
      if(this.error) modifiers.push('hasError')
      return modifiers
    }
  },
  methods: {
    updateSelect(event) {
      this.$refs.select.value = event.target.value
      this.update()
    },
    update() {
      this.$emit('input', this.$refs.select.value)
    }
  }
}
</script>