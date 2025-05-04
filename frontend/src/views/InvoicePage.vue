<template>
    <header-nav-2></header-nav-2>
    <div class="navheader">
        <span>Account</span>
        <Icon icon="iconamoon:arrow-right-2-light" width="34" height="34" />
        <span>Invoices</span>
    </div>
    <h2>Invoices</h2>

    <!-- table -->
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

    <div class="invoiceBox" v-for="invoiceBox in invoiceBoxs" :key="invoiceBox.id">
        <h3>{{ invoiceBox.id }}</h3>
        <h3>{{ invoiceBox.landlordName }}</h3>
        <h3>{{ invoiceBox.properties }}</h3>
        <h3>{{ invoiceBox.address }}</h3>
        <h3 class="totalPayment">{{ invoiceBox.totalPayment }}</h3>
        <h3 class="due-date">{{ invoiceBox.dueDate }}</h3>
        <h3>{{ invoiceBox.duration }}</h3>
        <button :class="['status', invoiceBox.status.toLowerCase()]">{{ invoiceBox.status }}</button>
        <button class="actionBtn">
            <Icon icon="mi:share" width="23" height="23" />
            {{invoiceBox.action}}
        </button>

    </div>
    <invoice></invoice>
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';

export default {
    components: {
        HeaderNav2,
    },

    data() {
      return {
      invoiceBoxs: [
        { 
            id: 1, 
            landlordName: 'Shen Yue', 
            properties: 'A-001 (Brat Villa)' ,
            address: 'BKK1, Chamkarmon, Phnom Penh',
            totalPayment: '$500',
            dueDate: '14-Oct-2025',
            duration: '1 May - 1 June 2026',
            status: 'Paid',
            action: 'Download PDF'
        }, 
        
        { 
            id: 1, 
            landlordName: 'Shen Yue', 
            properties: 'A-001 (Brat Villa)' ,
            address: 'BKK1, Chamkarmon, Phnom Penh',
            totalPayment: '$500',
            dueDate: '14-Oct-2025',
            duration: '1 May - 1 June 2026',
            status: 'Unpaid',
            action: 'Download PDF'
        }, 

        { 
            id: 1, 
            landlordName: 'Shen Yue', 
            properties: 'A-001 (Brat Villa)' ,
            address: 'BKK1, Chamkarmon, Phnom Penh',
            totalPayment: '$500',
            dueDate: '14-Oct-2025',
            duration: '1 May - 1 June 2026',
            status: 'Expired',
            action: 'Downloaded'
        }, 
      ]
    };
  }
}
</script>

<style scoped>

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

h2 {
    padding: 0px 230px 0px 120px;
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
  /*box-shadow: 0 2px 5px rgba(0,0,0,0.1);*/
  display: grid;
  grid-template-columns: 60px 170px 200px 280px 145px 150px 210px 100px 190px;
  align-items: center;
  gap: 30px;
  padding: 10px 30px;
  font-size: 20px;
  cursor: pointer;
}

/* .invoiceBox:hover {
  background-color: #f8f8f8;
  border: none;
} */

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
  width: auto;
  padding: 5px 10px;
  font-size: 16px;
  background-color: #487CFF;
  color: white;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 20px;
}

.actionBtn:hover {
  background-color: #1759ff;
}
</style>
