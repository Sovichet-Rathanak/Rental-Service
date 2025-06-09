<template>
  <div class="property-card" @click="goToDetailPage">
    <div class="image-container">
      <img :src="data.image" alt="property image" />
      <button class="fave-btn" @click.stop="handleWishlist">
        <Icon :icon="isWishlisted ? 'mdi:heart' : 'mdi:heart-outline'" width="32" height="32"
          :style="{ color: isWishlisted ? '#08FF10' : '#fff' }" />
      </button>
    </div>
    <div class="info">
      <h3 class="title" style="margin-bottom: 20px; width: 90%; flex-wrap: wrap;">{{ data.title }}</h3>
      <div class="info-heading">
        <h3 class="rent">{{ data.price }}</h3>
        <div class="property-rating">
          <Icon icon="material-symbols:star-rounded" width="31" height="31" style="color: #000" />
          <h3>{{ data.rating }}</h3>
        </div>
      </div>
      <div class="info-location">
        <h4 class="location">{{ data.location }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useWishlistStore } from '@/stores/wishlist'

export default {
  props: {
    data: {
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
.property-card {
  height: 25rem;
  border-radius: 12px;
  box-sizing: border-box;
  background-color: white;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.image-container {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.fave-btn {
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
  border-radius: 12px 12px 0px 0px;
  object-fit: cover;
  pointer-events: none;
}

.info {
  box-sizing: border-box;
  padding: 10px;
}

.info h3 {
  font-size: 20px;
  margin: 0px;
  padding: 0px;
}

.info-heading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.property-rating {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.info-location {
  overflow: hidden;
  width: 70%;
  font-weight: 700;
  color: #565656;
}

.location {
  margin: 10px 0px 0px 0px;
}

.rent {
  font-weight: bold;
}
</style>