<template>
  <AdminCRUDTitle :title="'Properties'" icon="solar:home-bold" :invoices="dataSet1" :createRoute="{ name: 'Admin Create House'}"></AdminCRUDTitle>
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
          // status: 'Approved',
          tableName: 'property' 
        },
        {
          id: 2,
          image: "/src/assets/images/property_images/property1.jpeg",
          title: "Building B",
          owner: "John Doe",
          totalRooms: 5,
          address: "123 Main St",
          price: "$5000",
          rating: 4.5,
          // status: 'Approved ',
          tableName: 'property' 
        },
        {
          id: 3,
          image: "/src/assets/images/property_images/property1.jpeg",
          title: "Building C",
          owner: "John Doe",
          totalRooms: 5,
          address: "123 Main St",
          price: "$5000",
          rating: 4.5,
          // status: 'Rejected',
          tableName: 'property' 
        },
        {
          id: 4,
          image: "/src/assets/images/property_images/property1.jpeg",
          title: "Building D",
          owner: "John Doe",
          totalRooms: 5,
          address: "123 Main St",
          price: "$5000",
          rating: 4.5,
          status: 'Available',
          tableName: 'property' 
        }
      ],
      
    };
  },
  methods: {
    handleDeleteItem(index) {
      this.dataSet1.splice(index, 1);
    },
    handleEditItem(row) {
      this.$router.push({ 
        name: "Admin Edit Property", 
        params: { id: row.id},
    });
    },
  },
};
</script >

<style scoped>
.property {
  margin-left: 100px;
  width: 90%;
  align-items: center;
}
</style>
