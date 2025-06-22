<template>
    <div class="container">
        <v-calendar 
            @dayclick="onDayClick" 
            :attributes="attributes" 
            title-position="left" 
            expanded 
            :rows="2" 
        />
    </div>
    <paymentOverview :showPayment="togglePaymentPop" @close="handlePayment"></paymentOverview>
</template>

<script>
import HeaderNav3 from '@/components/Landlord/HeaderNav3.vue';
import paymentOverview from '@/components/bannerComponents/landlord/paymentOverview.vue';
import { ref, computed } from 'vue';

export default {
    name: "calendar-page",
    components: {
        HeaderNav3,
        paymentOverview
    },
    data() {
        return {
            togglePaymentPop: false,
            paymentDate: new Date(2025, 4, 16)  
        };
    },
    setup() {
        const attributes = computed(() => [
            {
                key: 'today',
                highlight: { contentClass: 'highlight-today' },
                dates: new Date()
            },
            {
                key: 'payment',
                highlight: { contentClass: 'highlight-payment' },
                dates: new Date(2025, 5, 28),
            }
        ]);

        return {
            attributes,
        };
    },
    methods: {
        handlePayment() {
            this.togglePaymentPop = false;
        },
        onDayClick(day) {
            const clickedDate = new Date(day.date);
            if (
                clickedDate.getFullYear() === this.paymentDate.getFullYear() &&
                clickedDate.getMonth() === this.paymentDate.getMonth() &&
                clickedDate.getDate() === this.paymentDate.getDate()
            ) {
                this.togglePaymentPop = true;
            } else {
                this.togglePaymentPop = false;
            }
        }
    }
}
</script>


<style scoped>
.container{
    box-sizing: border-box;
    width: 100%;
    margin: 3% 0px;
    padding-inline: 200px;
}
::v-deep(.vc-day-content){
    font-size: 25px !important;
    font-family:  'Airbnb Font';
    padding: 40px !important;
}
::v-deep(.vc-title){
    margin-left: 50px !important;
    margin-top: 15px !important;
    font-size: 30px !important;
    font-family:  'Airbnb Font';
    background-color: transparent;
}
::v-deep(.vc-weekday){
    padding: 50px;
}
::v-deep(.highlight-today){
    padding: 40px !important;
    background-color: #3B82F6 !important;
}
::v-deep(.highlight-payment){
    padding: 40px !important;
    background-color: green !important;
}
</style>