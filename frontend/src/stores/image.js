import axios from 'axios';
import { defineStore } from 'pinia';

export const useImageStore = defineStore('image', {
    state: () => ({
        images: [],
        storageInfo: ''
    }),

    actions: {
        async handleImageUpload(event) {
            const files = Array.from(event.target.files);
            for (const file of files) {
                if (file.size > 5 * 1024 * 1024) {
                    alert(`File ${file.name} is too large. Please choose files smaller than 5MB.`);
                    continue;
                }
                const dataUrl = await this.fileToBase64(file);
                const imageData = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    dataUrl: dataUrl,
                    timestamp: new Date().toISOString()
                };
                this.images.push(imageData);
            }
            this.saveToLocalStorage();
        },

        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        },

        saveToLocalStorage() {
            try {
                const dataToStore = {
                    images: this.images,
                    savedAt: new Date().toISOString()
                };
                localStorage.setItem('propertyImages', JSON.stringify(dataToStore));
                setTimeout(() => { this.storageInfo = ''; }, 3000);
            } catch (error) {
                console.error('Failed to save to localStorage:', error);
            }
        },

        loadFromLocalStorage() {
            try {
                const stored = localStorage.getItem('propertyImages');
                if (stored) {
                    const data = JSON.parse(stored);
                    this.images = data.images || [];
                    setTimeout(() => { this.storageInfo = ''; }, 3000);
                }
            } catch (error) {
                console.error('Failed to load from localStorage:', error);
                this.storageInfo = 'Failed to load from local storage';
            }
        },

        removeImage(index) {
            this.images.splice(index, 1);
            this.saveToLocalStorage();
        },

        dataUrlToFile(dataUrl, fileName, mimeType) {
            const arr = dataUrl.split(',');
            const mime = mimeType || arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], fileName, { type: mime });
        },

        async uploadAllImagesToBackend(listingId) {
            if (!listingId) {
                alert('Listing ID not provided. Cannot upload images.');
                return;
            }
            const uploadedImages = [];
            for (const image of this.images) {
                const file = this.dataUrlToFile(image.dataUrl, image.name, image.type);
                const formData = new FormData();
                formData.append('file', file);
                try {
                    const response = await axios.post(`http://localhost:3000/api/picture/upload/${listingId}`, formData, {
                        headers: {
                            'Content-Type': 'multi/form-data'
                        }
                    })

                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(`Failed to upload image ${image.name}`);
                    }

                    uploadedImages.push(response.data);
                } catch (error) {
                    console.error('Upload error:', error);
                }
            }
            this.images = uploadedImages;
            this.saveToLocalStorage();
        }
    }
});
