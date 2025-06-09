<template>
    <div class="container">
        <h1>Tell guests what your place has to offer</h1>
        <h2>You can add more amenities after you publish your listing.</h2>

        <div class="buttons-container">
            <h3>What about these guest favorites?</h3>
            <div class="fave-amen-container">
                <StepButton v-for="(amenity) in guestFavorites" :key="'fave-' + amenity.id"
                    :label="amenity.label" :icon="amenity.icon" :active="isAmenitySelected(amenity)"
                    @setActive="() => toggleAmenity(amenity)" />
            </div>

            <h3>Do you have any standout amenities?</h3>
            <div class="stand-amen-container">
                <StepButton v-for="(amenity) in standOut" :key="'standOut-' + amenity.id" :label="amenity.label"
                    :icon="amenity.icon" :active="isAmenitySelected(amenity)"
                    @setActive="() => toggleAmenity(amenity)" />
            </div>

            <h3>Do you have any of these safety items?</h3>
            <div class="safety-amen-container">
                <StepButton v-for="(amenity) in safetyItems" :key="'safety-' + amenity.id" :label="amenity.label"
                    :icon="amenity.icon" :active="isAmenitySelected(amenity)"
                    @setActive="() => toggleAmenity(amenity)" />
            </div>
        </div>
    </div>
</template>

<script>
import StepButton from '@/components/StepButton.vue';
import { useListingStore } from '@/stores/listing';
import { mapStores } from 'pinia';

export default {
    computed: {
        ...mapStores(useListingStore),

        guestFavorites() {
            return this.listingStore.amenitiesOptions
                .filter(amenity => amenity.type === "guest_favorite")
                .map(amenity => ({
                    id: amenity.id,
                    label: amenity.name,
                    icon: amenity.icon_name
                }))
        },

        standOut() {
            return this.listingStore.amenitiesOptions
                .filter(amenity => amenity.type === "standout")
                .map(amenity => ({
                    id: amenity.id,
                    label: amenity.name,
                    icon: amenity.icon_name
                }))
        },

        safetyItems() {
            return this.listingStore.amenitiesOptions
                .filter(amenity => amenity.type === "safety_items")
                .map(amenity => ({
                    id: amenity.id,
                    label: amenity.name,
                    icon: amenity.icon_name
                }))
        }
    },

    mounted() {
        this.listingStore.fetchAmenities();
    },
    methods: {
        isAmenitySelected(amenity) {
            return this.listingStore.listingForm.amenities.some(amn => amn.id === amenity.id);
        },

        toggleAmenity(amenity) {
            const selected = this.listingStore.listingForm.amenities;
            const exists = selected.find(amn => amn.id === amenity.id);

            if (exists) {
                this.listingStore.listingForm.amenities = selected.filter(amn => amn.id !== amenity.id);
            } else {
                this.listingStore.listingForm.amenities.push(amenity);
            }
        },
    },
    components: {
        StepButton
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 0;
    box-sizing: border-box;
}

h1 {
    margin-bottom: 10px;
    padding-top: 20px;
}

h2 {
    margin: 0;
    color: grey;
}

h3 {
    margin: 50px 0px 10px 0px;
}

.buttons-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
}

.fave-amen-container,
.stand-amen-container,
.safety-amen-container {
    display: grid;
    align-self: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 5px;
}
</style>