<template>
  <div class="container">
    <div class="title">
      <Icon :icon="icon" width="35px" height="35px"></Icon> 
      <div style="font-size: 30px; font-weight: bold;">{{ title }}</div>
    </div>

    <div class="rightSection">
      <div class="total">Total {{ title }} : {{ totalInvoices }}</div>
      <div class="searchBox">
        <Icon icon="material-symbols:search-rounded" width="24" height="24" class="searchIcon"></Icon>
        <input type="text" placeholder="Search">
      </div>
      <router-link :to="createRoute" class="create" v-if="showCreate">
        <Icon icon="ic:round-plus" width="30" height="30"></Icon>
        Create
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    total: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      required: true
    },
    invoices: {
      type: Array,
      default: () => []
    },
    createRoute: {
      type: String,
      // required: true,
    },
    showCreate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    totalInvoices() {
      return this.invoices.length;
    }
  }
};
</script>

<style scoped>
.container{
  display: flex;
  justify-content: space-between;
  padding: 30px 100px;
  align-items: center;
}
.title{
  display: flex;
  align-items: center;
  gap: 20px
}

.rightSection{
  display: flex;
  gap: 15px;
}
.total{
  border: 0.5px solid #1A4CCC;
  color: #1A4CCC;
  background-color: rgba(26, 76, 204, 0.2);
  padding: 10px 25px;
  border-radius: 10px;
  width: auto;
  font-size: 22px;
  text-align: center;
}
.searchBox{
  display: flex;
  position: relative;
  align-items: center;
}
.searchIcon{
  position: absolute;
  left: 3%;
  color: #A7A7A7;
}
input{
  width: 310px;
  padding: 10px 0 10px 40px;
  font-size: 20px;
  border-radius: 10px;
  border: 1px solid #A7A7A7;
  color: #A7A7A7;
  height: 30px;
}
.create{
  display: flex;
  align-items: center;
  gap: 0;
  background-color: #3E5EFF;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  padding: 10px 20px;
  font-size: 20px;
  text-decoration: none;
}
.create:hover{
  background-color: #2335ff;
}
</style>
