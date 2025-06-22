<template>
  <AdminCRUDTitle
    :title="'Properties'"
    icon="solar:home-bold"
    :invoices="dataSet1"
    :createRoute="{ name: 'Admin Create House' }"
  ></AdminCRUDTitle>
  <div>
    <DynamicTable
      class="property"
      :columns="columnsSet1"
      :rows="dataSet1"
      :show-status="false"
      @delete-item="handleDeleteItem"
      @edit-item="handleEditItem"
    />
  </div>
</template>

<script>
import DynamicTable from "@/components/Admin/DynamicTable.vue";
import AdminCRUDTitle from "@/components/Admin/AdminCRUDTitle.vue";
import { useListingStore } from "@/stores/listing";

export default {
  components: {
    DynamicTable,
    AdminCRUDTitle,
  },
  data() {
    return {
      columnsSet1: [
        { key: "id", label: "ID" },
        { key: "image", label: "Image", type: "image" },
        { key: "title", label: "Title" },
        { key: "owner", label: "Owner" },
        { key: "property_type", label: "Type" },
        { key: "totalRooms", label: "Total Rooms" },
        { key: "address", label: "Address" },
        { key: "price", label: "Price" },
        { key: "rating", label: "Rating" },
      ],
      dataSet1: [],
    };
  },
  methods: {
    async handleDeleteItem(index) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this listing?"
      );
      if (!confirmed) return;

      const listingStore = useListingStore();
      const listing = this.dataSet1[index];

      try {
        await listingStore.deleteListing(listing.id);
        this.dataSet1.splice(index, 1);
        console.log("Deleted listing with ID:", listing.id);
      } catch (err) {
        console.error("Failed to delete listing:", err);
      }
    },

    handleEditItem(row) {
      this.$router.push({
        name: "Admin Edit Property",
        params: { id: row.id }, 
      });
    },
  },

  async mounted() {
    const listingStore = useListingStore();
    await listingStore.fetchAllListingsWithImages();

    this.dataSet1 = listingStore.listings.map((listing, index) => ({
      id: listing.id,
      image: listingStore.getThumbnailByIndex(index),
      title: listing.title,
      owner: listing.ownerName,
      property_type: listing.property_type,
      totalRooms: (listing.bedrooms || 0) + (listing.bathrooms || 0),
      address:
        (listing.street_address || "null") +
        " " +
        (listing.songkat || "null") +
        " " +
        (listing.songkat || "null"),
      price: `$${listing.price_monthly || 0}`,
      rating: listing.rating || "new",
      tableName: "property",
    }));
  },
};
</script>

<style scoped>
.property {
  margin-left: 100px;
  width: 90%;
  align-items: center;
}
</style>
