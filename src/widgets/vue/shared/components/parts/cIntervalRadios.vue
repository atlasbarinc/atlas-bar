<template>
  <div :class="_buildModifiers('c-intervalRadios', modifiers)"
  >
    <button :class="_buildModifiers('c-intervalRadios__button', [
      interval.frequency == active ? 'isActive' : ''
    ])"
      v-for="interval in intervalButtons"
      :key="`interval-${interval.frequency}`"
      @click="update(interval)"
    >
      <span class="c-intervalRadios__text"
        v-if="interval.html"
        v-html="interval.html"
      />
      <span class="c-interalRadios__check">
        <c-svg class="c-interalRadios__checkIcon"
          name="circleCheck"
        />
      </span>
    </button>
  </div>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'

export default {
  props: {
    intervals: {
      type: Array,
      default: () => ([])
    },
    active: {
      type: [String, Number, Boolean],
      required: false
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cSvg },
  computed: {
    intervalButtons() {
      return this.intervals.map(interval => {
        let frequencySpan = '<span class="c-intervalRadios__textFrequency">'
        frequencySpan += interval.frequency
        frequencySpan += '</span>'
        const frequencyHtml = interval.text.replace(interval.frequency, frequencySpan)
        return { ...interval, html: frequencyHtml }
      })
    }
  },
  methods: {
    update(val) {
      const { frequency, unit } = val
      this.$emit('input', frequency)
    }
  }
}
</script>

<style lang="scss">
  .c-intervalRadios {
    @include flex($wrap: nowrap);
    margin: 0 -12px;
  }
  .c-intervalRadios__button {
    @include button-unset;
    @include box-card;
    border-width: 2px;
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 12px;
    text-align: center;
    &:hover {
      cursor: pointer;
      @include shadow-card;
    }
    &.c-intervalRadios__button--isActive {
      border-color: $color-secondary;
      pointer-events: none;
    }
  }
  .c-intervalRadios__text {
    @include flex($direction: column);
    font-family: $font-heading;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .c-intervalRadios__textFrequency {
    font-size: 36px;
  }
  .c-interalRadios__check {
    width: 20px;
    height: 20px;
    display: inline-flex;
    margin-top: 10px;
    border: 1px solid #E5E5E5;
    border-radius: 50%;
    .c-intervalRadios__button--isActive & {
      border-color: $color-secondary;
    }
  }
  .c-interalRadios__checkIcon {
    width: 100%;
    height: 100%;
    opacity: 0;
    color: $color-secondary;
    .c-intervalRadios__button--isActive & {
      opacity: 1;
    }
  }
</style>