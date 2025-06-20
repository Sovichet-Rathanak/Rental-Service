<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>
    <main>
        <BreadCrumbs style="margin: 30px 0px;"></BreadCrumbs>
        <h1 style="font-weight: bold; margin-bottom: 50px;">About Your Payments</h1>
        <div class="content-container">
            <div class="left-content">
                <hgroup style="width: 80%;">
                    <h2 style="font-weight: bold;">Your Payment Methods</h2>
                    <h4>Add a payment method using our secure payment system, then start
                        planning your next living. </h4>
                </hgroup>
                <button class="add-paymentbtn" @click="showPopup = true"> Add payment method </button>
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
        <div class="popup-overlay" v-if="showPopup">
            <div class="popup-content">
                <div class="content-header">
                    <Icon icon="codex:cross" width="30" height="30"
                        style="color: #000; position: absolute; left: 30px; cursor: pointer;"
                        @click="showPopup = false" />
                    <h2>Add card details</h2>
                </div>
                <div class="content-main">
                    <div class="wrapper" style="padding-inline: 30px;">
                        <div class="bank-icons" style="display: flex; gap: 7px; margin-bottom: 20px;">
                            <Icon icon="logos:visaelectron" width="35.93" height="16" />
                            <Icon icon="logos:mastercard" width="20.59" height="16" />
                            <Icon icon="logos:unionpay" width="25.6" height="16" />
                        </div>
                        <div class="card-info">
                            <input class="card-num" type="text" placeholder="Card number" v-model="cardNumber"
                                maxlength="19" @input="formatCardNumber">
                            <input class="exp" type="text" placeholder="MM/YY" v-model="expDate" maxlength="5"
                                @input="formatMonthYear">
                            <input class="cvv" type="text" placeholder="CVV" v-model="cvv" maxlength="3"
                                @input="formatCVV">
                        </div>
                    </div>
                    <div class="wrapper" style="padding-inline: 30px;">
                        <div class="section-title">Billing Address</div>
                        <div class="bill-address">
                            <input type="text" placeholder="Street address" v-model="streetAddress">
                            <input type="text" placeholder="Apt, suite, unit, etc. (optional)" v-model="aptSuiteUnit">
                            <div class="address-row">
                                <input type="text" placeholder="City" v-model="city">
                                <input type="text" placeholder="State" v-model="state">
                            </div>
                            <input type="text" placeholder="ZIP code" v-model="zipCode">
                        </div>
                    </div>
                    <div class="wrapper" style="padding-inline: 30px;">
                        <div class="card-holder">
                            <div class="section-title">Card Holder</div>
                            <input type="text" placeholder="First name" class="name-input" v-model="firstName">
                            <input type="text" placeholder="Last name" class="name-input" v-model="lastName">
                        </div>
                    </div>
                </div>
                <div class="content-footer">
                    <button class="cancel-btn" @click="showPopup = false">Cancel</button>
                    <button class="save-btn" @click="submitPayment">Save payment method</button>
                </div>
            </div>
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
    data() {
        return {
            showPopup: false,
            cardNumber: '',
            expDate: '',
            cvv: '',
            streetAddress: '',
            aptSuiteUnit: '',
            city: '',
            state: '',
            zipCode: '',
            firstName: '',
            lastName: ''
        }
    },
    components: {
        HeaderNav2,
        FooterComponent,
        BreadCrumbs
    },
    methods: {
        goToPage(route) {
            this.$router.push({ name: route });
        },
        formatCardNumber() {
            let value = this.cardNumber.replace(/\D/g, ''); //get rid of the everything except number

            let formattedValue = '';
            for (let i = 0; i < value.length; i++) { //loop through all the digit of the input
                formattedValue += value[i]; //add value to the format string
                if (i > 0 && i % 4 == 0) {
                    formattedValue += ' '; //at the 4 digit add a space
                }
            }
            this.cardNumber = formattedValue;
        },
        formatMonthYear() { //still buggy
            let value = this.expDate.replace(/\D/g, '');

            if (value.length > 0) {
                let month = value.substring(0, 2); //cut the first two digit to assess
                if (month.length === 1) {
                    this.expDate = month; //allow single digit
                } else if (month.length === 2) {
                    const monthNum = parseInt(month);
                    if (monthNum > 12) {
                        month = '12';
                    } else if (monthNum < 1) {
                        month = '01';
                    }
                }

                if (value.length > 2) {
                    console.log('true')
                    this.expDate = month + '/' + value.substring(2, 4); //add '/' and the second half of the input
                } else {
                    this.expDate = month;
                }
            }

            if (this.expDate.length === 2 && !this.expDate.includes('/')) {
                this.expDate += '/';
            }
        },
        formatCVV() {
            this.cvv = this.cvv.replace(/\D/g, '');
            if (this.cvv.length > 3) {
                this.cvv = '';
            }
        },
        submitPayment() {
            const payload = {
                userId: '6c41ed7f-4877-4b3b-aaf0-a7ab71bcd921', // Or get this from auth/session
                cardNumber: this.cardNumber.replace(/\s/g, ''),
                expiryDate: this.expDate,
                cvv: this.cvv,
                streetAddress: this.streetAddress,
                aptSuiteUnit: this.aptSuiteUnit,
                city: this.city,
                state: this.state,
                zipCode: this.zipCode,
                firstName: this.firstName,
                lastName: this.lastName,
                status: 'pending' // Default status
            };
            fetch('http://localhost:3000/api/payments', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Payment saved:', data);
                this.showPopup = false;
                // Optional: Show toast or redirect
            })
            .catch(error => {
                console.error('Error saving payment:', error);
            });
        },
    },
    watch: {
        showPopup(newVal) {
            document.body.style.overflow = newVal ? 'hidden' : 'auto';
        }
    }
}
</script>

