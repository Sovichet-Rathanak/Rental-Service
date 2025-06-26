<template>
    <section class="earning-chart-page">
        <div class="main-content">
            <div class="earning-header">
                <h1>Your Earnings</h1>
                <div class="earning-amount">
                    <span class="amount">${{ monthEarning.toFixed(2) }}</span>
                    <span class="month-text">earned this month</span>
                </div>
            </div>
            <EarningChart @update-month-earning="handleMonthEarningUpdate" />
            <div class="earning-info">
                <h2>Recent Activity</h2>
                <p>This chart reflects your total earnings for the past months based on completed bookings.</p>
                <h2>Payment Status</h2>
                <p>
                    Payments are marked as received after tenants complete their first rental payment.
                    <a href="#" class="payout-link">Learn more about payment processing</a>
                </p>
            </div>
        </div>
        <div class="summary-side">
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import EarningChart from '@/components/Landlord/Landlord-Dashboard/EarningChart.vue'
const monthEarning = ref(0)

function handleMonthEarningUpdate(value) {
  monthEarning.value = value
}
</script>

<style scoped>
.earning-chart-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 50px 0 0 0;
    min-height: 100vh;
    box-sizing: border-box;
}

.main-content {
    flex: 1 1 600px;
    min-width: 350px;
    max-width: 700px;
    justify-content: center;
}

.earning-header {
    margin-bottom: 24px;
}

.earning-header h1 {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 0.2em;
}

.earning-amount {
    display: flex;
    align-items: baseline;
    gap: 10px;
}

.amount {
    font-size: 2.2rem;
    font-weight: bold;
    color: #bdbdbd;
    letter-spacing: 1px;
}

.month-text {
    font-size: 1.3rem;
    color: #222;
    font-weight: 500;
}

.earning-info {
    margin-top: 40px;
}

.earning-info h2 {
    font-size: 1.1rem;
    font-weight: bold;
    margin: 24px 0 6px 0;
}

.payout-link {
    color: #111;
    font-weight: 500;
    text-decoration: underline;
    margin-left: 4px;
}

.summary-side {
    min-width: 300px;
    max-width: 340px;
    margin-top: 40px;
    flex-shrink: 0;
    margin-left: 80px;
}
</style>