<template>
    <div class="nav-container">
        <div class="logo">
            <div class="image-container">
                <img src="/src/assets/logo.png" alt="roumdoul_logo">
            </div>
            <hgroup class="">
                <h1>Romdoul</h1>
                <h2>Rental Service</h2>
            </hgroup>
        </div>
<<<<<<< HEAD
        <!-- accommodation type button -->
        <!-- <div class="accomtype-btn"> 
            <button class="house-btn">
                <Icon icon="clarity:house-solid" width="30" height="30" style="color: white;"/>
                <span class="hBtn-label">House</span>
=======
        <div class="account-actions">
            <button @click="toggleMenu" class="menu-btn">
                <Icon icon="material-symbols:menu-rounded" width="24" height="24" style="color: white;"/>
>>>>>>> origin/rompheu/admin
            </button>
            <button @click="goToAuth()" class="sigin-btn">
                <Icon icon="fluent:person-circle-32-filled" width="36" height="36" style="color: white;"/>
            </button>
<<<<<<< HEAD
        </div> -->
        <button @click="goToAuth()" class="sigin-btn">
            <Icon icon="material-symbols:menu-rounded" width="24" height="24" style="color: white;"/>
            <Icon icon="fluent:person-circle-32-filled" width="36" height="36" style="color: white;"/>
        </button>
=======
            <MenuComponent 
                v-if="showMenu" 
                @close="showMenu = false"
                @navigate="handleNavigation"
            />
        </div>
>>>>>>> origin/rompheu/admin
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import MenuComponent from '@/components/MenuComponent.vue';

export default {
  components: {
    Icon,
    MenuComponent
  },
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    goToAuth(){
        this.$router.push({ name: 'Login' })
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
    .nav-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 25px 75px 0px 75px;
        position: relative;
        z-index: 100;
    }

    .logo{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    hgroup > h1{
        margin: 0;
        padding: 0;
        font-weight: bolder;
        font-size: 28px;
        color: white;
    }

    hgroup > h2{
        margin: 0;
        padding: 0;
        line-height: 1;
        font-weight: 400;
        font-size: 22px;
        color: white;
    }

    .sigin-btn{
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .menu-btn {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .account-actions {
        display: flex;
        gap: 12px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        box-sizing: border-box;
        border: 1.5px solid white;
        padding: 12px 15px;
        border-radius: 50px;
        position: relative;
        cursor: pointer;
    }
</style>