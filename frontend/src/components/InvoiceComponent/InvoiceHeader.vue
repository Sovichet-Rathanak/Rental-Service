<template>
  <div :class="['title', { withTenant: showTenantName }]">
    <h3>ID</h3>
    <h3>Landlord Name</h3>
    <h3 v-if="showTenantName">Tenant Name</h3>
    <h3>Properties</h3>
    <h3>Address</h3>
    <h3>Total Payment</h3>
    <h3>Due Date</h3>
    <h3>Duration</h3>
    <h3>Status</h3>
    <h3>Action</h3>
  </div>
</template>

<script>
export default{
    props: {
        showTenantName: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.title {
  font-weight: bold;
  margin: 0 120px -30px 120px;
  text-align: left;
  display: grid;
  align-items: center;
  gap: 40px;
  padding: 10px 30px;
  font-size: 20px;

  /* Without Tenant */
  grid-template-columns: 45px 200px 200px 170px 205px 170px 170px 115px 170px;
}

.title.withTenant {
  grid-template-columns: 45px 200px 200px 200px 170px 205px 170px 170px 115px 170px;
}

</style>