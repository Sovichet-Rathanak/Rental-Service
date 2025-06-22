<template>
    <div class="chart-card">
        <div class="chart-header">
            <Icon icon="mdi:map-marker" class="chart-icon" />
            <span class="chart-title">Locations</span>
        </div>
        <apexchart type="donut" height="240" :options="chartOptions" :series="series" />
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const series = [300, 250, 100, 80, 70];

const chartOptions = {
    labels: ['BKK', 'Toul Kork', 'Duan Penh', 'Sen Sok', 'Mean Chey'],
    colors: ['#00c853', '#3f51b5', '#e91e63', '#ffca28', '#d500f9'],
    legend: {
        position: 'right',
        fontSize: '13px',
        markers: { radius: 6 }
    },
    dataLabels: { enabled: false },
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
                labels: {
                    show: true,
                    total: {
                        show: true,
                        label: 'Location',
                        fontSize: '16px',
                        color: '#333'
                    }
                }
            }
        }
    },
    tooltip: {
        y: {
            formatter: val => `${val} properties`
        }
    }
}
</script>

<style scoped>
.chart-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 20px 10px 10px 0px;
    width: 100%;
    max-width: 505px;
}

.chart-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.chart-icon {
    font-size: 1.4rem;
    margin-right: 8px;
    color: #000;
}

.chart-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #222;
}
</style>
