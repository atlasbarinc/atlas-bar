<template>
  <div :class="_buildModifiers('c-sidebarPassword', modifiers)"
    v-if="content && customerShopify"
  >
      <c-formPassword class="c-sidebarPassword__form"
        :value="customerShopify.email"
        :hideAlert="true"
        :content="{
          email_label: content.password_email_label,
          button_text: content.password_button_text,
          button_success: content.password_button_success
        }"
      />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cFormPassword from '../forms/cFormPassword.vue'

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
  components: { cFormPassword },
  computed: {
    ...mapGetters('customer', ['customerShopify'])
  }
}
</script>

<style lang="scss">
  .c-sidebarPassword__form {
    max-width: 440px;
  }
</style>