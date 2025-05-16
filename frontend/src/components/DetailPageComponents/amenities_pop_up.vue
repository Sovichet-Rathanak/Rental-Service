<template>
    <div class="amenities-container-overlay" v-if="showAmenities">
        <div class="amenities-container">
            <button @click="$emit('close')"><Icon icon="charm:cross" width="30" height="30"/></button>
            <h2>What this place offers</h2>
            <div class="aminties-section-row">
                <h3>Scenic views</h3>
                <p><Icon icon="mdi:flower-outline" width="20" height="20"/> Garden view</p>
                <p><Icon icon="mdi:flower-outline" width="20" height="20"/> Courtyard view</p>
            </div>
            <div class="aminties-section-row">
                <h3>Bathroom</h3>
                <p><Icon icon="hugeicons:shampoo" width="20" height="20"/> Shampoo</p>
                <p><Icon icon="material-symbols:bath-private-outline-rounded" width="20" height="20"/> Hot water</p>
                <p><Icon icon="mingcute:shower-gel-line" width="20" height="20"/> Shower gel</p>
                <p><Icon icon="gravity-ui:bucket" width="20" height="20"/> Cleaning product</p>
            </div>
            <div class="aminties-section-row">
                <h3>Bedroom</h3>
                <p><Icon icon="bx:blanket" width="20" height="20"/>Bad linens</p>
                <p><Icon icon="lucide-lab:wardrobe" width="20" height="20"/> Wardrobe</p>
                <p><Icon icon="material-symbols:bed-outline" width="20" height="20"/> King size bed</p>
            </div>
            <div class="aminties-section-row">
                <h3>Internet and office </h3>
                <p><Icon icon="material-symbols:wifi-rounded" width="20" height="20"/> Wifi</p>
                <p><Icon icon="hugeicons:study-desk" width="20" height="20"/> Dedicated workspace</p>
            </div>
            <div class="aminties-section-row">
                <h3>Kitchen and dining</h3>
                <p><Icon icon="mdi:fridge" width="20" height="20"/>Refrigerator</p>
                <p><Icon icon="material-symbols:microwave" width="20" height="20"/> Microwave</p>
                <p><Icon icon="mdi:silverware-clean" width="20" height="20"/> Dishes</p>
                <p><Icon icon="material-symbols:table-bar" width="20" height="20"/> Dining table</p>
            </div>
        </div>
    </div>

</template>

<script>
export default{
    name: 'amenities-pop-up',
    props:{
        showAmenities:{
            type: Boolean,
            require: true
        }
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
    border-radius: 20px;
    width: 50%;
    height: 70%;
    overflow-y: scroll;
}
button{
    background-color: transparent;
    border: none;
    cursor: pointer;
}
.aminties-section-row p{
    padding-bottom: 25px;
    gap: 20px;
    border-bottom: 1px solid lightgray;
    display: flex;

}
.aminties-section-row h3{
    padding-bottom: 15px;
    padding-top: 15px;
}
</style>