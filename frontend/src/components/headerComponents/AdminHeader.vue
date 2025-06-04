<template>
  <header class="nav-container">
    <div class="nav-left" @click="goToHomePage">
      <img src="/src/assets/logo.png" alt="romdoul_logo" class="logo-img" />
      <div class="title">
        <h1>Romdoul</h1>
        <h2>Rental Service</h2>
      </div>
    </div>

    <nav class="item-middle">
      <router-link to="/admin/dashboard" class="nav-item" active-class="active">Dashboard</router-link>
      <router-link to="/admin/property" class="nav-item" active-class="active">Property</router-link>
      <!-- <router-link to="/admin/room" class="nav-item" active-class="active">Rooms</router-link> -->
      <router-link to="/admin/manage-landlord" class="nav-item" active-class="active">Landlords</router-link>
      <router-link to="/admin/tenant" class="nav-item" active-class="active">Tenants</router-link>
      <router-link to="/admin/message4" class="nav-item" active-class="active">Messages</router-link>
      <!-- <router-link to="/admin/promotion" class="nav-item" active-class="active">Promotion</router-link> -->
      <router-link to="/admin/invoice" class="nav-item" active-class="active">Invoices</router-link>
    </nav>

    <div class="nav-right">
      <div class="circle notification-btn">
        <Icon icon="iconamoon:notification-light" width="30" height="30"></Icon>
        <div class="notification-dot"></div>
      </div>
      <div class="admin-dropdown">
        <Icon icon="material-symbols:menu" width="20" height="20" />
        <Icon icon="fluent:person-circle-32-filled" width="36" height="36" />
        <!-- <span class="admin-name">Admin</span> -->
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    goToHomePage() {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style scoped>
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  background-color: white;
  box-shadow: 0 6px 12px -6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
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
  justify-content: space-between;
  width: 65%;
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

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.circle {
  width: 45px;
  height: 45px;
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


.admin-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.admin-dropdown:hover {
  background-color: #f3f4f6;
}

.admin-title {
  font-size: 16px;
  font-weight: 500;
  color: #374151;
}
</style>
