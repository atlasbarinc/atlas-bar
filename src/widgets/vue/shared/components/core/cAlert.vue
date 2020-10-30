<template>
  <div :class="_buildModifiers('c-alert', extendedModifiers)">
    <c-svg class="c-alert__icon"
      v-if="showIcon"
      :name="icon"
    />
    <span class="c-alert__message"
      v-if="messagesText"
      v-html="messagesText"
    />
  </div>
</template>

<script>
export default {
  props: {
    role: {
      type: String,
      required: true
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    messages: {
      type: Array,
      default: () => ([])
    },
    closable: {
      type: Boolean,
      default: false
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    icon() {
      return `circle${this._stringCapitalize(this.role)}`
    },
    extendedModifiers() {
      let modifiers = [ ...this.modifiers ]
      modifiers.push(`is${this._stringCapitalize(this.role)}`)
      return modifiers
    },
    messagesText() {
      let messagesText = ''
      const uniqueMessages = this._arrayRemoveDuplicates(this.messages)
      uniqueMessages.forEach((message, index) => {
        if(index > 0) messagesText += '<br/ >'
        messagesText += message
      })
      return messagesText
    }
  }
}
</script>

<style lang="scss">
  .c-alert {
    width: 100%;
    @include flex($justify: space-between, $align: flex-start, $wrap: nowrap);
    border-radius: 3px;
    padding: 10px 15px;
    margin-bottom: 20px;
    &.c-alert--isSuccess { background-color: $color-success; }
    &.c-alert--isInfo { background-color: $color-info; }
    &.c-alert--isError { background-color: $color-error; }
  }
  .c-alert__icon {
    width: 20px;
    color: $color-white;
    margin: 6px 15px 0 0;
  }
  .c-alert__message {
    flex-grow: 1;
    @include text-body;
    color: $color-white;
  }
</style>