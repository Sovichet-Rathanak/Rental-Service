<template>
  <div class="container">
    <header-nav></header-nav>
    <filter-nav></filter-nav>
  </div>
</template>

<script>
import HeaderNav from './HeaderNav.vue';
import FilterNav from './filterNavRelated/FilterNav.vue';
export default {
  components: {
    HeaderNav,
    FilterNav,
  },
  data() {
    return {
      
    }
  },
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 50vh;
  max-width: 100%;
  background-color: #345fcc9d;
  background-image: url("/src/assets/images/PP-bg.png");
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 100;
}

</style>