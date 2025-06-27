import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./user";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    items: [],
  }),

  actions: {
    async fetchWishlist() {
      try {
        const userStore = useUserStore();
        if (!userStore.user.id) return;

        const res = await axios.get(
          `http://localhost:3000/api/wishlist/user/${userStore.user.id}`
        );
        this.items = res.data;
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    },

    async addToWishlist(listing) {
      try {
        const userStore = useUserStore();
        const payload = {
          userId: userStore.user.id,
          listingId: listing.id,
        };

        const res = await axios.post(
          'http://localhost:3000/api/wishlist',
          payload
        );
        this.items.push(res.data); 
      } catch (err) {
        console.error("Error adding to wishlist:", err);
      }
    },

    async removeFromWishlist(listingId) {
      try {
        const userStore = useUserStore();
        const target = this.items.find((item) => item.listing.id === listingId);

        if (!target) return;

        await axios.delete(`http://localhost:3000/api/wishlist/${target.id}`);
        this.items = this.items.filter((item) => item.id !== target.id);
      } catch (err) {
        console.error("Error removing from wishlist:", err);
      }
    },

    isWishlisted(listingId) {
      return this.items.some((item) => item.listing.id === listingId);
    },
  },
});
