<template>
  <div class="item">
    <div class="status">
      <div class="box">
        <div class="circle"></div>
        Pending
      </div>
    </div>

    <!-- Image that navigates to show the popup -->
    <div class="image" @click="showTenantHistory = true">
      <img src="/src/assets/images/property_images/property1.jpeg" alt="">
    </div>

    <!-- Edit button -->
    <router-link to="/listing/listing-editor" class="edit">
      <Icon icon="solar:pen-bold" width="35" height="35" style="color: white"></Icon>
    </router-link>

    <div class="text">
      BKK1, Cambodia
      <span>Phnom Penh, Phnom Penh</span>
    </div>
  </div>

  <!-- Tenant History Popup -->
  <div class="popUpPage" v-if="showTenantHistory" @click.self="closePopup">
    <div class="overview">
      <TenantHistoryPage @close="closePopup"/>
    </div>
  </div>
</template>

<script>
import TenantHistoryPage from '@/views/Landlord/TenantHistoryPage.vue';

export default {
  components: {
    TenantHistoryPage
  },
  data(){
    return{
        showTenantHistory: false
    }
  },
  methods: {
    closePopup() {
      this.showTenantHistory = false;
    }
  }
};
</script>

<style>
.item{
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 30px 180px;
}
.box{
    display: flex;
    align-items: center;
    gap: 10px;  
    height: 40px;
    width: 100px;
    border-radius: 30px;
    background-color: white;
    position: absolute;
    top: 8.5%;
    left:9%;
    padding: 3px 13px;
    font-size: 20px;
    font-weight: bold;
}
.circle{
    width: 10px;
    height: 10px;
    border-radius: 50px;
    background-color: #EC0000;
}
.image{
    width: 440px;
    height: 440px;
}
.image > img{
    border-radius: 30px;
    width: 100%;
    height: 100%;
}
.edit{
    width: 75px;
    height: 75px;
    border-radius: 50px;
    background-color: #345FCC;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
    position: absolute;
    bottom: 17.5%;
    left: 25.1%
}
.text{
    font-weight: bold;
    font-size: 21px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 9px
}
.text > span{
    font-weight: 200;
    color: rgb(69, 69, 69);
}
.popUpPage{
    z-index: 9999;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    width: 100%;
    height: 100vh;
    top:0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overview{
    width: auto;
    height: 92vh;
    border-radius: 50px;
    background-color: white;
    margin-top:20px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-y: auto;
}
</style>