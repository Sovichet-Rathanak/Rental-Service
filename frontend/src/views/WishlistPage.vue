<template>
  <main>
    <header-nav-2></header-nav-2>
    <div class="title">
      <Icon icon="material-symbols:arrow-back-ios-rounded" width="32" height="32" />
      <h1>Wishlist</h1>
    </div>

    <div class="content">
      <div class="hasItem">
        <PropertyCard v-if="wishlist.includes('property1')" id="property1" />
        <PropertyCard v-if="wishlist.includes('property2')" id="property2" />
        <PropertyCard v-if="wishlist.includes('property3')" id="property3" />
        <PropertyCard v-if="wishlist.includes('property4')" id="property4" />
        <PropertyCard v-if="wishlist.includes('property5')" id="property5" />
        <PropertyCard v-if="wishlist.includes('property6')" id="property6" />
        <PropertyCard v-if="wishlist.includes('property7')" id="property7" />
        <PropertyCard v-if="wishlist.includes('property8')" id="property8" />
        <PropertyCard v-if="wishlist.includes('property9')" id="property9" />
        <PropertyCard v-if="wishlist.includes('property10')" id="property10" />
        <PropertyCard v-if="wishlist.includes('property11')" id="property11" />
        <PropertyCard v-if="wishlist.includes('property12')" id="property12" />
        <PropertyCard v-if="wishlist.includes('property13')" id="property13" />
        <PropertyCard v-if="wishlist.includes('property14')" id="property14" />
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
</style>