import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: []
  }),
  actions: {
    toggleWishlist(product) {
      console.log('Toggle wishlist called with:', product)
      const index = this.items.findIndex(item => item.id === product.id)
      if (index === -1) {
        this.items.push(product)
      } else {
        this.items.splice(index, 1)
      }
    },
  },
  persist: true
})