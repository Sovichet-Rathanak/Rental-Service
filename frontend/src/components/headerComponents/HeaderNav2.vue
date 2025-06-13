<template>
    <div class="nav-container">
        <div class="logo" @click="goToHomePage">
            <div class="image-container">
                <img src="/src/assets/logo.png" alt="roumdoul_logo">
            </div>
            <hgroup class="">
                <h1>Romdoul</h1>
                <h2>Rental Service</h2>
            </hgroup>
        </div>

        <div class="text">
            <button class="applyLandlord" @click="this.$router.push({ name: 'Hosting Steps' })">Applying for Landlord
                <Icon icon="tabler:world" width="40" height="40" />
            </button>
            <div class="sigin">
                <button @click="toggleMenu" class="menu-btn">
                    <Icon icon="material-symbols:menu-rounded" width="24" height="24"/>
                </button>
                <MenuComponent 
                    v-if="showMenu" 
                    @close="showMenu = false"
                    @navigate="handleNavigation"
                />
                <button class="sigin-btn">
                    <Icon icon="fluent:person-circle-32-filled" width="36" height="36" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import MenuComponent from '@/components/MenuComponent.vue';
export default {
    components: {
        MenuComponent
    },
    data() {
        return {
        showMenu: false
        }
    },
    methods: {
        goToHomePage() {
            this.$router.push({ name: 'Home' })
        },
        toggleMenu() {
        this.showMenu = !this.showMenu;
        },
        handleNavigation(routeName) {
            this.$router.push({ name: routeName });
            this.showMenu = false; // Close the menu after navigation
        }
    }
}
</script>

<style scoped>
.nav-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 25px 200px 20px 200px;
    box-shadow: 0 6px 12px -6px rgba(0, 0, 0, 0.1);
    background-color: white;
    z-index: 10;
    position: relative;
}

.logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    cursor: pointer;
}

hgroup>h1 {
    margin: 0;
    padding: 0;
    font-weight: bolder;
    font-size: 28px;
    color: black;
}

hgroup>h2 {
    margin: 0;
    padding: 0;
    line-height: 1;
    font-weight: 400;
    font-size: 22px;
    color: black;
}

.text {
    display: flex;
    gap: 35px;
    align-items: center;
}

.text>h2 {
    font-size: 22px;
}

.sigin {
    display: flex;
    gap: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    box-sizing: border-box;
    border: 1.5px solid gray;
    padding: 12px 15px;
    border-radius: 50px;
    position: relative;
    cursor: pointer; 
}

.menu-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.sigin-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.applyLandlord {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: none;
    padding: 12px 15px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 22px;
    font-weight: bold;
}

.applyLandlord:hover {
    color: #312f2f;
    transition: 0.3s;
}

.applyLandlord:active {
    color: #adadad;
    transition: 0.3s;
}
</style>
