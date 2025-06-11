<template>
    <div class="container">
        <h1>Which of these best described your place?</h1>
        <div class="buttons-container">
            <StepButton icon="ph:house-fill" label="House" :active="accommodation_type === 'house'"
                @setActive="() => setActive('house')">
            </StepButton>

            <StepButton :active="accommodation_type === 'villa'" icon="lucide-lab:house-manor" label="Villa"
                @setActive="() => setActive('villa')">
            </StepButton>

            <StepButton :active="accommodation_type === 'borey'" icon="lucide-lab:houses" label="Borey"
                @setActive="() => setActive('borey')">
            </StepButton>

            <StepButton :active="accommodation_type === 'apartment'" icon="ic:round-apartment" label="Apartment"
                @setActive="() => setActive('apartment')">
            </StepButton>

            <StepButton :active="accommodation_type === 'traditional_house'" icon="fontisto:holiday-village"
                label="Traditional House" @setActive="() => setActive('traditional_house')">
            </StepButton>
        </div>
    </div>
</template>

<script>
import StepButton from '@/components/StepButton.vue';
import { useListingStore } from '@/stores/listing';
import { mapStores } from 'pinia';

export default {
    data() {
        return {
            accommodation_type: null,
        }
    },
    methods: {
        setActive(type) {
            if (this.accommodation_type === type) {
                this.accommodation_type = null;
                this.listingStore.updateField('property_type', '');
            } else {
                this.accommodation_type = type;
                this.listingStore.updateField('property_type', type);
            }
            console.log(this.listingStore.listingForm.property_type)
        }
    },

    components: {
        StepButton
    },

    computed: {
        ...mapStores(useListingStore),

        accommodation_type:{
            get(){
                return this.listingStore.listingForm.property_type;
            },

            set(type){
                this.listingStore.listingForm.updateField('property_type', type);
            }
        }
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.buttons-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    width: 70%;
    box-sizing: border-box;
    padding: 15px;
}

.custom-button {
    box-sizing: border-box;
    width: 1fr;
    height: fit-content;
    padding: 15px;
    border-radius: 12px;
    cursor: pointer;
    border: 2px solid transparent;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(0, 0, 0, 0.08);
    user-select: none;
}
</style>