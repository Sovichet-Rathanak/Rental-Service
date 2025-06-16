<template>
    <div class="menu-popup">
        <div class="menu-items">
            <button @click="navigate('Account Setting')" class="menu-item">
                <Icon icon="proicons:person-circle" width="24" height="24" />
                <span>Account</span>
            </button>

            <button @click="navigate('Message')" class="menu-item">
                <Icon icon="mage:message" width="24" height="24" />
                <span>Messages</span>
            </button>

            <button @click="navigate('Notification')" class="menu-item">
                <Icon icon="carbon:notification" width="24" height="24" />
                <span>Notifications</span>
            </button>

            <button @click="navigate('Wishlist Page')" class="menu-item">
                <Icon icon="solar:heart-outline" width="24" height="24" />
                <span>Wishlist</span>
            </button>

            <button @click="navigate('Rent List')" class="menu-item">
                <Icon icon="material-symbols:format-list-bulleted" width="24" height="24" />
                <span>Renting Lists</span>
            </button>

            <button @click="navigate('Help Center')" class="menu-item">
                <Icon icon="tabler:help" width="24" height="24" />
                <span>Help Center</span>
            </button>

            <button @click="logout" class="menu-item">
                <Icon icon="material-symbols:logout" width="24" height="24" />
                <span>Logout</span>
            </button>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { Icon } from '@iconify/vue';
import { mapActions } from 'pinia';

export default {
    components: {
        Icon
    },
    methods: {
        ...mapActions(useUserStore, ['handleLogOut']),
        navigate(routeName) {
            this.$emit('navigate', routeName);
        },
        logout() {
            this.handleLogOut();
            this.$emit('close');
            this.$router.push({ name: 'Home' });
        }
    },
}
</script>

<style scoped>
.menu-popup {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 330px;
    z-index: 9999;
    overflow: hidden;
}

.menu-items {
    display: flex;
    flex-direction: column;
    padding: 25px 10px;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 20px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    font-size: 17px;
    color: #000000;
    transition: background-color 0.2s;
}

.menu-item:hover {
    background-color: #f5f5f5;
}

.menu-item span {
    flex-grow: 1;
}
</style>