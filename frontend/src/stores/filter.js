import { defineStore } from "pinia";

export const useFilterStore = defineStore('filter', {
    state: () => ({
        regions: [],
        guests: null,
        furnishing: null,
        minMonthlyPrice: null,
        maxMonthlyPrice: null,
        selectedRegions: [],
    }),

    getters: {
        asQueryParams(state) {
            const params = {};

            if (state.regions && state.regions.length > 0) {
                params.regions = [...state.regions];
            }

            if (state.guests && state.guests > 0) {
                params.guests = state.guests;
            }

            if (state.furnishing === 'true' || state.furnishing === 'false') {
                params.furnishing = state.furnishing;
            }

            if (state.minMonthlyPrice && state.minMonthlyPrice > 0) {
                params.minMonthlyPrice = state.minMonthlyPrice;
            }

            if (state.maxMonthlyPrice && state.maxMonthlyPrice > 0) {
                params.maxMonthlyPrice = state.maxMonthlyPrice;
            }

            console.log('Filter params:', params);
            return params;
        }
    },

    actions: {
        resetFilter() {
            this.regions = [],
                this.guests = null,
                this.furnishing = null,
                this.minMonthlyPrice = null,
                this.maxMonthlyPrice = null
        }
    }
})