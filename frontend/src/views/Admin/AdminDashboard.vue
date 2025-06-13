<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-grid">
      <TotalCard v-for="stat in stats" :key="stat.label" :label="stat.label" :value="stat.value" :icon="stat.icon" :goToPage="{name: stat.route}"/>
    </div>

    <div class="chart-grid">
      <TotalUserChart />
      <TotalPaymentChart />
      <TotalPropertyChart />
      <LocationChart />
    </div>
  </div>
</template>



<script setup>
import TotalCard from '@/components/Admin/TotalCard.vue'
import TotalUserChart from '@/components/Admin/TotalUserChart.vue'
import TotalPaymentChart from '@/components/Admin/TotalPaymentChart.vue'
import TotalPropertyChart from '@/components/Admin/TotalPropertyChart.vue'
import LocationChart from '@/components/Admin/LocationChart.vue'

const stats = [
  { label: 'Total Properties', value: 369, icon: 'solar:home-bold', route: 'Admin Dashboard House' },
  { label: 'Total Landlords', value: 320, icon: 'solar:people-nearby-bold', route: 'Admin Dashboard Landlord' },
  { label: 'Total Tenants', value: 500, icon: 'solar:people-nearby-bold', route: 'Admin Dashboard Tenant' },
]
</script>


<style scoped>
.dashboard-wrapper {
  max-width: 1730px;
  margin: 0 auto;

}

.dashboard-grid {
  padding: 0 24px;
  margin-left: 20%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(268px, 1fr));
  gap: 25px;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 20px;
}

.chart-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding-bottom: 50px;
}
</style>
