<template>
    <div class="container">
        <h1>Tell guests what your place has to offer</h1>
        <h2>You can add more amenities after you publish your listing.</h2>
        <div class="buttons-container">
            <h3>What about these guest favorites?</h3>
            <div class="fave-amen-container">
                <StepButton v-for="(amenity, index) in guestFavorites" :key="'fave-' + index" :label="amenity.label"
                    :icon="amenity.icon" :active="selectedAmenities.includes(amenity)"
                    @setActive="toggleAmenity(amenity)"></StepButton>
            </div>
            <h3>Do you have any standout amenities?</h3>
            <div class="stand-amen-container">
                <StepButton v-for="(amenity, index) in standOut" :key="'standOut-' + index" :label="amenity.label"
                    :icon="amenity.icon" :active="selectedAmenities.includes(amenity)"
                    @setActive="toggleAmenity(amenity)"></StepButton>
            </div>
            <h3>Do you have any of these safety items?</h3>
            <div class="safety-amen-container">
                <StepButton v-for="(amenity, index) in safetyItems" :key="'safety-' + index" :label="amenity.label"
                    :icon="amenity.icon" :active="selectedAmenities.includes(amenity)"
                    @setActive="toggleAmenity(amenity)"></StepButton>
            </div>
        </div>
    </div>
</template>

<script>
import StepButton from '@/components/StepButton.vue';

export default {
    data() {
        return {
            selectedAmenities: [],
            guestFavorites: [
                {
                    label: "Wifi",
                    icon: 'material-symbols:wifi'
                },
                {
                    label: "TV",
                    icon: 'material-symbols-light:tv-outline-rounded'
                },
                {
                    label: "Kitchen",
                    icon: 'fluent:oven-48-regular'
                },
                {
                    label: "Washer",
                    icon: 'fluent:washer-32-regular'
                },
                {
                    label: "Free parking",
                    icon: 'iconoir:parking'
                },
                {
                    label: "Paid parking",
                    icon: 'maki:parking-paid'
                },
                {
                    label: "Air conditioning",
                    icon: 'mynaui:snow'
                },
                {
                    label: "Dedicated workspace",
                    icon: 'streamline:workspace-desk'
                }
            ],
            standOut: [
                {
                    label: "Pool",
                    icon: 'cil:pool'
                },
                {
                    label: "Coffee machine",
                    icon: 'icon-park-outline:coffee-machine'
                },
                {
                    label: "Balcony",
                    icon: 'iconoir:balcony'
                },
                {
                    label: "Garden",
                    icon: 'hugeicons:flower-pot'
                },
                {
                    label: "Fire pit",
                    icon: 'hugeicons:fire-pit'
                },
                {
                    label: "BBQ grill",
                    icon: 'hugeicons:bbq-grill'
                }
            ],
            safetyItems: [
                {
                    label: "Smoke alarm",
                    icon: 'tabler:alarm-smoke'
                },
                {
                    label: "First aid kit",
                    icon: 'hugeicons:first-aid-kit'
                },
                {
                    label: "Fire extinguisher",
                    icon: 'streamline:fire-extinguisher-sign'
                },
            ]
        }
    },
    methods: {
        toggleAmenity(amenity) {
            if (this.selectedAmenities.includes(amenity)) {
                this.selectedAmenities = this.selectedAmenities.filter(a => a !== amenity);
            } else {
                this.selectedAmenities.push(amenity);
            }
        }
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