<template>
    <header>
        <MessageHeader @toggle-notifications="toggleNotifications"></MessageHeader>
    </header>
    <div class="main-container">
        <EmptyMessage></EmptyMessage>
        <div class="notification-popup" v-if="showNotifications">
            <Notification :visible="showNotifications" @close="toggleNotifications(false)"></Notification>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import EmptyMessage from '@/components/message/EmptyMessage.vue';   
import MessageHeader from '@/components/message/MessageHeader.vue';
import Notification from '@/components/message/Notification.vue';

export default {
    components: {
        EmptyMessage,
        MessageHeader,
        Notification
    },
    setup() {
        const showNotifications = ref(false); // Track notification pop-up visibility

        return {
            showNotifications,
        };
    },
    methods: {
        toggleNotifications(isVisible) {
            this.showNotifications = isVisible; // Update visibility based on emitted event
            console.log('Notification visibility:', this.showNotifications);
        }
    }
};
</script>

<style scoped>
.main-container {
    position: relative;
}

.notification-popup {
    position: absolute;
    top: 80px; /* Adjust to position below the header */
    right: 180px; /* Align with the bell icon */
    z-index: 1000; /* Ensure it appears above other content */
}
</style>
