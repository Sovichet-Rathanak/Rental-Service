<template>
  <div class="container">
    <header-nav @open-login-modal="showLoginModal = true"></header-nav>
    <div class="filternav-container">
      <filter-nav></filter-nav>
    </div>

    <!-- Login Modal (outside main content flow) -->
    <LoginPage 
      :show-modal="showLoginModal" 
      @close="showLoginModal = false" 
    />
  </div>
</template>

<script>
import HeaderNav from './HeaderNav.vue';
import FilterNav from './FilterNav.vue';
import LoginPage from './LoginPage.vue';  
export default {
  components: {
    HeaderNav,
    FilterNav, 
    LoginPage
  },
  data() {
    return {
      showLoginModal: false
    }
  },
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
  background-size: cover;
  overflow: hidden;
  z-index: -1;
}

.filternav-container{
  width: 100%;
  margin-top: 145px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>