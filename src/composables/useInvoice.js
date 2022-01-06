import { computed } from 'vue';
import { useStore } from 'vuex';

export default function useInvoice() {
  const store = useStore();

  const round = (value) => {
    const rounded = parseFloat(value).toFixed(2);
    return parseFloat(rounded);
  };

  const unitPrice = (item) => round(item.rate);

  const qty = (item) => round(item.qty);

  const subTotal = (item) => {
    const value = unitPrice(item) * qty(item);

    return round(value);
  };

  const taxAmount = (item, invoice) => {
    const value = (item.qty)
      * (item.rate)
      * (invoice.tax_percent * 0.01);

    return round(value);
  };

  const netPrice = (item) => subTotal(item);

  const totalAmount = (item, invoice) => (netPrice(item) + taxAmount(item, invoice));

  const lineItem = (item) => ({
    id: item.id,
    unitPrice: unitPrice(item),
    qty: qty(item),
    subTotal: subTotal(item),
    taxAmount: taxAmount(item, store.getters.invoice),
    netPrice: netPrice(item),
    totalAmount: totalAmount(item, store.getters.invoice),
  });

  const lineItems = computed(() => store
    .getters
    .invoice
    .items
    .map((i) => lineItem(i)));

  const subTotals = computed(() => {
    let value = 0;

    lineItems.value.forEach((i) => {
      value += i.subTotal;
    });

    return round(value);
  });

  const totalAmounts = computed(() => {
    let value = 0;

    lineItems.value.forEach((i) => {
      value += i.totalAmount;
    });

    return round(value);
  });

  const balanceDue = computed(() => {
    const amountPaid = round(store.getters.invoice.amount_paid);

    return round(totalAmounts.value - amountPaid);
  });

  return {
    lineItems,
    subTotals,
    totalAmounts,
    balanceDue,
  };
}
