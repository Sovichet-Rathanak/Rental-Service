<template>
  <div>
    <header>
      <combined-header></combined-header>
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

export default{
  components:{
    CombinedHeader,
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