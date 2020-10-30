<template>
  <transition name="t-bundle">
    <div class="c-bundle" v-if="show">
      <c-bundleHeader @closePrompt="showPrompt = true" />
      <component :is="stepComponent"></component>
      <c-bundle-prompt
        @primaryAction="continueBox"
        @secondaryAction="closeBox"
        :show="showPrompt"
        heading="Hold Up!"
        description="You're close to finishing your box! If you exit now, you'll lose your progress."
        primaryText="Keep Building"
        secondaryText="Leave Build a Box" />
    </div> 
  </transition>
</template>

<script>
import setup from '../_setup'
import cBundleHeader from './theme/cBundleHeader.vue'
import cBundleStepSize from './steps/cBundleStepSize.vue'
import cBundleStepItems from './steps/cBundleStepItems.vue'
import cBundleStepFrequency from './steps/cBundleStepFrequency.vue'
import cBundlePrompt from './parts/cBundlePrompt.vue'

export default {
  data: () => ({
    showPrompt: false,
    show: false
  }),
  components: { 
    cBundleHeader,
    cBundleStepSize,
    cBundleStepItems,
    cBundleStepFrequency,
    cBundlePrompt
  },
  computed: {
    stepComponent() {
      const step = this.$store.getters['bundleByKey']('step')
      if (step === 1) {
        return 'c-bundleStepSize'
      }
      if (step === 2) {
        return 'c-bundleStepItems'
      }
      if (step === 3) {
        return 'c-bundleStepFrequency'
      }
    }
  },
  methods: {
    continueBox() {
      this.showPrompt = false
    },
    closeBox() {
      this.$store.commit('resetBundle')
      this.showPrompt = false
      this.show = false
    }
  },
  async mounted() {
    await setup(this)

    const bundleTriggers = document.querySelectorAll('[data-bundle-trigger]')
    bundleTriggers.forEach(trigger => trigger.addEventListener('click', () => {
      this.show = true 
    }))
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        const body = document.querySelector('[data-body]')
        if(val) body.classList.add('o-body--noScroll')
        else body.classList.remove('o-body--noScroll')
      }
    }
  },
}
</script>

<style lang="scss">
  .c-bundle {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    position: fixed;
    top: 0;
    transition: opacity 0.3s;
    width: 100%;
    z-index: 9999999999; // Higher than Loyalty Rewards

    @include media-up(1024px) {
      padding-top: 76px;
    }
  }

  .c-bundle__split-container {
    @include flex($justify: center);
    height: 100%;

    @include media-up(1024px) {
      align-items: stretch;
    }
  }

  .c-bundle__split-image {
    display: none;

    @include media-up(1024px) {
      background-position: center;
      background-size: cover;
      display: block;
      width: 50%;
    }
  }

  .c-bundle__split-content {
    @include flex($direction: column, $wrap: nowrap);
    height: 100%;
    padding: 20px;
    width: 100%;

    @include media-up(1024px) {
      justify-content: flex-start;
      overflow-y: auto;
      width: 50%;
    }
  }

  .c-bundle__header {
    @include media-tablet-up {
      margin-top: auto;
    }
  }

  .c-bundle__button {
    flex-shrink: 0;
    line-height: 30px;
    width: 100%;

    @include media-tablet-up {
      margin: 10px auto;
      max-width: 388px;
    }

    .c-svg {
      display: inline-block;
      margin-left: 10px;
    }

    .c-loading {
      margin-right: 10px;
    }
  }

  .c-bundle__icons {
    display: none;

    @include media-tablet-up {
      @include flex($justify: space-around)
      flex-shrink: 0;
      margin-top: auto;
      width: 100%;
    }
  }

  .c-bundle__icon {
    @include flex($justify: center)
    font-size: 12px;
    text-transform: uppercase;

    .c-svg {
      color: $color-secondary;
      margin-right: 10px;
    }
  }

  .c-bundle__description-text {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 38px;
    margin-top: 0;

    @include media-tablet-up {
      font-size: 18px;
      line-height: 1.4;
      margin-bottom: 10px;
      max-width: 442px;
    }
  }

  .c-bundle__popular {
    background-color: $color-white;
    font-size: 14px;
    font-weight: 600;
    left: 50%;
    padding: 0 15px;
    position: absolute;
    top: 0;
    transform: translateX(-50%) translateY(-50%); 
    white-space: nowrap;
  }
  
  .c-bundle__hidden-radio {
    appearance: none;
    position: absolute;
    padding: 0;
    margin: 0;
    opacity: 0;
  }

  .t-bundle-enter,
  .t-bundle-leave-to {
    opacity: 0;
  }

  .t-bundle-leave,
  .t-bundle-enter-to {
    opacity: 1;
  }
</style>
