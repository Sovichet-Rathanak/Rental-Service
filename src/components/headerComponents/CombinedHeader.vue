<template>
  <div class="container">
    <header-nav></header-nav>
    <div class="filternav-container">
      <filter-nav></filter-nav>
    </div>
  </div>
</template>

<script>
import HeaderNav from './HeaderNav.vue';
import FilterNav from './FilterNav.vue';

export default {
  components: {
    HeaderNav,
    FilterNav
  }
}
</script> 

<style scoped>
.container{
  width: 100vw;
  height: 50vh;
  max-width: 100%;
  background-color: #345fcc9d;
  background-image: url("/src/assets/images/PP-bg.png");
  background-blend-mode:overlay;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  overflow: hidden;
}

.filternav-container{
  width: 100%;
  margin-top: 145px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>