<template>
  <header class="c-bundleNav">
    <nav class="c-bundleNav__container o-containerLarge">
      <button type="button" class="c-bundleNav__logo" @click="closePrompt">
        <c-img class="c-bundleNav__logoImage" :src="logo" />
        <c-svg class="c-bundleNav__logoMobile" name="chevron" />
      </button>
      <ol class="c-bundleNav__list">
        <li v-for="(step, index) in steps" :class="_buildModifiers('c-bundleNav__item', [
          index + 1 < activeStep ? 'isCompleted' : '',
          index + 1 === activeStep ? 'isActive' : ''
        ])">
          <c-button class="c-bundleNav__button"
                    @click="goTo(index + 1)"
                    :text="step"
                    :disabled="!isCompleted(index)">
            <template v-slot:before>
              <span class="c-bundleNav__number">
                <c-svg v-if="isCompleted(index)" name="checkThin" />
                <span v-else>{{ index + 1 }}</span>
              </span>
            </template>
          </c-button>
        </li>
      </ol>
    </nav>
  </header>
</template>

<script>
  import cImg from '@shared/components/core/cImg.vue'
  import cSvg from '@shared/components/core/cSvg.vue'
  import cButton from '@shared/components/core/cButton.vue'

  export default {
    data: () => ({
      steps: [
        'Select A Size',
        'Build A Box',
        'Frequency',
        'Checkout'
      ]
    }),
    components: { cImg, cSvg, cButton },
    computed: {
      content() {
        return this.$store.getters['contentByKey']('header')
      },
      activeStep() {
        return this.$store.getters['bundleByKey']('step')
      },
      logo() {
        return this.content.logo
      },
    },
    methods: {
      closePrompt() {
        this.$emit('closePrompt')
      },
      isCompleted(step) {
        return step + 1 < this.activeStep
      },
      goTo(step) {
        this.$store.commit('goToStep', step)
      }
    }
  }
</script>

<style lang="scss">
  .c-bundleNav {
    background-color: $color-white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    
    @include media-up(1024px) {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 20;
    }
  }

  .c-bundleNav__container {
    @include flex(flex, center, center, row, nowrap);
    height: 70px;
    position: relative;

    @include media-up(1024px) {
      height: 76px;
    }    
  }

  .c-bundleNav__logo {
    @include flex(flex, center, center, row, nowrap);
    background-color: transparent;
    border: 0 none;
    left: 0;
    padding: 0;
    position: absolute;
  }  

  .c-bundleNav__logoImage {
    display: none;

    @include media-up(1024px) {
      display: block;
      width: 89px;
    }
  }

  .c-bundleNav__logoMobile.c-svg {
    transform: rotate(90deg);
    width: 12px;

    @include media-up(1024px) {
      display: none;
    }
  }

  .c-bundleNav__item {
    display: inline;
    position: relative;

    &:not(:last-child) {
      margin-right: 45px;

      @include media-up(1024px) {
        margin-right: 65px;
      }

      &:after {
        content: '';
        background-color: $color-border;
        display: block;
        height: 1px;
        position: absolute;
        right: -35px;
        top: 50%;
        transform: translateY(-50%);
        width: 25px;

        @include media-up(1024px) {
          right: -45px;
        }
      }
    }
  }

  .c-bundleNav__number {
    align-items: center;
    border: 1px solid $color-border;
    border-radius: 9999px;
    display: inline-flex;
    font-size: 14px;
    font-weight: 500;
    height: 30px;
    justify-content: center;
    line-height: 1.2;
    text-align: center;
    width: 30px;

    .c-bundleNav__item--isActive & {
      background-color: $color-primary;
      border-color: $color-primary;
      color: $color-white;
    }

    .c-bundleNav__button & .c-svg {
      margin: 0;
    }
  }

  .c-bundleNav__button {
    &:disabled {
      color: inherit;
      opacity: 1;
    }

    .c-button__text {
      display: none;

      @include media-up(1024px) {
        display: inline;
        font-weight: 600;
        font-size: 12px;
        letter-spacing: 0.05em;
        margin-left: 10px;
        text-transform: uppercase;
      }
    }
  }
</style>