<template>
  <div class="chart-card">
    <div class="chart-header">
      <Icon icon="mdi:account" class="chart-icon" />
      <span class="chart-title">Total Users</span>
    </div>

    <div class="legend-list">
      <div
        v-for="(label, i) in chartOptions.labels"
        :key="label"
        class="legend-item"
      >
        <span
          class="legend-dot"
          :style="{ background: chartOptions.colors[i] }"
        />
        {{ label }} - {{ series[i] }}
      </div>
    </div>

    <apexchart type="donut" :options="chartOptions" :series="series" width="220" />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const series = [250, 32]

const chartOptions = {
    labels: ['Tenant', 'Landlord'],
    colors: ['#e63946', '#3b5bdb'],
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
                labels: {
                    show: true,
                    total: {
                        show: true,
                        label: 'Total',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#222',
                        formatter: () => series.reduce((a, b) => a + b, 0),
                    }
                }
            }
        }
    },
    stroke: { width: 0 },
    tooltip: { enabled: true }
}
</script>

<style scoped>
.chart-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 16px 12px 8px;
    width: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chart-header {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
}

.chart-title {
    font-size: 1.08rem;
    font-weight: 600;
    color: #222;
}

.chart-icon {
    font-size: 1.2rem;
    margin-right: 6px;
}

.legend-list {
    display: flex-row;
    gap: 16px;
    margin: 4px 0;
}

.legend-item {
    display: flex;
    align-items: center;
    font-size: 0.97rem;
    color: #444;
    font-weight: 500;
}

.legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
}
</style>
