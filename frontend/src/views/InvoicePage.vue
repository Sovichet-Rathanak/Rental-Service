<template>
  <header-nav-2></header-nav-2>
  <div class="header">
    <bread-crumbs></bread-crumbs>
    <h1>Invoices</h1>
  </div>

  <div class="title">
    <h3>ID</h3>
    <h3>Landlord Name</h3>  
    <h3>Properties</h3>
    <h3>Address</h3>
    <h3>Total Payment</h3>
    <h3>Due Date</h3> 
    <h3>Duration</h3>
    <h3>Status</h3>
    <h3>Action</h3>
  </div>

  <div 
    class="invoiceBox" 
    v-for="invoiceBox in invoiceBoxs" 
    :key="invoiceBox.id" 
    @click="invoicePopup(invoiceBox)"
  >
    <h3>{{ invoiceBox.id }}</h3>
    <h3>{{ invoiceBox.landlordName }}</h3>
    <h3>{{ invoiceBox.properties }}</h3>
    <h3>{{ invoiceBox.address }}</h3>
    <h3 class="totalPayment">{{ invoiceBox.totalPayment }}</h3>
    <h3 class="due-date">{{ invoiceBox.dueDate }}</h3>
    <h3>{{ invoiceBox.duration }}</h3>
    <button :class="['status', invoiceBox.status.toLowerCase()]">{{ invoiceBox.status }}</button>
    <button :class="['actionBtn', invoiceBox.action.toLowerCase().replace(/\s+/g, '')]" @click.stop>
      <Icon :icon="invoiceBox.icon" width="23" height="23" />
      {{invoiceBox.action}}
    </button>
  </div>
  
  
  <!-- Popup Invoice page -->
  <invoiceComponent
    v-if="showCard"
    :invoice="selectedInvoice"
    @close="showCard = false"
  />
  
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import BreadCrumbs from '../components/BreadCrumbs.vue';
import invoiceComponent from '@/components/invoiceComponent.vue';

export default {
  components: {
    HeaderNav2,
    BreadCrumbs,
    invoiceComponent
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
    /* padding: 0px 230px 0px 120px; */
    font-size: 35px;
    font-weight: bolder;
    margin: 20px 0 5px 0;                                                                                                                                                                                                                                                                        
}

/* invoice table */
.title {
  font-weight: bold;
  margin: 0 120px -30px 120px;
  text-align: left;
  display: grid;
  grid-template-columns: 45px 200px 200px 170px 205px 170px 170px 115px 170px;
  align-items: center;
  gap: 40px;
  padding: 10px 30px;
  font-size: 20px;
}

.invoiceBox {
  margin: 20px 120px;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: 60px 170px 200px 280px 145px 150px 210px 100px 155px;
  align-items: center;
  gap: 30px;
  padding: 10px 30px;
  font-size: 20px;
  cursor: pointer;
  /* position: relative; */
}

.invoiceBox:hover {
  background-color: #f8f8f8;
  border: none;
}

/* .invoiceBox:active {
  background-color: #dcebff;
  border: none;
} */

.invoiceBox > h3 {
  font-weight: 500;
  text-align: left;
}

/* Due Date and Payment Color */
.due-date {
  color: #487CFF;
}
.totalPayment {
  color: #2DCF66;
  font-weight: bold;
}

/* Dynamic Status Styles */
.status {
  height: 50px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 10px;
  text-transform: capitalize;
  font-size: 20px;
}
.status.paid {
  color: #319F43;
  border: 1px solid #319F43;
  background-color: rgba(49, 159, 67, 0.1);
}
.status.unpaid {
  color: #F79E1B;
  border: 1px solid #F79E1B;
  background-color: rgba(247, 158, 27, 0.2);
}
.status.expired {
  color: #CD4D4D;
  border: 1px solid #CD4D4D;
  background-color: rgba(205, 77, 77, 0.2);
}

/* Action Button */
.actionBtn {
  height: 50px;
  padding: 5px 15px;
  font-size: 16px;
  background-color: #487CFF;
  color: white;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 20px;
  /* position: absolute;
  right: 2%;
  transition: transform 0.2s ease, box-shadow 0.2s ease; */
}
.actionBtn.paynow{
  background-color: #2d2d2d ;
  color: white;
}

.actionBtn.paynow:hover{
  background-color: #000000;
  color: white;
}
.actionBtn.paynow:active{
  background-color: #b4b4b4;
  color: white;
}

.actionBtn:hover {
  background-color: #134fe7;
  border: none;
  transform: translateY(-4px);
  /* box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); */
}

.actionBtn:active {
  background-color: #aac0ff;
  border: none;
  transform: translateY(-1px);
  /* box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15); */
}
</style>
