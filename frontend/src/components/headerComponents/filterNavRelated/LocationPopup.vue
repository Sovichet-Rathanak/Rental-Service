<template>
    <div class="common-popup location-popup" :class="{ showPopup: visible }">
        <h3 class="popup-title">Search For Your Preferred Location</h3>
        <input v-model="searchQuery" class="location-input" type="text"
            placeholder="Toul Kork, Boeng Keng Kang, etc." />
        <div class="location-header">
            <hgroup>
                <h3 class="location-title">Locations</h3>
                <h5 class="location-subtitle">Select Your Preferred Locations</h5>
            </hgroup>
            <button class="clear-button" @click="clearSelect">Clear Selection</button>
        </div>
        <div class="region">
            <div class="sangkat">
                <div class="sangkat-children" v-for="(item, index) in filteredRegions" :key="item.id || index"
                    @click="toggleSangkat(item.id || item.region_name)"
                    :class="{ sangkatChildrenActive: selectedSangkats.includes(item.id || item.region_name) }">
                    <Icon icon="solar:city-bold-duotone" width="20" height="20"
                        :style="{ color: selectedSangkats.includes(item.id || item.region_name) ? '#fff' : '#000' }" />
                    {{ item.region_name }}
                </div>
                <p v-if="filteredRegions.length === 0" class="no-result">No matching locations found.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useFilterStore } from '@/stores/filter';
import { useListingStore } from '@/stores/listing';
import { mapState, mapStores, mapWritableState } from 'pinia';

export default {
    name: "LocationPopup",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        region: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedSangkats: [],
            searchQuery: "",
        };
    },
    computed: {
        filteredRegions() {
            //if search query is empty return all regions
            if (!this.searchQuery.trim()){
                return this.region;
            }

            const query = this.searchQuery.toLowerCase();
            return this.region.filter((reg) => reg.region_name.toLowerCase().includes(query)); //see if any region mactches the query
        },
        ...mapWritableState(useFilterStore, ['selectedRegions'])
    },
    methods: {
        toggleSangkat(uniqueId) {
            if (this.selectedSangkats.includes(uniqueId)) {
                this.selectedSangkats = this.selectedSangkats.filter((s) => s !== uniqueId);
            } else {
                this.selectedSangkats.push(uniqueId);
            }

            console.log('SETTING SELECTED REGIONS')
            this.selectedRegions = this.selectedSangkats
            console.log('VALUE FROM STORE AFTER SELECTED')
            console.log(this.selectedRegions)

            this.$emit("toggle-sangkat", this.selectedSangkats);
            console.log(this.selectedSangkats)
        },
        clearSelect() {
            this.selectedSangkats = [];
            this.$emit("toggle-sangkat", []);
        },
    },
};
</script>

<style scoped>
.location-popup {
    width: 40%;
    height: 400px;
    left: 0;
}

.popup-title {
    margin: 10px 0px;
}

.common-popup {
    position: absolute;
    display: none;
    z-index: 1000;
    top: 120px;
    background-color: white;
    border-radius: 24px;
    flex-direction: column;
    align-items: start;
    padding: 30px 40px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2), 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.location-input {
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    padding: 5px 15px;
    font-size: 16px;
    border-radius: 12px;
    margin-bottom: 20px;
}

.location-input:focus {
    outline: none;
    border: 2px solid #0026FF;
    box-shadow: 0 0 0 2px rgba(0, 38, 255, 0.1);
}

.location-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
}

.clear-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.location-title {
    margin: 0px;
}

.location-subtitle {
    margin: 0px;
    color: grey;
}

.sangkat {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
}

.sangkat-children {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: fit-content;
    border: 1px solid black;
    padding: 10px 16px;
    font-weight: bold;
    border-radius: 9px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    user-select: none;
}

.sangkatChildrenActive {
    background-color: #0026ffc2;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.2), 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>