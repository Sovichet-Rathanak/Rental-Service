<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>
    <main>
        <BreadCrumbs></BreadCrumbs>
        <h1 style="font-weight: bold; margin-bottom: 50px;">About Your Payments</h1>
        <div class="content-container">
            <div class="left-content">
                <hgroup style="width: 80%;">
                    <h2 style="font-weight: bold;">Your Payment Methods</h2>
                    <h4>Add a payment method using our secure payment system, then start
                        planning your next living. </h4>
                </hgroup>
                <button class="add-paymentbtn"> Add payment method </button>

                <hgroup style="width: 80%;">
                    <h2 style="font-weight: bold;">Manage Your Payments</h2>
                    <h4>Keep track of all your payment methods.</h4>
                </hgroup>
                <button class="manage-paymentbtn" @click="goToPage('Manage Payment')"> Manage Payments </button>
            </div>
            <div class="right-content">
                <div class="info-box">
                    <Icon icon="hugeicons:payment-02" width="52" height="52" style="color: #0026FF" />
                    <hgroup>
                        <h2>Make all payments through
                            Romdoul Rental</h2>
                        <h4>Always pay and communicate through
                            Romdoul Rental to ensure you're protected
                            under our Terms of Service, Payments Terms
                            of Service, cancellation, and other safeguards.
                            Learn more</h4>
                    </hgroup>
                </div>
            </div>
        </div>

        <div class="popup-overlay">

        </div>
    </main>
    <footer>
        <FooterComponent></FooterComponent>
    </footer>
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

export default {
    components: {
        HeaderNav2,
        FooterComponent,
        BreadCrumbs
    },
    methods: {
        goToPage(route) {
            this.$router.push({ name: route });
        }
    }
}

</script>

<style scoped>
header {
    margin: 30px 0px;
}

main {
    padding-inline: 300px;
    display: flex;
    flex-direction: column;
    align-items: start;
}


hgroup>h2,
hgroup>h4 {
    margin: 10px 0px;
}

.content-container {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 30px;
    width: 100%;
}

.add-paymentbtn {
    background-color: black;
    color: white;
    border: 1px solid black;
    border-radius: 12px;
    height: 65px;
    width: 240px;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    margin: 20px 0px 70px 0px;
}

.manage-paymentbtn {
    background-color: black;
    color: white;
    border: 1px solid black;
    border-radius: 12px;
    height: 65px;
    width: 200px;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    margin: 20px 0px 0px 0px;
}

.right-content {
    display: flex;
    width: 70%;
    height: fit-content;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(128, 128, 128, 0.5);
    padding: 30px;
    border-radius: 25px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>