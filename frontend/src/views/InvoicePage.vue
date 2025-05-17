<template>
  <header-nav-2></header-nav-2>

  <div class="header">
    <bread-crumbs></bread-crumbs>
    <h1>Invoices</h1>
  </div>
  <InvoiceHeader></InvoiceHeader>
  <div 
    v-for="invoiceBox in invoiceBoxs" 
    :key="invoiceBox.id" 
    @click="invoicePopup(invoiceBox)"
  >
    <invoiceTable :invoiceBox="invoiceBox" />
    
    <!-- case with tenant name
    <InvoiceComponent :invoiceBox="invoiceData" :showTenantName="true" /> -->

  </div>

  <!-- Popup Invoice page -->
  <invoicePopup
    v-if="showCard"
    :invoice="selectedInvoice"
    @close="showCard = false"
  />
</template>


<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import BreadCrumbs from '../components/BreadCrumbs.vue';
import invoicePopup from '@/components/InvoiceComponent/InvoicePopup.vue';
import invoiceTable from '@/components/InvoiceComponent/InvoiceTable.vue';
import InvoiceHeader from '@/components/InvoiceComponent/InvoiceHeader.vue';

export default {
  components: {
    HeaderNav2,
    BreadCrumbs,
    invoicePopup,
    invoiceTable,
    InvoiceHeader
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
          status: 'Unpaid',
          action: 'Pay Now',
          icon: 'uiw:pay'
        },
        { 
          id: 3, 
          landlordName: 'Shen Yue', 
          properties: 'A-001 (Brat Villa)',
          address: 'BKK1, Chamkarmon, Phnom Penh',
          totalPayment: '$500',
          dueDate: '14-Oct-2025',
          duration: '1 May - 1 June 2026',
          status: 'EXpired',
          action: 'Pay Now',
          icon: 'uiw:pay'
        },
        
      ]
    };
  },
  methods: {
    invoicePopup(invoiceBox) {
      this.selectedInvoice = invoiceBox;
      this.showCard = true;
    }
  }
};
</script>


<style scoped>
.header{
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-inline: 150px;
    gap: 15px;
    margin-bottom: 20px 
}

.navheader{
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 230px 0px 120px;
}

.navheader > span{
    font-size: 20px;
    font-weight: 400;
}

.navheader > span:hover{
    text-decoration: underline;
    cursor: pointer;
    color: rgb(25, 48, 250);
    font-weight: bold;
}

.navheader > span:active{
    text-decoration: underline;
    cursor: pointer;
    color: rgb(128, 141, 255);
    font-weight: bold;
}

h1 {
    font-size: 35px;
    font-weight: bolder;
    margin: 20px 0 5px 0;                                                                                                                                                                                                                                                                        
}

</style>
