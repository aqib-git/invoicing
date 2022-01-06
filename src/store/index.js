import { createStore } from 'vuex';
import _ from 'lodash';

export default createStore({
  state: {
    invoice: {
      invoice_number: null,
      invoice_date: null,
      invoice_terms: null,
      po_number: null,
      invoice_from_text: null,
      bill_to: null,
      ship_to: null,
      items: [
        {
          id: 1, description: null, qty: 1, rate: 0,
        },
        {
          id: 2, description: null, qty: 1, rate: 0,
        },
        {
          id: 3, description: null, qty: 1, rate: 0,
        },
      ],
      notes: null,
      terms_and_conditions: null,
      tax_percent: 0,
      amount_paid: 0,
    },
  },
  getters: {
    invoice(state) {
      return state.invoice;
    },
    maxItemId(state) {
      let maxId = -1;

      for (let i = 0; i < state.invoice.items.length; i += 1) {
        const item = state.invoice.items[i];

        maxId = item.id > maxId ? item.id : maxId;
      }

      return maxId;
    },
  },
  actions: {
    addItem({ commit }, item) {
      commit('addItem', item);
    },
    updateItem({ commit }, data) {
      commit('updateItem', data);
    },
    updateInvoiceField({ commit }, data) {
      commit('updateInvoiceField', data);
    },
  },
  mutations: {
    addItem(state, item) {
      state.invoice.items.push(item);
    },
    updateItem(state, data) {
      const item = _.find(state.invoice.items, { id: data.id });
      item[data.field] = data.value;
    },
    updateInvoiceField(state, data) {
      state.invoice[data.field] = data.value;
    },
  },
  modules: {
  },
});
