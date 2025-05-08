<template>
    <div class="common-popup price-popup" :class="{ showPopup: visible }">
        <h3 style="margin: 0px 0px 20px 0px;">Select Your Price Range</h3>
        <div class="price-range-container">
            <div class="price-inputs">
                <div class="price-input-group">
                    <label for="min-price">Minimum Price ($)</label>
                    <input @change="setPrice(InternalMinPrice, InternalMaxPrice)" type="number" id="min-price"
                        class="price-input" v-model="InternalMinPrice" placeholder="0">
                </div>
                <div class="price-separator">-</div>
                <div class="price-input-group">
                    <label for="max-price">Maximum Price ($)</label>
                    <input @change="setPrice(InternalMinPrice, InternalMaxPrice)" type="number" id="max-price"
                        class="price-input" v-model="InternalMaxPrice" placeholder="5000">
                </div>
            </div>
            <div class="price-quick-options">
                <h4 style="margin: 20px 0px 10px 0px;">Quick Options</h4>
                <div class="price-options">
                    <div class="price-option" @click="setPrice(0, 500)"
                        :class="{ 'price-option-active': InternalMinPrice === 0 && InternalMaxPrice === 500 }">
                        Under $500
                    </div>
                    <div class="price-option" @click="setPrice(500, 1000)"
                        :class="{ 'price-option-active': InternalMinPrice === 500 && InternalMaxPrice === 1000 }">
                        $500 - $1000
                    </div>
                    <div class="price-option" @click="setPrice(1000, 2000)"
                        :class="{ 'price-option-active': InternalMinPrice === 1000 && InternalMaxPrice === 2000 }">
                        $1000 - $2000
                    </div>
                    <div class="price-option" @click="setPrice(2000, 5000)"
                        :class="{ 'price-option-active': InternalMinPrice === 2000 && InternalMaxPrice === 5000 }">
                        $2000+
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PricePopup',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        minPrice: {
            type: Number,
            default: 100
        },
        maxPrice: {
            type: Number,
            default: 500
        }
    },
    data() {
        return {
            InternalMaxPrice: this.maxPrice,
            InternalMinPrice: this.minPrice
        }
    },
    methods: {
        setPrice(minPrice, maxPrice) {
            this.InternalMaxPrice = maxPrice,
            this.InternalMinPrice = minPrice,
            this.$emit('setPrice', minPrice, maxPrice)
        }
    },
}
</script>

<style scoped>
.common-popup {
    position: absolute;
    display: none;
    z-index: 1000;
    top: 120px;
    background-color: white;
    border-radius: 24px;
    flex-direction: column;
    align-items: start;
    padding: 30px 40px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2), 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.price-popup {
    width: 40%;
    height: 420px;
    left: 33%;
}

.price-range-container {
    width: 100%;
}

.price-inputs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
}

.price-input-group {
    display: flex;
    flex-direction: column;
    width: 45%;
}

.price-input-group label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #666;
}

.price-input {
    width: 100%;
    height: 45px;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    padding: 5px 15px;
    font-size: 16px;
    border-radius: 12px;
}

.price-separator {
    font-size: 24px;
    font-weight: bold;
    margin: 0 10px;
    margin-top: 20px;
}

.price-quick-options {
    width: 100%;
}

.price-options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.price-option {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 9px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    user-select: none;
}

.price-option-active {
    background-color: #0026ffc2;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.2), 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>