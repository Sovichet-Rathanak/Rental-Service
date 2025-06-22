<template>
  <AdminCRUDTitle
    :title="'Tenant'"
    icon="mdi:people-group"
    :invoices="dataSet3"
    :showCreate="false"
  ></AdminCRUDTitle>
  <div>
    <DynamicTable
      class="houses"
      :columns="columnsSet3"
      :rows="dataSet3"
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
import { useBookingStore } from "@/stores/booking";

export default {
  components: {
    DynamicTable,
    AdminCRUDTitle,
  },
  data() {
    return {
      columnsSet3: [
        { key: "id", label: "ID" },
        { key: "image", label: "Image", type: "image" },
        { key: "name", label: "Name" },
        { key: "currentRental", label: "Current Rental" },
        { key: "email", label: "Email" },
        { key: "rating", label: "Rating" },
      ],
      dataSet3: [],
    };
  },
  methods: {
    async handleDeleteItem(index) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this tenant"
      );

      if (!confirmed) return;

      const userStore = useUserStore();
      const user = this.dataSet3[index];

      try {
        await userStore.deleteUser(user.id);
        this.dataSet3.splice(index, 1);
        console.log("Delete user with this ID:", user.id);
      } catch (error) {
        console.error("Failed to delete");
      }
    },
    handleEditItem(row) {
      this.$router.push({
        name: "Admin Edit Tenant",
        params: { id: row.id },
      });
    },
  },

  async mounted() {
    const userStore = useUserStore();
    const bookingStore = useBookingStore();

    await userStore.fetchAllUsers();

    const tenants = userStore.users.filter((u) => u.role === "tenant");

    const enrichedTenants = await Promise.all(
      tenants.map(async (tenant) => {
        let currentRental = "None";

        try {
          const rentingList = await bookingStore.fetchRentingList(tenant.id);

          // Find accepted/active booking
          const activeRental = rentingList.find(
            (booking) => booking.status === "accepted"
            // || booking.rentalDecision === "accepted"
          );

          if (
            activeRental &&
            activeRental.listing &&
            activeRental.listing.title
          ) {
            currentRental = activeRental.listing.title;
          }
        } catch (e) {
          console.warn(`Failed to fetch rental for ${tenant.firstname}:`, e);
        }

        return {
          id: tenant.id,
          image: tenant.pfp_thumbnail_url
            ? `http://localhost:9000/romdoul/${tenant.pfp_thumbnail_url}`
            : "/src/assets/images/default_user.png",
          name: `${tenant.firstname} ${tenant.lastname}`,
          currentRental,
          email: tenant.email,
          rating: 5.0,
          tableName: "tenant",
        };
      })
    );

    this.dataSet3 = enrichedTenants;
  },
};
</script>

<style scoped>
.houses {
  margin-left: 100px;
  width: 90%;
}
</style>
