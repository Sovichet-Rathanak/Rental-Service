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

  <!-- Tenant History Popup -->
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
  margin-top: 50px;
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
  flex-direction: row;
  gap: 30px;
  align-items: center;
}

.box {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  width: 100px;
  border-radius: 30px;
  background-color: white;
  position: absolute;
  top: 5%;
  left: 5%;
  padding: 3px 13px;
  font-size: 20px;
  font-weight: bold;
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background-color: #EC0000;
}

.image {
  width: 350px;
  height: 350px;
  position: relative;
}

.image>img {
  border-radius: 30px;
  width: 100%;
  height: 100%;
}

.edit {
  width: 75px;
  height: 75px;
  border-radius: 50px;
  background-color: #345FCC;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  position: absolute;
  bottom: -4%;
  right: -6.5%
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