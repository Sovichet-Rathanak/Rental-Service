<template>
  <div class="modal-actions">
    <!-- Back Button -->
    <button class="action-btn back-btn" @click="goBack">
      <Icon icon="weui:back-filled" class="icon-spacing" />
      <span>Back</span>
    </button>
    <!-- Save Button -->
    <button class="action-btn save-btn" @click="saveImage">
      <Icon icon="solar:heart-linear" class="icon-spacing-right" />
      <span>Save</span>
    </button>
  </div>

  <div class="gallery-layout" v-if="images.length > 0">
    <div class="main-photo" @click="openModal(0)">
      <img :src="images[0]" alt="Main Room" />
    </div>
    <div class="side-photos">
      <div v-for="(image, index) in images.slice(1, 5)" :key="index" class="small-photo" @click="openModal(index + 1)">
        <img :src="image" :alt="`Room ${index + 2}`" />
      </div>
    </div>
  </div>

  <div v-else>
    <Icon icon="eos-icons:bubble-loading" width="100" height="100" style="color: #000" />
  </div>

  <!-- Modal -->
  <div v-if="currentIndex !== null && images.length > 0" class="modal" @click="closeModal">
    <span class="close-btn" @click="closeModal">
      <Icon icon="charm:cross" />
    </span>
    <div class="modal-content" @click.stop>
      <div class="image-counter">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
      <img :src="images[currentIndex]" class="enlarged-image" />
      <!-- Navigation buttons -->
      <button class="nav-btn left" @click="prevImage">
        <i class="arrow left"></i>
      </button>
      <button class="nav-btn right" @click="nextImage">
        <i class="arrow right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: null,
    }
  },
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
  methods: {
    openModal(index) {
      this.currentIndex = index
    },
    closeModal() {
      this.currentIndex = null
    },
    prevImage() {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1
    },
    nextImage() {
      this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0
    },
    goBack() {
      this.$router.push({ name: "Home" })
    },
    saveImage() {
      console.log('Image saved!')
    }
  }
}
</script>

<style scoped>
.gallery-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  width: 100%;
  height: 600px;
  border-radius: 18px;
  overflow: hidden;
}

.main-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 18px 0 0 18px;
  overflow: hidden;
}

.main-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-photo:hover img {
  transform: scale(1.05);
}

.side-photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  height: 100%;
}

.small-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}

.small-photo:nth-child(1) {
  border-radius: 0 18px 0 0;
}

.small-photo:nth-child(4) {
  border-radius: 0 0 18px 0;
}

.small-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.small-photo:hover img {
  transform: scale(1.05);
}

/* Fixed Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 80vh;
  width: auto;
  height: auto;
  border-radius: 12px;
  overflow: hidden;
}

.enlarged-image {
  max-width: 100%;
  max-height: 80vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  background: #000;
}

.nav-btn.left {
  left: -80px;
}

.nav-btn.right {
  right: -80px;
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
  height: 100%;
}

.small-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}


.small-photo:nth-child(4) img {
  border-radius: 0 0 18px 0;
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
  font-size: 25px;
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
  font-size: 25px;
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

.image-counter {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 18px;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px 12px;
  border-radius: 20px;
  z-index: 1001;
  pointer-events: none;
  user-select: none;
}
</style>
