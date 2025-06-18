<template>
    <div class="payment-card-container-overlay" v-if="showPayment">
        <div class="payment-card-container">
            <div class="header">
                <button @click="$emit('close')"> 
                    <Icon icon="charm:cross" width="30" height="30"/>
                </button>
                <h1>Overview</h1>
            </div>
            <div class="payment-detail-container">
                <img src="/src/assets/images/property_images/property1.jpeg" alt="property image">
                <div class="payment-detail">
                    <h1>Expected Payment</h1>
                    <li>Tenant: <strong>Lina Van</strong></li>
                    <li>Payment will be executed on: <strong>15/06/2025</strong></li>
                    <h1>Income: $3000</h1>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default{
    name: 'payment-overview',
    props:{
        showPayment:{
            type: Boolean,
            require: true
        }
        
    }
}
</script>

<style scoped>
.payment-card-container-overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}
.payment-card-container{
    background-color: white;
    border-radius: 20px;
    width: auto;
    height: auto;
}
.header{
    padding-left: 5%;
    display: flex;
    gap: 33%;
    border-bottom: 1px solid lightgray;
}
.header button{
    background-color: transparent;
    border: none;
    cursor: pointer;
}
.payment-detail-container{
    padding: 50px;
    display: flex;
    gap: 50px;
}
img{
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 20px;
}
li{
    margin-left: 20px;
    margin-bottom: 20px;
}
</style>