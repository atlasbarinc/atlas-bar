<template>
  <div :class="_buildModifiers('c-calendar', extendedModifiers)"
    ref="calendar"
    >
    <input class="c-calendar__input"
      @change="update"
      v-bind="attributes"
      ref="input"
    />
    <button class="c-calendar__control c-calendar__control--prev"
      @click="prevMonth"
    >
      <c-svg class="c-calendar__controlIcon" 
        name="circleChevron"
      />
    </button>
    <button class="c-calendar__control c-calendar__control--next"
      @click="nextMonth"
    >
      <c-svg class="c-calendar__controlIcon" 
        name="circleChevron" 
      />
    </button>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import cSvg from './cSvg.vue'

export default {
  props: {
    date: {
      type: String,
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      required: false
    },
    attributes: {
      type: Object,
      default: () => {}
    },
    modifiers: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    picker: false 
  }),
  components: { cSvg },
  computed: {
    extendedModifiers() {
      let modifiers = [ ...this.modifiers ]
      if(this.loading) modifiers.push('isDisabled')
      return modifiers
    }
  },
  methods: {
    prevMonth() {
      this.picker.prevMonth()
    },
    nextMonth() {
      this.picker.nextMonth()
    },
    update() {
      this.$emit('input', this.$refs.input.value)
    }
  },
  mounted() {
    const { pikaday } = window.Scoutside.vendors
    this.picker = new pikaday({
      field: document.getElementById(this.attributes.id),
      bound: false,
      minDate: dayjs().add(1, 'day').toDate(),
      maxDate: dayjs().add(6, 'month').toDate(),
      defaultDate: dayjs(this.date).toDate(),
      setDefaultDate: true,
      disableDayFn: function(date) {
        return dayjs(date).date() < 6
      }
    });
  },
  beforeDestroy() {
    this.$emit('input', this.date)
    setTimeout(() => { this.picker.destroy() }, 500)
  }
}
</script>

<style lang="scss">
  .c-calendar {
    position: relative;
    width: 100%;
    @include box-card;
    padding-top: 20px;
    border-width: 2px;
    &.is-disabled {
      pointer-events: none;
      user-select: none;
    }
  }
  .c-calendar__input {
    display: none;
  }
  .c-calendar__control {
    @include button-unset;
    @include flex($justify: center);
    position: absolute;
    top: 20px;
    right: 30px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    z-index: 1;
    @include hover-fade;
  }
  .c-calendar__control--prev {
    right: 80px;
    transform: rotate(-180deg);
  }
  .c-calendar__controlIcon {
    width: 100%;
    height: 100%;
    color: $color-primary;
  }
  .c-calendar {
    .pika-single {
      background: none;
      border: 0;
      z-index: 0;
      th, td {
        border: 0;
      }
    }
    .pika-lendar {
      width: 100%;
      margin: 0;
    }
    .pika-title {
      position: relative;
      color: $color-primary;
      font-size: 28px;
      font-family: $font-heading;
      font-weight: 800;
      text-transform: capitalize;
      pointer-events: none;
      letter-spacing: 1px;
      text-align: left;
      .pika-label {
        display: inline-block;
        &:not(:first-child) { margin-left: 5px; }
      }
    }
    .pika-prev, 
    .pika-next, 
    .pika-select {
      display: none;
    }
    .pika-table {
      width: 100%;
      margin-top: 20px;
    }
    .pika-table thead {
      margin: 5px 0 10px;
      abbr {
        color: $color-secondary;
        font-family: $font-heading;
        font-size: 17px;
        font-weight: 900;
        text-decoration: none;
        text-transform: uppercase;
        pointer-events: none;
        @include media-mobile-down {
          font-size: 12px;
        }
      }
    }
    .pika-button {
      @include button-unset;
      @include flex($justify: center, $align: center);
      margin: 5px auto;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      color: $color-primary;
      font-family: $font-mono;
      font-size: 20px;
      font-weight: 500;
      @include media-mobile-down {
        font-size: 14px;
        width: 30px;
        height: 30px;
      }
      .c-portal:not(.no-hover) &:hover {
        background-color: $color-secondary;
        color: $color-white;
      }
      .c-portal.no-hover &:hover {
        background-color: transparent;
      }
    }
    .is-selected .pika-button {
      pointer-events: none !important;
      background-color: $color-primary;
      color: $color-white;
      font-weight: 500;
    }
    .is-disabled .pika-button {
      pointer-events: none !important;
      background-color: transparent;
      opacity: .25;
    }
    .is-today .pika-button {
      color: $color-black;
      font-weight: 500;
    }
    .is-today.is-selected .pika-button {
      background-color: $color-primary;
      color: $color-black;
    }
    .is-disabled.is-selected .pika-button {
      background-color: $color-primary;
    }
  }
</style>