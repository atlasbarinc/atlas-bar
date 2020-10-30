<template>
  <c-select :class="_buildModifiers('c-countrySelect', modifiers)"
    :options="options"
    :modifiers="modifiers"
    :attributes="attributes"
    @input="update"
  />
</template>

<script>
import cSelect from '@shared/components/core/cSelect.vue'
import { _countryList } from '@shared/scripts'

export default {
  props: {
    attributes: {
      type: Object,
      default: () => ({})
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cSelect },
  computed: {
    countries() {
      return _countryList()
    },
    options() {
      return this.countries.map(country => {
        return { value: country, text: country }
      })
    }
  },
  methods: {
    update(val) {
      this.$emit('input', val)
    }
  }
}
</script>