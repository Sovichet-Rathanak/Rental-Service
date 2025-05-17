<template>
  <main>
    <header-nav-2></header-nav-2>
    <div class="title">
      <Icon icon="material-symbols:arrow-back-ios-rounded" width="32" height="32" @click="goBack"/>
      <h1>Wishlist</h1>
    </div>

    <!-- Wishlist items -->
    <div v-if="wishlist.length > 0" class="hasItem">
      <PropertyCard
        v-for="item in wishlist"
        :key="item.id"
        :product="item"
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
import { mapState } from 'pinia'
import { useWishlistStore } from '@/stores/wishlist'

export default {
  components: {
    HeaderNav2,
    PropertyCard
  },
  // computed: {
  //   ...mapState(useWishlistStore, ['items']),
  //   wishlist() {
  //     return this.items
  //   }
  // },
  methods:{
    goBack(){
      this.$router.push({name: 'Home'})
    }
  },
  
  setup() {
    const wishlistStore = useWishlistStore()
    console.log('WISHLIST IN PAGE:', wishlistStore.items)
    return {
      wishlist: wishlistStore.items,
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