<template>
  <form :class="_buildModifiers('c-formBilling', modifiers)"
    @submit.prevent="handleSubmit"
    v-if="content"
  >
    <c-alert class="c-formBilling__alert"
      v-if="!hideAlert && status"
      :role="status"
      :messages="messages"
    />
    <div class="c-formBilling__fieldGroup">
      <c-field class="c-formBilling__field"
        v-if="content.first_label"
        :label="content.first_label"
      >
        <c-input class="c-formBilling__input"
          v-model="billingModel.firstName"
          :error="errors.firstName"
          :modifiers="['isDefault']"
          :attributes="{
            type: 'text',
            value: billingModel.firstName
          }"
        />
      </c-field>
      <c-field class="c-formBilling__field"
        v-if="content.last_label"
        :label="content.last_label"
      >
        <c-input class="c-formBilling__input"
          v-model="billingModel.lastName"
          :error="errors.lastName"
          :modifiers="['isDefault']"
          :attributes="{
            type: 'text',
            value: billingModel.lastName
          }"
        />
      </c-field>
    </div>
    <div class="c-formBilling__fieldGroup">
      <c-field class="c-formBilling__field"
        v-if="content.address1_label"
        :label="content.address1_label"
      >
        <c-input class="c-formBilling__input"
          v-model="billingModel.address1"
          :error="errors.address1"
          :modifiers="['isDefault']"
          :attributes="{
            type: 'text',
            value: billingModel.address1
          }"
        />
      </c-field>
      <c-field class="c-formBilling__field"
        v-if="content.address2_label"
        :label="content.address2_label"
      >
        <c-input class="c-formBilling__input"
          v-model="billingModel.address2"
          :error="errors.address2"
          :modifiers="['isDefault']"
          :attributes="{
            type: 'text',
            value: billingModel.address2
          }"
        />
      </c-field>
    </div>
    <div class="c-formBilling__fieldGroup">
      <c-field class="c-formBilling__field"
        v-if="content.city_label"
        :label="content.city_label"
      >
        <c-input class="c-formBilling__input"
          v-model="billingModel.city"
          :error="errors.city"
          :modifiers="['isDefault']"
          :attributes="{
            type: 'text',
            value: billingModel.city
          }"
        />
      </c-field>
      <c-field class="c-formBilling__field"
        v-if="content.province_label"
        :label="content.province_label"
      >
        <c-provinceSelect class="c-formBilling__select"
          v-model="billingModel.province"
          :country="billingModel.country"
          :error="errors.province"
          :modifiers="['isDefault']"
          :attributes="{
            value: billingModel.province
          }"
        />
      </c-field>
    </div>
    <div class="c-formBilling__fieldGroup">
      <c-field class="c-formBilling__field"
        v-if="content.zip_label"
        :label="content.zip_label"
      >
        <c-input class="c-formBilling__input"
          v-model="billingModel.zip"
          :error="errors.zip"
          :modifiers="['isDefault']"
          :attributes="{
            type: 'text',
            value: billingModel.zip
          }"
        />
      </c-field>
      <c-field class="c-formBilling__field"
        v-if="content.country_label"
        :label="content.country_label"
      >
        <c-countrySelect class="c-formBilling__select"
          v-model="billingModel.country"
          :country="billingModel.country"
          :error="errors.country"
          :modifiers="['isDefault']"
          :attributes="{
            value: billingModel.country
          }"
        />
      </c-field>
    </div>
    <c-button class="c-formBilling__button"
      v-if="content.button_text"
      :loading="loading"
      :success="status === 'success'"
      :attributes="{ 
        disabled: disabled || status === 'success'
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
import deepEqual from 'deep-equal'
import { mapGetters, mapActions } from 'vuex'
import cAlert from '@shared/components/core/cAlert.vue'
import cField from '@shared/components/core/cField.vue'
import cInput from '@shared/components/core/cInput.vue'
import cButton from '@shared/components/core/cButton.vue'
import cProvinceSelect from '@shared/components/parts/cProvinceSelect.vue'
import cCountrySelect from '@shared/components/parts/cCountrySelect.vue'

export default {
  props: {
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
  data: () => ({
    billingModel: { 
      firstName: '', lastName: '',
      address1: '', address2: '', city: '',
      province: '', zip: '', country: ''
    },
    loading: false,
    status: false,
    messages: [],
    errors: {}
  }),
  components: { 
    cAlert, cField, cInput, cButton,
    cProvinceSelect, cCountrySelect
  },
  computed: {
    ...mapGetters('customer', ['customerRecharge']),
    addressFields() {
      const { firstName, lastName, billingAddress } = this.customerRecharge
      const { address1, address2, city, province, zip, country } = billingAddress
      return { firstName, lastName, address1, address2, city, province, zip, country }
    },
    disabled() {
      return deepEqual(this.billingModel, this.addressFields)
    },
    hasErrors() {
      return Object.keys(this.errors).length > 0
    }
  },
  methods: {
    ...mapActions('customer', ['customerUpdateBilling']),
    validateForm() {
      this.status = false
      this.errors = {}
      this.messages = []
      const { 
        firstName, lastName,
        address1, address2, city,
        province, zip, country 
      } = this.billingModel
      const formValidation = this._validateForm([
        { 
          name: 'firstName', value: firstName, 
          rules: ['validateRequired'],
          messages: [
            this.content.error_required
          ]
        },
        { 
          name: 'lastName', value: lastName, 
          rules: ['validateRequired'],
          messages: [
            this.content.error_required
          ]
        },
        { 
          name: 'address1', value: address1, 
          rules: ['validateRequired'],
          messages: [
            this.content.error_required
          ]
        },
        { 
          name: 'city', value: city, 
          rules: ['validateRequired'],
          messages: [
            this.content.error_required
          ]
        },
        { 
          name: 'province', value: province, 
          rules: ['validateRequired'],
          messages: [
            this.content.error_required
          ]
        },
         { 
          name: 'zip', value: zip, 
          rules: ['validateRequired', 'validatePostcode'],
          reference: country,
          messages: [
            this.content.error_required
          ]
        },
         { 
          name: 'country', value: country, 
          rules: ['validateRequired'],
          messages: [
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
        const { success, error } = await this.customerUpdateBilling({ updates: this.billingModel })
        if(!error) {
          this.status = 'success'
          if(!this.hideAlert && this.content.success_text) {
            this.messages.push(this.content.success_text)
          }
        } 
        else {
          this.status = 'error'
          switch(error) {
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
    addressFields: {
      deep: true,
      immediate: true,
      handler(val) {
        if(val) this.billingModel = { ...val }
      }
    },
    billingModel: {
      deep: true,
      handler() {
        this.status = false
      }
    }
  }
}
</script>

<style lang="scss">
  .c-formBilling__fieldGroup {
    @include grid($columns: 1fr, $auto-flow: row, $gap: 0 40px);
    @include media-tablet-up {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>