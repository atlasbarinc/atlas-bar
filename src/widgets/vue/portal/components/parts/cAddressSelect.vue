<template>
  <div :class="_buildModifiers('c-addressSelect', modifiers)">
    <div class="c-addressSelect__field">
      <label class="c-addressSelect__label"
        v-if="label"
        v-html="label"
      />
      <c-select class="c-addressSelect__select"
        v-model="addressModel"
        :options="options"
        :attributes="{ value: addressModel }"
        :modifiers="['isDefault']"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import cSelect from '@shared/components/core/cSelect.vue'

export default {
  props: {
    label: {
      type: String,
      requied: false
    },
    address: {
      type: Object,
      required: false
    },
    modifiers: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    addressModel: false
  }),
  components: { cSelect },
  computed: {
    ...mapGetters('customer', ['customerAddresses']),
    options() {
      return this.customerAddresses.map(address => {
        return { text: address.address1, value: address.id }
      })
    }
  },
  watch: {
    addressModel: {
      handler(val) {
        const address = this.customerAddresses.find(address => address.id == val)
        if(address) this.$emit('input', address)
      }
    }
  },
  created() {
    if(this.address) this.addressModel = this.address.id
    else this.addressModel = this.customerAddresses[0].id
  }
}
</script>

<style lang="scss">
  .c-addressSelect__label {
    display: block;
    margin-bottom: 10px;
    @include text-heading;
    font-size: 14px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .c-addressSelect__field {
    margin-bottom: 20px;
  }
</style>