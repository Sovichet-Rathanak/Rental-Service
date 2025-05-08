<template>
  <div class="modal-actions">
    <!-- Back Button -->
    <button class="action-btn back-btn" @click="closeModal">
      <Icon icon="weui:back-filled" class="icon-spacing" />
      <span>Back</span>
    </button>

    <!-- Save Button -->
    <button class="action-btn save-btn" @click="saveImage">
      <Icon icon="mdi:heart" class="icon-spacing-right" />
      <span>Save</span>
    </button>
  </div>
  <!-- Accommadation image -->
  <div class="gallery">
    <div class="gallery-layout">
      <div class="main-photo" @click="openModal(0)">
        <img :src="images[0].thumb" alt="Main Room" />
      </div>
      <div class="side-photos">
        <div v-for="(image, index) in images.slice(1, 5)" :key="index" class="small-photo"
          @click="openModal(index + 1)">
          <img :src="image.thumb" :alt="`Room ${index + 2}`" />
        </div>
      </div>
    </div>

    <!-- Modal close btn-->
    <div v-if="currentIndex !== null" class="modal" @click="closeModal">
      <span class="close-btn" @click="closeModal">
        <Icon icon="charm:cross" />
      </span>
      <div class="modal-content" @click.stop>
        <img :src="images[currentIndex].full" class="enlarged-image" />

        <!-- Navigation buttons -->
        <button class="nav-btn left" @click="prevImage">
          <i class="arrow left"></i>
        </button>
        <button class="nav-btn right" @click="nextImage">
          <i class="arrow right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const images = [
  { thumb: '/src/assets/images/accommadationImg/bedroom1.jpeg', full: '/src/assets/images/accommadationImg/bedroom1.jpeg' },
  { thumb: '/src/assets/images/accommadationImg/bedroom2.jpeg', full: '/src/assets/images/accommadationImg/bedroom2.jpeg' },
  { thumb: '/src/assets/images/accommadationImg/bedroom3.jpeg', full: '/src/assets/images/accommadationImg/bedroom3.jpeg' },
  { thumb: '/src/assets/images/accommadationImg/bedroom4.jpeg', full: '/src/assets/images/accommadationImg/bedroom4.jpeg' },
  { thumb: '/src/assets/images/accommadationImg/bedroom5.jpeg', full: '/src/assets/images/accommadationImg/bedroom5.jpeg' },
]

const currentIndex = ref(null)

const openModal = (index) => {
  currentIndex.value = index
}

const closeModal = () => {
  currentIndex.value = null
}

const prevImage = () => {
  currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : images.length - 1
}

const nextImage = () => {
  currentIndex.value = currentIndex.value < images.length - 1 ? currentIndex.value + 1 : 0
}
</script>

<style scoped>
.gallery-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  width: 100%;
  height: 600px;
}

.main-photo,
.small-photo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-photo img,
.small-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.side-photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  width: 80%;
  aspect-ratio: 16 / 9;
  height: 80%;
  border-radius: 8px;
  overflow: hidden;
}

.enlarged-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: fixed;
  top: 20px;
  right: 30px;
  font-size: 30px;
  color: white;
  line-height: 1;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  z-index: 1002;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}


.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 1001;
}

.nav-btn.left {
  left: 20px;
}

.nav-btn.right {
  right: 20px;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.arrow {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  padding: 3px;
}

.arrow.left {
  transform: rotate(135deg);
  margin: 4px 0 0 8px;
}

.arrow.right {
  transform: rotate(-45deg);
  margin: 4px 8px 0 0;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0px 30px 0px;
}

.back-btn {
  background: none;
  border: none;
  color: #080808;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s ease;
}

.save-btn {
  background: none;
  border: none;
  color: #080808;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s ease;
}

.icon-spacing {
  margin-right: 8px;
}

.icon-spacing-right {
  margin-left: 8px;
}
</style>
