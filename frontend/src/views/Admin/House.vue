<template>
  <AdminCRUDTitle :title="'House'" icon="solar:home-bold" :invoices="dataSet1" :createRoute="{ name: 'Admin Create House'}"></AdminCRUDTitle>
  <div>
    <DynamicTable
      class="houses"
      :columns="columnsSet1"
      :rows="dataSet1"
      :show-status="true"
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
      columnsSet1: [
        { key: "id", label: "ID" },
        { key: "image", label: "Image", type: "image" },
        { key: "title", label: "Title" },
        { key: "owner", label: "Owner" },
        { key: "totalRooms", label: "Total Rooms" },
        { key: "address", label: "Address" },
        { key: "price", label: "Price" },
        { key: "rating", label: "Rating" },
      ],
      dataSet1: [
        {
          id: 1,
          image: "/src/assets/images/property_images/property1.jpeg",
          title: "Building A",
          owner: "John Doe",
          totalRooms: 5,
          address: "123 Main St",
          price: "$5000",
          rating: 4.5,
          status: 'Occupied',
          tableName: 'house' 
        },
      ],
      
    };
  },
  methods: {
    handleDeleteItem(index) {
      this.dataSet1.splice(index, 1);
    },
    handleEditItem(row) {
      this.$router.push({ 
        name: "Admin Edit House", 
        params: { id: row.id},
    });
    },
  },
};
</script >

<style scoped>
.houses{
  margin-left: 100px;
  width: 90%;
}
</style>
