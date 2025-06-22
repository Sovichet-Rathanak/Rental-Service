<template>
  <AdminCRUDTitle
    :title="'Landlord'"
    icon="mdi:people-group"
    :invoices="dataSet4"
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
        { key: "properties", label: "Properties" },
        { key: "address", label: "Address" },
        { key: "email", label: "Email" },
        { key: "income", label: "Income" },
        { key: "rating", label: "Rating" },
      ],
      dataSet4: [],
    };
  },
  methods: {
     async handleDeleteItem(index) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this tenant"
      );

      if (!confirmed) return;

      const userStore = useUserStore();
      const user = this.dataSet4[index];

      try {
        await userStore.deleteUser(user.id);
        this.dataSet4.splice(index, 1);
        console.log("Delete user with this ID:", user.id);
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

    const infoLandlords = landlords.map((landlord) => {
      const userListings = listingStore.listings.filter(
        (listing) => listing.owner?.id === landlord.id
      );

      const properties =
        userListings.map((l) => l.title).join(", ") || "None";
      const firstListing = userListings[0];

  const address = firstListing
    ? `${firstListing.street_address || ''} ${firstListing.songkat || ''} ${firstListing.region?.region_name || ''}`.trim()
    : "N/A";
        const income = userListings.reduce(
        (total, l) => total + (l.price_monthly || 0),
        0
      );

      return {
        id: landlord.id,
        image: landlord.pfp_thumbnail_url
          ? `http://localhost:9000/romdoul/${landlord.pfp_thumbnail_url}`
          : "/src/assets/images/default_user.png",
        name: `${landlord.firstname} ${landlord.lastname}`,
        properties,
        address,
        email: landlord.email,
        income: `$${income}`,
        rating: 5.0,
        tableName: "landlord",
      };
    });

    this.dataSet4 = infoLandlords;
  },
};
</script>


<style scoped>
.houses {
  margin-left: 100px;
  width: 90%;
}
</style>
