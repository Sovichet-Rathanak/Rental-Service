import { defineStore } from "pinia";

export const useListingStore = defineStore('listing', {
    state: () => ({
        listingForm: {
            property_type: '',
            region_id: '',
            street_address: '',
            songkat: '',
            guests: 1,
            bedrooms: 1,
            bathrooms: 1,
            furnishing: false,
            amenities: [],
            pictures: [],
            title: '',
            description: '',
            price_monthly: 0,
            price_yearly: 0
        }
    }),

    actions: {
        updateField(key, value){
            this.listingForm[key] = value;
        },
        
        resetListingForm() {
            this.listingForm = {
                property_type: '',
                region_id: '',
                street_address: '',
                songkat: '',
                guests: 1,
                bedrooms: 1,
                bathrooms: 1,
                furnishing: false,
                amenities: [],
                pictures: [],
                title: '',
                description: '',
                price_monthly: 0,
                price_yearly: 0
            }
        }
    },

    persist: true
},
)

