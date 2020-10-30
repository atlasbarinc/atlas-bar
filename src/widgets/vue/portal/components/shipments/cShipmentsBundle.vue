<template>
  <div :class="_buildModifiers('c-shipmentsBundle', modifiers)"
    v-if="item && type && content"
  >
    <c-tabs class="c-shipmentsBundle__tabs">
      <c-tabsItem class="c-shipmentsBundle__tabItem"
        :open="true"
        :index="0"
        :count="2"
      >
        <div class="c-shipmentsBundle__trigger"
          slot="trigger"
          v-if="content.bundle_tab_main"
          v-html="content.bundle_tab_main"
        />
        <div class="c-shipmentsBundle__content"
          slot="content"
        >
          <div class="c-shipmentsBundle__main">
            <c-img class="c-shipmentsBundle__image"
              :src="image"
            />
            <div class="c-shipmentsBundle__details">
              <c-h class="c-shipmentsBundle__title"
                tag="h4"
                level="4"
                :text="item.productTitle"
                :modifiers="['isBolder']"
              />
              <c-p class="c-shipmentsBundle__interval"
                v-if="interval"
                tag="p"
                level="2"
                :modifiers="['isBolder']"
                v-html="interval"
              />
              <c-p class="c-shipmentsBundle__variant"
                v-if="item.variantTitle"
                tag="p"
                level="2"
                :text="item.variantTitle.replace(/\//g, '•')"
                :modifiers="['isBolder']"
              />
              <c-p class="c-shipmentsBundle__price"
                v-if="quantityPrice"
                tag="p"
                level="2"
                :text="quantityPrice"
                :modifiers="['isBolder']"
              />
              <div class="c-shipmentsBundle__upgrade"
                v-if="upgradeText"
                v-html="upgradeText"
                @click="UI_SET_SIDEBAR({
                  component: 'cSidebarFlavors',
                  content: sidebarContent.flavors,
                  settings: {
                    itemId: item.id,
                    type: item.type,
                    resource: item.isSubscription
                      ? 'subscription'
                      : 'onetime',
                    children: item.children,
                    size: bundleSizes.products.find(product => product.id != item.variantId)
                  }
                })"
              />
            </div>
          </div>
          <div class="c-shipmentsBundle__actions">
            <div class="c-shipmentsBundle__action">
              <button class="c-shipmentsBundle__actionButton"
                v-if="content.bundle_button_schedule"
                v-html="content.bundle_button_schedule"
                @click="UI_SET_SIDEBAR({
                  component: 'cSidebarSchedule',
                  content: sidebarContent.schedule,
                  settings: { 
                    itemId: item.id,
                    type: item.type,
                    resource: item.isSubscription
                      ? 'subscription'
                      : 'onetime'
                  }
                })"
              />
            </div>
            <div class="c-shipmentsBundle__action">
              <button class="c-shipmentsBundle__actionButton"
                v-if="content.bundle_button_delay"
                v-html="content.bundle_button_delay"
                @click="UI_SET_MODAL({
                  component: 'cModalDelay',
                  content: modalContent.delay,
                  settings: { 
                    itemId: item.id,
                    type: item.type,
                    resource: item.isSubscription
                      ? 'subscription'
                      : 'onetime'
                  }
                })"
              />
            </div>
          </div>
        </div>
      </c-tabsItem>
      <c-tabsItem class="c-shipmentsBundle__tabItem"
        :index="1"
        :count="2"
      >
        <div class="c-shipmentsBundle__trigger"
          slot="trigger"
          v-if="content.bundle_tab_parts"
          v-html="content.bundle_tab_parts"
        />
        <div class="c-shipmentsBundle__content"
          slot="content"
        >
          <div class="c-shipmentsBundle__parts" 
            v-if="children"
          >
            <div class="c-shipmentsBundle__part"
              v-for="child in children"
              :key="`child-${child.id}`"
            >
              <c-img class="c-shipmentsBundle__partImage"
                :src="child.image"
                :alt="child.alt"
              />
              <span class="c-shipmentsBundle__partCount"
                v-if="child.quantity"
                v-html="child.quantity"
              />
              <span class='c-shipmentsBundle__partTitle'
                v-if="child.productTitle"
                v-html="child.productTitle"
              />
            </div>
          </div>
          <div class="c-shipmentsBundle__partActions">
            <div class="c-shipmentsBundle__partAction">
              <c-button class="c-shipmentsBundle__partRemove"
                v-if="content.bundle_button_remove"
                :text="content.bundle_button_remove"
                :loading="loading.remove"
                :modifiers="['isUnderline', 'isPrimary']"
                :attributes="{ disabled: loading.remove }"
                @click="handleRemove"
              />
            </div>
            <div class="c-shipmentsBundle__partAction">
              <c-button class="c-shipmentsBundle__partEdit"
                v-if="content.bundle_button_edit"
                :text="content.bundle_button_edit"
                :attributes="{ disabled: loading.remove }"
                :modifiers="['isDefault', 'isSecondary']"
                @click="UI_SET_SIDEBAR({
                  component: 'cSidebarFlavors',
                  content: sidebarContent.flavors,
                  settings: {
                    itemId: item.id,
                    type: item.type,
                    resource: item.isSubscription
                      ? 'subscription'
                      : 'onetime',
                    children: item.children
                  }
                })"
              />
            </div>
          </div>
        </div>
      </c-tabsItem>
    </c-tabs>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import cTabs from '@shared/components/core/cTabs.vue'
