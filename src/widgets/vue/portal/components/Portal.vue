<template>
  <div :class="_buildModifiers('c-portal', modifiers)">
    <c-portalHeader class="c-portal__header"
      v-if="customerReady"
      data-portal-header
    />
    <div class="c-portal__page o-container">
      <c-loading class='c-portal__loading'
        v-if="!customerReady"
        :modifiers="['isSecondary', 'isHollow', 'isLargest']"
      />
      <transition name="t-content-fade" 
          v-if="customerReady"
          mode="out-in"
        > 
          <router-view class="c-portal__content"
            :key="$route.name" 
          />
      </transition>
    </div>
    <c-sidebar class="c-portal__sidebar" 
      v-if="customerReady"
      data-portal-sidebar
    />
    <c-modal class="c-portal__modal" 
      v-if="customerReady"
      data-portal-modal
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import setup from '../_setup'
import redirect from '../_redirect'
import cPortalHeader from './theme/cPortalHeader.vue'
import cLoading from '@shared/components/core/cLoading.vue'
import cSidebar from './theme/cSidebar.vue'
import cModal from './theme/cModal.vue'

export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: { 
    cPortalHeader, cLoading,
    cSidebar, cModal 
  },
  data: () => ({ shopifyReady: false }),
  computed: {
    ...mapGetters('customer', ['customerReady']),
    state() {
      // Testing Only
      return this.$store.state
    },
    preventScroll() {
      return this.$store.getters['ui/uiSettingByKey']('preventScroll')
    }
  },
  methods: {
    setReady() {
      const shopifyInterval = setInterval(() => {
        this.shopifyReady = window.Scoutside.api.ready
        if(this.shopifyReady) clearInterval(shopifyInterval)
      }, 100)
    }
  },
  mounted() {
    this.setReady()
  },
  watch: {
    shopifyReady: {
      immediate: true,
      handler(val) {
        if(val) setup(this)
      }
    },
    preventScroll: {
      handler(val) {
        const body = document.querySelector('[data-body]')
        if(val) body.classList.add('o-body--noScroll')
        else body.classList.remove('o-body--noScroll')
      }
    },
    customerReady: {
      handler(val) {
        if(val) redirect(this)
      }
    },
    $route: {
      handler(val) {
        if(val.name) {
          redirect(this)
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .c-portal {
    background-color: $color-body;
  }
  .c-portal__page {
    min-height: 420px;
  }
  .c-portal__loading {
    margin: 150px auto;
  }
  .c-portal__content {
    opacity: 1;
  }
  .t-content-fade-enter,
  .t-content-fade-leave-to {
    opacity: 0;
  }
  .t-content-fade-leave,
  .t-content-fade-enter-to {
    transition-duration: 0.15s;
    transition-property: opacity;
    opacity: 1;
  }
</style>