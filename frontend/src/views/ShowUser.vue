<template>
    <header>
        <header-nav-2></header-nav-2>
    </header>

    <body>
        <div class="containerAcc2">
            <!-- Top left -->
            <div class="wrap">
                <div class="accountBox">
                    <div class="profileInfo">
                        <div class="circlePro">L</div>
                        <h3>Lina</h3>
                        <span>Guest</span>
                    </div>
                    <hgroup>
                        <h3>1 month</h3>
                        <h4>on Romdoul Rental Service</h4>
                    </hgroup>
                </div>

                <!-- Bottom lef -->
                <div class="confirmInfo">
                    <h2>Lina's confirmed inforamtion</h2>
                    <div class="email">
                        <Icon icon="charm:tick" width="30" height="30" />
                        <h4>Email Address</h4>
                    </div>
                    <hr>
                    <h2>Verify your identify</h2>
                    <span>Before you book or host on Romdoul Joul Pteas, you'll need to complete this step.</span>
                    <div class="button">
                        Get verified
                    </div>
                </div>
            </div>

            <!-- Right -->

            <div class="rightSide">
                <hr>
                <h3>It's time to create your profile</h3>
                <span>Your Romdoul Joul Pteas profile is an important</span>
                <span>part of every reservation. Create yours to help</span>
                <span>other Hosts and guests get to know you.</span>
                <div class="button2">
                    Create profile
                </div>
            </div>
        </div>
    </body>
    <footer>
        <FooterComponent></FooterComponent>
    </footer>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '../components/headerComponents/HeaderNav2.vue';

export default {
    components: {
        HeaderNav2,
        FooterComponent
    }
}
</script>

<style scoped>
.containerAcc2 {
    padding: 25px 230px 0px 230px;
    display: flex;
    align-items: center;
    gap: 90px;
}

/* Top left */
.accountBox {
    width: 450px;
    height: 230px;
    background-color: #DFEFFF;
    align-items: center;
    padding: 20px 20px 10px 35px;
    border-radius: 20px;
    margin: 19px 17px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    border: 1px solid white;
    display: flex;
    gap: 60px;
}

.profileInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.circlePro {
    width: 110px;
    height: 110px;
    background-color: #000000;
    color: white;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 50%;
    font-size: 60px;
    display: flex;
    font-weight: bold;
}

.profileInfo>h3 {
    font-size: 37px;
    font-weight: bold;
    margin: 0;
}

.profileInfo>span {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
}

hgroup>h3 {
    font-size: 29px;
    font-weight: 500;
    margin: 0;
}

hgroup>h4 {
    font-size: 20px;
    font-weight: 400;
}

/* Bottom left */

.confirmInfo {
    width: 440px;
    height: 570px;
    align-items: center;
    padding: 0 35px 10px 35px;
    border-radius: 30px;
    margin: 30px 17px 0 17px;
    border: 1px solid #717171;
}

.confirmInfo>h2 {
    font-size: 36px;
    line-height: 60px;
    font-weight: 600;
    margin: 30px 0;
}

.email {
    display: flex;
    gap: 20px;
    align-items: center;
}

.email>h4 {
    font-size: 23px;
    font-weight: 300;
    margin: 0;
}

hr {
    margin-top: 50px;
}

.confirmInfo>span {
    font-size: 20px;
    font-weight: 300;
    margin: 30px 0;
}

.button {
    width: 40%;
    height: 60px;
    font-size: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    transition: background-color 0.2s;
    cursor: pointer;
    border: 1px solid black;
    margin-top: 30px
}

.button:hover {
    background-color: rgb(22, 22, 22);
    border: none;
    color: white;
    font-weight: bold;
    transition: background-color 0.2s;
}

.button:active {
    background-color: rgb(146, 146, 146);
    border: none;
    color: white;
    font-weight: bold;
    transition: background-color 0.2s;
}

/* Right Side */

.rightSide>h3 {
    font-size: 30px;
    font-weight: bold;
}

.rightSide>span {
    font-size: 20px;
    font-weight: 300;
    margin: 0;
    line-height: 1.5;
    display: block;
}

.button2 {
    width: 50%;
    height: 67px;
    font-size: 21px;
    font-weight: bold;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #3E92FF;
    transition: background-color 0.2s;
    cursor: pointer;
    margin-top: 30px
}

.button2:hover {
    background-color: #1971e5;
    border: none;
    color: white;
    font-weight: bolder;
}

.button2:active {
    background-color: #7cb5ff;
    border: none;
    color: white;
    font-weight: bolder;
}
</style>