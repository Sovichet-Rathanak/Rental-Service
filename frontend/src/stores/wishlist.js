import axios from 'axios'
import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [],            
    userId: '',        
    wishlistLoading: false
  }),

  actions: {
    setUserId(id) {
      this.userId = id
    },

    async fetchWishlist() {
      if (!this.userId) return
      this.wishlistLoading = true
      try {
        const res = await axios.get(`http://localhost:3000/api/wishlist/user/${this.userId}`)
        this.items = res.data // expected to be: [{ id, listing }]
      } catch (err) {
        console.error('Failed to fetch wishlist:', err)
      } finally {
        this.wishlistLoading = false
      }
    },

    async addToWishlist(listing) {
      try {
        const res = await axios.post(`http://localhost:3000/api/wishlist`, {
          listingId: listing.id
        })
        this.items.push(res.data) // push full wishlist entry: { id, listing }
      } catch (err) {
        console.error('Failed to add to wishlist:', err)
      }
    },

    async removeFromWishlist(listingId) {
      const entry = this.items.find(w => w.listing.id === listingId)
      if (!entry) return

      try {
        await axios.delete(`http://localhost:3000/api/wishlist/${entry.id}`)
        this.items = this.items.filter(w => w.listing.id !== listingId)
      } catch (err) {
        console.error('Failed to remove from wishlist:', err)
      }
    },

    isWishlisted(listingId) {
      return this.items.some(w => w.listing?.id === listingId)
    }
  },

  persist: true
})
