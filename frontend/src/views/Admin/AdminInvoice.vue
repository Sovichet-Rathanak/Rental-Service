<template>
    <AdminInvoiceCRUDTitle :title="'Invoice'" icon="ph:note-fill" :invoices="invoiceBoxs" :createRoute="{name: ''}"></AdminInvoiceCRUDTitle>
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
import AdminInvoiceCRUDTitle from '@/components/Admin/AdminInvoiceTitle.vue';
import InvoicePopup from '@/components/InvoiceComponent/InvoicePopup.vue';
import InvoiceTable from '@/components/InvoiceComponent/InvoiceTable.vue';

export default {
    components: {
        AdminInvoiceCRUDTitle,
        InvoiceTable,
        InvoicePopup
    },
    data() {
        return {
            showTenantInvoice: false,
            selectedInvoice: null,
            isPopupOpen: false,
            invoiceBoxs: [
        {
          id: 1,
          landlordName: 'Shen Yue',
          tenantName: 'Zhange Linghe',
          properties: 'A-001 (Brat Villa)',
          address: 'BKK1, Chamkarmon, Phnom Penh',
          totalPayment: '$500',
          dueDate: '14-Oct-2025',
          duration: '1 May - 1 June 2026',
          status: 'Paid',
          action: 'Download',
          icon: 'mi:share'
        },
        {
          id: 2,
          landlordName: 'Shen Yue',
          tenantName: 'Zhange Linghe',
          properties: 'A-001 (Brat Villa)',
          address: 'BKK1, Chamkarmon, Phnom Penh',
          totalPayment: '$500',
          dueDate: '14-Oct-2025',
          duration: '1 May - 1 June 2026',
          status: 'Pending',
          action: 'Pay Now',
          icon: 'uiw:pay'
        },
        {
          id: 3,
          landlordName: 'Shen Yue',
          tenantName: 'Zhange Linghe',
          properties: 'A-001 (Brat Villa)',
          address: 'BKK1, Chamkarmon, Phnom Penh',
          totalPayment: '$500',
          dueDate: '14-Oct-2025',
          duration: '1 May - 1 June 2026',
          status: 'Overdue',
          action: 'Pay Now',
          icon: 'uiw:pay'
        },

        {
          id: 4,
          landlordName: 'Shen Yue',
          tenantName: 'Zhange Linghe',
          properties: 'A-001 (Brat Villa)',
          address: 'BKK1, Chamkarmon, Phnom Penh',
          totalPayment: '$500',
          dueDate: '14-Oct-2025',
          duration: '1 May - 1 June 2026',
          status: 'Paid',
          action: 'Download',
          icon: 'mi:share'
        },
    ]
        }
    },
    methods: {
      openInvoicePopup(invoice) {
        this.selectedInvoice = invoice;
        this.isPopupOpen = true;
      },
      closePopup() {
        this.isPopupOpen = false;
        this.selectedInvoice = null;
      }
    }
}
</script>

<style scoped>
.invoiceTable {
    margin-left: 100px;
    width: 90%;
    box-sizing: border-box;
}

</style>