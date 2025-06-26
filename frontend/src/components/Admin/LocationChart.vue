<template>
    <div class="chart-card">
        <div class="chart-header">
            <Icon icon="mdi:map-marker" class="chart-icon" />
            <span class="chart-title">Locations</span>
        </div>
        <apexchart 
            type="donut" 
            height="240" 
            :options="chartOptions" 
            :series="series" 
        />
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useListingStore } from '@/stores/listing'
import { onMounted, ref, computed } from 'vue'

const listingStore = useListingStore()

onMounted(async () => {
    await listingStore.fetchAllListingsWithImages()
})

// Compute series and labels from the listings data
const chartData = computed(() => {
    if (!listingStore.listings.length) return { counts: [], regions: [] }
    
    // Group listings by region and count them
    const regionCounts = listingStore.listings.reduce((acc, listing) => {
        const regionName = listing.songkat || 'Unknown'
        acc[regionName] = (acc[regionName] || 0) + 1
        return acc
    }, {})
    
    // Sort regions by count (descending) and take top 5
    const sortedRegions = Object.entries(regionCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    
    return {
        counts: sortedRegions.map(item => item[1]),
        regions: sortedRegions.map(item => item[0])
    }
})

const series = computed(() => chartData.value.counts)

const chartOptions = computed(() => ({
    labels: chartData.value.regions,
    colors: ['#00c853', '#3f51b5', '#e91e63', '#ffca28', 
        '#d500f9', '#4caf50', '#2196f3', '#ff5722',
        '#9c27b0', '#009688', '#ff9800', '#795548',
        '#607d8b', '#f44336'],
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
}))
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
