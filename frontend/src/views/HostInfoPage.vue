<template>
  <div class="host-container">
    <h2 class="host-title">Meet Your Host</h2>
    <div class="host-main">
      <div class="host-card">
        <div class="host-info">
          <div class="host-icon-container">
            <svg class="host-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM6.02332 15.4163C7.49083 17.6069 9.69511 19 12.1597 19C14.6243 19 16.8286 17.6069 18.2961 15.4163C16.6885 13.9172 14.5312 13 12.1597 13C9.78821 13 7.63095 13.9172 6.02332 15.4163ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"/>
              <circle cx="20" cy="6" r="2" fill="#1a73e8"/>    
            </svg>
            <h3>Shen Yue</h3>
          </div>
          <div class="host-details">
            <div class="stats">
              <p class="underline">300 reviews</p>
              <p class="underline">★4.88 ratings</p>
              <p class="underline">5 years on Romdoul</p>
            </div>
            <button @click="toggleHostInfo" class="host-info-btn">Host Info</button>
          </div>
        </div>
      </div>
      <div v-if="showHostInfo" class="host-info-panel">
        <h2>About Shen Yue</h2>
        <p><span>🔊</span> Speak English, French and Khmer <span class="divider"></span> <span>🏠</span> Lives in Phnom Penh, Cambodia</p>
        <p>I love traveling very much, and I know what you need and hope that my villa and service will bring you a more perfect vacation! I hope to make friends with you.</p>
        <h2>Host Details</h2>
        <p>Response rate: 100%</p>
        <p>Responds within an hour</p>
        <button @click="toggleHostInfo" class="message-btn">Message host</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHostInfo: false
    };
  },
  methods: {
    toggleHostInfo() {
      this.showHostInfo = !this.showHostInfo;
    }
  }
};
</script>

<style scoped>
.host-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
}

.host-title {
  margin-top: 0;
  font-size: 50px;
  color: #333;
  text-align: center;
  width: 100%;
}

.host-main {
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
}

.host-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 250px;
}

.host-info {
  display: flex;
  align-items: flex-start;
}

.host-icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
}

.host-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
}

.host-icon-container h3 {
  margin: 0;
  color: #1a73e8;
  font-size: 35px;
}

.host-details {
  margin-left: 50px;
}

.stats {
  margin-bottom: 30px;
}

.stats p {
  margin: 10px 0;
  color: #000000;
  font-size: 22px;
}

.underline {
  position: relative;
  padding-bottom: 5px;
  width: 220px;
}

.underline::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #757575;
}

.host-info-btn {
  background-color: #000;
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  font-size: 24px;
}

.host-info-btn:hover {
  background-color: #110040;
}
.host-info-btn:focus {
  outline: none;
}

.host-info-panel {
  margin-left: 40px;
  padding: 0px 50px;
  width: 1000px;
  color: #333;
}

.host-info-panel h2 {
  margin-top: 0;
  font-size: 35px;
}

.divider {
    margin: 0 50px;
  }

.host-info-panel p {
  margin: 20px 0;
  font-size: 22px;
}

.message-btn {
  background-color: #000;
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 10px;
  cursor: pointer;
  width: 300px;
  font-size: 24px;
}

.message-btn:hover {
  background-color: #110040;
}
</style>