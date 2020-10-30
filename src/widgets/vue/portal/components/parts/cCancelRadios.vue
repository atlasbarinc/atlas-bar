<template>
  <c-radioGroup :class="_buildModifiers('c-cancelRadios', modifiers)"
    v-if="content"
    v-model="cancelModel"
    :modifiers="modifiers"
  >
    <div class="c-cancelRadios__item"
      v-for="(reason, index) in cancelReasons"
      :key="`reason-${index}`"
    >
      <c-radio class="c-cancelRadios__radio"
        :active="cancelModel"
        :uncheck="true"
        :modifiers="['isBlack']"
        :attributes="{
          name: 'cancellation_reason',
          value: reason
        }"
      />
      <div class="c-cancelRadios__delay"
        v-if="delay && content && cancelModel === reason"
      >
          <c-h class="c-cancelRadios__delayHeading"
            v-if="content.delay_heading"
            tag="h5"
            level="5"
            :text="content.delay_heading"
          />
          <c-button class="c-cancelRadios__delayButton"
            v-if="content.delay_button"
            @click="$emit('delay')"
            :loading="loading.delay"
            :text="content.delay_button"
            :modifiers="['isDefault', 'isSecondary', 'hideTextLoading']"
            :attributes="{ disabled: !cancelModel || loading.delay || loading.cancel || disabled }"
          />
        </div>
    </div>
  </c-RadioGroup>
</template>

<script>
import { mapGetters } from 'vuex'
import cRadioGroup from '@shared/components/core/cRadioGroup.vue'
import cRadio from '@shared/components/core/cRadio.vue'
import cH from '@shared/components/core/cH.vue'
import cButton from '@shared/components/core/cButton.vue'

export default {
  props: {
    delay: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: [String, Boolean],
      default: false
    },
    content: {
      type: Object,
      required: false
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    cRadioGroup, cRadio, cH, cButton
  },
  data: () => ({ cancelModel: false }),
  computed: {
    cancelReasons() {
      return ['reason_1', 'reason_2', 'reason_3', 'reason_4', 'reason_5'].map(reason => {
        if(!this._stringEmpty(this.content[reason])) return this.content[reason]
      })
    }
  },
  watch: {
    cancelModel: {
      immediate: true,
      handler(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss">
  .c-cancelRadios__delay {
    margin: -10px 0 30px;
    @include box-card;
    @include shadow-card;
    min-width: 320px;
    display: inline-block;
    padding: 10px 15px 15px !important;
  }
  .c-cancelRadios__delayHeading {
    margin-bottom: 8px;
    text-align: center;
    font-size: 22px;
  }
  .c-cancelRadios__delayButton {
    width: 100%;
  }
</style>