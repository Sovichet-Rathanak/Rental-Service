<template>
  <div class="dashboard-grid">
    <TotalCard
      v-for="stat in stats"
      :key="stat.label"
      :label="stat.label"
      :value="stat.value"
      :icon="stat.icon"
    />
  </div>

  <div class="chart-grid">
    <TotalUserChart />
    <TotalPaymentChart />
    <TotalRevenueChart />
    <LocationChart />
  </div>
</template>


<script setup>
import TotalCard from '@/components/Admin/TotalCard.vue'
import TotalUserChart from '@/components/Admin/TotalUserChart.vue'
import TotalPaymentChart from '@/components/Admin/TotalPaymentChart.vue'
import TotalRevenueChart from '@/components/Admin/TotalRevenueChart.vue'
import LocationChart from '@/components/Admin/LocationChart.vue'

const stats = [
  { label: 'Total Houses', value: 369, icon: 'solar:home-bold' },
  { label: 'Total rooms', value: 231, icon: 'mdi:bed' },
  { label: 'Total Landlords', value: 320, icon: 'material-symbols:contacts-product' },
  { label: 'Total Tenants', value: 500, icon: 'material-symbols:contacts-product' },
  { label: 'Total Revenues', value: '610', icon: 'tdesign:location-1-filled' }
]
</script>


<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 15px;
  justify-content: center;
  align-items: center;
  padding: 50px 100px 20px 100px;
}

.chart-grid {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  padding: 0 100px 50px 100px;
  gap: 20px;
}

/* .chart-grid > * {
  flex: 1;
  max-width: 800px;
} */
</style>
