<template>
  <header>
    <HeaderNav2></HeaderNav2>
  </header>
  <div class="container">
    <BreadCrumbs style="margin: 30px 0px; justify-content: flex-start;"></BreadCrumbs>
    <h1 style="margin-bottom: 50px;">Invoices</h1>
    <invoiceTable :invoices="invoiceBoxs" :showTenantName="false" @row-click="handleRowClick"
      @action-click="handleActionClick"></invoiceTable>
  </div>
  <footer>
    <FooterComponent></FooterComponent>
  </footer>
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import invoicePopup from '@/components/InvoiceComponent/InvoicePopup.vue';
import invoiceTable from '@/components/InvoiceComponent/InvoiceTable.vue';
import InvoiceHeader from '@/components/InvoiceComponent/InvoiceHeader.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    HeaderNav2,
    BreadCrumbs,
    invoicePopup,
    invoiceTable,
    InvoiceHeader,
    FooterComponent
  },
  data() {
    return {
      showCard: false,
      selectedInvoice: null,
      invoiceBoxs: [
        {
          id: 1,
          landlordName: 'Shen Yue',
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
          landlordName: 'Sovichet Rathanak',
          properties: 'A-001 (Brat Villa)',
          address: 'BKK1, Chamkarmon, Phnom Penh',
          totalPayment: '$500',
          dueDate: '14-Oct-2025',
          duration: '1 May - 1 June 2026',
          status: 'Overdue',
          action: 'Pay Now',
          icon: 'uiw:pay'
        },
      ]
    };
  },
  methods: {
    handleRowClick(invoice) {
      this.invoicePopup(invoice);
    },

    handleActionClick(invoice) {
      if (invoice.action === 'Pay Now') {
        console.log('Processing payment for:', invoice);
      } else if (invoice.action === 'Download') {
        console.log('Downloading invoice:', invoice);
      }
    },

    // Your existing method
    invoicePopup(invoiceBox) {
      this.selectedInvoice = invoiceBox;
      this.showCard = true;
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  box-sizing: border-box;
  padding-inline: 200px;
}
</style>