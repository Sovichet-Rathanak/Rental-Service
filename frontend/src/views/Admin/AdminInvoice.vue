<template>
    <AdminInvoiceCRUDTitle :title="'Invoice'" icon="ph:note-fill" :invoices="invoiceBoxs" :createRoute="{name: ''}"></AdminInvoiceCRUDTitle>
    <InvoiceTable class="invoiceTable" :invoices="invoiceBoxs" :show-tenant-name="true" :useTenantInvoice="showTenantInvoice" ></InvoiceTable>
   
</template>
<script>
import AdminInvoiceCRUDTitle from '@/components/Admin/AdminInvoiceTitle.vue';
import InvoiceTable from '@/components/InvoiceComponent/InvoiceTable.vue';

export default {
    components: {
        AdminInvoiceCRUDTitle,
        InvoiceTable
    },
    data() {
        return {
            showTenantInvoice: false,
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
          id: 3,
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