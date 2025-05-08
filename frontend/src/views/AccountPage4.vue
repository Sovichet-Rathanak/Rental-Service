<template>
    <header-nav-2></header-nav-2>
    <div class="security-container">
      <div class="breadcrumb">
        <span>Account</span>
        <span class="divider">></span>
        <span>Login security</span>
      </div>
  
      <h1 class="security-title">Login security</h1>
  
      <div class="main-layout">
        <div class="tab-container">
          <div class="tabs">
            <button class="tab-button active">LOGIN</button>
            <button class="tab-button">SHARED ACCESS</button>
          </div>
  
          <div class="security-item">
            <div class="item-details">
              <h4>Login</h4>
              <div class="info-line">
                <span>Email address</span>
                <span class="update-info">Last updated 8 days ago</span>
              </div>
            </div>
            <span class="action-text update">Update</span>
          </div>
  
          <div class="security-item">
            <div class="item-details">
              <div class="info-line">
                <span>Phone number</span>
              </div>
            </div>
            <span class="action-text update">Update</span>
          </div>
  
          <div class="security-item">
            <div class="item-details">
              <div class="info-line">
                <span>Facebook</span>
                <span class="status">Not connected</span>
              </div>
            </div>
            <span class="action-text connect">Connect</span>
          </div>
  
          <div class="security-item">
            <div class="item-details">
              <div class="info-line">
                <span>Google</span>
                <span class="status">Connected</span>
              </div>
            </div>
            <span class="action-text disconnect">Disconnect</span>
          </div>
  
          <div class="account-section">
            <h4>Account</h4>
            <span class="action-text deactivate">Deactivate account</span>
          </div>
        </div>
  
        <div class="security-info">
          <div class="info-header">
            <svg class="shield-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,11H19C18.47,14.85 16.24,18.28 12,19.92C7.76,18.28 5.53,14.85 5,11H12V11Z" />
            </svg>
            <p class="info-title">Keeping your account secure</p>
          </div>
          <p class="info-text">We regularly review accounts to make sure they’re secure as possible. We’ll also let you know if there’s more we can do to increase the security of your account.</p>
          <a href="#" class="info-link">Learn about safety tips for guests and hosts.</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import HeaderNav2 from '../components/headerComponents/HeaderNav2.vue'
  export default {
  components: { HeaderNav2 },
    name: 'AccountPage4',
    // Component logic would go here
  }
  </script>
  
  <style scoped>
  .security-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 35px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  .breadcrumb {
    font-size: 22px;
    color: #000000;
    margin-bottom: 35px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .divider {
    margin: 0 5px;
  }
  
  .tab-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    max-width: 1600px;
    width: 65%;
    margin: 0 auto;
  }
  
  .tabs {
    display: flex;
    border-bottom: 1px solid #767676;
  }
  
  .tab-button {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    color: #767676;
    background: none;
    border: none;
    cursor: pointer;
    letter-spacing: 0.5px;
    position: relative;
    margin-right: 8px;
  }
  
  .tab-button.active {
    color: #000;
  }
  
  .tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 4px; /* Increased thickness to match the image */
    background-color: #000;
  }
  
  .security-title {
    margin: 0 0 10px 0;
    padding: 0;
    font-weight: bold;
    font-size: 48px;
    color: #000;
  }
  
  .main-layout {
    display: flex;
    gap: 100px;
  }
  
  .security-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    border-bottom: 1px solid #aaaaaa;
  }
  
  .item-details {
    flex: 1;
  }
  
  .item-details h4 {
    margin: 0 0 16px 0;
    font-size: 26px;
    font-weight: bold;
    color: #000;
  }
  
  .info-line {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .info-line span {
    font-size: 20px;
    color: #000000;
  }
  
  .update-info, .status {
    font-size: 14px !important;
    color: #999 !important;
  }
  
  .action-text {
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    padding-left: 20px;
  }
  
  .update {
    color: #008489;
  }
  
  .connect {
    color: #1877f2;
  }
  
  .disconnect {
    color: #767676;
  }
  
  .deactivate {
    color: #ff0000;
  }
  
  .account-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0;
    border-bottom: 1px solid #767676;
    margin-bottom: 60px;
    width: 83vw;
  }
  
  .account-section h4 {
    margin: 0;
    font-size: 26px;
    font-weight: bold;
    color: #000;
  }
  
  .security-info {
    flex: 1;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 16px;
    border: #000000 1.5px solid;
    height: fit-content;
    width: 35%;
    position: sticky;
    margin-top: 50px;
    max-width: 450px;
  }
  
  .info-header {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 35px;
  }
  
  .shield-icon {
    width: 36px;
    height: 36px;
    color: #008489;
  }
  
  .info-title {
    font-weight: bold;
    margin: 0;
    font-size: 24px;
    color: #000;
  }
  
  .info-text {
    margin: 0 0 20px;
    font-size: 18px;
    color: #000000;
    line-height: 1.6;
  }
  
  .info-link {
    color: #008185;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    display: inline-block;
    margin-top: 5px;
  }
  
  .info-link:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 1400px) {
    .main-layout {
      display: flex;
      gap: 50px;
    }
    
    .security-info {
      position: static;
      margin-top: 60px;
    }
  }
  </style>