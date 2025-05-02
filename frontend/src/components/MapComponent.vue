<template>
    <V3Map style="width: 100%; height: 100%;" :center="{ lat: 13.360799118759584, lng: 103.85919048107581 }"
        :api-key=mapKey mapId="e096694d0d688909" :zoom="17" :clickableIcons="false" :disableDefaultUI="true">
        <V3Marker :options="{ position: { lat: 13.360799118759584, lng: 103.85919048107581 } }">
            <div class="icon-container">
                <Icon icon="bi:house-fill" width="24" height="24" style="color: white" />
            </div>
        </V3Marker>
    </V3Map>
</template>

<script setup>
const mapKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

</script>

<style scoped>
.icon-container {
    width: 50px;
    height: fit-content;
    background-color: #345fcc;
    border: 1px solid #345fcc;
    padding: 5px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 5px 4px rgb(0, 0, 0.1, 0.7);
}
</style>