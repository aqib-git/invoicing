<template>
  <div class="invoice">
    <!-- INVOICE HEADER -->
    <div class="invoice__header">
      <div class="invoice__header__left">
        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f">
          <n-upload-dragger>
            <div style="margin-bottom: 12px;">
              <n-icon size="48" :depth="3">
                <archive-icon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px;">
              Drop Your Logo
            </n-text>
          </n-upload-dragger>
        </n-upload>
        <div class="invoice__from">
          <n-form-item>
            <n-input
              :value="invoice.invoice_from_text"
              type="textarea"
              placeholder="Who is this invoice from? required"
              @update:value="updateInvoiceField($event, 'invoice_from_text')" />
          </n-form-item>
        </div>
        <div class="invoice__addresses">
          <div class="invoice__bill_to">
            <n-form-item label="Bill To">
              <n-input
                :value="invoice.bill_to"
                type="textarea"
                placeholder="Who is this invoice to? required"
                @update:value="updateInvoiceField($event, 'bill_to')" />
            </n-form-item>
          </div>
          <div class="invoice__ship_to">
            <n-form-item label="Ship To">
              <n-input
                :value="invoice.ship_to"
                type="textarea"
                placeholder="(optional)"
                @update:value="updateInvoiceField($event, 'ship_to')" />
            </n-form-item>
          </div>
        </div>
      </div>
      <div class="invoice__header__right">
        <div class="invoice__title">
          INVOICE
        </div>
        <div class="invoice__no">
          <n-input
            :show-button="false"
            type="text"
            :value="invoice.invoice_number"
            @update:value="updateInvoiceField($event, 'invoice_number')">
            <template #prefix>#</template>
          </n-input>
        </div>
        <div class="invoice__date">
          <div>
            Due Date
          </div>
          <div>
            <n-date-picker
              :value="invoice.invoice_date"
              type="date"
              @update:value="updateInvoiceField($event, 'invoice_date')"
              placeholder=""
              clearable />
          </div>
        </div>
        <div class="invoice__terms">
          <div>
            Payment terms
          </div>
          <div>
            <n-input
              :value="invoice.invoice_terms"
              type="text"
              @update:value="updateInvoiceField($event, 'invoice_terms')"
              placeholder=""
              clearable />
          </div>
        </div>
        <div class="invoice__po">
          <div>
            PO Number
          </div>
          <div>
            <n-input
              :value="invoice.po_number"
              type="text"
              @update:value="updateInvoiceField($event, 'po_number')"
              placeholder=""
              clearable />
          </div>
        </div>
      </div>
    </div>
    <!-- INVOICE LINEITEMS -->
    <div class="invoice__lineitems">
       <div class="invoice__lineitems__header">
         <div class="invoice__lineitems__header__desc">Item</div>
         <div class="invoice__lineitems__header__qty">Quantity</div>
         <div class="invoice__lineitems__header__rate">Rate</div>
         <div class="invoice__lineitems__header__amount">Amount</div>
       </div>
       <div class="invoice__lineitems__body">
          <invoice-line-item :item="item" v-for="item in items" :key="item.id" />
         <div class="invoice__lineitems__actions">
            <n-button type="primary" @click="addItem">+ Line item</n-button>
         </div>
       </div>
    </div>
    <!-- INVOICE FOOTER -->
    <div class="invoice__footer">
      <div class="invoice__footer__info">
        <n-form-item label="Notes">
          <n-input
            :value="invoice.notes"
            type="textarea"
            placeholder="Notes: any relevant information not already covered"
            @update:value="updateInvoiceField($event, 'notes')" />
        </n-form-item>
        <br><br>
        <n-form-item label="Terms">
          <n-input
            :value="invoice.terms_and_conditions"
            type="textarea"
            placeholder="Terms and condition, late fees, payment methods, delivery schedule"
            @update:value="updateInvoiceField($event, 'terms_and_conditions')" />
        </n-form-item>
      </div>
      <div class="invoice__footer__totals">
        <div class="invoice__footer__total subtotal">
          <div>
            SubTotals
          </div>
          <div>
            US${{subTotals}}
          </div>
        </div>
        <div class="invoice__footer__total tax">
          <div>
            Tax
          </div>
          <div>
            <n-input-number
              :show-button="false"
              :value="invoice.tax_percent"
              @update:value="updateInvoiceField($event || 0, 'tax_percent')">
              <template #suffix>%</template>
            </n-input-number>
          </div>
        </div>
        <div  class="invoice__footer__total total">
          <div>
            Total
          </div>
          <div>
            US${{totalAmounts}}
          </div>
        </div>
        <div  class="invoice__footer__total amountpaid">
          <div>
            Amount Paid
          </div>
          <div>
            <n-input-number
              :show-button="false"
              :value="invoice.amount_paid"
              @update:value="updateInvoiceField($event || 0, 'amount_paid')">
              <template #suffix>$</template>
            </n-input-number>
          </div>
        </div>
        <div  class="invoice__footer__total balancedue">
          <div>
            Balance Due
          </div>
          <div>
            US${{balanceDue}}
          </div>
        </div>
      </div>
      <div class="invoice__footer__actions">
        <n-button type="primary" @click="createInvoice">Create Invoice</n-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';
