<template>
  <div class="invoice__lineitems__item">
    <div class="invoice__lineitems__item__desc">
      <n-input
        :value="item.description"
        type="text"
        placeholder="Description of product or service"
        @update:value="updateItem($event, 'description', item)"/>
    </div>
    <div class="invoice__lineitems__item__qty">
      <n-input-number
        :value="item.qty"
        type="text"
        placeholder=""
        @update:value="updateItem($event || 0, 'qty', item)"
        :show-button="false"/>
    </div>
    <div class="invoice__lineitems__item__rate">
      <n-input-number
        :value="item.rate"
        type="text"
        placeholder=""
        @update:value="updateItem($event || 0, 'rate', item)"
        :show-button="false">
        <template #prefix>
          $
        </template>
      </n-input-number>
    </div>
    <div class="invoice__lineitems__item__amount">
      US${{lineItem.netPrice}}
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import useInvoice from '../composables/useInvoice';

export default {
  name: 'InvoiceLineItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { lineItems } = useInvoice();

    return {
      lineItems,
    };
  },
  methods: {
    updateItem(value, field, item) {
      this.$store.dispatch('updateItem', {
        id: item.id,
        field,
        value,
      });
    },
  },
  computed: {
    invoice() {
      return this.$store.getters.invoice;
    },
    maxItemId() {
      return this.$store.getters.maxItemId;
    },
    lineItem() {
      return _.find(this.lineItems, { id: this.item.id });
    },
  },
};
</script>
