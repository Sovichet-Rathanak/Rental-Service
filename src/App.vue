<template>
  <div>
    <header>
      <combined-header></combined-header>
    </header>
    <main>

    </main>
    <footer>

    </footer>
  </div>
</template>

<script>
import CombinedHeader from './components/headerComponents/CombinedHeader.vue';
import LoginPage from './components/headerComponents/LoginPage.vue';

export default{
  components:{
    CombinedHeader,
    LoginPage
  }
}
</script>

<style>
@font-face {
  font-family: "Airbnb Font";
  src: url(assets/fonts/airbnb_font/AirbnbCereal_W_Bk.otf);
}

*{
  font-family: 'Airbnb Font';
}
</style>