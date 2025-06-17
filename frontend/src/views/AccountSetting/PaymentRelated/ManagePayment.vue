<template>

    <body>
        <header>
            <HeaderNav2></HeaderNav2>
        </header>
        <main>
            <BreadCrumbs></BreadCrumbs>
            <hgroup style="width: 100%;">
                <h1>Your Payment Methods</h1>
                <!-- <h3 style="color:  grey; margin-top: 40px;">Once you have added a payment method, this is where you can
                    come to track and manage it.</h3> -->
                
                <div>
                    <DynamicTable
                      class="payment"
                      :columns="columnsSet1"
                      :rows="dataSet1"
                      :show-status="true"
                      :show-edit="false"
                      @delete-item="handleDeleteItem"
                    />
                </div>
            </hgroup>
        </main>
        <footer>
            <FooterComponent></FooterComponent>
        </footer>
    </body>
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import DynamicTable from '@/components/Admin/DynamicTable.vue';

export default {
    components: {
        HeaderNav2,
        FooterComponent,
        BreadCrumbs,
        DynamicTable
    },
    data() {
    return {
      columnsSet1: [
        { key: "id", label: "ID" },
        { key: "cardNumber", label: "Card Number", type: "" },
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "address", label: "Address" },
        { key: "expiryDate", label: "Date" },
        { key: "cvv", label: "CVV" },
      ],
      dataSet1: [], 
    };
  },
  methods: {
    async fetchPayments() {
      try {
        const response = await fetch("http://localhost:3000/api/payments");
        const payments = await response.json();

        // Map backend data to match columns
        this.dataSet1 = payments.map((payment, index) => ({
          id: index + 1,
          cardNumber: formatCardNumberMasked(payment.cardNumber),
          firstName: payment.firstName,
          lastName: payment.lastName,
          address: payment.streetAddress, // or concatenate other fields if needed
          expiryDate: payment.expiryDate,
          cvv: payment.cvv,
          status: payment.status || "Pending",
          tableName: 'payment'
        }));
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    },

    handleDeleteItem(index) {
      this.dataSet1.splice(index, 1);
    },
  },
  mounted() {
    this.fetchPayments();
  }
}
function formatCardNumberMasked(cardNumber) {
  if (!cardNumber || cardNumber.length < 4) return "**** **** **** ****";
  const last4 = cardNumber.slice(-4);
  return "**** **** **** " + last4;
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
</style>