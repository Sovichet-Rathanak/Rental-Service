<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>

    <main>
        <div class="headerText">
            <h1 style="margin: 0;">Account</h1>
            <div class="profileInfo">
                <h2>{{ user.firstname }} {{ user.lastname }}, </h2>
                <h3>{{ user.email }}</h3>
            </div>
        </div>

        <!-- All the buttons -->
        <div class="buttons">
            <div class=" rentingList" @click="goToPage('Rent List')">
                <Icon icon="material-symbols:dashboard-outline-rounded" width="36" height="36" />
                <h2>Renting List</h2>
                <span>Keep track of lanlord approvals, and rental activities.</span>
            </div>

            <div class="personalInfo" @click="goToPage('Personal Information')">
                <Icon icon="grommet-icons:contact-info" width="40" height="40" />
                <h2>Personal Info</h2>
                <span>Provide personal details and how we can reach you.</span>
            </div>

            <div class="payments" @click="goToPage('Payment')">
                <Icon icon="material-symbols:payments-outline-sharp" width="40" height="40" />
                <h2>Payments</h2>
                <span>Review payments, payouts, coupons, and gift cards.</span>
            </div>

            <div class="loginSecurity" @click="goToPage('Login and Security')">
                <Icon icon="carbon:security" width="40" height="40" />
                <h2>Login & Security</h2>
                <span>Update your password and secure your account.</span>
            </div>

            <div class="notification" @click="goToPage('Notification')">
                <Icon icon="oui:bell" width="40" height="40" />
                <h2>Notification</h2>
                <span>Choose notification preferences and how you want to be contacted.</span>
            </div>

            <div class="invoice" @click="goToPage('Invoice')">
                <Icon icon="hugeicons:invoice-03" width="40" height="40" />
                <h2>Invoice</h2>
                <span>Manage taxpayer information and tax documents.</span>
            </div>
        </div>
    </main>
    <footer>
        <FooterComponent></FooterComponent>
    </footer>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';

export default {
    components: {
        HeaderNav2,
        FooterComponent,
    },
    methods: {
        goToPage(routeName) {
            this.$router.push({ name: routeName })
        }
    },
    computed: {
        ...mapState(useUserStore, ['user', 'isLoggedIn'])
    }
}
</script>

<style scoped>
main {
    padding-inline: 100px;
}

.headerText {
    margin: 50px 0px 50px 130px
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
    margin: 0;
}

.profileInfo>h3 {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
}

.profileInfo>span {
    text-decoration: underline;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
}

/* all the buttons */
.buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
}


.rentingList,
.personalInfo,
.payments,
.loginSecurity,
.notification,
.invoice {
    width: 450px;
    height: 215px;
    background-color: white;
    align-items: center;
    padding: 37px 20px 10px 35px;
    border-radius: 20px;
    margin: 19px 17px;
    box-shadow: 0 2px 10px 5px rgba(0, 0, 0.1, 0.25);
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
