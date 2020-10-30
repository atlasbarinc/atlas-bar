<template>
  <div :class="_buildModifiers('c-details', modifiers)">
    <c-detailsLoading class="c-details__loading" 
      v-if="!ready"
    />
    <div class="c-details__content" v-if="ready">
      <c-h class="c-details__heading u-hideMobileDown"
        v-if="content.page_heading"
        tag="h4"
        level="4"
        :text="content.page_heading"
        :modifiers="['isBolder']"
      />
      <div class="c-details__box">
        <div class="c-details__boxSingle"
          v-if="customerRecharge"
        >
          <c-detailsBlock class="c-details__boxItem"
            :heading="content.billing_label"
          >
            <c-p class="c-details__boxText"
              tag="address"
              level="2"
              v-html="_buildAddress({
                address: customerRecharge.billingAddress,
                options: {
                  hiddenFields: ['country'],
                  provinceName: 'short'
                }
              })"
              :modifiers="['isBolder']"
            />
            <c-button class="c-details__boxButton"
              v-if="content.billing_edit"
              :text="content.billing_edit"
              :modifiers="['isUnderline', 'isPrimary']"
              @click="UI_SET_SIDEBAR({ 
                component: 'cSidebarBilling',
                content: sidebarContent.billing
              })"
            />
          </c-detailsBlock>
        </div>
        <div class="c-details__boxGroup">
          <c-detailsBlock class="c-details__boxItem"
            :heading="content.email_label"
          >
            <c-p class="c-details__boxText"
              tag="p"
              level="2"
              v-if="customerShopify.email"
              :text="customerShopify.email"
              :modifiers="['isBolder']"
            />
          </c-detailsBlock>
          <c-detailsBlock class="c-details__boxItem"
            :heading="content.password_label"
          >
            <c-p class="c-details__boxText"
              tag="p"
              level="2"
              v-if="content.password_placeholder"
              :text="content.password_placeholder"
              :modifiers="['isBolder']"
            />
            <c-button class="c-details__boxButton"
              :text="content.password_edit"
              :modifiers="['isUnderline', 'isPrimary']"
              @click="UI_SET_SIDEBAR({ 
                component: 'cSidebarPassword',
                content: sidebarContent.password
              })"
            />
          </c-detailsBlock>
          <c-detailsBlock class="c-details__boxItem"
            v-if="customerRecharge"
            :heading="content.payment_label"
          >
            <c-p class="c-details__boxText"
              tag="p"
              level="2"
              v-if="content.payment_placeholder"
              :text="content.payment_placeholder"
              :modifiers="['isBolder']"
            />
            <c-button class="c-details__boxButton"
              v-if="content.payment_edit"
              :text="content.payment_edit"
              :modifiers="['isUnderline', 'isPrimary']"
              @click="UI_SET_SIDEBAR({ 
                component: 'cSidebarPayment',
                content: sidebarContent.payment
              })"
            />
          </c-detailsBlock>
        </div>
      </div>
      <div class="c-details__box c-details__box--isAddresses" 
        v-if="showAddresses"
      >
        <c-h class="c-details__boxHeading"
          v-if="content.plans_heading"
          tag="h6"
          level="6"
          :modifiers="['isEyebrow']"
          :text="content.plans_heading"
        />
        <div class="c-details__boxSingle"
          v-for="address in addressList.active"
          :key="address.id"
        >
          <c-detailsBlock class="c-details__boxItem">
            <div class="c-details__boxContent">
              <address class="c-details__boxAddress"
                v-html="address.address1"
              />
              <span class="c-details__boxShips"
                v-if="content.plans_text_next"
                v-html="content.plans_text_next"
              />
              <span class="c-details__boxDate"
                v-html="shipDate(address)"
              />
            </div>
            <c-button class="c-details__boxButton"
              v-if="content.plans_button_cancel"
              :text="content.plans_button_cancel"
              :modifiers="['isUnderline', 'isPrimary']"
              @click="UI_SET_SIDEBAR({ 
                component: 'cSidebarRetention',
                content: sidebarContent.retention,
                settings: { addressId: address.id }
              })"
            />
          </c-detailsBlock>
        </div>
        <div class="c-details__boxSingle"
          v-for="address in addressList.inactive"
          :key="address.id"
        >
          <c-detailsBlock class="c-details__boxItem">
            <div class="c-details__boxContent">
              <address class="c-details__boxAddress"
                v-html="address.address1"
              />
              <span class="c-details__boxShips"
                v-if="content.plans_text_last"
                v-html="content.plans_text_last"
              />
              <span class="c-details__boxDate"
                v-html="shipDate(address)"
              />
            </div>
            <c-button class="c-details__boxButton"
              :text="content.plans_button_activate"
              :modifiers="['isUnderline', 'isPrimary']"
              @click="UI_SET_SIDEBAR({ 
                component: 'cSidebarActivate',
                content: sidebarContent.activate,
                settings: { addressId: address.id }
              })"
            />
          </c-detailsBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import cH from '@shared/components/core/cH.vue'
