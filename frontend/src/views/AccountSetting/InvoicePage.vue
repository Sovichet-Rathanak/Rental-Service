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
import FooterComponent from '@/components/FooterComponent.vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

export default {
  components: {
    HeaderNav2,
    BreadCrumbs,
    invoicePopup,
    invoiceTable,
    FooterComponent
  },
  data() {
    return {
      showCard: false,
      selectedInvoice: null,
      invoiceBoxs: []
    };
  },

  mounted(){
    const userStore = useUserStore();
    const tenantId = userStore.user.id;

    if (tenantId){
      this.fetchInvoices(tenantId)
    } 
    else {
    console.warn('No tenant ID found in userStore');}
  },

  methods: {
    async fetchInvoices(tenantId) {
      try {
        const res = await axios.get(`http://localhost:3000/api/booking/tenant-invoices/${tenantId}`);
        this.invoiceBoxs = res.data;
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    },
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