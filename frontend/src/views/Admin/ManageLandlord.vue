<template>
  <AdminCRUDTitle
    :title="'Landlord'"
    icon="mdi:people-group"
    :totalCount="uniqueLandlordCount"
    :showCreate="false"
  ></AdminCRUDTitle>
  <div>
    <DynamicTable
      class="houses"
      :columns="columnsSet4"
      :rows="dataSet4"
      :show-status="false"
      @delete-item="handleDeleteItem"
      @edit-item="handleEditItem"
    />
  </div>
</template>

<script>
import DynamicTable from "@/components/Admin/DynamicTable.vue";
import AdminCRUDTitle from "@/components/Admin/AdminCRUDTitle.vue";
import { useUserStore } from "@/stores/user";
import { useListingStore } from "@/stores/listing";

export default {
  components: {
    DynamicTable,
    AdminCRUDTitle,
  },
  data() {
    return {
      columnsSet4: [
        { key: "id", label: "ID" },
        { key: "image", label: "Image", type: "image" },
        { key: "name", label: "Name" },
        { key: "property", label: "Property" },
        { key: "address", label: "Address" },
        { key: "email", label: "Email" },
        { key: "income", label: "Income" },
        { key: "rating", label: "Rating" },
      ],
      dataSet4: [],
      uniqueLandlordCount: 0,
    };
  },
  methods: {
    async handleDeleteItem(index) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this landlord?"
      );
      if (!confirmed) return;

      const userStore = useUserStore();
      const user = this.dataSet4[index];

      try {
        await userStore.deleteUser(user.id);
        this.dataSet4 = this.dataSet4.filter(item => item.landlordId !== user.id);
        this.uniqueLandlordCount = new Set(this.dataSet4.map(item => item.landlordId)).size;
      } catch (error) {
        console.error("Failed to delete");
      }
    },
    handleEditItem(row) {
      this.$router.push({
        name: "Admin Edit Landlord",
        params: { id: row.id },
      });
    },
  },
  async mounted() {
    const userStore = useUserStore();
    const listingStore = useListingStore();

    await userStore.fetchAllUsers();
    await listingStore.fetchAllListingsWithImages();

    const landlords = userStore.users.filter((u) => u.role === "landlord");
    this.uniqueLandlordCount = landlords.length;

    const landlordRows = [];
    
    landlords.forEach((landlord) => {
      const userListings = listingStore.listings.filter(
        (listing) => listing.owner?.id === landlord.id
      );

      if (userListings.length === 0) {
        landlordRows.push({
          id: landlord.id,
          landlordId: landlord.id,
          image: landlord.pfp_thumbnail_url
            ? `http://localhost:9000/romdoul/${landlord.pfp_thumbnail_url}`
            : "/src/assets/images/default_user.png",
          name: `${landlord.firstname} ${landlord.lastname}`,
          property: "None",
          address: "N/A",
          email: landlord.email,
          income: "$0",
          rating: 5.0,
          tableName: "landlord",
        });
        return;
      }

      userListings.forEach((listing) => {
        const address = `${listing.street_address || ''} ${listing.songkat || ''} ${listing.region?.region_name || ''}`.trim();
        
        landlordRows.push({
          id: `${landlord.id}-${listing.id}`,
          landlordId: landlord.id,
          image: landlord.pfp_thumbnail_url
            ? `http://localhost:9000/romdoul/${landlord.pfp_thumbnail_url}`
            : "/src/assets/images/default_user.png",
          name: `${landlord.firstname} ${landlord.lastname}`,
          property: listing.title || "Untitled",
          address: address || "N/A",
          email: landlord.email,
          income: `$${listing.price_monthly || 0}`,
          rating: 5.0,
          tableName: "landlord",
        });
      });
    });

    this.dataSet4 = landlordRows;
  },
};
</script>

<style scoped>
.houses {
  margin-left: 100px;
  width: 90%;
}
</style>