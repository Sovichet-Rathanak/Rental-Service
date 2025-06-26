<template>
  <AdminInvoiceCRUDTitle
    :title="'Invoice'"
    icon="ph:note-fill"
    :invoices="invoiceBoxs"
    :createRoute="{ name: '' }"
  ></AdminInvoiceCRUDTitle>
  <InvoiceTable
    class="invoiceTable"
    :invoices="invoiceBoxs"
    :show-tenant-name="true"
    :useTenantInvoice="showTenantInvoice"
    @row-click="openInvoicePopup"
  />
  <InvoicePopup
    v-if="selectedInvoice"
    :invoice="selectedInvoice"
    :product="selectedProduct"
    @close="closePopup"
  />
</template>
<script>
import AdminInvoiceCRUDTitle from "@/components/Admin/AdminInvoiceTitle.vue";
import InvoicePopup from "@/components/InvoiceComponent/InvoicePopup.vue";
import InvoiceTable from "@/components/InvoiceComponent/InvoiceTable.vue";
import axios from "axios";

export default {
  components: {
    AdminInvoiceCRUDTitle,
    InvoiceTable,
    InvoicePopup,
  },
  data() {
    return {
      showTenantInvoice: false,
      selectedInvoice: null,
      isPopupOpen: false,
      invoiceBoxs: [],
    };
  },
  mounted() {
    this.fetchInvoices();
  },
  methods: {
    async fetchInvoices() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/booking/landlord-invoices"
        );
        this.invoiceBoxs = res.data.map((item) => ({
          ...item,
          action: "Download",
          icon: "mi:share",
        }));
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    },
    openInvoicePopup(invoice) {
      this.selectedInvoice = invoice;
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
      this.selectedInvoice = null;
    },
  },
};
</script>

<style scoped>
.invoiceTable {
  margin-left: 100px;
  width: 90%;
  box-sizing: border-box;
}
</style>
