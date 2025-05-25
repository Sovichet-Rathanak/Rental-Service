<template>
  <header class="nav-container">
    <div class="nav-left" @click="goToHomePage">
      <img src="/src/assets/logo.png" alt="romdoul_logo" class="logo-img" />
      <div class="title">
        <h1>Romdoul</h1>
        <h2>Rental Service</h2>
      </div>
    </div>

    <nav class="nav">
      <router-link to="/adminDashboard" class="nav-link" active-class="active">Dashboard</router-link>
      <router-link to="/admin/house" class="nav-link" active-class="active">Houses</router-link>
      <router-link to="/admin/room" class="nav-link" active-class="active">Rooms</router-link>
      <router-link to="/admin/lanlord" class="nav-link" active-class="active">Landlords</router-link>
      <router-link to="/admin/Tenant" class="nav-link" active-class="active">Tenants</router-link>
      <router-link to="/admin/message" class="nav-link" active-class="active">Messages</router-link>
      <router-link to="/admin/promotion" class="nav-link" active-class="active">Promotion</router-link>
      <router-link to="/admin/invoice" class="nav-link" active-class="active">Invoices</router-link>
    </nav>

    <div class="nav-right">
      <button class="notification-btn">
        <Icon icon="ic:outline-notifications" width="40" height="40" />
        <span class="notification-dot"></span>
      </button>
      <div class="admin-dropdown">
        <Icon icon="fluent:person-circle-32-filled" width="36" height="36" />
        <span class="admin-name">Admin</span>
        <Icon icon="material-symbols:menu" width="20" height="20" />
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

.nav{
  display: flex;
  gap: 30px;
  justify-content: center;
  flex: 1;
}

.nav-link {
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  position: relative;
  padding: 6px 10px;
  border-radius: 6px;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #111827;
}

.nav-link.active {
  color: black;
  font-weight: 600;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification-btn {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.notification-btn:hover {
  background-color: #f3f4f6;
}

.notification-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
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

.admin-name {
  font-size: 16px;
  font-weight: 500;
  color: #374151;
}
</style>
