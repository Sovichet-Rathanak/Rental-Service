<template>
    <HeaderNav2 />
  <div class="container">
    <header-nav @open-login-modal="showLoginModal = true"></header-nav>
    <div class="centered-text"><h1>Contact | Romdoul</h1></div>
    

  </div>
</template>

<script>
import HeaderNav2 from './HeaderNav2.vue';

export default {
  components: {
    HeaderNav2,
  
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
.centered-text {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-weight: bold;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  letter-spacing: 2px;
  text-align: center;
  pointer-events: none;
}
</style>