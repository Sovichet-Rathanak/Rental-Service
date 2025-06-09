<template>
    <div class="container">
        <hgroup class="title">
            <h1>Review your lisitng</h1>
            <h2>Here's what we'll show to guests. Make sure everything look good.</h2>
        </hgroup>
        <div class="content">
            <div class="card" @click="showPopup">
                <div class="image-container" v-if="firstImage">
                    <img :src="firstImage.dataUrl" alt="property image">
                </div>
                <div class="card-desc">
                    <h2 style="margin-bottom: 20px;">{{ listingForm.title }}</h2>
                    <div class="card-desc-sub">
                        <h3>${{ listingForm.price_monthly }}/month</h3>
                        <h3 style="display: flex; align-items: center; justify-content: center;">
                            <Icon icon="material-symbols:star-rounded" width="26" height="26" style="color: #000" />New
                        </h3>
                    </div>
                    <h3 style="width: 60%; color: grey;">{{ regionName }}, {{ listingForm.songkat }}, {{
                        listingForm.street_address }}</h3>
                </div>
            </div>
            <div class="next-step">
                <div class="row">
                    <Icon icon="formkit:checkbox" width="60" height="60" style="color: #000" />
                    <hgroup class="step-desc">
                        <h2>Confirm a few details and publish</h2>
                        <h3>We'll lets you know if you need to verify your identity or
                            register with the local government.</h3>
                    </hgroup>
                </div>
                <div class="row">
                    <Icon icon="guidance:calendar" width="60" height="60" style="color: #000" />
                    <hgroup class="step-desc">
                        <h2>Set up your calendar</h2>
                        <h3>Choose which dates your listing is available. It will be
                            visible 24 hours after you publish.</h3>
                    </hgroup>
                </div>
                <div class="row">
                    <Icon icon="lucide:pen-line" width="60" height="60" style="color: #000" />
                    <hgroup class="step-desc">
                        <h2>Adjust your settings</h2>
                        <h3>Set house rules, select a cancellation policy, choose
                            how guests book, and more.</h3>
                    </hgroup>
                </div>
            </div>
        </div>
        <div class="popup-overlay" v-if="popUp">
            <div class="popup-content">
                <div class="popup-head">
                    <Icon class="icon" icon="material-symbols:close-rounded" width="32" height="32" style="color: #000"
                        @click="showPopup" />
                    <h2>Full Preview</h2>
                </div>
                <div class="popup-main">
                    <div class="popup-image-container">
                        <img :src="firstImage.dataUrl" alt="property image">
                    </div>
                    <div class="popup-desc">
                        <div class="desc-title">
                            <h1 style="margin: 0;">{{ listingForm.title }}</h1>
                            <div class="rent-and-rating">
                                <h2>${{ listingForm.price_monthly }}/month</h2>
                                <div style="display: flex; flex-direction: row; align-items: center; gap: 5px;">
                                    <Icon icon="material-symbols:star-rounded" width="32" height="32"
                                        style="color: #000" />
                                    <h2>New</h2>
                                </div>
                            </div>
                            <h2 style="margin: 0px 0px 40px;">{{ regionName }}, {{ listingForm.songkat }}, {{
                                listingForm.street_address }}</h2>
                        </div>
                        <div class="amenities"
                            style="display: flex; align-items: center; justify-content: flex-start; gap: 15px;">
                            <h3>Amenities:</h3>
                            <Icon v-for="(amenities, index) in listingForm.amenities.slice(0,3)" :key="index" :icon="amenities.icon" width="20"
                                height="20" style="color: #000" />
                            <Icon icon="bi:three-dots" width="20" height="20" style="color: #000" />
                        </div>
                        <div>
                            <h2>Description</h2>
                            <p style="font-size: 20px;">{{ listingForm.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useImageStore } from '@/stores/image';
import { useListingStore } from '@/stores/listing';
import axios from 'axios';
import { mapState, mapStores } from 'pinia';

export default {
    data() {
        return {
            regionName: null,
            popUp: false,
        }
    },

    computed: {
        ...mapStores(useImageStore),
        ...mapState(useListingStore, ['listingForm']),

        firstImage() {
            return this.imageStore.images.length > 0 ? this.imageStore.images[0] : null;
        }
    },

    mounted() {
        this.imageStore.loadFromLocalStorage();
        this.fetchRegion()
    },

    methods: {
        async fetchRegion() {
            try {
                const { data: regionData } = await axios.get('http://localhost:3000/api/region');
                const selectedRegion = regionData.find(region => region.id === this.listingForm.region_id);
                this.regionName = selectedRegion.region_name;
                
                return this.regionName;
            } catch (error) {
                console.error("Failed to fetch region data:", error);
                return null;
            }
        },

        showPopup() {
            this.popUp = !this.popUp
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
}

.title {
    align-self: start;
}

.title>h1 {
    margin-bottom: 10px;
    padding-top: 20px;
}

.title>h2 {
    margin: 0px 0px 50px;
    color: grey;
}

.content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.card {
    box-sizing: border-box;
    padding: 20px;
    height: 36rem;
    width: 30%;
    background-color: white;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3),
        0 4px 12px rgba(0, 0, 0, 0.6);
}

.image-container {
    overflow: hidden;
    border-radius: 20px;
    width: 100%;
    height: 70%;
}

.image-container>img {
    width: 100%;
    height: 100%;
}

.next-step {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
}

.row {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.step-desc {
    width: 85%;
}

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.popup-content {
    box-sizing: border-box;
    border-radius: 16px;
    width: 75%;
    overflow: auto;
    background-color: white;
}

.popup-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    padding: 16px;
    position: relative;
    box-shadow: 0 6px 12px -6px rgba(0, 0, 0, 0.1);
}

.popup-head .icon {
    cursor: pointer;
    position: absolute;
    left: 30px;
}

.popup-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 625px;
    overflow: hidden;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 40px;
}

.popup-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
    background-color: grey;
}

.popup-image-container>img {
    width: 100%;
    height: 100%;
}

.rent-and-rating {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.rent-and-rating>h2 {
    margin-top: 10px;
}

.popup-desc {
    width: 50%;
}

.card-desc-sub {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-desc-sub>h3 {
    margin: 0;
    padding: 0;
}
</style>