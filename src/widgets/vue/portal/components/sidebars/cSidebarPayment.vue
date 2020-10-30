<template>
  <div :class="_buildModifiers('c-sidebarPayment', modifiers)" 
    v-if="customerRecharge"
  >
    <c-overlay class="c-sidebar__overlay"
      :show="show"
      @click="UI_CLOSE_SIDEBAR"
    />
    <div :class="_buildModifiers('c-sidebar__drawer', drawerModifiers)" 
      @close="UI_CLOSE_SIDEBAR"
    >
      <div class="c-sidebar__container o-container">
        <button class="c-sidebar__back"
          v-if="backText"
          @click="UI_CLOSE_SIDEBAR"
        >
          <c-svg class="c-sidebar__backIcon"
            name="chevron"
          />
          <span class="c-sidebar__backText" 
            v-html="backText"
          />
        </button>
        <c-h class="c-sidebar__heading"
          v-if="heading"
          tag="h3"
          level="3"
          :text="heading"
          :modifiers="['isBolder']"
        />
        <iframe class="c-sidebar__iframe"
          :src="src" 
          frameborder="0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import cOverlay from '@shared/components/core/cOverlay.vue'
import cSvg from '@shared/components/core/cSvg.vue'
import cH from '@shared/components/core/cH.vue'

export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { cOverlay, cSvg, cH },
  computed: {
    ...mapGetters('customer', ['customerRecharge']),
    show() {
      return (this.sidebar.component === 'cSidebarPayment')
    },
    content() {
      return this.$store.getters['customize/customizeSidebarByPrefix']('payment_')
    },
    sidebar() {
      return this.$store.getters['ui/uiByKey']('sidebar')
    },
    backText() {
      const backKey = Object.keys(this.content).find(key => key.endsWith('_back'))
      return backKey ? this.content[backKey] : false
    },
    heading() {
      const headingKey = Object.keys(this.content).find(key => key.endsWith('_heading'))
      return headingKey ? this.content[headingKey] : false
    },
    src() {
      const { customerRecharge } = this
      if(customerRecharge) {
        return `https://shopifysubscriptions.com/customer_portal_forms/${customerRecharge.hash}/customer_card/`
      }
    },
    drawerModifiers() {
      let modifiers = [ ...this.modifiers ]
      if(this.show) modifiers.push('isOpen')
      return modifiers
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_SIDEBAR'])
  }
}
</script>

<style lang="scss">
  .c-sidebarPayment {
    position: relative;
    z-index: $z-index-sidebar;
    .c-sidebar__drawer {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      overflow-y: scroll;
      transform: translateX(100%);
      transition: transform .3s ease-in-out, opacity ease-in-out .3s;;
      z-index: $z-index-sidebar;
      opacity: 0;
      &.c-sidebar__drawer--isOpen {
        transition: transform .3s ease-in-out;
        transform: translateX(0);
        opacity: 1;
      }
    }
    .c-sidebar__iframe {
      width: 100%;
      height: 750px;
      padding-bottom: 30px;
      overflow: hidden;
      @include media-tablet-up {
        height: 500px;
      }
    }
  }
</style>