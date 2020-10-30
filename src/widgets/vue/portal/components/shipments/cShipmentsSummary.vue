<template>
  <c-accordion :class="_buildModifiers('c-shipmentsSummary', modifiers)"
    v-if="shipment && content"
  >
    <c-accordionItem class="c-shipmentsSummary__item">
      <div class="c-shipmentsSummary__trigger" slot="trigger">
        <div class="c-shipmentsSummary__triggerLabel"
          v-if="content.label_order"
          v-html="content.label_order"
        />
        <div class="c-shipmentsSummary__triggerValue"
          v-if="shipment.charge.total"
          v-html="`${currencySymbol}${_formatMoney({ amount: shipment.charge.total })}`"
        />
        <div class="c-shipmentsSummary__triggerCircle">
          <c-svg class="c-shipmentsSummary__triggerIcon"
            name="chevron"
          />
        </div>
      </div>
      <div class="c-shipmentsSummary__content" slot="content">
        <div class="c-shipmentsSumary__contentLine"
          v-for="(line, index) in summaryLines"
          :key="`summaryLine-${index}`"
          :class="index == summaryLines.length - 1 
            ? 'c-shipmentsSumary__contentLine--isTotal' : ''"
        >
          <div class="c-shipmentsSummary__contentLabel"
            v-if="line.label"
            v-html="line.label"
          />
          <div class="c-shipmentsSummary__contentValue"
            v-if="line.value"
            v-html="line.value"
          />
        </div>
      </div>
    </c-accordionItem>
  </c-accordion>
</template>

<script>
import cAccordion from '@shared/components/core/cAccordion.vue'
import cAccordionItem from '@shared/components/core/cAccordionItem.vue'
import cSvg from '@shared/components/core/cSvg.vue'

export default {
  props: {
    shipment: {
      type: Object,
      required: true
    },
    content: {
      type: Object,
      required: true
    },
    modifiers: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    cAccordion, cAccordionItem,
    cSvg
  },
  computed: {
    currencySymbol() {
      return this.$store.getters['customize/customizeShopByKey']('currency_symbol')
    },
    summaryLines() {
      const { 
        label_subtotal, label_discount, label_tax, label_shipping, label_total 
      } = this.content
      const {
        subtotal, discount, tax, shipping, total
      } = this.shipment.charge
      let lines = [
        { label: label_subtotal, value: subtotal },
        { label: label_discount, value: discount },
        { label: label_tax, value: tax },
        { label: label_shipping, value: shipping },
        { label: label_total, value: total }
      ]
      return lines.map((line, index) => {
        let value = `${this.currencySymbol}${this._formatMoney({ amount: line.value })}`
        if(index == 1) value = `-${value}`
        return { label: line.label, value }
      })
    }
  }
}
</script>

<style lang="scss">
  .c-shipmentsSummary__item {
    width: 100%;
  }
  .c-shipmentsSummary__trigger {
    height: 62px;
    width: 100%;
    padding: 0 20px;
    @include flex ($justify: space-between, $wrap: nowrap);
    @include media-mobile-down {
      padding-right: 10px;
    }
  }
  .c-shipmentsSummary__triggerLabel,
  .c-shipmentsSummary__triggerValue {
    color: $color-primary;
    font-size: 20px;
    font-family: $font-heading;
    font-weight: 700;
    padding-right: 10px;
    @include media-mobile-down {
      font-size: 18px;
    }
  }
  .c-shipmentsSummary__triggerLabel {
    flex-grow: 1;
  }
  .c-shipmentsSummary__triggerValue {
    font-weight: 900;
  }
  .c-shipmentsSummary__triggerCircle {
    min-width: 40px;
    width: 40px;
    height: 40px;
    border: 2px solid #E5E5E5;
    border-radius: 50%;
    @include flex($justify: center);
    margin-left: 10px;
    @include media-mobile-down {
      margin-left: 0;
    }
  }
  .c-shipmentsSummary__triggerIcon {
    color: $color-primary;
    width: 12px;
    height: auto;
    transition: transform .35s ease-in-out;
    transform-origin: 50%;
    .c-accordionItem__trigger--isOpen & {
      transform: rotate(180deg);
    }
  }
  .c-shipmentsSummary__content {
    width: 100%;
    padding: 0 20px 20px;
  }
  .c-shipmentsSumary__contentLine {
    padding-right: 60px;
    @include flex($justify: space-between);
    color: $color-primary;
    font-family: $font-heading;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
    &.c-shipmentsSumary__contentLine--isTotal {
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 0;
      margin-top: 10px;
      @include media-mobile-down {
        font-size: 18px;
      }
    }
  }
</style>