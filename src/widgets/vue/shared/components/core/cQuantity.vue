<template>
  <div :class="_buildModifiers('c-quantity', modifiers)">
    <label class="c-quantity__label" 
      v-if="label"
      v-html="label"
    />
    <div class="c-quantity__select">
      <button class="c-quantity__control"
        @click="update('minus')"
        :disabled="!canMinus"
      >
        <c-svg class="c-quantity__controlIcon c-quantity__controlIcon--isMinus" 
          name="minus"
        />
      </button>
      <input class="c-quantity__input" 
        :value="quantityModel ? quantityModel : 1"
        v-bind="attributes"
      />
      <button class="c-quantity__control"
        @click="update('plus')"
         :disabled="!canPlus"
      >
        <c-svg class="c-quantity__controlIcon c-quantity__controlIcon--isPlus" 
          name="plus"
        />
      </button>
    </div>
  </div>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'

export default {
  props: {
    label: {
      type: String,
      required: false
    },
    quantity: {
      type: [Number, Boolean],
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    },
    attributes: {
      type: Object,
      default: () => ({})
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cSvg },
  data() {
    return { 
      quantityModel: 1,
      debounce: false
    }
  },
  computed: {
    canMinus() {
      return this.min ? this.quantity > this.min : true
    },
    canPlus() {
      return this.max ? this.quantity < this.max : true
    },
    shouldEmit() {
      return !this.debounce && this.quantity !== this.attributes.value
    }
  },
  methods: {
    update(action) {
      if(this.debounce) clearTimeout(this.debounce)
      this.quantityModel = action === 'plus' && this.canPlus
        ? this.quantityModel + 1
        : action === 'minus' && this.canMinus
          ? this.quantityModel - 1
          : this.quantityModel
      this.debounce = setTimeout(() => {
        this.debounce = false
      }, 250)
    }
  },
  watch: {
    debounce: {
      handler() {
        if(this.shouldEmit) this.$emit('input', this.quantityModel)
      }
    }
  },
  created() {
    this.quantityModel = this.quantity ? this.quantity : 1
  }
}
</script>

<style lang="scss">
  .c-quantity {
    @include flex($justify: flex-start);
  }
  .c-quantity__label {
    font-family: $font-heading;
    font-size: 15px;
    text-transform: uppercase;
    margin: 0 10px 0 0;
    font-weight: 800;
    user-select: none;
  }
  .c-quantity__select {
    @include flex($justify: flex-start);
    border-radius: 40px;
    border: 1px solid #E6E6E6;
  }
  .c-quantity__control {
    @include button-unset;
    width: 40px;
    height: 40px;
    @include flex($justify: center);
    background-color: $color-white;
    border-radius: 50%;
    z-index: 1;
    user-select: none;
    &:disabled { pointer-events: none; }
  }
  .c-quantity__controlIcon {
    &.c-quantity__controlIcon--isMinus { color: $color-primary; }
    &.c-quantity__controlIcon--isPlus { color: $color-secondary; }
    .c-quantity__control:disabled & {
      opacity: .25;
    }
    .c-quantity__control:hover & {
      transition: opacity .15s ease-in-out;
      opacity: .25;
    }
  }
  .c-quantity__input {
    @include input-unset;
    height: 40px;
    width: 50px;
    margin: 0 -15px;
    @include flex($justify: center);
    background-color: $color-white;
    text-align: center;
    font-family: $font-mono;
    font-size: 15px;
    font-weight: 700;
    pointer-events: none;      
  }
</style>