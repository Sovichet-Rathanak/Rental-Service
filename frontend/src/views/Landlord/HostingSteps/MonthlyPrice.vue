<template>
    <div class="container">
        <hgroup>
            <h1>Now, set a monthly base price</h1>
            <h2>You'll set your yearly price next.</h2>
        </hgroup>

        <div class="input-container">
            <input class="currency-input" maxlength="9" type="text" name="monthly-rent" id="monthly-rent"
                v-model="formattedPrice" @blur="enforceMinimum" placeholder="$0" />
        </div>

        <p v-if="numericPriceMonthly < 50" class="warning">Minimum price is $50</p>
    </div>
</template>

<script>
import { useListingStore } from '@/stores/listing';
import { mapStores } from 'pinia';

export default {
    computed: {
        ...mapStores(useListingStore),

        price_monthly: {
            get() {
                return this.listingStore.listingForm.price_monthly;
            },
            set(value) {
                this.listingStore.updateField('price_monthly', Number(value));
            }
        },

        formattedPrice: {
            get() {
                if (!this.price_monthly) return '';
                return '$' + Number(this.price_monthly).toLocaleString();
            },
            set(val) {
                const numeric = val.replace(/\D/g, '');
                this.price_monthly = numeric;
            }
        },

        numericPriceMonthly() {
            return Number(this.price_monthly || 0);
        }
    },

    methods: {
        enforceMinimum() {
            if (this.numericPriceMonthly < 50) {
                this.price_monthly = 50;
            }
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