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
        <!-- accommodation type button -->
        <div class="accomtype-btn"> 
            <button class="house-btn">
                <Icon icon="clarity:house-solid" width="30" height="30" style="color: white;"/>
                <span class="hBtn-label">House</span>
            </button>
            <button class="room-btn">
                <Icon icon="fa6-solid:bed" width="37.5" height="30" style="color: white;"/>
                <span class="rBtn-label">Room</span>
            </button>
        </div>
        <button class="sigin-btn">
            <Icon icon="material-symbols:menu-rounded" width="24" height="24" style="color: white;"/>
            <Icon icon="fluent:person-circle-32-filled" width="36" height="36" style="color: white;"/>
        </button>
    </div>
</template>

<style scoped>
    .nav-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 25px 75px 0px 75px;
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

    .accomtype-btn{
        display: flex;
        flex-direction: row;
        gap: 50px;
    }

    .house-btn, .room-btn{
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center ;
        background-color: transparent;
        border: none;
        cursor: pointer;
        box-sizing: border-box;
        padding: 10px;
    }

    .hBtn-label, .rBtn-label{
        font-weight:500;
        font-size: 18px;
        color: white;
    }

    .sigin-btn{
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
        cursor: pointer;
    }
</style>