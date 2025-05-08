<template>
    <div class="status-card-overlay">
        <div class="status-card">
            <button class="close-btn" @click="$emit('close')">
                <Icon class="icon" icon="iconamoon:arrow-left-2-light"/>
            </button>
            <PropertyCard class="property"></PropertyCard>
            <div class="detailContainer">
                <div class="detail">
                    <Icon class="icon" icon="solar:home-outline"/>
                    <p>Property: {{ notification.propertyName }}</p>
                </div>
                <div class="detail">
                    <Icon class="icon" icon="solar:calendar-linear"/>
                    <p>Requested Date: {{ notification.requestedDate }}</p>
                </div>
                <div class="detail">
                    <Icon class="icon" :icon="iconName" :color="iconColor"/>
                    <p>Status: {{ notification.status }}</p>
                </div>  
            </div>
        </div>
    </div>
</template>
  
<script>
import { Icon } from '@iconify/vue';
import PropertyCard from '../PropertyCard.vue';

export default {
    components:{
        PropertyCard,
        Icon
    },
    props: {
        notification: Object,
        iconName: String,
        iconColor: String
    },
};
</script>

<style scoped>
.status-card-overlay {
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

.status-card {
    background: white;
    padding: 20px;
    border-radius: 16px;
    width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    padding-inline: 20px;
}

.status-card img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin-bottom: 10px;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin-bottom: 10px;
}
.property{
    width: 75%;
    margin-left: 50px;
}
.detailContainer{
    display: flex;
    flex-direction: column;
    padding-inline: 20px;
}
.detail{
    display: flex;
    flex-direction: row;
    align-items: center;
}
p{
    margin-left: 10px;
}
.icon{
    width: 30px;
    height: 30px;
}
</style>
