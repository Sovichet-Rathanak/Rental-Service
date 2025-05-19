<template>
  <div class="property-card" @click="goToDetailPage">
    <div class="image-container">
      <img :src="product.image" alt="property image" />
      <button class="fave-btn" @click.stop="handleWishlist">
        <Icon :icon="isWishlisted ? 'mdi:heart' : 'mdi:heart-outline'" width="32" height="32" :style="{color: isWishlisted ? '#08FF10' : '#fff'}" />
      </button>
    </div>
    <div class="info">
      <div class="info-heading">
        <h3 class="rent">{{ product.price }}</h3>
        <div class="property-rating">
          <Icon icon="material-symbols:star-rounded" width="31" height="31" style="color: #000" />
          <h3>{{ product.rating }}</h3>
        </div>
      </div>
      <div class="info-location">
        <h3>{{product.location}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useWishlistStore } from '@/stores/wishlist'

export default {
  props: {
    product: {
      type: Object,
      require: true
    }
  },
  computed: {
    ...mapState(useWishlistStore, ['items']),
    isWishlisted() {
      return this.items.some(item => item.id === this.product.id)
    }
  },
  methods: {
    goToDetailPage() {
      this.$router.push({ name: 'Accommodation' })
    },

    ...mapActions(useWishlistStore, ['toggleWishlist']),
    handleWishlist() {
      this.toggleWishlist(this.product)
    }  
  },   
}
</script>


<style scoped>
.property-card{
  height: 25.625em;
  border-radius: 24px;
  box-sizing: border-box;
  background-color: white;
  overflow: hidden;
  cursor: pointer;
}

.image-container {
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
}

.fave-btn{
    right: 10px;
    top: 10px;
    position: absolute;
    background-color: transparent;
    cursor: pointer;
    border: none;
}

.image-container img {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  object-fit: cover; 
  pointer-events: none;
}

.info h3{
  font-size: 20px;
  margin: 0px;
  padding: 0px;
}

.info-heading{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.property-rating{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.info-location{
  width: 70%;
  font-weight: 700;
  color: #565656;
}

.property-card:hover {
  transform: scale(1.05); 
  transition: transform 0.3s ease;
}

.rent{
    font-weight: bold;
}
</style>