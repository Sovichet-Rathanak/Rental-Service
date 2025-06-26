<template>
    <div class="container">
        <header>
            <HeaderNav2></HeaderNav2>
        </header>
        <main>
            <BreadCrumbs></BreadCrumbs>
            <hgroup style="width: 100%;">
                <h1>Your Payment Methods</h1>               
                <div class="paymentInfo-table">
                    <DynamicTable
                      class="paymentInfo"
                      :columns="columnsSet1"
                      :rows="dataSet1"
                      :show-status="false"
                      :show-edit="false"
                      @delete-item="handleDeleteItem"
                    />
                </div>

                <!-- Make Payment Button -->
                <div class="make-payment-btn">
                  <button @click="openPaymentPopup">Make Payment</button>
                </div>

            </hgroup>
        </main>
        <footer>
            <FooterComponent></FooterComponent>
        </footer>

        <!--  Payment Popup Component -->
        <PaymentPopup
          v-if="showPopup"
          :bookingId="selectedBookingId"
          :listingId="selectedListingId"
          @close="showPopup = false"
        />
        <p v-if="showPopup">DEBUG: showPopup is TRUE</p>


    </div>
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import DynamicTable from '@/components/Admin/DynamicTable.vue';

import PaymentPopup from '@/components/payment/PaymentPopup.vue';

export default {
    components: {
        HeaderNav2,
        FooterComponent,
        BreadCrumbs,
        DynamicTable,
        PaymentPopup
    },
    data() {
    return {

      showPopup: false,
      selectedBookingId: 'ba0d3551-7653-47a9-bb93-f16ad208019e',  // Replace with real ID if available
      selectedListingId: '31fc8b4a2-cdb6-4d1e-9615-68c15b625cda',  // Replace with real ID if available
      
      columnsSet1: [
        { key: "id", label: "ID" },
        { key: "cardNumber", label: "Card Number" },
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
      ],
      dataSet1: [], 
    };
  },
  methods: {
    formatCardNumberMasked(cardNumber) {
      if (!cardNumber || cardNumber.length < 4) return "**** **** **** ****";
      const last4 = cardNumber.slice(-4);
      return "**** **** **** " + last4;
    },
    async fetchPayments() {
      try {
        const response = await fetch("http://localhost:3000/api/payments-info");
        if (!response.ok) throw new Error('Network response was not ok');
        const payments = await response.json();

        this.dataSet1 = payments.map((payment) => ({
          id: payment.id,
          cardNumber: this.formatCardNumberMasked(payment.cardNumber),
          firstName: payment.firstName || '',
          lastName: payment.lastName || '',
          tableName: 'payment'
        }));
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    },
    async handleDeleteItem(index) {
      const itemToDelete = this.dataSet1[index];
      try {
        const response = await fetch(`http://localhost:3000/api/payments-info/${itemToDelete.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete from backend');
        }
        this.dataSet1.splice(index, 1); // frontend update
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete payment. Please try again.");
      }
    }, 
    //  Open popup
    openPaymentPopup() {
      // TODO: Replace with dynamic IDs if available
      this.selectedBookingId = 'ba0d3551-7653-47a9-bb93-f16ad208019e'; 
      this.selectedListingId = '3251d625-bc63-40af-8332-97f15b290cd3';
      this.showPopup = true;
    } 
  },
  mounted() {
    this.fetchPayments();
  }
}
</script>

<style scoped>
header {
    margin: 30px 0px;
}

main {
    padding-inline: 300px;
    display: flex;
    flex-direction: column;
    align-items: start;
}

.paymentInfo-table {
    margin-top: 40px;
}
</style>