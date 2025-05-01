<template>
    <div class="property-card" @click="goToDetailPage">
        <div class="image-container">
            <img src="../assets/images/property_images/property1.jpeg" alt="property image">
            <button class="fave-btn">
                <Icon icon="si:heart-duotone" width="32" height="32"  style="color: #fff" />
            </button>
        </div>
        <div class="info">
            <div class="info-heading">
                <h3 class="rent">$3000/month</h3>
                <div class="property-rating">
                    <Icon icon="material-symbols:star-rounded" width="31" height="31" style="color: #000" />
                    <h3>4.5</h3>
                </div>
            </div>
            <div class="info-location">
                <h3>BKK1, Chamkarmon,
                    Phnom Penh</h3>
            </div>
        </div>
    </div>
</template>


<script>
  export default{
    methods: {
      goToDetailPage(){
        this.$router.push({name: 'Accommodation'})
      }
    }
  }
</script>

<style scoped>
.property-card{
  height: 410px;
  border-radius: 24px;
  box-sizing: border-box;
  background-color: white;
  overflow: hidden;
  cursor: pointer;
}

.image-container {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
}

.fave-btn{
    right: 10px;
    top: 10px;
    position: absolute;
    background-color: transparent;
    cursor: pointer;
    border: none;
}

.image-container img {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  object-fit: cover; 
  pointer-events: none;
}

.info h3{
  font-size: 20px;
  margin: 0px;
  padding: 0px;
}

.info-heading{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.property-rating{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.info-location{
  width: 200px;
  font-weight: 700;
  color: #565656;
}

.property-card:hover {
  transform: scale(1.05); 
  transition: transform 0.3s ease;
}

.rent{
    font-weight: bold;
}
</style>