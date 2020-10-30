<template>
  <div :class="_buildModifiers('c-sidebarRetention', modifiers)"
    v-if="content && address"
  >
    <c-p class="c-sidebarRetention__address"
      tag="address"
      level="1"
      :modifiers="['isBolder']"
      :text="_buildAddress({
        address: address,
        options: {
          hiddenFields: ['name', 'country'],
          provinceName: 'short',
          flatten: true
        }
      })"
    />
    <div class="c-sidebarRetention__box">
      <c-img class="c-sidebarRetetion__image"
        v-if="content.retention_image"
        :src="content.retention_image"
      />
      <c-h class="c-sidebarRetention__pretext"
        tag="h6"
        level="6"
        :modifiers="['isEyebrow']"
        v-if="content.retention_pretext"
        :text="content.retention_pretext"
      />
      <c-h class="c-sidebarRetention__text"
        tag="h4"
        level="4"
        :modifiers="['isBolder']"
        v-if="content.retention_text"
        :text="content.retention_text"
      />
      <div class="c-sidebarRetention__actions">
        <button class="c-sidebarRetention__action" onclick="Smooch.open();">
          <div class="c-sidebarRetention__actionIcon">
            <c-img class="c-sidebarRetention__actionImage"
              v-if="content.retention_chat_icon"
              :src="content.retention_chat_icon"
            />
          </div>
          <c-h class="c-sidebarRetention__actionHeading"
            tag="h6"
            level="6"
            :modifiers="['isEyebrow']"
            v-if="content.retention_chat_heading"
            :text="content.retention_chat_heading"
          />
          <c-p class="c-sidebarRetention__actionText"
            tag="p"
            level="4"
            :modifiers="['isBolder']"
            v-if="content.retention_chat_text"
            :text="content.retention_chat_text"
          />
        </button>
        <button class="c-sidebarRetention__action" onclick="Smooch.open();">
          <div class="c-sidebarRetention__actionIcon">
            <c-img class="c-sidebarRetention__actionImage"
              v-if="content.retention_answers_icon"
              :src="content.retention_answers_icon"
            />
          </div>
          <c-h class="c-sidebarRetention__actionHeading"
            tag="h6"
            level="6"
            :modifiers="['isEyebrow']"
            v-if="content.retention_answers_heading"
            :text="content.retention_answers_heading"
          />
          <c-p class="c-sidebarRetention__actionText"
            tag="p"
            level="4"
            :modifiers="['isBolder']"
            v-if="content.retention_answers_text"
            :text="content.retention_answers_text"
          />
        </button>
        <button class="c-sidebarRetention__action"
          @click="UI_SET_MODAL({
            component: 'cModalDelay',
            content: modalContent.delay,
            settings: {
              addressId: address.id,
              action: 'address'
            }
          })"
        >
          <div class="c-sidebarRetention__actionIcon">
            <c-img class="c-sidebarRetention__actionImage"
              v-if="content.retention_break_icon"
              :src="content.retention_break_icon"
            />
          </div>
          <c-h class="c-sidebarRetention__actionHeading"
            tag="h6"
            level="6"
            :modifiers="['isEyebrow']"
            v-if="content.retention_break_heading"
            :text="content.retention_break_heading"
          />
          <c-p class="c-sidebarRetention__actionText"
            tag="p"
            level="4"
            :modifiers="['isBolder']"
            v-if="content.retention_break_text"
            :text="content.retention_break_text"
          />
        </button>
      </div>
      <c-button class="c-sidebarRetention__cancelButton"
        v-if="content.retention_cancel_button"
        :text="content.retention_cancel_button"
        :modifiers="['isDefault', 'isSecondary']"
        @click="UI_SET_SIDEBAR({ 
          component: 'cSidebarCancel',
          content: { 
            ...sidebarContent.cancel,
            cancel_back: content.retention_back
          },
          settings: { addressId: address.id }
        })"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import cP from '@shared/components/core/cP.vue'
import cH from '@shared/components/core/cH.vue'
import cImg from '@shared/components/core/cImg.vue'
import cButton from '@shared/components/core/cButton.vue'

export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { 
    cP, cH, cImg, cButton
  },
  computed: {
    address() {
      return this.$store.getters['customer/customerAddressById'](this.settings.addressId)
    },
    sidebarContent() {
      const cancel = this.$store.getters['customize/customizeSidebarByPrefix']('cancel_')
      return { cancel }
    },
    modalContent() {
      const delay = this.$store.getters['customize/customizeModalByPrefix']('delay_')
      return { delay }
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_SET_MODAL', 'UI_SET_SIDEBAR'])
  }
}
</script>

<style lang="scss">
  .c-sidebarRetention__box {
    @include flex($direction: column);
    @include box-card;
    width: 100%;
    max-width: 640px;
  }
  .c-sidebarRetetion__image {
    width: 100%;
    max-width: 450px;
    margin: 0 auto 24px;
    border-radius: 3px;
  }
  .c-sidebarRetention__pretext {
    margin-bottom: 0;
    color: $color-secondary;
    font-weight: 800;
  }
  .c-sidebarRetention__actions {
    @include flex($wrap: nowrap, $align: stretch);
    margin-bottom: 45px;
    @include media-mobile-down { flex-direction: column; }
  }
  .c-sidebarRetention__action {
    @include button-unset;
    @include box-card;
    margin: 0 5px;
    padding: 15px;
    &:hover {
      cursor: pointer;
      @include shadow-card;
    }
    @include media-mobile-down {
      &:not(:last-child) { margin-bottom: 20px; }
    }
  }
  .c-sidebarRetention__actionIcon {
    flex-grow: 1;
    margin-bottom: 20px;
    text-align: center;
  }
  .c-sidebarRetention__actionImage {
    display: block;
    width: 60px;
    margin: 0 auto;
  }
  .c-sidebarRetention__actionHeading {
    text-align: center;
    color: $color-secondary;
    font-weight: 800;
  }
  .c-sidebarRetention__actionText {
    margin-bottom: 0;
    text-align: center;
    line-height: 1.25;
  }
  .c-sidebarRetention__cancelButton {
    margin-bottom: 30px;
  }
</style>