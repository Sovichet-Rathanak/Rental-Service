<template>
  <div class="container">
    <div class="nav-left" @click="goToHomePage">
      <img src="/src/assets/logo.png" alt="romdoul_logo" class="logo-img" />
      <div class="title">
        <h1>Romdoul</h1>
        <h2>Rental Service</h2>
      </div>
    </div>
    <div class="item-middle">
      <router-link to="/landlord/listing" class="nav-item" active-class="active">
        <span>Listings</span>
      </router-link>
      <router-link to="/landlord/calendar" class="nav-item" active-class="active">
        <span>Calendar</span>
      </router-link>
      <router-link to="/landlord/message3" class="nav-item" active-class="active">
        <span>Message</span>
      </router-link>
      <router-link to="/landlord/notification" class="nav-item" active-class="active">
        <span>Notification</span>
      </router-link>
      <router-link to="/landlord/earning" class="nav-item" active-class="active">
        <span>Earning</span>
      </router-link>
    </div>
    <div class="item-end">
      <!-- <div class="circle notification-btn">
        <Icon icon="iconamoon:notification-light" width="35" height="35"></Icon>
        <div class="notification-dot"></div>
      </div> -->
      <div class="profile">
        <img src="/src/assets/images/comment/_.jpeg" alt="Profile">
        <div class="verified">
          <Icon icon="si:verified-fill" width="12" height="12" style="color:white"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav3',
    methods: {
    goToHomePage() {
      this.$router.push({ name: 'Home' });
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 20px 60px;
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}
.nav-left {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
}
.logo-img {
  width: 50px;
  height: 50px;
}
.title h1 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #111827;
}

.title h2 {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.item-middle {
  margin: 0 auto;
  justify-content: space-evenly;
  width: 35%;
  display: flex;
  gap: 40px;
}

.nav-item {
  font-size: 22px;
  font-weight: 500;
  color: black;
  position: relative;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-item span {
  position: relative;
  z-index: 1;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: black;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 80%;
}

.nav-item.active {
  color: #000;
  font-weight: 600;
}

.nav-item.active::after {
  width: 80%;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  z-index: 0;
}

.item-end {
  display: flex;
  gap: 15px;
  align-items: center;
}

.circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  align-items: center;
  justify-content: center;
  display: flex;
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
  transition: all 0.3s ease;
  position: relative;
}

.notification-btn {
  cursor: pointer;
}

.notification-btn:hover {
  border-color: black;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.notification-btn:active {
  transform: translateY(0);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
}

.profile:hover {
  border-color: black;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile>img {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.profile:hover>img {
  transform: scale(1.02);
}

.verified {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3E92FF, #2563eb);
  border-radius: 50%;
  position: absolute;
  bottom: -2px;
  right: -2px;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
