<template>
  <div :class="['invoiceBox', { withTenant: showTenantName }]">
    <h3>{{ invoiceBox.id }}</h3>
    <h3>{{ invoiceBox.landlordName }}</h3>
    <h3 v-if="showTenantName">{{ invoiceBox.tenantName }}</h3>
    <h3>{{ invoiceBox.properties }}</h3>
    <h3>{{ invoiceBox.address }}</h3>
    <h3 class="totalPayment">{{ invoiceBox.totalPayment }}</h3>
    <h3 class="due-date">{{ invoiceBox.dueDate }}</h3>
    <h3>{{ invoiceBox.duration }}</h3>
    <button :class="['status', invoiceBox.status.toLowerCase()]">{{ invoiceBox.status }}</button>
    <button :class="['actionBtn', invoiceBox.action.toLowerCase().replace(/\s+/g, '')]" @click.stop>
      <Icon :icon="invoiceBox.icon" width="23" height="23" />
      {{ invoiceBox.action }}
    </button>
  </div>
</template>


<script>
export default {
  props: {
    invoiceBox: {
      type: Object,
      required: true
    },
    showTenantName: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped>
.invoiceBox {
  margin: 20px 120px;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: grid;
  align-items: center;
  gap: 30px;
  padding: 10px 30px;
  font-size: 20px;
  cursor: pointer;

  /* Wthout Tenant */
  grid-template-columns: 60px 170px 200px 280px 145px 150px 210px 100px 155px;
}

.invoiceBox.withTenant {
  grid-template-columns: 60px 170px 170px 200px 280px 145px 150px 210px 100px 155px;
}


.invoiceBox:hover {
  background-color: #f8f8f8;
  border: none;
}

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
}
.actionBtn.paynow{
  background-color: #535353 ;
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
}

.actionBtn:active {
  background-color: #aac0ff;
  border: none;
}
</style>