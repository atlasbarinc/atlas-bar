<template>
  <div :class="_buildModifiers('c-sidebarSchedule', modifiers)"
    v-if="content && item"
  >
    <div class="c-sidebarSchedule__top">
      <c-h class="c-sidebarSchedule__title"
        tag="h4"
        level="4"
        :modifiers="['isBolder']"
        :text="item.productTitle"
      />
      <c-p class="c-sidebarSchedule__address"
        tag="address"
        level="1"
        v-if="address"
        :text="_buildAddress({
          address,
          options: {
            hiddenFields: ['name', 'country'],
            provinceName: 'short',
            flatten: true
          }
        })"
      />
    </div>
    <div class="c-sidebarSchedule__main">
      <c-img class="c-sidebarSchedule__image u-hideTabletDown"
        v-if="content.schedule_image"
        :src="content.schedule_image"
      />
      <div class="c-sidebarSchedule__info">
        <div class="c-sidebarSchedule__interval"
          v-if="item.frequency"
        >
          <c-h class="c-sidebarSchedule__intervalHeading"
            tag="h4"
            level="4"
            :modifiers="['isBolder']"
            v-if="content.schedule_frequency_heading"
            :text="content.schedule_frequency_heading"
          />
          <c-intervalRadios class="c-sidebarSchedule__intervalRadios" 
            v-model="frequencyModel"
            :intervals="intervals"
            :active="frequencyModel"
          />
        </div>
        <div class="c-sidebarSchedule__charge">
          <c-h class="c-sidebarSchedule__chargeHeading"
            tag="h4"
            level="4"
            :modifiers="['isBolder']"
            v-if="content.schedule_charge_heading"
            :text="content.schedule_charge_heading"
          />
          <c-calendar class="c-sidebarSchedule__chargeCalendar" 
            v-model="dateModel"
            :date="dateModel"
            :attributes="{
              id: `${item.id}-calendar`
            }"
          />
          <c-button class="c-sidebarSchedule__button"
            v-if="content.schedule_button_text"
            @click="handleSave"
            :loading="loading.save"
            :success="status === 'success'"
            :text="{
              default: content.schedule_button_text,
              success: content.schedule_button_success
            }"
            :modifiers="['isDefault', 'isSecondary', 'hideTextLoading']"
            :attributes="{ disabled: (datesMatch && frequencyMatch) || loading.save }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'
import { _buildUpdates } from '@vue/portal/utils'

import cH from '@shared/components/core/cH.vue'
import cP from '@shared/components/core/cP.vue'
import cImg from '@shared/components/core/cImg.vue'
import cCalendar from '@shared/components/core/cCalendar.vue'
import cButton from '@shared/components/core/cButton.vue'
import cIntervalRadios from '@shared/components/parts/cIntervalRadios.vue'

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
  data: () => ({
    frequencyModel: false,
    dateModel: false,
    loading: { save: false },
    status: false
  }),
  components: {
    cH, cP, cImg, cCalendar, cButton,
    cIntervalRadios
  },
  computed: {
    ...mapGetters('customize', ['customizeShop']),
    item() {
      const { itemId, resource } = this.settings
      const key = resource == 'subscription' ? 'Subscription' : 'Onetime'
      return this.$store.getters[`customer/customer${key}ById`](itemId)
    },
    address() {
      return this.$store.getters['customer/customerAddressById'](this.item.addressId)
    },
    intervals() {
      return this.customizeShop.intervals.filter(interval => interval.frequency != 0)
    },
    frequencyMatch() {
      return this.frequencyModel == this.item.frequency
    },
    datesMatch() {
      return dayjs(this.dateModel).isSame(this.item.scheduledAt, 'days')
    },
    updates() {
      const { item, settings } = this
      const { type, resource } = settings
      let items = [item]
      if(type == 'bundle') {
        const bundleIdProp = item.properties.find(prop => prop.name == 'bundle_id')
        const bundleIdValue = bundleIdProp.value
        const key = resource == 'subscription' ? 'Subscriptions' : 'Onetimes'
        const children = this.$store.getters[`customer/customer${key}ByBundle`](bundleIdValue)
        items = [ ...items, ...children ]
      }
      return _buildUpdates({ items, values: { date: this.dateModel, 
        interval: { unit: item.unit, frequency: this.frequencyModel },
      }})
    }
  },
  methods: {
    ...mapActions('customer', ['customerUpdateSubscriptions', 'customerUpdateOnetimes']),
    async handleSave() {
      const { item, settings } = this
      const { type, resource } = settings
      const key = resource == 'subscription' ? 'Subscriptions' : 'Onetimes'
      this.loading.save = true
      const { subscriptions, onetimes, error } = await this[`customerUpdate${key}`]({
        addressId: this.address.id, updates: this.updates
      })
      this.loading.save = false
      this.status = 'success'
    }
  },
  watch: {
    frequencyModel: {
      handler() {
        this.status = false
      }
    },
    dateModel: {
      handler() {
        this.status = false
      }
    }
  },
  created() {
    const { frequency, scheduledAt } = this.item
    if(frequency != 0) this.frequencyModel = frequency
    this.dateModel = scheduledAt
  }
}
</script>

<style lang="scss">
  .c-sidebarSchedule__top {
    margin-bottom: 30px;
  }
  .c-sidebarSchedule__title,
  .c-sidebarSchedule__address {
    font-size: 20px;
    text-transform: capitalize;
    margin: 0;
  }
  .c-sidebarSchedule__main {
    @include flex($align: flex-start, $wrap: nowrap);
  }
  .c-sidebarSchedule__image {
    width: 100%;
    max-width: 460px;
  }
  .c-sidebarSchedule__info {
    max-width: 450px;
    width: 100%;

    @include media-tablet-up {
      min-width: 410px;
    }
    @include media-desktop-up {
      margin-left: 50px;
    }
  }
  .c-sidebarSchedule__intervalRadios {
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(auto-fit, minmax(0, 124px));
    margin-bottom: 40px;
    margin-left: 0;
    margin-right: 0;
    margin-top: 20px;

    @include media-mobile-down {
      grid-gap: 19px;
      grid-template-columns: repeat(auto-fit, minmax(0, 98px));
    }

    .c-intervalRadios__button {
      margin: 0;
    }
  }
  .c-sidebarSchedule__chargeCalendar {
    margin-top: 20px;

    @include media-mobile-down {
      padding-top: 60px;
    }

    .c-calendar__control--prev {
      @include media-mobile-down {
        right: 60px;
      }
    }

    .c-calendar__control--next {
      @include media-mobile-down {
        right: 20px;
      }
    }
  }
  .c-sidebarSchedule__button {
    width: 100%;
    margin-top: 30px;
    @include media-tablet-up {
      max-width: 320px;
    }
  }
</style>