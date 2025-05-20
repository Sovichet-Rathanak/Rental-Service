<template>
    <section class="earning-chart-page">
        <div class="main-content">
            <div class="earning-header">
                <h1>You've made</h1>
                <div class="earning-amount">
                    <span class="amount">${{ monthEarning.toFixed(2) }}</span>
                    <span class="month-text">this month</span>
                </div>
            </div>
            <EarningChart />
            <div class="earning-info">
                <h2>Upcoming</h2>
                <p>No upcoming reservations at the moment.</p>
                <h2>Paid</h2>
                <p>
                    Payouts are sent after guests check in.
                    <a href="#" class="payout-link">Learn how payouts work</a>
                </p>
            </div>
        </div>
        <div class="summary-side">
            <YearToDateSummary :summary="summaryData" />
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import EarningChart from '@/components/landlordChart/EarningChart.vue'
import YearToDateSummary from '@/components/landlordChart/YearToDateSummary.vue'

const monthEarning = ref(5.00)
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
    min-width: 340px;
    max-width: 370px;
    margin-top: 40px;
    flex-shrink: 0;
    margin-left: 400px;
}
</style>