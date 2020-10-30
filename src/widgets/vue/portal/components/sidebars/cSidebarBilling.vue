<template>
  <div :class="_buildModifiers('c-sidebarBilling', modifiers)"
    v-if="content"
  >
      <c-formBilling class="c-sidebarBilling__form"
        :hideAlert="true"
        :content="{
          first_label: content.billing_first_label,
          last_label: content.billing_last_label,
          address1_label: content.billing_address1_label,
          address2_label: content.billing_address2_label,
          city_label: content.billing_city_label,
          province_label: content.billing_province_label,
          button_text: content.billing_button_text,
          zip_label: content.billing_zip_label,
          country_label: content.billing_country_label,
          button_success: content.billing_button_success
        }"
      />
  </div>
</template>

<script>
import cFormBilling from '../forms/cFormBilling.vue'

export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cFormBilling },
}
</script>

<style lang="scss">
  .c-sidebarBilling__form {
    max-width: 800px;
  }
</style>