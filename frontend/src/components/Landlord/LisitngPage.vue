<template>
  
  <h1 class="title">Your Listing</h1>
  <div class="item">
    <PropertyCard v-for="(listing, index) in listings" :key="listing.id" :data="{
      id: listing.id,
      title: listing.title,
      price: '$' + listing.price_monthly + '/month',
      khan: listing.region?.region_name ?? 'Unknown',
      songkat: listing.songkat,
      street: listing.street_address,
      image: getThumbnailByIndex(index),
      rating: listing.rating,
    }" />
  </div>

  <!-- Missing this popup !!! -->
  <div class="popUpPage" v-if="showTenantHistory" @click.self="closePopup">
    <div class="overview">
      <TenantHistoryPage @close="closePopup" />
    </div>
  </div>
</template>

<script>
import TenantHistoryPage from '@/views/Landlord/TenantHistoryPage.vue';
import PropertyCard from '../PropertyCard.vue';
import { mapActions, mapState } from 'pinia';
import { useListingStore } from '@/stores/listing';

export default {
  components: {
    TenantHistoryPage,
    PropertyCard
  },
  data() {
    return {
      showTenantHistory: false,
    }
  },
  async mounted() {
    await this.fetchAllListingsWithImages();
  },
  computed: {
    ...mapState(useListingStore, ['listings', 'listingImages']),
  },
  methods: {
    ...mapActions(useListingStore, ['fetchAllListingsWithImages', 'getThumbnailByIndex']),

    closePopup() {
      this.showTenantHistory = false;
    },
  }
};
</script>

<style scoped>
.title {
  margin: 50px 0px 70px 200px;
}

.icons {
  display: flex;
  gap: 20px;
  align-items: center;
  text-align: center;
}

.search,
.list,
.addNew {
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: #F3F3F3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  padding: 0px 200px 200px 200px;
}

.text {
  font-weight: bold;
  font-size: 21px;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  gap: 0
}

.text>span {
  font-weight: 200;
  color: rgb(69, 69, 69);
}

.popUpPage {
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overview {
  width: auto;
  height: 92vh;
  border-radius: 50px;
  background-color: white;
  margin-top: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-y: auto;
}
</style>