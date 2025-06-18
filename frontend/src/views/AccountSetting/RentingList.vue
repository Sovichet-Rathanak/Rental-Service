<template>
  <body>
    <header>
      <HeaderNav2></HeaderNav2>
    </header>
    <main>
      <BreadCrumbs style="margin: 30px 0px"></BreadCrumbs>
      <div class="current-rent">
        <h1 style="margin: 0px 0px 20px 0px">Currently Renting</h1>
        <div class="card-container">
          <PropertyCard
            v-for="(item, index) in currentRenting"
            :key="item.id"
            :data="{
              id: item.listing.id,
              title: item.listing.title,
              price: '$' + item.listing.price_monthly + '/month',
              khan: item.listing.region?.region_name ?? 'Unknown',
              songkat: item.listing.songkat,
              street: item.listing.street_address,
              image: imageMap[item.listing.id] || '',
              rating: item.listing.rating,
            }"
          />
        </div>
      </div>

      <div class="past-rent">
        <h1 style="margin: 30px 0px 20px 0px">Renting History</h1>
        <div class="card-container">
          <PropertyCard
            v-for="(item, index) in pastRenting"
            :key="item.id"
            :data="{
              id: item.listing.id,
              title: item.listing.title,
              price: '$' + item.listing.price_monthly + '/month',
              khan: item.listing.region?.region_name ?? 'Unknown',
              songkat: item.listing.songkat,
              street: item.listing.street_address,
              image: imageMap[item.listing.id] || '',
              rating: item.listing.rating,
            }"
          />
        </div>
      </div>
    </main>
    <footer>
      <FooterComponent></FooterComponent>
    </footer>
  </body>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderNav2 from "@/components/headerComponents/HeaderNav2.vue";
import PropertyCard from "@/components/PropertyCard.vue";
import { useListingStore } from "@/stores/listing";
import { mapActions, mapState } from "pinia";
import { useBookingStore } from "@/stores/booking";
import { useUserStore } from "@/stores/user";

export default {
  components: {
    HeaderNav2,
    BreadCrumbs,
    FooterComponent,
    PropertyCard,
    
  },
  data() {
    return {
      currentRenting: [],
      pastRenting: [],
      tenantId: "",
      imageMap: {}
    };
  },
  async mounted() {
    const bookingStore = useBookingStore();
    const tenantId = this.user.id;

    const rentingList = await bookingStore.fetchRentingList(tenantId);

    this.currentRenting = rentingList.filter(
      (item) => item.rentingStatus === "current"
    );
    this.pastRenting = rentingList.filter(
      (item) => item.rentingStatus === "past"
    );

    await this.fetchImagesForListings([
      ...this.currentRenting,
      ...this.pastRenting,
    ]);
  },

  computed: {
    ...mapState(useListingStore, ["listings"]),
    ...mapState(useUserStore, ["user"]),
  },
  methods: {
    ...mapActions(useListingStore, [
      "getThumbnailByIndex",
      "fetchAllListingsWithImages",
    ]),
    ...mapActions(useBookingStore, ["fetchRentingList"]),
    ...mapActions(useListingStore, ["fetchListingImagesById"]),

    async fetchImagesForListings(listings) {
      for (const item of listings) {
        try {
          const images = await this.fetchListingImagesById(item.listing.id);
          if (images && images.length > 0) {
            const thumb = images.find((img) => img.isThumbnail) || images[0];
            const key = thumb.isThumbnail
              ? thumb.thumbnail_url
              : `original/${thumb.original_url}`;
            this.imageMap[item.listing.id] = `http://localhost:9000/romdoul/${key}`;
          }
        } catch (err) {
          console.error("Failed to load image for listing:", item.listing.id, err);
        }
      }
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-inline: 300px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: row;
}
</style>
