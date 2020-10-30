<template>
  <div v-if="show">
    <c-overlay class="c-bundle__prompt-overlay" :show="show" />
    <div class="c-prompt">
      <p class="c-prompt__heading">{{ heading }}</p>
      <p class="c-prompt__description">{{ description }}</p>
      <button class="c-prompt__button c-button c-button--isDefault c-button--isSecondary" @click="primaryAction">{{ primaryText }}</button>
      <button class="c-prompt__text-button c-buton c-button--isUnderline c-button--isPrimary" @click="secondaryAction">{{ secondaryText }}</button>
    </div> 
  </div>
</template>

<script>
import cOverlay from '@shared/components/core/cOverlay.vue'

export default {
  props: {
    show: Boolean,
    heading: String,
    description: String,
    primaryText: String,
    secondaryText: String
  },
  components: { cOverlay },
  methods: {
    primaryAction() {
      this.$emit('primaryAction')
    },
    secondaryAction() {
      this.$emit('secondaryAction')
    }
  }
}
</script>

<style lang="scss">
.c-bundle__prompt-overlay {
  z-index: 20;
}

.c-prompt {
  @include shadow-base();
  background-color: $color-white;
  border-radius: 20px;
  left: 50%;
  max-width: 590px;
  padding: 24px;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: calc(100% - 40px);
  z-index: 20;

  @include media-tablet-up {
    padding: 50px;
  }
}

.c-prompt__heading {
  font-family: $font-heading;
  font-size: 26px;
  font-weight: 900;
  text-align: center;
  margin: 0 0 13px;
  
  @include media-tablet-up {
    font-size: 48px;
  }
}

.c-prompt__description {
  font-size: 16px;
  font-weight: 400;
  margin: 13px 0;
  text-align: center;

  @include media-tablet-up {
    font-size: 19px;
  }
}

.c-prompt__button {
  display: block;
  font-size: 12px;
  margin: 9px auto 0;
  padding-left: 30px;
  padding-right: 30px;
  text-align: center;
  text-transform: capitalize;

  @include media-tablet-up {
    font-size: 16px;
    margin-top: 25px;
  }
}

.c-prompt__text-button {
  display: block;
  font-family: $font-heading;
  font-size: 12px;
  margin: 15px auto 0;

  @include media-tablet-up {
    font-size: 16px;
  }
}
</style>