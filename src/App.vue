<template>
  <div>
    <header>
      <!-- <combined-header></combined-header> -->
      <account-page1></account-page1>
      <!-- <account-page2></account-page2> -->
    </header>
    <main>
      <banner-animate></banner-animate>
    </main>
    <footer>

    </footer>
  </div>
</template>

<script>
import CombinedHeader from './components/headerComponents/CombinedHeader.vue';
import BannerAnimate from './components/bannerComponents/Banner-Animate.vue';
import AccountPage1 from './views/AccountPage1.vue';
import AccountPage2 from './views/AccountPage2.vue';

export default{
  components:{
    CombinedHeader,
    AccountPage2,
    AccountPage1
    BannerAnimate
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