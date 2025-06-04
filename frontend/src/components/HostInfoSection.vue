<template>
  <div>
    <h1 style="margin-top: 100px;">Meet Your Host</h1>
    <div class="info-main">
      <div class="host-card">
        <div class="host-icon">
          <div class="left" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div
              class="host-image"
              style="display: flex; justify-content: center; align-items: center; position: relative; cursor: pointer;"
              @click="showPopup = true"
            >
              <img :src="pfp" alt="Host Image" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover;" />
              <Icon icon="si:verified-fill" width="35" height="35" style="color: blue; position: absolute; bottom: 1px; right: -1px;" />
            </div>
            <h2>Shen Yue</h2>
          </div>
        </div>

        <div class="host-rating">
          <div class="right" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div class="rating-info">
              <div class="info-item">
                <span class="reviews">300</span>
                <span class="label">reviews</span>
              </div>
              <div class="info-item">
                <span class="rating">
                  <span class="star-icon">
                    <Icon icon="stash:star-solid" width="24" height="24" style="color: #000" />
                  </span>
                  {{ rating }}
                </span>
                <span class="label">rating</span>
              </div>
              <div class="info-item">
                <span class="years">5</span>
                <span class="label">years on Romdoul</span>
              </div>
            </div>
            <button class="host-info-btn">Host Info</button>
          </div>
        </div>
      </div>

      <div class="host-info">
        <div class="info-details">
          <h2>About Shen Yue</h2>
          <p>
            <span class="p-icon">
              <Icon icon="akar-icons:language" width="22" height="22" style="color: #000" />
            </span>
            Speak English, French and Khmer
            <span class="divider"></span>
            <span class="p-icon">
              <Icon icon="fluent:globe-location-24-regular" width="22" height="22" style="color: #000" />
            </span>
            Lives in Phnom Penh, Cambodia
          </p>
          <p>
            I love traveling very much, and I know what you need and hope that my villa and service will bring you a more
            perfect vacation! I hope to make friends with you.
          </p>
        </div>
        <div class="host-details">
          <h2>Host Details</h2>
          <p>Response rate: 100%</p>
          <p>Responds within an hour</p>
          <button class="host-message-btn">Message Host</button>
        </div>
      </div>
    </div>

    <!-- Rating Popup -->
    <div v-if="showPopup" class="overlay">
      <div class="popup">
        <div class="profile" style="display: flex; flex-direction: column; align-items: center;">
            <div style="position: relative; width: 80px; height: 80px;">
                <img :src="pfp" alt="Host Image" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;" />
                <Icon icon="si:verified-fill" width="20" height="20" style="color: blue; position: absolute; bottom: 0; right: 0;" />
            </div>
            <h3>Shen Yue</h3>
        </div>
        <div class="popup-content">
          <Icon icon="solar:home-bold" width="60" height="60" class="home-icon" style="color: blue; margin-top: 30px;" />
          <h2>Rate Your Landlord</h2>
          <p class="feedback">We value your feedback</p>
          <p class="helper">It helps us improve. Please fill out these following questions.</p>
          <p class="question">How would you rate your overall experience with this landlord?</p>
          <div class="stars">
            <Icon
              v-for="n in 5"
              :key="n"
              :icon="n <= selectedRating ? 'material-symbols:star' : 'material-symbols:star-outline'"
              width="40"
              height="40"
              class="star"
              @click="selectedRating = n"
            />
          </div>
          <button class="submit-btn" :disabled="selectedRating === 0" @click="submitRating">Submit</button>
          <p class="maybe-later" @click="showPopup = false">Maybe later</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import pfp from '@/assets/images/pfp.jpg'; 

const showPopup = ref(false);
const selectedRating = ref(0);
const rating = ref(4.88);

function submitRating() {
  rating.value = selectedRating.value;
  showPopup.value = false;
}
</script>

<style scoped>
/* Popup Specific */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background-color: white;
  border-radius: 50px;
  width: 450px;
  height: 620px;
  padding: 20px;
  text-align: center;
}

.profile {
    margin-top: 20px;
}

.profile h3 {
  font-size: 25px;
  margin: 0;
}

.popup-content h2 {
    margin-top: 20px;
    font-weight: bold;
    font-size: 35px;
}

.feedback {
  font-weight: bold;
}

.helper {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.question {
  font-weight: 500;
  margin: 20px 0;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.star {
  color: #f9a825;
  cursor: pointer;
}

.submit-btn {
  background-color: #3b49df;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  width: 200px;
  margin-bottom: 10px;
}
.submit-btn:disabled {
  background-color: #3b49df;
  cursor: not-allowed;
}

.maybe-later {
  color: #999;
  cursor: pointer;
  font-size: 14px;
}

/* CSS of host-info-section*/
.info-main {
  display: flex;
  flex-direction: row;
  gap: 100px;
  width: 100%;
}

.host-card {
  display: flex;
  border: 1px solid white;
  border-radius: 20px;
  flex-direction: row;
  gap: 20px;
  width: 35%;
  height: 300px;
  box-sizing: border-box;
  padding: 20px;
  background-color: white;
  box-shadow: 1px 8px 12px rgb(153, 153, 153);
}

.host-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 45%;
}

.host-rating {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 55%;
}

.info-item {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 1px 0;
  border-bottom: 1px solid #000000;
}

.reviews,
.rating,
.years {
  font-size: 22px;
  font-weight: bold;
  line-height: 1.2;
}

.rating .star-icon {
  color: #000;
  font-size: 22px;
  font-weight: bold;
  margin-right: 1px;
  vertical-align: middle;
  display: inline-block;
}

.label {
  font-size: 16px;
  font-weight: normal;
  color: #000;
}

.host-info-btn {
  margin-top: 15px;
  width: 60%;
  padding: 12px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}
.host-info-btn:hover {
  background-color: #000536;
}

.host-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 65%;
  height: 100%;
  margin-top: -25px;
}

.info-details p,
.host-details p {
  font-size: 18px;
  color: #000;
  margin: 0;
  padding: 7px;
}

.divider {
  margin: 0 90px;
}

.p-icon {
  margin-right: 10px;
  vertical-align: middle;
  display: inline-block;
  font-size: 28px;
  color: #000;
}

.host-message-btn {
  margin-top: 15px;
  width: 20%;
  padding: 12px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}
.host-message-btn:hover {
  background-color: #000536;
}
</style>
    