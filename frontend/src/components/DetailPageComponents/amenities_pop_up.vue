<template>
    <div class="amenities-container-overlay" v-if="showAmenities">
        <div class="amenities-container">          
             <button @click="$emit('close')" class="close-button">
                <Icon icon="charm:cross" width="30" height="30" />
            </button>
            <h2>What this place offers</h2>
            <div class="aminties-section-row">
                <h3>Poppular Amenities</h3>
                <p><Icon icon="material-symbols:wifi" width="20" height="20"/> Wifi</p>
                <p><Icon icon="material-symbols-light:tv-outline-rounded" width="20" height="20"/> TV</p>
                <p><Icon icon="fluent:oven-48-regular" width="20" height="20"/> Kitchen</p>
                <p><Icon icon="fluent:washer-32-regular" width="20" height="20"/> Washer</p>
            </div>
            <div class="aminties-section-row">
                <h3>Stand-Out Amenities</h3>
                <p><Icon icon="cil:pool" width="20" height="20"/> Pool</p>
                <p><Icon icon="icon-park-outline:coffee-machine" width="20" height="20"/> Coffee machine</p>
            </div>
            <div class="aminties-section-row">
                <h3>Safety Item Amenities</h3>
                <p><Icon icon="tabler:alarm-smoke" width="20" height="20"/> Smoke Alarm</p>
                <p><Icon icon="hugeicons:first-aid-kit" width="20" height="20"/> First aid kit</p>
                <p><Icon icon="streamline:fire-extinguisher-sign" width="20" height="20"/> Fire extinguisher</p>
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