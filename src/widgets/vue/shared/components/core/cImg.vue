<template>
  <img :class="_buildModifiers('c-img', modifiers)"
    v-if="url"
    :alt="alt ? alt : ''"
    :src="url"
    ref="c-img"
    class="lazyload"
    data-sizes="auto"
    :data-src="dataSrc"
    :data-srcset="dataSrcSet"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: [String, Boolean],
      required: false
    },
    alt: {
      type: [String, Boolean],
      required: false
    },
    cdn: {
      type: String,
      default: 'shopify'
    },
    widths: {
      type: Array,
      default: () => [50, 150, 300]
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({ 
    lozad: window.Scoutside.vendors.lozad,
    extensions: ['.jpg', '.jpeg', '.png', '.gif']
  }),
  computed: {
    url() {
      if(this.src) return this.src
      else return window.Scoutside.shop.image_logo
    },
    urlParts() {
      if(this.src) {
        let fileIndex = false
        this.extensions.forEach(ext => {
          const index = this.src.indexOf(ext)
          if(index >= 0) fileIndex = index
        })
        const start = this.src.substring(0, fileIndex)
        const end = this.src.substring(fileIndex, this.src.length - 1)
        return [ start, end ]
      }
    },
    dataSrc() {
      if(!this.cdn) return this.src
      if(this.cdn == 'shopify' && this.src) {
        return this.buildShopifyUrl(this.urlParts, this.widths[0])
      }
    },
    dataSrcSet() {
      if(!this.cdn) return this.src
      let urlArray = []
      if(this.cdn == 'shopify' && this.src) {
        this.widths.forEach(width => {
          const imageUrl = this.buildShopifyUrl(this.urlParts, width)
          urlArray.push(`${imageUrl} ${width}w`)
        })
      }
      return urlArray.join(",")
    }
  },
  methods: {
    buildShopifyUrl(urlParts, width) {
      return `${urlParts[0]}_${width}x${urlParts[1]}`
    }
  },
  mounted() {
    const imageEl = this.$refs['c-img']
    if(imageEl && this.lozad) {
      const observer = this.lozad(imageEl)
      observer.observe()
    }
  }
}
</script>

<style lang="scss">
  .c-img {
    width: 100%;
  }
</style>