<template>
  <div :class="_buildModifiers('c-variantSelect', modifiers)" 
    v-if="product"
  >
    <div class="c-variantSelect__field"
      v-for="(select, index) in selects"
      :key="`${product.id}-${select.title}-${index}`"
    >
      <label class="c-variantSelect__label"
        v-if="select.label"
        v-html="select.label"
      />
      <c-select class="c-variantSelect__select"
        v-model="selectModel[`option${index + 1}`]"
        :options="select.options"
        :modifiers="['isDefault']"
        :attributes="{
          value: selectModel[`option${index + 1}`]
        }"
      />
    </div>
  </div>
</template>

<script>
import { _stringEmpty } from '@shared/scripts'
import cSelect from '@shared/components/core/cSelect.vue'

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    variant: {
      type: Object,
      required: false
    },
    modifiers: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    selectModel: {
      option1: undefined,
      option2: undefined,
      option3: undefined
    }
  }),
  components: { cSelect },
  computed: {
    selects() {
      return this.product.options.map(option => {
        return { 
          label: option.title,
          options: option.values.map(value => {
            return { text: value, value }
          })
        }
      })
    },
    selectedVariant() {
      let { option1, option2, option3 } = this.selectModel
      const selectedOptions = [ option1, option2, option3 ]
        .filter(option => option)
      return this.product.variants.find(variant => {
        let { option1, option2, option3 } = variant.options
        const variantOptions = [ option1, option2, option3 ]
          .filter(option => !_stringEmpty(option))
        return variantOptions.join() === selectedOptions.join()
      })
    }
  },
  watch: {
    selectedVariant: {
      deep: true,
      handler(val) {
        this.$emit('input', val)
      }
    }
  },
  created() {
    if(!this.variant) {
      const { option1, option2, option3 } = this.product.variants[0].options
      this.selectModel = { option1, option2, option3 }
    } else {
      const { option1, option2, option3 } = this.variant.options
      this.selectModel = { option1, option2, option3 }
    }
  }
}
</script>

<style lang="scss">
  .c-variantSelect__label {
    display: block;
    margin-bottom: 10px;
    @include text-heading;
    font-size: 14px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .c-variantSelect__field {
    margin-bottom: 20px;
  }
</style>