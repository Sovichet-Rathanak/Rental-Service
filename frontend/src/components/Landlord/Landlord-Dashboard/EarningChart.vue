<template>
    <div class="mx-auto" style="position:relative;">
        <VueApexCharts type="bar" height="300" width="1000" :options="chartOptions" :series="series" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VueApexCharts from "vue3-apexcharts"
import axios from 'axios'

// Emit earnings for current month
const emit = defineEmits(['update-month-earning'])

const series = ref([
  {
    name: 'Earnings',
    data: Array(12).fill(0)
  }
])

const chartOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      columnWidth: '35%',
      endingShape: 'rounded'
    }
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: {
      style: {
        colors: '#000',
        fontSize: '12px',
        fontWeight: 400,
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

// Fetch from backend
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/payments/summary/monthly')
    const backendData = res.data

    const earnings = Array(12).fill(0)

    backendData.forEach(item => {
      const [year, month] = item.month.split('-') // "2025-06"
      const index = parseInt(month) - 1
      earnings[index] = parseFloat(item.received)
    })

    series.value[0].data = earnings

    // Emit current month's earning to parent
    const currentMonthIndex = new Date().getMonth()
    emit('update-month-earning', earnings[currentMonthIndex] || 0)

  } catch (err) {
    console.error('Failed to load earnings chart:', err)
  }
})
</script>
<style scoped></style>