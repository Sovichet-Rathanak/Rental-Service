<template>
  <div>
    <header>
      <!-- <combined-header></combined-header> -->
      <account-page1></account-page1>
      <!-- <account-page2></account-page2> -->
    </header>
    <main>
      <div class="homescreen-container">
        <div class="property-container">
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
          <property-card></property-card>
        </div>
        <h3 style="font-weight: bold; font-size: 20px;">Continue Exploring Accommodations</h3>
        <button class="midlength-btn">Show More</button>
      </div>      <banner-animate></banner-animate>
    </main>
    <footer>
      <footer-component></footer-component>
    </footer>
  </div>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';
import CombinedHeader from './components/headerComponents/CombinedHeader.vue';
import BannerAnimate from './components/bannerComponents/Banner-Animate.vue';
import AccountPage1 from './views/AccountPage1.vue';
import AccountPage2 from './views/AccountPage2.vue';
import PropertyCard from './components/PropertyCard.vue';
import LoginPage from './components/headerComponents/LoginPage.vue';

export default {
  components: {
    CombinedHeader,
    AccountPage2,
    AccountPage1,
    BannerAnimate,
    PropertyCard,
    FooterComponent
    LoginPage
  }
}
</script>

<style>
@font-face {
  font-family: "Airbnb Font";
  src: url(assets/fonts/airbnb_font/AirbnbCereal_W_Bk.otf);
}

* {
  font-family: 'Airbnb Font';
}

.homescreen-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.property-container {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(5, 300px);
  background-color: white;
  gap: 50px;
  padding: 70px 200px 30px 200px;
  border-radius: 50px 50px 0px 0px;
  width: 100%;
  box-sizing: border-box;
  margin-top: -45px;
  z-index: 2;
}

.midlength-btn{
  background-color: black;
  font-weight: bold;
  color: white;
  width: 200px;
  height: 70px;
  border: 1px solid black;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
}

</style>