import cTabsItem from '@shared/components/core/cTabsItem.vue'
import cImg from '@shared/components/core/cImg.vue'
import cH from '@shared/components/core/cH.vue'
import cP from '@shared/components/core/cP.vue'
import cButton from '@shared/components/core/cButton.vue'

export default {
  props: {
    count: {
      type: Number,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    type: {
      type: String,
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
  data: () => ({
    loading: { remove: false }
  }),
  components: { 
    cImg, cH, cP, cButton,
    cTabs, cTabsItem
  },
  computed: {
    ...mapGetters('customize', ['customizeShop']),
    product() {
      return this.$store.getters['products/productById'](this.item.productId)
    },
    image() {
      return this.product ? this.product.images[0] : false
    },
    alt() {
      return `${this.customizeShop.shop_name} ${this.item.productTitle}`
    },
    interval() {
      const { item, customizeShop, content } = this
      const { frequency, unit } = item
      const activeInterval = customizeShop.intervals.find(interval => {
        if(!frequency || !unit) return interval.frequency == 0
        else return interval.frequency == frequency
      })
      if(activeInterval) {
        let text = activeInterval.text
        if(frequency && unit && content.ships) text = `${content.ships} ${text}`
        return `<span>Delivery:</span> ${text}`
      }
    },
    price() {
      const currencySymbol = this.customizeShop.currency_symbol
      const price = this._formatMoney({ amount: this.item.price })
      return `${currencySymbol}${price}`
    },
    quantityPrice() {
      return `${this.item.quantity} x ${this.price}`
    },
    bundleSizes() {
      return this.$store.getters['bundle/contentByKey']('sizes')
    },
    upgradeText() {
      if (this.bundleSizes.products.length <= 1) {
        return false
      }

      const currentSize = this.bundleSizes.products.find(product => product.id == this.item.variantId)
      const newSize = this.bundleSizes.products.find(product => product.id != this.item.variantId)

      if(currentSize && newSize.size > currentSize.size) {
        const currentPricePerBar = Math.round((currentSize.sub_price * 100) / currentSize.size)
        const savings = (currentPricePerBar * newSize.size / 100) - newSize.sub_price
        const formattedSavings = this._formatMoney({ amount: savings })
        return this.content.bundle_upsell_link
               .replace('{{ count }}', newSize.size)
               .replace('{{ title }}', newSize.title)
               .replace('{{ savings }}', `${this.customizeShop.currency_symbol}${formattedSavings}`)
               .replace('{{ price }}', `${this.customizeShop.currency_symbol}${newSize.sub_price}`)
      }
    },
    sidebarContent() {
      const edit = this.$store.getters['customize/customizeSidebarByPrefix']('edit_')
      const schedule = this.$store.getters['customize/customizeSidebarByPrefix']('schedule_')
      const retention = this.$store.getters['customize/customizeSidebarByPrefix']('retention_')
      const flavors = this.$store.getters['customize/customizeSidebarByPrefix']('flavors_')
      return { edit, schedule, retention, flavors }
    },
    modalContent() {
      const delay = this.$store.getters['customize/customizeModalByPrefix']('delay_')
      const cancel = this.$store.getters['customize/customizeModalByPrefix']('cancel_')
      return { delay, cancel }
    },
    children() {
      return this.item.children.map(child => {
        const product = this.$store.getters['products/productById'](child.productId)
        const image = product ? product.images[0] : false
        const alt = `${this.customizeShop.shop_name} ${child.productTitle}`
        return { ...child, image, alt }
      })
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_SET_SIDEBAR', 'UI_SET_MODAL']),
    ...mapActions('customer', ['customerDeleteOnetimes' ]),
    async handleRemove() {
      const { id, addressId, isSubscription } = this.item
      if(!isSubscription) {
        this.loading.remove = true
        const { onetimes, subscriptions, error, success } = await this['customerDeleteOnetimes']({
          addressId,
          ids: [ id ]
        })
        this.UI_CLOSE_SIDEBAR()
        this.loading.remove = false
      } else {
        if(this.count > 1) {
          this.UI_SET_MODAL({
            component: 'cModalCancel',
            content: this.modalContent.cancel,
            settings: { 
              itemId: this.item.id,
              type: this.item.type
            }
          })
        } else {
          this.UI_SET_SIDEBAR({ 
            component: 'cSidebarRetention',
            content: {
              ...this.sidebarContent.retention,
              retention_back: 'Back To Subscriptions'
            },
            settings: { addressId: this.item.addressId }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .c-shipmentsBundle {
    @include media-mobile-down {
      @include box-card;
    }
  }
  .c-shipmentsBundle__trigger {
    border-bottom: none;
    color: $color-primary;
    font-family: $font-heading;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: center;
    .c-tabsItem--isOpen & {
      background-color: $color-white;
      color: $color-secondary;
    }
    @include media-mobile-down {
      margin-bottom: 20px;
      padding: 16px;
      border-radius: 40px;
      border: 4px solid #EFEFEF;
      background-color: #EFEFEF;
      font-size: 13px;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #EFEFEF;
        z-index: -1;
        border-radius: 0 40px 40px 0;
      }
      .c-tabsItem:first-child & {
        margin-left: -1px;
        &:after {
          border-radius: 40px 0 0 40px;
        }
      }
    }
    @include media-xs {
      padding: 12px 5px;
      font-size: 11px;
    }
    @include media-tablet-up {
      padding: 20px 20px 40px;
      border-radius: 20px 20px 0 0;
      background-color: $color-body;
      border: 1px solid #e5e5e5;
      font-size: 14px;
      .c-tabsItem:not(:first-child) & {
        margin-left: -1px;
      }
      .c-tabsItem--isOpen & {
        &:after {
          content: '';
          position: absolute;
          left: -1px;
          bottom: -1px;
          width: calc(100% - 1px);
          height: 20px;
          background-color: $color-white;
        }
      }
      .c-tabsItem--isOpen:first-child & {
        &:after {
          left: 1px;
        }
      }
    }
  }
  .c-shipmentsBundle__content {
    @include media-tablet-up {
      @include box-card;
      position: relative;
      margin-top: -20px;
      z-index: 2;
    }
    @include media-mobile-down {

    }
  }
  .c-shipmentsBundle__main {
    width: 100%;
    @include flex($justify: flex-start, $align: flex-start, $wrap: nowrap);
    margin-bottom: 20px;
    @include media-mobile-down {
      flex-direction: column;
      align-items: center;
    }
  }
  .c-img.c-shipmentsBundle__image {
    width: 150px;
    @include media-mobile-down {
      margin-bottom: 10px;
    }
  }
  .c-shipmentsBundle__details {
    padding-left: 50px;
    @include media-tablet-down {
      padding-left: 20px;
    }
    @include media-mobile-down {
      padding-left: 0;
      text-align: center;
    }
  }
  .c-shipmentsBundle__title {
    margin-bottom: 0;
    @include media-mobile-down {
      font-size: 24px;
    }
  }
  .c-shipmentsBundle__interval,
  .c-shipmentsBundle__variant,
  .c-shipmentsBundle__price {
    font-size: 20px;
    margin-bottom: 0;
    @include media-mobile-down {
      font-size: 17px;
    }
  }
  .c-shipmentsBundle__interval {
    span {
      font-weight: 500 !important;
    }
  }
  .c-shipmentsBundle__upgrade {
    font-family: $font-heading;
    font-size: 16px;
    font-weight: 800;
    color: $color-secondary;
    text-decoration: underline;
    @include hover-fade;
  }
  .c-shipmentsBundle__actions {
    @include flex($justify: center);
    margin: 0 -40px;
    @include media-tablet-down {
      margin: 0 -30px;
    }
    @include media-down(600px) {
      flex-direction: column;
    }
  }
  .c-shipmentsBundle__action {
    padding: 0 40px;
    position: relative;
    @include media-down(600px) {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    @include media-tablet-down {
      padding: 0 30px;
    }
    @include media-up(601px) {
      &:not(:first-child):before {
        content: '|';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #E5E5E5;
        font-size: 24px;
      }
    }
  }
  .c-shipmentsBundle__actionButton {
    @include button-unset;
    padding: 0 0 1px;
    border-bottom: 2px solid $color-primary;
    color: $color-primary;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    &:hover {
      border-color: transparent;
      cursor: pointer;
    }
  }
  .c-shipmentsBundle__parts {
    @include box-card;
    @include grid($columns: 1fr 1fr, $auto-flow: row, $gap: 20px);
    @include media-desktop-up {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  .c-shipmentsBundle__part {
    position: relative;
    width: 100%;
    @include flex ($wrap: nowrap);
    @include media-mobile-down {
      flex-direction: column;
    }
  }
  .c-img.c-shipmentsBundle__partImage {
    width: 50px;
    @include media-mobile-down {
      margin-bottom: 5px;
    }
  }
  .c-shipmentsBundle__partTitle {
    margin-left: 5px;
    color: $color-primary;
    font-family: $font-heading;
    font-size: 14px;
    font-weight: 700;
    text-transform: capitalize;
    @include media-mobile-down {
      text-align: center;
    }
  }
  .c-shipmentsBundle__partCount {
    width: 26px;
    min-width: 26px;
    height: 26px;
    position: absolute;
    bottom: -4px;
    @include flex($justify: center);
    background-color: $color-secondary;
    border-radius: 50%;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    color: $color-white;
    font-family: $font-mono;
    font-size: 14px;
    @include media-mobile-down {
      width: 24px;
      min-width: 24px;
      height: 24px;
      top: 24px;
      left: 50%;
      transform: translateX(-50px);
      font-size: 12px;
    }
  }
  .c-shipmentsBundle__partActions {
    @include flex($justify: space-between, $wrap: nowrap);
    margin-top: 15px;
    @include media-mobile-down {
      flex-direction: column;
    }
  }
  .c-shipmentsBundle__partAction {
    &:last-child { margin-left: 20px; }
    @include media-mobile-down {
      &:first-child { order: 1;}
      &:last-child { margin-left: 0;}
      &:not(:first-child) { margin-bottom: 10px; }
    }
  }
  .c-shipmentsBundle__partEdit {
    padding: 16px 50px;
    .c-button__text { font-size: 14px; }
  }
  .c-shipmentsBundle__partRemove {
    .c-button__text {
      font-size: 14px;
    }
  }
</style>