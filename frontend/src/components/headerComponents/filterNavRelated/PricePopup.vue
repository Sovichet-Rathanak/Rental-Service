<template>
    <div class="common-popup price-popup" :class="{ showPopup: visible }">
        <h3 style="margin: 0px 0px 20px 0px;">Select Your Price Range</h3>
        <div class="price-range-container">
            <div class="price-inputs">
                <div class="price-input-group">
                    <label for="min-price">Minimum Price ($)</label>
                    <input @change="updateMinPrice" type="number" id="min-price" class="price-input"
                        v-model="internalMinPrice" placeholder="0">
                </div>
                <div class="price-separator">-</div>
                <div class="price-input-group">
                    <label for="max-price">Maximum Price ($)</label>
                    <input @change="updateMaxPrice" type="number" id="max-price" class="price-input"
                        v-model="internalMaxPrice" placeholder="5000">
                </div>
            </div>

            <div class="slider-container">
                <div class="slider-track">
                    <div class="slider-progress" :style="{
                        left: `${(internalMinPrice / maxPriceLimit) * 100}%`,
                        width: `${((internalMaxPrice - internalMinPrice) / maxPriceLimit) * 100}%`
                    }"></div>
                </div>
                <input type="range" class="range-slider min-slider" :min="0" :max="maxPriceLimit"
                    :value="internalMinPrice" @input="handleMinSliderChange" step="50" />
                <input type="range" class="range-slider max-slider" :min="0" :max="maxPriceLimit"
                    :value="internalMaxPrice" @input="handleMaxSliderChange" step="50" />
            </div>

            <div class="price-quick-options">
                <h4 style="margin: 20px 0px 10px 0px;">Quick Options</h4>
                <div class="price-options">
                    <div class="price-option" @click="setPrice(0, 500)"
                        :class="{ 'price-option-active': internalMinPrice === 0 && internalMaxPrice === 500 }">
                        Under $500
                    </div>
                    <div class="price-option" @click="setPrice(500, 1000)"
                        :class="{ 'price-option-active': internalMinPrice === 500 && internalMaxPrice === 1000 }">
                        $500 - $1000
                    </div>
                    <div class="price-option" @click="setPrice(1000, 2000)"
                        :class="{ 'price-option-active': internalMinPrice === 1000 && internalMaxPrice === 2000 }">
                        $1000 - $2000
                    </div>
                    <div class="price-option" @click="setPrice(2000, 5000)"
                        :class="{ 'price-option-active': internalMinPrice === 2000 && internalMaxPrice === 5000 }">
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
            internalMaxPrice: this.maxPrice,
            internalMinPrice: this.minPrice,
            maxPriceLimit: 5000
        }
    },
    methods: {
        setPrice(minPrice, maxPrice) {
            minPrice = Math.min(minPrice, maxPrice);
            maxPrice = Math.max(minPrice, maxPrice);

            this.internalMinPrice = minPrice;
            this.internalMaxPrice = maxPrice;
            this.$emit('setPrice', minPrice, maxPrice);
        },
        updateMinPrice() {
            if (parseInt(this.internalMinPrice) > parseInt(this.internalMaxPrice)) {
                this.internalMinPrice = this.internalMaxPrice;
            }
            if (this.internalMinPrice < 0) {
                this.internalMinPrice = 0;
            }
            this.setPrice(parseInt(this.internalMinPrice), parseInt(this.internalMaxPrice));
        },
        updateMaxPrice() {
            if (parseInt(this.internalMaxPrice) < parseInt(this.internalMinPrice)) {
                this.internalMaxPrice = this.internalMinPrice;
            }
            if (this.internalMaxPrice > this.maxPriceLimit) {
                this.internalMaxPrice = this.maxPriceLimit;
            }
            this.setPrice(parseInt(this.internalMinPrice), parseInt(this.internalMaxPrice));
        },
        handleMinSliderChange(event) {
            const value = parseInt(event.target.value);

            if (value <= this.internalMaxPrice) {
                this.internalMinPrice = value;
            } else {
                event.target.value = this.internalMaxPrice;
                this.internalMinPrice = this.internalMaxPrice;
            }

            this.setPrice(this.internalMinPrice, this.internalMaxPrice);
        },
        handleMaxSliderChange(event) {
            const value = parseInt(event.target.value);

            if (value >= this.internalMinPrice) {
                this.internalMaxPrice = value;
            } else {
                event.target.value = this.internalMinPrice;
                this.internalMaxPrice = this.internalMinPrice;
            }

            this.setPrice(this.internalMinPrice, this.internalMaxPrice);
        }
    },
    watch: {
        minPrice(newVal) {
            this.internalMinPrice = newVal;
        },
        maxPrice(newVal) {
            this.internalMaxPrice = newVal;
        }
    }
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

.showPopup {
    display: flex;
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

/* Range Slider Styles */
.slider-container {
    position: relative;
    width: 100%;
    height: 40px;
    margin: 10px 0px;
}

.slider-track {
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    width: 100%;
    height: 7px;
    background-color: #e0e0e0;
    border-radius: 7px;
}

.slider-progress {
    position: absolute;
    top: 0;
    height: 100%;
    background-color: #0026ffc2;
    border-radius: 7px;
}

.range-slider {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    outline: none;
    pointer-events: none;
}

.range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 2px solid #0026ffc2;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.range-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 2px solid #0026ffc2;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.min-slider {
    z-index: 2;
}

.max-slider {
    z-index: 1;
}
</style>