<template>
    <div class="mx-auto" style="position:relative;">
        <VueApexCharts type="bar" height="300" width="1000" :options="chartOptions" :series="series" />
    </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
const series = [{
    name: 'Earnings',
    data: [5, 1, 7, 9, 2.5, 5, 7, 2, 4, 7, 3, 5]
}]
const chartOptions = {
    chart: {
        type: 'bar',
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '35%',

            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
            style: {
                colors: '#000',
                fontSize: '12px',
                fontWeight: 400,
                // cssClass: 'apexcharts-xaxis-label'
            }
        }
    },
    yaxis: {
        tickAmount: 7,
        labels: {
            formatter: val => `$${val.toFixed(2)}`
        }
    },

    colors: ['#0f172a'],
}
</script>

<style scoped></style>