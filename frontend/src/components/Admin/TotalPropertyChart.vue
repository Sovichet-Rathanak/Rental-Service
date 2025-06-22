<template>
  <div class="chart-card">
    <div class="chart-header">
      <Icon icon="mdi:location-city" class="chart-icon" />
      <span class="chart-title">Total Properties</span>
    </div>
    <apexchart 
      type="bar" 
      height="260"
      :options="chartOptions" 
      :series="series" 
    />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import { useListingStore } from '@/stores/listing'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Icon },
  data() {
    return {
      series: [
        {
          name: 'Properties',
          data: [1, 6, 7, 9, 10] // Initial placeholder values
        }
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          toolbar: { show: false }
        },
        colors: ['#7b1fa2'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '40%',
            borderRadius: 6
          }
        },
        dataLabels: { enabled: false },
        xaxis: {
          categories: ['House', 'Villa', 'Borey', 'Traditional House', 'Apartment'],
          labels: {
            style: { fontSize: '12px', colors: '#444' }
          }
        },
        yaxis: {
          title: {
            text: '',
            style: { fontSize: '12px', color: '#555' }
          }
        },
        legend: { show: false },
        tooltip: {
          y: { formatter: val => `${val}` }
        },
        grid: {
          borderColor: '#eee',
          strokeDashArray: 5
        }
      }
    };
  },
  async mounted() {
    const listingStore = useListingStore();
    await listingStore.fetchAllListingsWithImages();

    const types = ['House', 'Villa', 'Borey', 'Traditional House', 'Apartment'];
    const counts = types.map(type => listingStore.listings.filter(l => l.property_type === type).length);

    this.series[0].data = counts;
  }
});
</script>



<style scoped>
.chart-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 20px;
  width: 100%;
  max-width: 1100px;
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
