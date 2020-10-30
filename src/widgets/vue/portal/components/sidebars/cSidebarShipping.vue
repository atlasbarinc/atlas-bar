<template>
  <div :class="_buildModifiers('c-sidebarShipping', modifiers)"
    v-if="content && address"
  >
      <c-formShipping class="c-sidebarShipping__form"
        :address="address"
        :hideAlert="true"
        :content="{
          first_label: content.shipping_first_label,
          last_label: content.shipping_last_label,
          address1_label: content.shipping_address1_label,
          address2_label: content.shipping_address2_label,
          city_label: content.shipping_city_label,
          province_label: content.shipping_province_label,
          button_text: content.shipping_button_text,
          zip_label: content.shipping_zip_label,
          country_label: content.shipping_country_label,
          button_success: content.shipping_button_success
        }"
      />
  </div>
</template>

<script>
import cFormShipping from '../forms/cFormShipping.vue'

export default {
  props: {
    settings: {
      type: Object,
      required: true
    },
    content: {
      type: Object,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cFormShipping },
  computed: {
    address() {
      return this.$store.getters['customer/customerAddressById'](this.settings.addressId)
    }
  }
}
</script>

<style lang="scss">
  .c-sidebarShipping__form {
    max-width: 800px;
  }
</style>