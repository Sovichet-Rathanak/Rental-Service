<template>
  <header-nav-2></header-nav-2>
  <main>
    <div class="title">
      <Icon icon="material-symbols:arrow-back-ios-rounded" width="38" height="38" />
      <h1>Wishlist</h1>
    </div>

    <div class="content">
      <div v-if="wishlist.length === 0">No items in your wishlist.</div>
      <div v-else>
        <PropertyCard
          v-for="item in wishlist"
          :key="item.id"
          :property="item"
        />
      </div>
    </div>
  </main>
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue'
import PropertyCard from '@/components/PropertyCard.vue'

export default {
  components: {
    HeaderNav2,
    PropertyCard
  },
  data() {
    return {
      wishlist: []
    }
  },
  methods: {
    loadWishlist() {
      const stored = localStorage.getItem('wishlist')
      this.wishlist = stored ? JSON.parse(stored) : []
    }
  },
  mounted() {
    this.loadWishlist()
    window.addEventListener('wishlist-updated', this.loadWishlist)
  },
  beforeUnmount() {
    window.removeEventListener('wishlist-updated', this.loadWishlist)
  }
}
</script>


<style scoped>

.title {
    display: flex;
    align-items: center;
    gap: 37px;
    padding-inline: 220px;
}
</style>