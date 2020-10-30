<template>
  <c-select :class="_buildModifiers('c-provinceSelect', modifiers)"
    :options="options"
    :modifiers="modifiers"
    :attributes="attributes"
    @input="update"
  />
</template>

<script>
import { _countryInfo } from '@shared/scripts'
import cSelect from '@shared/components/core/cSelect.vue'

export default {
  props: {
    country: {
      type: String,
      required: true
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
  components: { cSelect },
  computed: {
    provinces() {
      return _countryInfo(this.country).provinces
    },
    options() {
      return this.provinces.map(province => { 
        return { value: province[0], text: province[0] }
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