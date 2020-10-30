<template>
  <div class="c-bundleFilter__container">
    <div class="c-bundleFilter__heading">Showing <span class="c-bundleFilter__active">{{ activeFilter || 'All Bars' }}</span></div>
    <div :class="_buildModifiers('c-bundleFilter', [
        filterOpen ? 'isOpen' : '',
        activeFilter ? 'isActive' : ''
      ])">
      <div class="c-bundleFilter__label" @click="filterOpen = !filterOpen">Filter By Bundle <c-svg name="chevron" /></div>
      <ul class="c-bundleFilter__options">
        <li class="c-bundleFilter__option" @click="setFilter(null)">
          <span>All Bars</span>
          <c-svg name="checkThin" v-if="activeFilter === null" />
        </li>
        <li class="c-bundleFilter__option" v-for="filter in filters" @click="setFilter(filter)">
          <span>{{ filter }}</span>
          <c-svg name="checkThin" v-if="activeFilter === filter" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'

export default {
  props: {
    filters: {
      type: Array,
      default: () => ([])
    },
    activeFilter: {
      type: String,
      default: null
    }
  },
  components: { cSvg },
  data: () =>  ({
    filterOpen: false
  }),
  methods: {
    setFilter(filter) {
      this.filterOpen = false
      this.$emit('setFilter', filter)
    }
  }
}
</script>

<style lang="scss">
.c-bundleFilter__container {
  background-color: $color-white;
  border-bottom: 1px solid $color-border;
  border-top: 1px solid $color-border;
  margin-left: -20px;
  margin-right: -20px;
  position: sticky;
  top: 0;
  z-index: 10;
  @include media-tablet-up {
    @include flex($justify: space-between, $wrap: nowrap);
    border: 0 none;
    height: 43px;
    margin: 0 0 60px;
    position: relative;
    z-index: 5;
  }
}
.c-bundleFilter__heading {
  border-bottom: 1px solid $color-border;
  font-family: $font-heading;
  font-size: 16px;
  font-weight: 900;
  line-height: 1.2;
  padding: 10px 20px;
  @include media-tablet-up {
    border: 0 none;
    font-size: 20px;
    padding: 0;
  }
}
.c-bundleFilter__active {
  color: $color-secondary;
}
.c-bundleFilter {
  font-family: $font-heading;
  font-size: 14px;
  font-weight: 700;
  @include media-tablet-up {
    background-color: $color-white;
    border: 2px solid $color-border;
    border-radius: 20px;
    cursor: pointer;
    font-size: 12px;
    overflow: hidden;
    position: absolute;
    right: 0;
    top:0;
    width: 200px;
  }
}
.c-bundleFilter__label {
  @include flex($wrap: nowrap);
  padding: 10px 20px;
  .c-svg {
    margin-left: auto;
    width: 10px;
    .c-bundleFilter--isOpen & {
      transform: rotate(180deg);
    }
  }
}
.c-bundleFilter__labelActive {
  margin-left: 4px;
}
.c-bundleFilter__options {
  background-color: $color-white;
  border-top: 1px solid $color-border;
  display: none;
  position: absolute;
  width: 100%;
  @include media-tablet-up {
    background-color: transparent;
    position: static;
  }
  .c-bundleFilter--isOpen & {
    display: block;
  }
}
.c-bundleFilter__option {
  @include flex($justify: space-between, $wrap: nowrap);
  border-bottom: 1px solid $color-border;
  padding: 10px 20px;
  &:last-child {
    @include media-tablet-up {
      border-bottom: 0 none;
    }
  }
  &:hover {
    background-color: $color-primary;
    color: $color-white;
  }
  .c-svg {
    color: $color-secondary;
  }
}
</style>