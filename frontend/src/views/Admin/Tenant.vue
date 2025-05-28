<template>
  <AdminCRUDTitle :title="'Tenant'" icon="mdi:people-group" :invoices="dataSet3" :showCreate="false" ></AdminCRUDTitle>
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
import DynamicTable from '@/components/Admin/DynamicTable.vue';
import AdminCRUDTitle from '@/components/Admin/AdminCRUDTitle.vue';

export default {
  components: { 
    DynamicTable,
    AdminCRUDTitle
  },
  data() {
    return {
      columnsSet3: [
        { key: "id", label: "ID" },
        { key: "image", label: "Image", type: "image" },
        { key: "name", label: "Name" },
        { key: "currentRental", label: "Current Rental" },
        { key: "currentAddress", label: "Current Address" },
        { key: "email", label: "Email" },
        { key: "contact", label: "Contact" },
        { key: "rating", label: "Rating" },
      ],
      dataSet3: [
        {
          id: 1,
          image: "/src/assets/images/comment/_.jpeg",
          name: "Bai Jingting",
          currentRental: "Sweet Home, Brat Villa",
          currentAddress: 'BKK1, Chamkarmon,Phnom Penh',
          email: 'charliexcx124@gmail.com',
          contact: '012 345 678',
          rating: 5.0,
          tableName: 'tenant'
        },
      ],
      
    };
  },
  methods: {
    handleDeleteItem(index) {
      this.dataSet3.splice(index, 1);
    },
    handleEditItem(row) {
      this.$router.push({ 
        name: "Admin Edit Tenant", 
        params: { id: row.id }
      });
    },
  },
};
</script>

<style scoped>
.houses{
  margin-left: 100px;
  width: 90%;
}
</style>
