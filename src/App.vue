<template>
  <div>
    <header>
      <combined-header></combined-header>
    </header>
    <main>
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
    </main>
    <footer>

    </footer>
  </div>
</template>

<script>
import CombinedHeader from './components/headerComponents/CombinedHeader.vue';
import PropertyCard from './components/PropertyCard.vue';

export default{
  components:{
    CombinedHeader,
    PropertyCard
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

header{
  position: relative;
}

.property-container{
  display: grid;
  position: absolute;
  grid-template-columns: repeat(5, 300px);
  background-color: white;
  gap: 25px;
  padding: 30px 200px;
  border-radius: 50px 50px 0px 0px;
  width: 100%;
  box-sizing: border-box;
  top: 45%;
}
</style>