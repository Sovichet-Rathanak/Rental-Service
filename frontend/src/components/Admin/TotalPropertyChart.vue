<template>
  <div class="chart-card">
    <div class="chart-header">
      <Icon icon="mdi:location-city" class="chart-icon" />
      <span class="chart-title">Total Properties</span>
    </div>
    <div v-if="loading" class="loading-message">Loading data...</div>
    <apexchart 
      v-else
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

export default {
  components: { Icon },
  data() {
    return {
      loading: true,
      propertyTypes: ['House', 'Villa', 'Borey', 'Traditional House', 'Apartment'],
      series: [{
        name: 'Properties',
        data: []
      }],
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
          categories: [],
          labels: {
            style: { fontSize: '12px', colors: '#444' }
          }
        },
        yaxis: {
          min: 0,
          forceNiceScale: true,
          title: {
            text: 'Number of Properties',
            style: { fontSize: '12px', color: '#555' }
          }
        },
        legend: { show: false },
        tooltip: {
          y: { 
            formatter: (val) => `${val} ${val === 1 ? 'property' : 'properties'}` 
          }
        },
        grid: {
          borderColor: '#eee',
          strokeDashArray: 5
        }
      }
    }
  },
  async mounted() {
    const listingStore = useListingStore()
    
    try {
      await listingStore.fetchAllListingsWithImages()
      this.updateChartData(listingStore.listings)
    } catch (error) {
      console.error('Failed to load listing data:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    updateChartData(listings) {
      // Count properties by type
      const counts = this.propertyTypes.map(type => {
        return listings.filter(listing => 
          listing.property_type && 
          listing.property_type.toLowerCase() === type.toLowerCase()
        ).length
      })
      
      // Update chart data
      this.series[0].data = counts
      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: this.propertyTypes
        }
      }
      
      console.log('Property counts:', counts)
      console.log('Listings data:', listings.map(l => ({
        id: l.id,
        type: l.property_type
      })))
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
