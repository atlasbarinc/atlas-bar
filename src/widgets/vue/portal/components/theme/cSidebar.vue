<template>
  <div :class="_buildModifiers('c-sidebar', sidebar.modifiers)"
    ref="c-sidebar"
  >
    <c-overlay class="c-sidebar__overlay"
      :show="show"
      @click="UI_CLOSE_SIDEBAR"
    />
    <c-drawer class="c-sidebar__drawer"
      ref="c-sidebar__drawer"
      :show="show"
      :side="sidebar.side"
      :closable="false"
      :modifiers="[ 'isFullWidth', ...sidebar.modifiers ]"
      @close="UI_CLOSE_SIDEBAR"
    >
      <div class="c-sidebar__container o-container">
        <button class="c-sidebar__back"
          v-if="!sidebar.settings.hideBack || backText"
          @click="handleBack"
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
        <component class="c-sidebar__content" 
          :is="sidebarComponent"
          :content="sidebar.content"
          :settings="sidebar.settings"
        />
      </div>
    </c-drawer>
    <c-sidebarPayment class="c-pageDetails__payment" 
      v-if="showPayment"
      :settings="sidebar.settings"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import cOverlay from '@shared/components/core/cOverlay.vue'
import cDrawer from '@shared/components/core/cDrawer.vue'
import cSvg from '@shared/components/core/cSvg.vue'
import cH from '@shared/components/core/cH.vue'
import cSidebarPayment from '../sidebars/cSidebarPayment.vue'

export default {
  data: () => ({
    sidebarComponent: false
  }),
  components: { 
    cOverlay, cDrawer, cSvg, cH,
    cSidebarPayment
  },
  computed: {
    show() {
      if(this.sidebar.component === 'cSidebarPayment') return false
      else return this.sidebarComponent ? true : false
    },
    sidebar() {
      return this.$store.getters['ui/uiByKey']('sidebar')
    },
    backText() {
      const { content } = this.sidebar
      if(content) {
        const backKey = Object.keys(content).find(key => key.endsWith('_back'))
        return backKey ? content[backKey] : false
      }
    },
    heading() {
      const { content } = this.sidebar
      if(content) {
        const headingKey = Object.keys(content).find(key => key.endsWith('_heading'))
        return headingKey ? content[headingKey] : false
      }
    },
    showPayment() {
      return this.$route.name === 'details'
    }
  },
  methods: {
    ...mapMutations('ui', ['UI_CLOSE_SIDEBAR']),
    handleBack() {
      const { backAction } = this.sidebar.settings
      return backAction ? backAction() : this.UI_CLOSE_SIDEBAR()
    }
  },
  watch: {
    "sidebar.component": {
      immediate: true,
      handler(val) {
        this.sidebarComponent = val 
          ? require(`../sidebars/${val}.vue`).default 
          : false
        if(val) {
          const cSidebar = this.$refs['c-sidebar']
          const drawer = cSidebar.querySelector('.c-sidebar__drawer')
          if(drawer) drawer.scrollTo(0,0)
        }
      }
    },
    "$route": {
      handler(val) {
        this.UI_CLOSE_SIDEBAR()
      }
    }
  }
}
</script>

<style lang="scss">
  .c-sidebar {
    position: relative;
    z-index: $z-index-sidebar;
  }
  .c-sidebar__overlay {
    z-index: 1;
  }
  .c-sidebar__drawer {
    width: 100vw;
    z-index: 2;
    background-color: $color-sidebar;
  }
  .c-sidebar__container {
    padding: 40px 0 60px;
  }
  .c-sidebar__back {
    @include flex;
    @include button-unset;
    margin-bottom: 15px;
    color: $color-black;
    @include hover-fade;
  }
  .c-sidebar__backIcon {
    width: 16px;
    position: relative;
    top: 1px;
    margin-right: 8px;
    transform: rotate(90deg);
    transform-origin: 50%;
  }
  .c-sidebar__backText {
    font-family: $font-heading;
    font-size: 17px;
    font-weight: 700;
    text-transform: uppercase;
    @include media-mobile-down {
      font-size: 16px;
    }
  }
  .c-sidebar__heading {
    margin-bottom: 30px;
    @include media-mobile-down {
      font-size: 25px;
    }
  }
</style>