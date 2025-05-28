<template>
  <AdminCRUDTitle :title="'Landlord'" icon="mdi:people-group" :invoices="dataSet4" :showCreate="false"></AdminCRUDTitle>
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
import DynamicTable from '@/components/Admin/DynamicTable.vue';
import AdminCRUDTitle from '@/components/Admin/AdminCRUDTitle.vue';

export default {
  components: { 
    DynamicTable,
    AdminCRUDTitle
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
        { key: "contact", label: "Contact" },
        { key: "income", label: "Income" },
        { key: "rating", label: "Rating" },
      ],
      dataSet4: [
        {
          id: 1,
          image: "/src/assets/images/comment/landlord.jpeg",
          name: "Zhange Ronan",
          properties: "Sweet Home, Brat Villa",
          address: 'BKK1, Chamkarmon,Phnom Penh',
          email: 'charliexcx124@gmail.com',
          contact: '012 345 678',
          income: '$5000',
          rating: 5.0,
          tableName: 'landlord'
        },
      ],
      
    };
  },
  methods: {
    handleDeleteItem(index) {
      this.dataSet4.splice(index, 1);
    },
    handleEditItem(row) {
      this.$router.push({ 
        name: "Admin Edit Landlord", 
        params: { id: row.id },
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
