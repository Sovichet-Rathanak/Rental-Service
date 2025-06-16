<template>
  <header>
    <HeaderNav2 />
  </header>

  <div class="security-container">
    <BreadCrumbs class="breadcrumbs" />

    <h1 style="margin: 20px 0px;">Login security</h1>

    <div class="main-layout">
      <div class="left-pane">
        <div class="tab-container">

          <div class="security-item">
            <div class="item-details">
              <h4 style="margin: 0; font-weight: 500;">Login</h4>
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
                <h4 style="margin: 0; font-weight: 500;">Facebook</h4>
                <span class="status">Not connected</span>
              </div>
            </div>
            <span class="action-text connect">Connect</span>
          </div>

          <div class="security-item">
            <div class="item-details">
              <div class="info-line">
                <h4 style="margin: 0; font-weight: 500;">Google</h4>
                <span class="status">Connected</span>
              </div>
            </div>
            <span class="action-text disconnect">Connect</span>
          </div>

          <div class="account-section">
            <h4>Account</h4>
            <span class="action-text deactivate">Deactivate account</span>
          </div>
        </div>
      </div>

      <div class="right-pane">
        <div class="security-info">
          <div class="info-header">
            <Icon icon="ion:shield-half-sharp" width="40" height="40" style="color: #000" />
            <p class="info-title">Keeping your account secure</p>
          </div>
          <p class="info-text">
            We regularly review accounts to make sure they’re secure as possible. We’ll also let you
            know if there’s more we can do to increase the security of your account.
          </p>
          <a href="#" class="info-link">Learn about safety tips for guests and hosts.</a>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <FooterComponent />
  </footer>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: 'LoginAndSecurity',
  components: {
    HeaderNav2,
    BreadCrumbs,
    FooterComponent
  }
}
</script>

<style scoped>
.security-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box; 
  width: 100%;
  padding-inline: 300px;
}

.breadcrumbs {
  margin: 30px 0px;
  justify-content: flex-start;
}

.main-layout {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.left-pane {
  width: 60%;
}

.right-pane {
  width: 30%;
}

.tab-container {
  width: 100%;
}

.security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid #aaaaaa;
}

.item-details h4 {
  margin-bottom: 16px;
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
  color: #000;
}

.update-info,
.status {
  font-size: 14px;
  color: #999;
}

.action-text {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  padding-left: 20px;
}

.update {
  color: #345FCC
}

.connect {
  color: #345FCC
}

.disconnect {
  color: #345FCC
}

.deactivate {
  color: #ff0000;
}

.account-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  margin-top: 50px;
}

.account-section h4 {
  margin: 0;
  font-size: 26px;
  font-weight: bold;
  color: #000;
}

.security-info {
  background-color: #fff;
  padding: 40px;
  border-radius: 16px;
  border: 1.5px solid #000;
  position: sticky;
  top: 30px;
  width: 100%;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.info-title {
  font-weight: bold;
  font-size: 24px;
  color: #000;
  margin: 0;
}

.info-text {
  font-size: 18px;
  color: #000;
  line-height: 1.6;
  margin-bottom: 15px;
}

.info-link {
  color: #345FCC;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
}

.info-link:hover {
  text-decoration: underline;
}
</style>
