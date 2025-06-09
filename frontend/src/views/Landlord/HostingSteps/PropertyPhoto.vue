<template>
    <div class="container">
        <hgroup>
            <h1>Add some photos of your property</h1>
            <h2>You'll need 5 photos to get started. You can add more or make changes later.</h2>
        </hgroup>
        <div v-if="images.length" class="image-grid">
            <div v-for="(img, index) in images" :key="index" class="preview-item">
                <img :src="img.dataUrl" :alt="img.name" class="preview-img" />
                <button @click="removeImage(index)" class="remove-btn">
                    <Icon icon="maki:cross" width="14" height="14" style="color: #000" />
                </button>
            </div>
            <label class="upload-box">
                <input type="file" accept="image/*" multiple @change="onFileChange">
                <div class="upload-content">
                    <div class="upload-icon">
                        <Icon icon="fluent-emoji:camera-with-flash" width="40" height="40" />
                    </div>
                    <div class="upload-text">
                        <h4 class="secondary-text">Add more photos</h4>
                    </div>
                </div>
            </label>
        </div>

        <label v-else class="input-container">
            <input type="file" accept="image/*" multiple @change="onFileChange">
            <div class="upload-content">
                <div class="upload-icon">
                    <Icon icon="fluent-emoji:camera-with-flash" width="100" height="100" />
                </div>
                <div class="upload-text">
                    <h3 class="primary-text">Drag your photos here</h3>
                    <h4 class="secondary-text">or <span class="browse-text">upload from your device</span></h4>
                </div>
            </div>
        </label>
    </div>
</template>

<script>
import { useImageStore } from '@/stores/image';
import { mapStores } from 'pinia';

export default {
    computed: {
        ...mapStores(useImageStore),
        images() {
            return this.imageStore.images;
        }
    },

    methods: {
        onFileChange(event) {
            this.imageStore.handleImageUpload(event);
        },
        removeImage(index) {
            this.imageStore.removeImage(index);
        },
    },

    mounted() {
        if (this.imageStore && this.imageStore.loadFromLocalStorage) {
            this.imageStore.loadFromLocalStorage();
        }
    }
};
</script>


<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0;
    box-sizing: border-box;
}

hgroup {
    align-self: flex-start;
}

h1 {
    margin-bottom: 10px;
    padding-top: 20px;
}

h2 {
    margin: 0;
    color: grey;
}

.input-container {
    margin-top: 30px;
    border-radius: 20px;
    width: 45%;
    height: 600px;
    background-color: #ffffff;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 2px dashed #dddddd;
    transition: all 0.2s ease;
    overflow: hidden;
}

.input-container:hover {
    border-color: #345FCC;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3),
        0 4px 12px rgba(0, 0, 0, 0.09);
}

.input-container>input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.upload-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}


.upload-icon {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.upload-text {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;
}

.primary-text {
    margin: 0;
    color: #222222;
}

.secondary-text {
    margin: 0;
    color: #717171;
}

.browse-text {
    font-weight: 600;
    text-decoration: underline;
}

.preview-item {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.remove-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 6px;
    right: 6px;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.remove-btn:hover {
    background-color: rgba(255, 0, 0, 0.8);
    color: white;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    width: 100%;
    max-width: 900px;
    margin-top: 40px;
}

.upload-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px dashed #dddddd;
    border-radius: 12px;
    height: 150px;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    background-color: #fafafa;
    aspect-ratio: 1/1;
    height: auto;
    min-height: 150px;
}

.upload-box:hover {
    border-color: #345FCC;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.upload-box input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    top: 0;
    left: 0;
}
</style>