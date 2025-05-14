<template>
    <div class="nav-bar">
        <div class="nav-items">
            <button class="nav-item" :class="{ 'active': currentRoute === 'listings' }" @click="navigate('listings')">Listings</button>
            <button class="nav-item" :class="{ 'active': currentRoute === 'calendar' }" @click="navigate('calendar')">Calendar</button>
            <button class="nav-item message" :class="{ 'active': currentRoute === 'message' }" @click="navigate('message')">Message</button>
            <button class="nav-item" :class="{ 'active': currentRoute === 'earning' }" @click="navigate('earning')">Earning</button>
        </div>
        <div class="nav-icons" style="display: flex; position: relative;">
            <Icon icon="mdi:bell-outline" width="40" height="40" style="color: #000" @click="showNotifications" />
            <Icon icon="octicon:feed-person-16" width="40" height="40" style="color: #000" />
            <Icon icon="si:verified-fill" width="15" height="15" style="color: blue; position: absolute; bottom: 1px; right: -1px;" />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'HeaderNav',
    setup() {
        const currentRoute = ref('message'); // Default to 'message' as active
        const isNotificationVisible = ref(false); // Track notification pop-up visibility

        return {
            currentRoute,
            isNotificationVisible,
        };
    },
    methods: {
        navigate(route) {
            this.currentRoute = route; // Update the current route
            console.log(`Navigating to ${route}`);
            // Add navigation logic here, e.g., this.$router.push(`/${route}`);
        },
        showNotifications() {
            this.isNotificationVisible = !this.isNotificationVisible; // Toggle visibility
            console.log('Toggling notifications:', this.isNotificationVisible);
            this.$emit('toggle-notifications', this.isNotificationVisible); // Emit event to parent
        },
        showProfile() {
            console.log('Showing profile');
            // Add profile logic here
        }
    }
});
</script>

<style scoped>
.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 20px 210px 20px 600px;
    border-bottom: 1px solid gray;
    height: 60px;
}

.nav-items {
    display: flex;
    gap: 40px;
}

.nav-item {
    display: flex;
    background: none;
    border: none;
    font-size: 25px;
    color: #333;
    cursor: pointer;
    padding: 10px 15px; 
    text-transform: capitalize;
    transition: color 0.3s ease;
    border-radius: 4px;
}

.nav-item:hover {
    color: #555;
    text-decoration: underline;
}

.nav-item.active {
    color: #000000; 
    background: none; 
    text-decoration: underline; 
    font-weight: bold; 
}

/* Specific styling for the Message button */
.nav-item.message {
    color: #000; 
    font-weight: bold; 
    text-decoration: underline; 
}

.nav-item.message:hover {
    color: #555; 
}

.nav-item.message.active {
    color: #000000; 
    background: none; 
    text-decoration: underline; 
    font-weight: bold; 
}

.nav-icons {
    display: flex;
    gap: 25px;
    align-items: center;
}

.nav-icons > [data-icon] {
    cursor: pointer;
}

.nav-icons > [data-icon]:hover {
    color: #555;
}
</style>
