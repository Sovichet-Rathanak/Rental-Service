import { defineStore } from "pinia";
import axios from "axios";

export const useReviewStore = defineStore('review', {
    state: () => ({
        reviews: [], 
        loading: false,
        error: null,
        overall: null, //Add this to store overall summary
    }),

    actions: {
        async fetchReviewsByListingId(listingId) {
            this.loading = true;
            this.error = null;
            try {
                const res = await axios.get(`http://localhost:3000/api/reviews/listing/${listingId}`);
                this.reviews = res.data;
            } catch (err) {
                console.error('Error fetching reviews:', err);
                this.error = 'Failed to load reviews';
            } finally {
                this.loading = false;
            }
        },

        async createReview(payload) {
            this.loading = true;
            this.error = null;
            try {
                // Ensure payload matches backend DTO
                // payload should have: priceRating, comfortRating, locationRating, cleanlinessRating, communicationRating, comment, user, listing
                const res = await axios.post(`http://localhost:3000/api/reviews`, payload);
                console.log('Review submitted:', res.data);
                if (payload.listing) {
                    await this.fetchReviewsByListingId(payload.listing);
                }
            } catch (err) {
                // Show backend error message if available
                if (err.response && err.response.data && err.response.data.message) {
                    this.error = Array.isArray(err.response.data.message)
                        ? err.response.data.message.join(', ')
                        : err.response.data.message;
                } else {
                    this.error = 'Failed to submit review';
                }
                console.error('Error submitting review:', err);
            } finally {
                this.loading = false;
            }
        },
    
        async fetchOverallRating(listingId) {
            try {
                const res = await axios.get(`http://localhost:3000/api/reviews/overall/${listingId}`);
                this.overall = res.data;
            } catch (err) {
                console.error('Error fetching overall rating:', err);
                this.error = 'Failed to load overall rating';
            }
        },
    },

    persist: true
});
