<template>
  <form :class="_buildModifiers('c-formPassword', modifiers)"
    @submit.prevent="handleSubmit"
    v-if="content"
  >
    <c-alert class="c-formPassword__alert"
      v-if="!hideAlert && status"
      :role="status"
      :messages="messages"
    />
    <c-field class="c-formPassword__field" 
      v-if="content.email_label"
      :label="content.email_label"
    >
      <c-input class="c-formPassword__input"
        v-model="passwordModel.email"
        :error="errors.email"
        :modifiers="['isDefault']"
        :attributes="{
          type: 'text',
          value: passwordModel.email,
          placeholder: content.email_placeholder,
          disabled: customerShopify.email
        }"
      />
    </c-field>
    <c-button class="c-formPassword__button"
      v-if="content.button_text"
      :loading="loading"
      :success="status === 'success'"
      :attributes="{ 
        disabled: status === 'success' 
      }"
      :text="{
        default: content.button_text,
        success: content.button_success
      }"
      :modifiers="[
        'isDefault', 'isSecondary', 
        'hideTextLoading', 'isSubmit'
      ]"
    />
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { _authRecover } from '@shared/scripts'
import cAlert from '@shared/components/core/cAlert.vue'
import cField from '@shared/components/core/cField.vue'
import cInput from '@shared/components/core/cInput.vue'
import cButton from '@shared/components/core/cButton.vue'

export default {
  props: {
    value: {
      type: [String, Boolean],
      required: false
    },
    hideAlert: {
      type: Boolean,
      default: false
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
  components: { cAlert, cField, cInput, cButton },
  data: (self = this) => ({
    passwordModel: { email: self.value ? self.value : '' },
    loading: false,
    status: false,
    messages: [],
    errors: {}
  }),
  computed: {
    ...mapGetters('customer', ['customerShopify']),
    hasErrors() {
      return Object.keys(this.errors).length > 0
    }
  },
  methods: {
    validateForm() {
      this.status = false
      this.errors = {}
      this.messages = []
      const formValidation = this._validateForm([
        { 
          name: 'email', value: this.passwordModel.email, 
          rules: ['validateEmail', 'validateRequired'],
          messages: [
            this.content.error_email,
            this.content.error_required
          ]
        }
      ])
      if(formValidation.hasErrors) this.status = 'error'
      this.errors = { ...formValidation.errors }
      this.messages = [ ...formValidation.messages ]
    },
    async handleSubmit() {
      this.validateForm()
      if(!this.hasErrors) {
        this.loading = true
        const { error } = await _authRecover({ email: this.passwordModel.email })
        if(!error) {
          this.status = 'success'
          if(!this.hideAlert && this.content.success_text) {
            this.messages.push(this.content.success_text)
          }
        } else {
          this.status = 'error'
          switch(error) {
            case 'NO_CUSTOMER':
              this.messages.push(this.content.error_customer)
              break;
            case 'LIMIT_EXCEEDED':
              this.messages.push(this.content.error_limit)
              break;
            default: 
              this.messages.push(this.content.error_general)
          }
        }
        this.loading = false
      }
    }
  },
  watch: {
    'customerShopify.email': {
      immediate: true,
      handler(val) {
        if(val) this.passwordModel.email = val
      }
    }
  }
}
</script>