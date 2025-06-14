import axios from "axios";
import { defineStore } from "pinia";

export const useListingStore = defineStore('listing', {
    state: () => ({
        listingForm: {
            property_type: '',
            region: '',
            region_id: '',
            street_address: '',
            songkat: '',
            guests: 1,
            bedrooms: 1,
            bathrooms: 1,
            furnishing: false,
            amenities: [],
            title: '',
            description: '',
            price_monthly: 0,
            price_yearly: 0,
        },
        regionOptions: [],
        amenitiesOptions: [],
        listings: [],
        listingImages: []
    }),

    actions: {
        updateField(key, value) {
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
                title: '',
                description: '',
                price_monthly: 0,
                price_yearly: 0
            }
        },

        async fetchRegion() {
            try {
                const regionRsp = await axios.get('http://localhost:3000/api/region');
                this.regionOptions = regionRsp.data;
                console.log('Fetched region options:', this.regionOptions);
            } catch (error) {
                console.error('Failed to fetch region', error);
            }
        },

        async fetchAmenities() {
            try {
                const amenitiesRsp = await axios.get('http://localhost:3000/api/amenity')
                this.amenitiesOptions = amenitiesRsp.data;
                console.log('Fetched amenities options:', this.amenitiesOptions);
            } catch (error) {
                console.error('Failed to fetch amenities', error)
            }
        },

        async fetchAllListingsWithImages() {
            try {
                const propertyData = await axios.get('http://localhost:3000/api/listing/');
                this.listings = propertyData.data;

                const imageFetches = this.listings.map((listing) =>
                    axios.get(`http://localhost:3000/api/picture/${listing.id}`).then(res => res.data)
                );

                this.listingImages = await Promise.all(imageFetches);
            } catch (error) {
                console.error('Failed to fetch listings/images:', error);
            }
        },

        getThumbnailByIndex(index) {
            const images = this.listingImages[index];
            if (!images || images.length === 0) return '';

            const thumbImage = images.find(img => img.isThumbnail);
            const imageToUse = thumbImage || images[0]; 

            const key = imageToUse.isThumbnail ? imageToUse.thumbnail_url : `original/${imageToUse.original_url}`;
            return `http://localhost:9000/romdoul/${key}`;
        }

    },

    persist: true
},
)