import useInvoice from '../composables/useInvoice';
import InvoiceLineItem from './InvoiceLineItem.vue';

export default {
  name: 'Invoice',
  components: {
    InvoiceLineItem,
    ArchiveIcon,
  },
  setup() {
    const {
      lineItems,
      subTotals,
      totalAmounts,
      balanceDue,
    } = useInvoice();

    return {
      lineItems,
      subTotals,
      totalAmounts,
      balanceDue,
    };
  },
  computed: {
    invoice() {
      return this.$store.getters.invoice;
    },
    items() {
      return this.invoice.items;
    },
    maxItemId() {
      return this.$store.getters.maxItemId;
    },
  },
  methods: {
    createInvoice() {
      console.log('Created a new invoice...');
      console.log(JSON.parse(JSON.stringify(this.invoice)));
    },
    addItem() {
      this.$store.dispatch('addItem', {
        id: this.maxItemId + 1,
        description: null,
        qty: 1,
        rate: 0,
        amount: 0,
      });
    },
    updateInvoiceField(value, field) {
      this.$store.dispatch('updateInvoiceField', {
        field,
        value,
      });
    },
  },
};
</script>

<style lang="scss">
.invoice {
  border: 2px solid whitesmoke;
  max-width: 1000px;
  margin: 50px auto;

  &__title {
    font-size: 30px;
    text-transform: uppercase;
    text-align: right;
    margin-bottom: 10px;
  }

  &__no {
    width: 200px;
    margin-bottom: 186px;
  }

  &__date,
  &__terms,
  &__po {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    > div:nth-of-type(1) {
      text-align: right;
      width: 150px;
      padding-right: 5px;
    }

    > div:nth-of-type(2) {
      display: flex;
      justify-content: flex-end;
    }
  }

  &__header {
    display: flex;

    &__left,
    &__right {
      padding: 15px;
      flex-basis: 50%;
    }

    &__right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    padding: 30px 15px;

    &__info,
    &__totals {
      flex-basis: 50%;
    }

    &__actions {
      display: flex;
      flex: 1;
      justify-content: center;
      flex-basis: 100%;
      padding: 20px;
    }

    &__totals {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    &__total {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      > div:nth-of-type(1) {
        width: 100px;
        text-align: right;
        font-size: 16px;
        padding: 10px;
      }

      > div:nth-of-type(2) {
        display: flex;
        justify-content: flex-end;
        width: 150px;
        font-size: 16px;
      }
    }
  }

  &__lineitems {
    &__body {
      padding: 10px;
    }

    &__header {
      display: flex;
      background-color: #333;
      color: white;
      padding: 10px;

      > div {
        padding: 5px;
      }

      &__desc {
        flex: 1;
      }

      &__qty,
      &__rate,
      &__amount {
        width: 150px;
      }

      &__amount {
        text-align: right;
      }
    }

    &__item {
      display: flex;

       > div {
        padding: 5px;
      }

      &__desc {
        flex: 1;
      }

      &__qty,
      &__rate,
      &__amount {
        width: 150px;
      }

      &__amount {
        text-align: right;
      }
    }

    &__actions {
      padding: 10px;
    }
  }

  &__addresses {
    display: flex;
    justify-content: space-between;

    > div {
      flex: 1;
    }

    > div:nth-of-type(1) {
      margin-right: 10px;
    }
  }
}
</style>
