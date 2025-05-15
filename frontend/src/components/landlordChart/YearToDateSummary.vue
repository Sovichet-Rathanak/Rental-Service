<template>
    <div class="summary-card">
        <div class="summary-title">Year-to-date summary</div>
        <div class="summary-date">{{ summary.dateRange }}</div>
        <div class="summary-row" v-for="item in summary.items" :key="item.label">
            <span>{{ item.label }}</span>
            <span>${{ item.value.toFixed(2) }}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total (USD)</span>
            <span>${{ summary.total.toFixed(2) }}</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    summary: {
        type: Object,
        required: true,
        default: () => ({
            dateRange: 'Jan 1 - Mar 2, 2025',
            items: [
                { label: 'Gross earnings', value: 20 },
                { label: 'Adjustments', value: 30 },
                { label: 'Service fee', value: 0 },
                { label: 'Tax withheld', value: 0 }
            ],
            total: 50
        })
    }
})
</script>

<style scoped>
.summary-card {
    border: 1px solid #d1d5db;
    border-radius: 16px;
    padding: 24px;
    background: #fff;
    width: 320px;
    font-family: inherit;
}

.summary-title {
    font-weight: bold;
    font-size: 1.15rem;
    margin-bottom: 4px;
}

.summary-date {
    color: #555;
    font-size: 0.95rem;
    margin-bottom: 16px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 1rem;
}

.summary-total {
    border-top: 1px solid #eee;
    margin-top: 12px;
    padding-top: 10px;
    font-weight: bold;
}
</style>