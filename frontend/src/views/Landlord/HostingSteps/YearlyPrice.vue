<template>
    <div class="container">
        <hgroup>
            <h1>Now, set a yearly base price</h1>
            <h2>Set a deal to encourage customers to rent yearly.</h2>
        </hgroup>

        <div class="input-container">
            <input class="currency-input" maxlength="10" type="text" name="yearly-rent" id="yearly-rent"
                v-model="formattedPrice" @blur="enforceMinimum" placeholder="$0" />
        </div>

        <!-- Warnings -->
        <p v-if="numericPriceYearly < 100" class="warning">Minimum price is $100</p>
        <p v-else-if="numericPriceYearly < numericPriceMonthly" class="warning">
            Yearly price cannot be less than monthly price ({{ formattedMonthlyPrice }})
        </p>
    </div>
</template>

<script>
import { useListingStore } from '@/stores/listing';
import { mapStores } from 'pinia';

export default {
    computed: {
        ...mapStores(useListingStore),

        price_yearly: {
            get() {
                return this.listingStore.listingForm.price_yearly;
            },
            set(value) {
                this.listingStore.updateField('price_yearly', Number(value) || 0);
            }
        },

        price_monthly() {
            return this.listingStore.listingForm.price_monthly;
        },

        formattedPrice: {
            get() {
                return this.price_yearly ? `$${Number(this.price_yearly).toLocaleString()}` : '';
            },
            set(val) {
                const numeric = Number(val.replace(/\D/g, '')) || 0;
                this.price_yearly = numeric;
            }
        },

        formattedMonthlyPrice() {
            return `$${Number(this.price_monthly || 0).toLocaleString()}`;
        },

        numericPriceYearly() {
            return Number(this.price_yearly || 0);
        },

        numericPriceMonthly() {
            return Number(this.price_monthly || 0);
        }
    },

    methods: {
        enforceMinimum() {
            let yearly = this.numericPriceYearly;
            const monthly = this.numericPriceMonthly;

            if (yearly < 100) {
                yearly = 100;
            }
            if (yearly < monthly) {
                yearly = monthly + 200;
            }

            this.price_yearly = yearly;
        }
    }
};
</script>



<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    align-items: center;
    width: 100%;
}

h1 {
    margin-bottom: 10px;
    padding-top: 20px;
}

h2 {
    margin: 0px 0px 20px;
    color: grey;
}

.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.currency-input {
    text-align: center;
    background-color: transparent;
    border: none;
    font-size: 100px;
    width: 50%;
}

.currency-input:focus {
    outline: none;
}
</style>