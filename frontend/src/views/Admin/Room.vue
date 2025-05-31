<template>
  <AdminCRUDTitle
    :title="'Room'"
    icon="mdi:guest-room"
    :invoices="dataSet2"
    :create-route="{ name: 'Admin Create Room' }"
  />
  <div>
    <DynamicTable
      class="houses"
      :columns="columnsSet2"
      :rows="dataSet2"
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
      columnsSet2: [
        { key: "id", label: "ID" },
        { key: "image", label: "Image", type: "image" },
        { key: "roomNumber", label: "Room Number" },
        { key: "houseName", label: "House Name" },
        { key: "owner", label: "Owner" },
        { key: "address", label: "Address" },
        { key: "roomSize", label: "Room Size" },
        { key: "price", label: "Price" },
        { key: "rating", label: "Rating" },
      ],
      dataSet2: [
        {
          id: 1,
          image: "/src/assets/images/property_images/property1.jpeg",
          roomNumber: "A-001",
          houseName: "Sweet Home",
          owner: 'Shen Yue',
          address: 'BKK1, Chamkarmon, Phnom Penh',
          roomSize: "5mx5m",
          price: '$500',
          rating: 5.0,
          status: 'Available',
          tableName: 'room' 
        },
        {
          id: 2,
          image: "/src/assets/images/property_images/property1.jpeg",
          roomNumber: "A-002",
          houseName: "Cozt Home",
          owner: 'Shen Yue',
          address: 'BKK1, Chamkarmon, Phnom Penh',
          roomSize: "20mx5m",
          price: '$1000',
          rating: 4.9,
          status: 'Occupied',
          tableName: 'room' 
        },
      ],
    };
  },
  methods: {
    handleDeleteItem(index) {
      this.dataSet2.splice(index, 1);
    },
    handleEditItem(row) {
      this.$router.push({ 
        name: "Admin Edit Room", 
        params: { id: row.id } 
      });
    },
  },
};
</script>

<style scoped>
.houses {
  margin-left: 100px;
  width: 90%;
}
</style>