import cP from '@shared/components/core/cP.vue'
import cButton from '@shared/components/core/cButton.vue'
import cDetailsLoading from '../details/cDetailsLoading.vue'
import cDetailsBlock from '../details/cDetailsBlock.vue'

export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { 
    cH, cP, cButton,
    cDetailsLoading, cDetailsBlock
  },
  data: () => ({ ready: false, error: false }),
  computed: {
    ...mapGetters('customer', [
      'customerShopify', 'customerRecharge'
    ]),
    content() {
      return this.$store.getters['customize/customizeContentByKey']('details')
    },
    sidebarContent() {
      const billing = this.$store.getters['customize/customizeSidebarByPrefix']('billing_')
      const password = this.$store.getters['customize/customizeSidebarByPrefix']('password_')
      const payment = this.$store.getters['customize/customizeSidebarByPrefix']('payment_')
      const retention = this.$store.getters['customize/customizeSidebarByPrefix']('retention_')
      const activate = this.$store.getters['customize/customizeSidebarByPrefix']('activate_')
      return { billing, password, payment, retention, activate }
    },
    addressList() {
      return this.$store.getters['customer/customerAddressesWithStatus']
    },
    showAddresses() {
      const { addressList } = this
      if(addressList) {
        const { active, inactive } = addressList
        return active.length > 0 || inactive.length > 0
      }
    },
  },
  methods: {
    ...mapActions('customer', ['customerSetResources']),
    ...mapMutations('ui', ['UI_SET_SIDEBAR']),
    shipDate(address) {
      return address.date 
        ? this._formatDate(address.date, 'MMM DD, YYYY')
        : this.content.plans_text_never
    }
  },
  async created() {
    if(this.customerRecharge) {
      const { success, error } = await this.customerSetResources({
        resources: [ 'addresses', 'charges', 'onetimes', 'subscriptions' ]
      })
      if(error) this.error = error
      this.ready = true
    }
    else this.ready = true
  }
}
</script>

<style lang="scss">
  .c-details {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 0 60px;
  }
  .c-details__heading {
    color: $color-secondary;
    margin-bottom: 30px;
  }
  .c-details__box {
    @include box-card;
    padding-bottom: 0;
    background-color: $color-white;
    &.c-details__box--isAddresses {
      margin-top: 40px;
    }
  }
  .c-details__boxSingle,
  .c-details__boxGroup {
    padding-bottom: 25px;
  }
  .c-details__boxGroup {
    @include grid($columns: 1fr, $auto-flow: row, $gap: 30px 20px);
    @include media-tablet-up {
      grid-template-columns: 1fr 1fr;
    }
  }
  .c-details__boxHeading {
    margin-bottom: 15px;
  }
  .c-details__boxText {
    line-height: 1.5;
    margin: 0;
  }
  .c-details__boxContent {
    @include flex($direction: column, $align: flex-start);
  }
  .c-details__boxAddress,
  .c-details__boxShips,
  .c-details__boxDate {
    display: block;
    font-family: $font-body;
  }
  .c-details__boxAddress {
    margin-bottom: 4px;
    font-size: 22px;
    text-transform: capitalize;
    font-weight: 700;
  }
  .c-details__boxShips {
    margin-bottom: 6px;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 1px;
  }
  .c-details__boxDate {
    display: block;
    font-size: 18px;
    font-weight: 600;
  }
</style>