import axios from "axios";
import qs from 'qs';
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

        async fetchListingImagesById(id) {
            try {
                const imageRsp = await axios.get(`http://localhost:3000/api/picture/${id}`)
                console.log("IMAGE RSP: ", imageRsp)
                const listingImageData = imageRsp.data;
                return listingImageData;
            } catch (error) {
                console.error(error);
            }
        },

        getThumbnailByIndex(index) {
            const images = this.listingImages[index];
            if (!images || images.length === 0) return '';

            const thumbImage = images.find(img => img.isThumbnail);
            const imageToUse = thumbImage || images[0];

            const key = imageToUse.isThumbnail ? imageToUse.thumbnail_url : `original/${imageToUse.original_url}`;
            return `http://localhost:9000/romdoul/${key}`;
        },

        async getListingById(id) {
            try {
                const foundLisitng = await axios.get(`http://localhost:3000/api/listing/${id}`);
                const foundListingData = foundLisitng.data;
                return foundListingData;
            } catch (error) {
                console.error(error)
            }
        },

        //ERROR
        async fetchFilteredListing(params) {
            try {
                console.log('Sending filter params:', params);
                const processedParams = {};

                Object.keys(params).forEach(key => {
                    if (Array.isArray(params[key]) && params[key].length > 0) {
                        processedParams[key] = params[key];
                    } else if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
                        processedParams[key] = params[key];
                    }
                });

                console.log('Processed params for URL:', processedParams);

                const response = await axios.get('http://localhost:3000/api/listing/filter/', {
                    params: processedParams,
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
                });

                this.listings = response.data;
                console.log('Filtered listings received:', this.listings.length, 'items');
            } catch (error) {
                console.error('Failed to fetch filtered listings:', error.response?.data || error.message);
                this.listings = [];
            }
        }
    },

    persist: true
},
)

