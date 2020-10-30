<template>
  <header :class="_buildModifiers('c-portalHeader', modifiers)"
    v-if="navigation"
  >
    <div class="c-portalHeader__main o-container u-hideMobileDown">
      <nav class="c-portalHeader__mainNav">
        <component class="c-portalHeader__mainLink"
          v-for="(link, index) in navigation"
          :key="index"
          :is="link.tag"
          v-bind="link.attributes"
        >
          <span class="c-portalHeader__mainText"
            v-html="link.text"
          />
        </component>
        <a class="c-portalHeader__mainLink c-portalHeader__mainLink--isSignout"
          v-if="items.navigation_signout"
          href="/account/logout"
        >
          <span class="c-portalHeader__mainText"
            v-html="items.navigation_signout"
          />
        </a>
      </nav>
    </div>
    <div :class="`${_buildModifiers('c-portalHeader__mobile', mobileModifiers)} 
      u-hideTabletUp`"
    >
      <div class="c-portalHeader__mobileTrigger"
        @click="open = !open"
      >
        <span class="c-portalHeader__mobileLabel"
          v-if="items.navigation_label"
          v-html="items.navigation_label"
        />
        <c-svg class="c-portalHeader__mobileSvg"
          name="circleChevron"
        />
      </div>
      <transition name="t-mobileNav-slide">
        <nav class="c-portalHeader__mobileNav" v-if="open">
          <component class="c-portalHeader__mobileLink"
            v-for="(link, index) in navigation"
            :key="index"
            :is="link.tag"
            v-bind="link.attributes"
            @click.native="open = false"
          >
            <span class="c-portalHeader__mobileText"
              v-html="link.text"
            />
          </component>
          <a class="c-portalHeader__mobileLink"
            v-if="items.navigation_view"
            href="/pages/rewards#rewards-redeem"
          >
            <span class="c-portalHeader__mobileText"
              v-html="items.navigation_view"
            />
          </a>
          <a class="c-portalHeader__mobileLink"
            v-if="items.navigation_earn"
            href="/pages/rewards#rewards-points"
          >
            <span class="c-portalHeader__mobileText"
              v-html="items.navigation_earn"
            />
          </a>
          <a class="c-portalHeader__mobileLink"
            v-if="items.navigation_refer"
            href="/pages/rewards?ll_act=refer"
          >
            <span class="c-portalHeader__mobileText"
              v-html="items.navigation_refer"
            />
          </a>
          <a class="c-portalHeader__mobileLink c-portalHeader__mobileLink--isSignout"
            v-if="items.navigation_signout"
            href="/account/logout"
          >
            <span class="c-portalHeader__mobileText"
              v-html="items.navigation_signout"
            />
          </a>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script>
import cSvg from '@shared/components/core/cSvg.vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({ open: false }),
  components: { cSvg },
  computed: {
    ...mapGetters('customer', ['customerShopify', 'customerRecharge']),
    navigation() {
      let links = this.$store.getters['customize/customizePartByKey']('navigation')
      if(links) {
        links = links.filter(link => link.visibility === "shopify_users"
            ? this.customerShopify : link.visibility === "recharge_users"
              ? this.customerRecharge : true
        )
        return links.map(link => {
          if(link.page === 'external') {
            link = { ...link, tag: 'a', attributes: { href: link.url }}
          } else {
            link = { ...link, tag: 'router-link', attributes: { to: {'name': link.page }} }
            if(link.page === 'shipment') link.attributes.exact = true
          }
          return link
        })
      }
    },
    items() {
      return this.$store.getters['customize/customizePartByPrefix']('navigation_')
    },
    activeLink() {
      return this.navigation.find(link => link.page === this.$route.name)
    },
    mobileModifiers() {
      let modifiers = []
      if(this.open) modifiers.push('isOpen')
      return modifiers
    }
  },
  methods: {
    handleResize() {
      const width = window.innerWidth
      if(width >= 768) this.open = false
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss">
  .c-portalHeader {
    width: 100%;
    height: 48px;
    z-index: $z-index-header - 1;
    user-select: none;
    position: relative;
    background-color: $color-white;
    @include media-tablet-up {
      height: 58px;
      background-color: $color-primary;
    }
  }
  .c-portalHeader__main {
    height: 100%;
  }
  .c-portalHeader__mainNav {
    height: 100%;
    @include flex($justify: flex-start, $align: stretch);
  }
  .c-portalHeader__mainLink {
    padding: 0 30px;
    @include flex($justify: center, $align: center);
    @include hover-fade;
    &.router-link-exact-active {
      pointer-events: none;
      opacity: 1;
    }
    &:first-child { margin-left: -30px; }
    &:last-child { margin-right: -30px; }
    @include media-down(900px) {
      padding: 0 15px;
      &:first-child { margin-left: -15px; }
      &:last-child { margin-right: -15px; }
    }
    &.c-portalHeader__mainLink--isSignout {
      margin-left: auto;
    }
  }
  .c-portalHeader__mainText {
    color: $color-white;
    font-family: $font-heading;
    font-size: 16px;
    font-weight: 600;
    padding: 4px 0;
    @include media-down(900px) {
      padding: 8px 10px;
      font-size: 14px;
    }
    .router-link-exact-active & {
      color: $color-secondary;
    }
    .c-portalHeader__mainLink--isSignout & {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.1em;
    }
  }
  .c-portalHeader__mobile {
    width: 100%;
    height: 100%;
  }
  .c-portalHeader__mobileTrigger {
    height: 100%;
    padding: 0 15px;
    @include flex($justify: space-between, $align: center);
    border-bottom: 1px solid #E5E5E5;
    @include hover-fade;
  }
  .c-portalHeader__mobileLabel {
    color: $color-secondary;
    font-family: $font-heading;
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 1px;
    border-bottom: 2px solid $color-secondary;
  }
  .c-portalHeader__mobileSvg {
    width: 24px;
    display: flex !important;
    margin-left: 20px;
    color: $color-secondary;
    transition: transform .2s ease-in-out;
    transform-origin: 50% 50%;
    transform: rotate(90deg);
    .c-portalHeader__mobile--isOpen & {
      transform: rotate(270deg);
    }
  }
  .c-portalHeader__mobileNav {
    height: auto;
    position: relative;
    @include flex($direction: column);
    background-color: $color-white;
    transition: max-height .2s ease-in-out;
    overflow: hidden;
  }
  .c-portalHeader__mobileLink {
    width: 100%;
    padding: 15px 20px 15px 50px;
    color: $color-primary;
    font-family: $font-heading;
    font-size: 16px;
    font-weight: 700;
    @include hover-fade;
    border-bottom: 1px solid #E5E5E5;
    &.router-link-exact-active {
      pointer-events: none;
      color: $color-secondary;
    }
    &.c-portalHeader__mobileLink--isSignout {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.1em;
    }
  }
  .t-mobileNav-slide-enter,
  .t-mobileNav-slide-leave-to {
    max-height: 0;
  }
  .t-mobileNav-slide-leave,
  .t-mobileNav-slide-enter-to {
    max-height: 230px;
  }
</style>