<template >
  <div :class="_buildModifiers('c-loading', modifiers)">
    <div class="c-loading__wheel" />
    <span class="c-loading__text"
      v-if="text"
      v-html="text"
    />
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: [String, Boolean],
      default: false
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss">
  .c-loading {
    @include flex($justify: center);
  }
  .c-loading__wheel {
    width: 30px;
    height: 30px;
    border-style: solid;
    border-width: 4px;
    border-radius: 50%;
    animation: spin .75s linear infinite;
    margin-left: 8px;
    .c-loading--isLargest & {
      width: 70px;
      height: 70px;
      border-width: 8px;
    }
    .c-loading--isSmaller & {
      width: 20px;
      height: 20px;
      border-width: 2px;
      margin-left: 6px;
    }
    .c-loading--isUnderline & {
      width: 12px;
      height: 12px;
      border-width: 2px;
      margin-left: 4px;
    }
    .c-loading--hideTextLoading & {
      margin-left: 0;
    }
  }
  .c-loading--isPrimary {
    .c-loading__wheel {
      border-color: rgba($color-white, .5);
      border-top-color: $color-white;
    }
    &.c-loading--isHollow,
    &.c-loading--isUnderline {
      .c-loading__wheel {
        border-color: rgba($color-primary, .5);
        border-top-color: $color-primary;
      }
    }
  }
  .c-loading--isSecondary {
    .c-loading__wheel {
      border-color: rgba($color-white, .5);
      border-top-color: $color-white;
    }
    &.c-loading--isHollow,
    &.c-loading--isUnderline {
      .c-loading__wheel {
        border-color: rgba($color-secondary, .5);
        border-top-color: $color-secondary;
      }
    }
  }
  .c-loading--isBlack {
    .c-loading__wheel {
      border-color: rgba($color-white, .5);
      border-top-color: $color-white;
    }
    &.c-loading--isHollow,
    &.c-loading--isUnderline {
      .c-loading__wheel {
        border-color: rgba($color-black, .5);
        border-top-color: $color-black;
      }
    }
  }
  .c-loading--isInfo {
    .c-loading__wheel {
      border-color: rgba($color-white, .5);
      border-top-color: $color-white;
    }
    &.c-loading--isHollow,
    &.c-loading--isUnderline {
      .c-loading__wheel {
        border-color: rgba($color-info, .5);
        border-top-color: $color-info;
      }
    }
  }
  .c-loading--isSuccess {
    .c-loading__wheel {
      border-color: rgba($color-white, .5);
      border-top-color: $color-white;
    }
    &.c-loading--isHollow,
    &.c-loading--isUnderline {
      .c-loading__wheel {
        border-color: rgba($color-success, .5);
        border-top-color: $color-success;
      }
    }
  }
  .c-loading--isWarning {
    .c-loading__wheel {
      border-color: rgba($color-white, .5);
      border-top-color: $color-white;
    }
    &.c-loading--isHollow,
    &.c-loading--isUnderline {
      .c-loading__wheel {
        border-color: rgba($color-warning, .5);
        border-top-color: $color-warning;
      }
    }
  }
  .c-loading--isError {
    .c-loading__wheel {
      border-color: rgba($color-white, .5);
      border-top-color: $color-white;
    }
    &.c-loading--isHollow,
    &.c-loading--isUnderline {
      .c-loading__wheel {
        border-color: rgba($color-error, .5);
        border-top-color: $color-error;
      }
    }
  }
  .c-loading--isOverlay {
    .c-loading__wheel {
      border-color: rgba($color-black, .5);
      border-top-color: $color-black;
    }
  }
  .c-loading__text {
    @include text-heading;
    margin-left: 10px;
    font-size: 20px;
  }
  
  @keyframes spin {
    0% { 
      transform: rotate(0deg); 
    }
    100% { 
      transform: rotate(360deg); 
    }
  }
</style>