<style scoped>
main {
    padding-inline: 300px;
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;
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
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.popup-content {
    width: 35%;
    max-height: 90vh;
    background-color: white;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.popup-content::-webkit-scrollbar{
    display: none;
}
.content-header {
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    padding: 30px;
}
.content-header h2 {
    font-weight: bold;
    margin: 0;
}
.content-main {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.section-title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
}
.card-info {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 2px;
    margin-bottom: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
}
.card-num {
    grid-column: span 2;
    border-radius: 12px 12px 0px 0px;
    height: 60px;
    border: 1px solid #e0e0e0;
    border-bottom: none;
    padding: 0 15px;
    font-size: 16px;
}
.cvv {
    border-radius: 0px 0px 12px 0px;
    height: 60px;
    border: 1px solid #e0e0e0;
    padding: 0 15px;
    font-size: 16px;
}
.exp {
    border-radius: 0px 0px 0px 12px;
    height: 60px;
    border: 1px solid #e0e0e0;
    border-right: none;
    padding: 0 15px;
    font-size: 16px;
}
.bill-address {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
}
.bill-address input {
    height: 55px;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
    padding: 0 15px;
    font-size: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.address-row {
    display: grid;
    grid-template-columns: 60% 38%;
    gap: 2%;
}
.card-holder {
    width: 100%;
    margin-bottom: 20px;
}
.name-input {
    width: 100%;
    height: 60px;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
    font-size: 16px;
    padding-inline: 15px;
    margin-bottom: 15px;
    box-sizing: border-box;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.content-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid black;
    padding: 15px 30px;
}
.cancel-btn {
    height: 50px;
    background-color: white;
    color: black;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    padding-inline: 10px;
    transition: all 0.2s ease;
}
.cancel-btn:hover {
    background-color: #f5f5f5;
}
.save-btn {
    height: 50px;
    background-color: black;
    color: white;
    border: none;
    padding-inline: 10px;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
}
.save-btn:hover {
    background-color: #333;
}
input:focus {
    outline: none;
    border: 2px solid #0026FF;
    box-shadow: 0 0 0 2px rgba(0, 38, 255, 0.1);
}
.card-num {
    background-position: 98% center;
    background-repeat: no-repeat;
}
</style>