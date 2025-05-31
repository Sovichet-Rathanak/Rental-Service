<template>
  <div class="invoiceTable">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Landlord Name</th>
          <th v-if="showTenantName">Tenant Name</th>
          <th>Properties</th>
          <th>Address</th>
          <th>Total Payment</th>
          <th>Due Date</th>
          <th>Duration</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoices" :key="invoice.id" class="invoiceRow" @click="handleRowClick(invoice)">
          <td>{{ invoice.id }}</td>
          <td>{{ invoice.landlordName }}</td>
          <td v-if="showTenantName">{{ invoice.tenantName }}</td>
          <td>{{ invoice.properties }}</td>
          <td>{{ invoice.address }}</td>
          <td class="totalPayment">{{ invoice.totalPayment }}</td>
          <td class="due-date">{{ invoice.dueDate }}</td>
          <td>{{ invoice.duration }}</td>
          <td>
            <button :class="['status', invoice.status.toLowerCase()]">
              {{ invoice.status }}
            </button>
          </td>
          <td v-if="useTenantInvoice">
            <button :class="['actionBtn', invoice.action.toLowerCase().replace(/\s+/g, '')]"
              @click.stop="handleActionClick(invoice)">
              <Icon :icon="invoice.icon" width="23" height="23" />
              {{ invoice.action }}
            </button>
          </td>
          <td v-else>
            <ActionButton
              :index="index"
              @edit-item="editItem"
              @delete-item="deleteItem"
            ></ActionButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ActionButton from '../Admin/ActionButton.vue';
export default {
  components: {
    ActionButton
  },
  props: {
    invoices: {
      type: Array,
      required: true
    },
    showTenantName: {
      type: Boolean,
      default: false
    },
    useTenantInvoice: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleRowClick(invoice) {
      this.$emit('row-click', invoice);
    },
    handleActionClick(invoice) {
      this.$emit('action-click', invoice);
    },
    editItem(index) {
      const row = this.rows[index];
      this.$emit('edit-item', row);
    },
    deleteItem(index) {
      this.$emit('delete-item', index);
    },
  },
}
</script>

<style scoped>
.invoiceTable {
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 20px;
}

thead {
  background-color: #487CFF;
  color: white;
}

th {
  padding: 18px 20px;
  text-align: center;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
  font-size: 18px;
}

.invoiceRow {
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  height: 70px;
  transition: background-color 0.2s ease;
}

.invoiceRow:hover {
  background-color: #f8f8f8;
}

.invoiceRow:last-child {
  border-bottom: none;
}

td {
  padding: 20px 20px;
  text-align: center;
  font-weight: 500;
  vertical-align: middle;
  height: 70px;
}

.due-date {
  font-weight: bold;
  color: #003ace;
}

.totalPayment {
  color: #2DCF66;
  font-weight: bold;
}

.status {
  height: 42px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  text-transform: capitalize;
  border: none;
  cursor: default;
}

.status.paid {
  color: #319F43;
  border: 1px solid #319F43;
  background-color: rgba(49, 159, 67, 0.1);
}

.status.pending {
  color: #F79E1B;
  border: 1px solid #F79E1B;
  background-color: rgba(247, 158, 27, 0.2);
}

.status.overdue {
  color: #CD4D4D;
  border: 1px solid #CD4D4D;
  background-color: rgba(205, 77, 77, 0.2);
}

.actionBtn {
  height: 42px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #487CFF;
  color: white;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  justify-content: center;
  min-width: 120px;
}

.actionBtn.paynow {
  background-color: #535353;
  color: white;
}

.actionBtn.paynow:hover {
  background-color: #000000;
  color: white;
}

.actionBtn.paynow:active {
  background-color: #b4b4b4;
  color: white;
}

.actionBtn:hover {
  background-color: #134fe7;
  border: none;
}

.actionBtn:active {
  background-color: #aac0ff;
  border: none;
}
</style>