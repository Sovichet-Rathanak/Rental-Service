<template>
  <div class="container">
    <header-nav></header-nav>
    <div class="blue-scale"></div>
  </div>
</template>

<script>
import HeaderNav from './HeaderNav.vue';

export default {
  components: {
    HeaderNav
  }
}
</script> 

<style scoped>
.container{
  width: 100vw;
  height: 70vh;
  max-width: 100%;
  background-color: #345fcc9d;
  background-image: url("/src/assets/images/PP-bg.png");
  background-blend-mode:overlay;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

</style>