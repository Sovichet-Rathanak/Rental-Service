<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>

    <body>
        <div class="headerText">
            <h1>Account</h1>

            <div class="profileInfo">
                <h2>Lin Van, </h2>
                <h3>linavan2509@gmail.com</h3>
                <router-link class="go-to" :to="{name: 'Show User'}">Go to profile</router-link>
            </div>
        </div>

        <!-- All the buttons -->
        <div class="buttons">
            <div class="rentingList">
                <Icon icon="material-symbols:dashboard-outline-rounded" width="36" height="36" />
                <h2>Renting List</h2>
                <span>Keep track of lanlord approvals, and rental activities.</span>
            </div>

            <div class="personalInfo">
                <Icon icon="grommet-icons:contact-info" width="40" height="40" />
                <h2>Personal Info</h2>
                <span>Provide personal details and how we can reach you.</span>
            </div>

            <div class="payments">
                <Icon icon="material-symbols:payments-outline-sharp" width="40" height="40" />
                <h2>Payments</h2>
                <span>Review payments, payouts, coupons, and gift cards.</span>
            </div>

            <div class="loginSecurity">
                <Icon icon="carbon:security" width="40" height="40" />
                <h2>Login & Security</h2>
                <span>Update your password and secure your account.</span>
            </div>

            <div class="notification">
                <Icon icon="oui:bell" width="40" height="40" />
                <h2>Notification</h2>
                <span>Choose notification preferences and how you want to be contacted.</span>
            </div>

            <div class="invoice">
                <Icon icon="hugeicons:invoice-03" width="40" height="40" />
                <h2>Invoice</h2>
                <span>Manage taxpayer information and tax documents.</span>
    f        </div>
        </div>
    </body>
    <footer>
        <FooterComponent></FooterComponent>        
    </footer>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';

export default {
    components: {
        HeaderNav2,
        FooterComponent
    }
}
</script>

<style scoped>
.headerText {
    padding: 50px 230px 0px 230px;
}

.headerText>h1 {
    font-size: 30px;
    font-weight: bolder;
    margin: 0;
}

.profileInfo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.profileInfo>h2 {
    font-size: 20px;
    font-weight: bold;
}

.profileInfo>h3 {
    font-size: 20px;
    font-weight: 400;
}

.profileInfo>span {
    text-decoration: underline;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
}

/* all the buttons */
.buttons {
    display: grid;
    grid-template-columns: repeat(3, auto);
    padding: 25px 230px 0px 230px;
}


.rentingList,
.personalInfo,
.payments,
.loginSecurity,
.notification,
.invoice {
    width: 450px;
    height: 215px;
    background-color: #DFEFFF;
    align-items: center;
    padding: 37px 20px 10px 35px;
    border-radius: 20px;
    margin: 19px 17px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    border: 1px solid white;
    cursor: pointer;
}

h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 30px 0;
}

.go-to {
    font-size: 22px;
    font-weight: 200;
    color: black;
}
</style>
