<template>
  <AdminCRUDTitle
    :title="'Tenant'"
    icon="mdi:people-group"
    :totalCount="uniqueTenantCount"
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
        { key: "currentRental", label: "Rental" },
        { key: "rentalStatus", label: "Status" },
        { key: "email", label: "Email" },
        { key: "rating", label: "Rating" },
      ],
      dataSet3: [],
      uniqueTenantCount: 0,
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
        this.dataSet3 = this.dataSet3.filter(item => item.tenantId !== user.id);
        this.uniqueTenantCount = new Set(this.dataSet3.map(item => item.tenantId)).size;
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
    this.uniqueTenantCount = tenants.length;

    const tenantRows = [];
    
    await Promise.all(tenants.map(async (tenant) => {
      try {
        const rentingList = await bookingStore.fetchRentingList(tenant.id);
        
        if (rentingList.length === 0) {
          tenantRows.push({
            id: tenant.id,
            tenantId: tenant.id,
            image: tenant.pfp_thumbnail_url
              ? `http://localhost:9000/romdoul/${tenant.pfp_thumbnail_url}`
              : "/src/assets/images/default_user.png",
            name: `${tenant.firstname} ${tenant.lastname}`,
            currentRental: "None",
            rentalStatus: "N/A",
            email: tenant.email,
            rating: 5.0,
            tableName: "tenant",
          });
          return;
        }

        rentingList.forEach((rental) => {
          tenantRows.push({
            id: `${tenant.id}-${rental.id}`,
            tenantId: tenant.id,
            image: tenant.pfp_thumbnail_url
              ? `http://localhost:9000/romdoul/${tenant.pfp_thumbnail_url}`
              : "/src/assets/images/default_user.png",
            name: `${tenant.firstname} ${tenant.lastname}`,
            currentRental: rental.listing?.title || "Unknown Property",
            rentalStatus: rental.rentingStatus?.toUpperCase() || "UNKNOWN",
            email: tenant.email,
            rating: 5.0,
            tableName: "tenant",
          });
        });
      } catch (e) {
        console.warn(`Failed to fetch rentals for ${tenant.firstname}:`, e);
      }
    }));

    this.dataSet3 = tenantRows;
  },
};
</script>

<style scoped>
.houses {
  margin-left: 100px;
  width: 90%;
}
</style>