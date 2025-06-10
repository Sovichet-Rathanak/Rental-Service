<template>
    <div class="amenities-container-overlay" v-if="showAmenities">
        <div class="amenities-container">
            <button @click="$emit('close')"><Icon icon="charm:cross" width="30" height="30"/></button>
            <h2>What this place offers</h2>

            <div class="buttons-container">
                <h3>Popular Amenities</h3>
                <div class="fave-amen-container">
                    <StepButton v-for="(amenity, index) in guestFavorites" :key="'fave-' + index" :label="amenity.label"
                        :icon="amenity.icon" :active="selectedAmenities.includes(amenity)"
                        @setActive="toggleAmenity(amenity)"></StepButton>
                </div>
                <h3>Standout Amenities</h3>
                <div class="stand-amen-container">
                    <StepButton v-for="(amenity, index) in standOut" :key="'standOut-' + index" :label="amenity.label"
                        :icon="amenity.icon" :active="selectedAmenities.includes(amenity)"
                        @setActive="toggleAmenity(amenity)"></StepButton>
                </div>
                <h3>Safety Item Amenities</h3>
                <div class="safety-amen-container">
                    <StepButton v-for="(amenity, index) in safetyItems" :key="'safety-' + index" :label="amenity.label"
                        :icon="amenity.icon" :active="selectedAmenities.includes(amenity)"
                        @setActive="toggleAmenity(amenity)"></StepButton>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import StepButton from '@/components/StepButton.vue';
export default{
    name: 'amenities-pop-up',
    props:{
        showAmenities:{
            type: Boolean,
            require: true
        }
    },
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
                    label: "Smoke Alarm",
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
.amenities-container-overlay{
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
.amenities-container{
    background-color: white;
    padding: 50px;
    border-radius: 40px;
    width: 50%;
    height: 70%;
    overflow-y: scroll;
}

button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding-left: 97%;
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