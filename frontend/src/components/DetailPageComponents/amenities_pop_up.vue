<template>
    <div class="amenities-container-overlay" v-if="showAmenities">
        <div class="amenities-container">
            <button @click="$emit('close')" class="close-button">
                <Icon icon="charm:cross" width="30" height="30" />
            </button>
            <h2>What this place offers</h2>

            <div class="aminties-section-row" v-if="guestFavorites.length">
                <h3>Popular Amenities</h3>
                <p v-for="(amenity, index) in guestFavorites" :key="'gf-' + index">
                    <Icon :icon="amenity.icon_name" width="24" height="24" />
                    {{ amenity.name }}
                </p>
            </div>

            <div class="aminties-section-row" v-if="standoutAmenities.length">
                <h3>Stand-Out Amenities</h3>
                <p v-for="(amenity, index) in standoutAmenities" :key="'so-' + index">
                    <Icon :icon="amenity.icon_name" width="24" height="24" />
                    {{ amenity.name }}
                </p>
            </div>

            <div class="aminties-section-row" v-if="safetyItems.length">
                <h3>Safety Item Amenities</h3>
                <p v-for="(amenity, index) in safetyItems" :key="'si-' + index">
                    <Icon :icon="amenity.icon_name" width="24" height="24" />
                    {{ amenity.name }}
                </p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'amenities-pop-up',
    props: {
        showAmenities: {
            type: Boolean,
            require: true
        },
        amenities: {
            type: Array,
            require: true
        }
    },
    computed: {
        guestFavorites() {
            return this.amenities.filter(a => a.type === 'guest_favorite');
        },
        standoutAmenities() {
            return this.amenities.filter(a => a.type === 'standout');
        },
        safetyItems() {
            return this.amenities.filter(a => a.type === 'safety_items');
        }
    }
}
</script>

<style scoped>
.amenities-container-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.amenities-container {
    background-color: white;
    padding: 50px;
    border-radius: 20px;
    width: 50%;
    height: 70%;
    overflow-y: scroll;
    position: relative;
}

.close-button {
    position: absolute;
    top: 25px;
    right: 25px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.aminties-section-row p {
    padding-bottom: 25px;
    gap: 20px;
    border-bottom: 1px solid lightgray;
    display: flex;

}

.aminties-section-row h3 {
    padding-bottom: 15px;
    padding-top: 15px;
}
</style>