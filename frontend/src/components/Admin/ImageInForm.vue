<template>
  <div class="header">
    <div style="display: flex; align-items: center; gap: 20px; color: black">
      <router-link :to="backRoute">
        <Icon icon="material-symbols:arrow-back-rounded" width="33" height="33" style="color: black;"/>
      </router-link>
      <h2>{{ title }}</h2>
    </div>
  </div>

  <div class="addImage" :class="{ 'no-image': !imageSelected }">
    <img :src="previewUrl || imageUrl" alt="Uploaded Image" :class="{ 'uploaded': imageSelected }" />
    <!-- Only show the overlay button if no image is uploaded -->
    <div v-if="!imageSelected" class="buttonOverlay">
      <button @click="triggerFileInput">{{ text }}</button>
      <input
        type="file"
        accept="image/*"
        ref="fileInput"
        @change="handleImageUpload"
        style="display: none"
      />
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  components: { Icon },
  props: {
    text: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: String, 
    backRoute: { type: String, default: () => '/landlord'},
  },
  data() {
    return {
      previewUrl: null,
      imageSelected: false,
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const preview = URL.createObjectURL(file);
        this.previewUrl = preview;
        this.imageSelected = true;
        this.$emit('image-uploaded', file);
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.addImage {
  position: relative;
  width: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 5px 0 40px 5px;
}
.addImage img {
  width: 100%;
  height: 400px;
  display: block;
  filter: brightness(40%);
  transition: filter 0.3s;
}

.addImage img.uploaded {
  filter: brightness(100%);
}
.back{
  all: unset;
  cursor: pointer;
}
.buttonOverlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.buttonOverlay button {
  background-color: black;
  color: white;
  border: 0.5px solid #989898;
  padding: 14px 24px;
  font-size: 18px;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 600;
}
.buttonOverlay button:hover {
  background-color: #333;
}
</style>
