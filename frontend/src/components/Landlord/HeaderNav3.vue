<template>
  <div class="container">
    <div class="item-middle">
      <span>Listings</span>
      <span>Calender</span>
      <span>Message</span>
      <span>Earning</span>
    </div>
    <div class="item-end">
      <div class="circle">
        <Icon icon="iconamoon:notification-light" width="35" height="35" ></Icon>
      </div>
      
      <div class="profile">
        <img src="/src/assets/images/comment/_.jpeg" alt="">
        <div class="verified">
          <Icon icon="si:verified-fill" width="10" height="10" style="color:white"></Icon>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.container {
  display: flex;
  position: relative;
  align-items: center;
  padding: 25px 200px 20px 200px;
  box-shadow: 0 6px 12px -6px rgba(0, 0, 0, 0.1);
  background-color: white;
  z-index: 10;
  position: relative;
  cursor: pointer
}

.item-middle {
  margin: 0 auto;
  justify-content: space-between;
  width: 30%;
  display: flex;
}

span{
  font-size: 24px;
}

span:hover{
  text-decoration: underline;
  font-weight: bold;
}
span:active{
  text-decoration: underline;
  font-weight: bold;
  color: rgb(249, 239, 219)
}

.item-end {
  display: flex;
  gap: 10px
}
.circle{
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border: 1px solid #D3D3D3;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  background-color: white;
}

.profile{
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border: 1px solid #D3D3D3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.profile > img{
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
.verified{
  width: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15px;
  background-color: #3E92FF;
  border-radius: 50px;
  position: absolute;
  bottom: 11%;
  right: 6%
}
</style>
