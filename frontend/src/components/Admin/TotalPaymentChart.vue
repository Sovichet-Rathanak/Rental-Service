<template>
    <div class="payment-chart-card">
        <div class="chart-header">
            <span class="chart-title">
                <Icon icon="mdi:credit-card-outline" class="chart-icon" />
                Total Payments
            </span>
        </div>
        <div class="totals-row">
            <div class="total-block">
                <div class="total-label">Total payment</div>
                <div class="total-amount expected">$<span>{{ totalExpected }}</span></div>
            </div>
            <div class="total-block">
                <div class="total-label">Total Paid</div>
                <div class="total-amount received">$<span>{{ totalReceived }}</span></div>
            </div>
            <div class="legend-block">
                <div class="legend-item">
                    <span class="legend-dot expected"></span>
                    <span>Expected payment</span>
                </div>
                <div class="legend-item">
                    <span class="legend-dot received"></span>
                    <span>Received payment</span>
                </div>
            </div>
        </div>
        <apexchart type="bar" height="260" width="1000" :options="chartOptions" :series="series" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'

const months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December'
]

const series = ref([
    {
        name: 'Expected payment',
        data: Array(12).fill(0),
        color: '#8e24aa' // Purple
    },
    {
        name: 'Received payment',
        data: Array(12).fill(0),
        color: '#00c853' // Green
    }
])

const totalExpected = ref(0)
const totalReceived = ref(0)

const chartOptions = {
    chart: {
        stacked: false,
        toolbar: { show: false }
    },
    xaxis: {
        categories: months,
        labels: {
            style: {
                fontSize: '12px',
                colors: '#222'
            }
        }
    },
    yaxis: {
        title: {
            text: '$ (USD)'
        },
        labels: {
            formatter: val => `$${val}`
        }
    },
    legend: { show: false },
    tooltip: {
        y: {
            formatter: val => `$${val}`
        }
    }
}

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/payments/summary/monthly')

        const data = response.data

        const expectedByMonth = Array(12).fill(0)
        const receivedByMonth = Array(12).fill(0)

        data.forEach(item => {
            const [year, month] = item.month.split('-')
            const index = parseInt(month) - 1
            expectedByMonth[index] = parseFloat(item.expected)
            receivedByMonth[index] = parseFloat(item.received)
        })

        series.value[0].data = expectedByMonth
        series.value[1].data = receivedByMonth

        totalExpected.value = expectedByMonth.reduce((a, b) => a + b, 0)
        totalReceived.value = receivedByMonth.reduce((a, b) => a + b, 0)
    } catch (error) {
        console.error('Error loading payment summary:', error)
    }
})
</script>

<style scoped>
.payment-chart-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 16px 0px 8px 0px;
    width: 1215px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chart-header {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 6px;

}

.chart-title {
    font-size: 1.08rem;
    font-weight: 600;
    color: #222;
    display: flex;
    align-items: center;
    margin-left: 20px;
}

.chart-icon {
    font-size: 1.2rem;
    margin-right: 6px;
}

.totals-row {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 60px;
    margin-bottom: 8px;
    margin-left: 10px;
}

.total-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 120px;
}

.total-label {
    font-size: 1rem;
    color: #222;
    font-weight: 500;
    margin: 10px 30px 0px 30px;
}

.total-amount {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 10px 30px 5px 30px;
}

.total-amount.expected {
    color: #8e24aa;
}

.total-amount.received {
    color: #00c853;
}

.legend-block {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-left: 40px;
}

.legend-item {
    display: flex;
    align-items: center;
    font-size: 0.97rem;
    color: #444;
    font-weight: 500;
    gap: 6px;
}

.legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 4px;
}

.legend-dot.expected {
    background: #8e24aa;
}

.legend-dot.received {
    background: #00c853;
}
</style>
