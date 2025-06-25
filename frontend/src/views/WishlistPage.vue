<template>
  <main>
    <header-nav-2></header-nav-2>
    <div class="title">
      <Icon icon="material-symbols:arrow-back-ios-rounded" width="32" height="32" @click="goBack" />
      <h1>Wishlist</h1>
    </div>

    <!-- Wishlist items -->
    <div v-if="wishlist.length > 0" class="hasItem">
      <PropertyCard
        v-for="(item, index) in wishlist"
        :key="item.id"
        :data="{
          id: item.listing.id,
          title: item.listing.title,
          price: '$' + item.listing.price_monthly + '/month',
          khan: item.listing.region?.region_name ?? 'Unknown',
          songkat: item.listing.songkat,
          street: item.listing.street_address,
          image: getThumbnail(item.listing.id),
          rating: item.listing.rating
        }"
      />
    </div>

    <!-- Empty message -->
    <div v-else class="empty-message">
      <p>No items in wishlist.</p>
    </div>
  </main>
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue'
import PropertyCard from '@/components/PropertyCard.vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useListingStore } from '@/stores/listing'
import { mapActions, mapStores } from 'pinia'

export default {
  components: {
    HeaderNav2,
    PropertyCard
  },

  methods: {
    goBack() {
      this.$router.push({ name: 'Home' })
    },
    getThumbnail(listingId) {
      const listingStore = useListingStore()
      const index = listingStore.listings.findIndex(l => l.id === listingId)
      return listingStore.getThumbnailByIndex(index)
    },

    ...mapActions(useListingStore, ['getThumbnailByIndex']),
  },
  
  computed: {
    ...mapStores(useWishlistStore, ['items'])
  },
  setup() {
    const wishlistStore = useWishlistStore()
    return {
      wishlist: wishlistStore.items
    }
  }
}
</script>



<style scoped>

.title {
    display: flex;
    align-items: center;
    gap: 37px;
    padding-inline: 230px;
    font-weight: bold;
    margin-bottom: 25px;
}

.hasItem{
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: repeat(5, 300px);
    background-color: white;
    gap: 50px;
    padding: 0px 200px 30px 200px;
    border-radius: 50px 50px 0px 0px;
    width: 100%;
    box-sizing: border-box;
}

.empty-message {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  font-size: 27px;
  color: rgb(0, 0, 0);
}
</style>