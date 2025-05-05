<!-- TODO: REFACTOR CODE -->
<template>
    <div class="filternav-container">
        <div class="filter-container" :class="{ 'has-active-tab': activeTab !== null }">
            <div class="locationBtn-container tab" :class="{ active: activeTab === 'location' }"
                @click="setActiveTab('location')">
                <button class="location">
                    <p class="text-holder">
                        <span class="main-label" style="font-size: 24px;">
                            Location
                            <Icon icon="mdi:location" width="26" height="26" style="color: #000" />
                        </span>
                        <span class="sub-label">Search Location</span>
                    </p>
                </button>
                <span class="vl" :class="{ 'hide-vl': activeTab === 'location' || activeTab === 'furniture' }"></span>
            </div>

            <div class="furnitureBtn-container tab" :class="{ active: activeTab === 'furniture' }"
                @click="setActiveTab('furniture')">
                <button class="furniture">
                    <p class="text-holder">
                        <span class="main-label" style="font-size: 24px;">
                            Furniture
                            <Icon icon="maki:furniture" width="24" height="24" />
                        </span>
                        <span class="sub-label">Furniture Status</span>
                    </p>
                </button>
                <span class="vl" :class="{ 'hide-vl': activeTab === 'furniture' || activeTab === 'price' }"></span>
            </div>

            <div class="priceBtn-container tab" :class="{ active: activeTab === 'price' }"
                @click="setActiveTab('price')">
                <button class="price">
                    <p class="text-holder">
                        <span class="main-label" style="font-size: 24px;">
                            Price
                            <Icon icon="solar:tag-price-bold" width="26" height="26" style="color: #000" />
                        </span>
                        <span class="sub-label">Price Range</span>
                    </p>
                </button>
                <span class="vl" :class="{ 'hide-vl': activeTab === 'price' || activeTab == 'people' }"></span>
            </div>

            <div class="people-enter-container tab" :class="{ activePeople: activeTab === 'people' }"
                @click="setActiveTab('people')">
                <button class="people">
                    <p class="text-holder">
                        <span class="main-label" style="font-size: 24px;">
                            People
                            <Icon icon="ic:baseline-people" width="26" height="26" style="color: #000" />
                        </span>
                        <span class="sub-label">Number of People</span>
                    </p>
                </button>
                <button class="enter" @click.stop>
                    <Icon icon="iconoir:search" width="32" height="32" />
                    <h2 class="search-label" :class="{ searchActive: activeTab !== null }">Search</h2>
                </button>
            </div>
            <div class="common-popup location-popup" :class="{ showPopup: activeTab === 'location' }">
                <h3 style="margin: 10px 0px;">Search For Your Prefered Location</h3>
                <input class="location-input" type="text" placeholder="Toul Kork, Boeng Keng Kangm,etc.">

                <hgroup>
                    <h3 style="margin: 0px;">Locations</h3>
                    <h5 style="margin: 0px 0px 20px 0px; color: grey;">Select Your Prefered Location</h5>
                </hgroup>
                <div class="region">
                    <h4 style="margin: 0px 0px 10px 0px;">Chamkarmon</h4>
                    <div class="sangkat">
                        <div class="sangkat-children" @click="setActiveSangkat"
                            :class="{ sangkatChildrenActive: activeSangkatChild === true }">
                            <Icon icon="solar:city-bold-duotone" width="20" height="20"
                                :style="activeSangkatChild ? '#fff' : '#000'" />
                            Tonle Basac
                        </div>
                    </div>
                </div>
            </div>

            <div class="common-popup furniture-popup" :class="{ showPopup: activeTab === 'furniture' }">
                <h3 style="margin: 0px;">Select Your Furniture Status</h3>
                <div class="furniture-options">
                    <label class="furniture-radio">
                        <input type="radio" name="furniture" value="furnished" v-model="furnitureStatus" />
                        <span class="furniture-label">
                            <Icon icon="fluent-emoji-high-contrast:couch-and-lamp" width="26" height="26"
                                :style="{ color: furnitureStatus === 'furnished' ? '#fff' : '#000' }" />
                            Furnished
                        </span>
                    </label>

                    <label class="furniture-radio">
                        <input type="radio" name="furniture" value="unfurnished" v-model="furnitureStatus" />
                        <span class="furniture-label">
                            <Icon icon="mingcute:empty-box-line" width="26" height="26"
                                :style="{ color: furnitureStatus === 'unfurnished' ? '#fff' : '#000' }" />
                            Unfurnished
                        </span>
                    </label>
                </div>
            </div>

            <!-- Price Popup -->
            <div class="common-popup price-popup" :class="{ showPopup: activeTab === 'price' }">
                <h3 style="margin: 0px 0px 20px 0px;">Select Your Price Range</h3>
                <div class="price-range-container">
                    <div class="price-inputs">
                        <div class="price-input-group">
                            <label for="min-price">Minimum Price ($)</label>
                            <input type="number" id="min-price" class="price-input" v-model="minPrice" placeholder="0">
                        </div>
                        <div class="price-separator">-</div>
                        <div class="price-input-group">
                            <label for="max-price">Maximum Price ($)</label>
                            <input type="number" id="max-price" class="price-input" v-model="maxPrice"
                                placeholder="5000">
                        </div>
                    </div>
                    <div class="price-quick-options">
                        <h4 style="margin: 20px 0px 10px 0px;">Quick Options</h4>
                        <div class="price-options">
                            <div class="price-option" @click="setPrice(0, 500)"
                                :class="{ 'price-option-active': minPrice === 0 && maxPrice === 500 }">
                                Under $500
                            </div>
                            <div class="price-option" @click="setPrice(500, 1000)"
                                :class="{ 'price-option-active': minPrice === 500 && maxPrice === 1000 }">
                                $500 - $1000
                            </div>
                            <div class="price-option" @click="setPrice(1000, 2000)"
                                :class="{ 'price-option-active': minPrice === 1000 && maxPrice === 2000 }">
                                $1000 - $2000
                            </div>
                            <div class="price-option" @click="setPrice(2000, 5000)"
                                :class="{ 'price-option-active': minPrice === 2000 && maxPrice === 5000 }">
                                $2000+
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- People Popup (Airbnb Style) -->
            <div class="common-popup people-popup" :class="{ showPopup: activeTab === 'people' }">
                <h3 style="margin: 0px 0px 20px 0px;">Who's staying?</h3>

                <!-- Adults Counter -->
                <div class="guest-type-row">
                    <div class="guest-type-info">
                        <h4 class="guest-type-label">Adults</h4>
                        <p class="guest-type-desc">Ages 13 or above</p>
                    </div>
                    <div class="guest-counter">
                        <button class="counter-btn" @click="decrementAdults" :disabled="adultCount <= 1">
                            <Icon icon="mdi:minus" width="16" height="16" />
                        </button>
                        <span class="guest-count">{{ adultCount }}</span>
                        <button class="counter-btn" @click="incrementAdults">
                            <Icon icon="mdi:plus" width="16" height="16" />
                        </button>
                    </div>
                </div>

                <!-- Children Counter -->
                <div class="guest-type-row">
                    <div class="guest-type-info">
                        <h4 class="guest-type-label">Children</h4>
                        <p class="guest-type-desc">Ages 2-12</p>
                    </div>
                    <div class="guest-counter">
                        <button class="counter-btn" @click="decrementChildren" :disabled="childrenCount <= 0">
                            <Icon icon="mdi:minus" width="16" height="16" />
                        </button>
                        <span class="guest-count">{{ childrenCount }}</span>
                        <button class="counter-btn" @click="incrementChildren">
                            <Icon icon="mdi:plus" width="16" height="16" />
                        </button>
                    </div>
                </div>

                <!-- Total Count Display -->
                <div class="guest-total-row">
                    <span class="guest-total-label">Total guests:</span>
                    <span class="guest-total-count">{{ adultCount + childrenCount }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: null,
            activeSangkatChild: false,
            furnitureStatus: null,
            minPrice: 0,
            maxPrice: 5000,
            adultCount: 1,
            childrenCount: 0
        }
    },
    methods: {
        setActiveTab(tabName) {
            if (this.activeTab === tabName) {
                this.activeTab = null;
            } else {
                this.activeTab = tabName;
            }
        },
        setActiveSangkat() {
            this.activeSangkatChild = !this.activeSangkatChild;
        },
        setPrice(min, max) {
            this.minPrice = min;
            this.maxPrice = max;
        },
        incrementAdults() {
            this.adultCount++;
        },
        decrementAdults() {
            if (this.adultCount > 1) {
                this.adultCount--;
            }
        },
        incrementChildren() {
            this.childrenCount++;
        },
        decrementChildren() {
            if (this.childrenCount > 0) {
                this.childrenCount--;
            }
        },
    },
}
</script>

<!-- TODO: REFACTOR CODE -->
<style scoped>
.filternav-container {
    width: 100%;
    margin-top: 145px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 200;
}

.filter-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 60%;
    height: 110px;
    background-color: white;
    border-radius: 70px;
    box-shadow: 5px 5px 15px rgb(25, 25, 25);
    transition: all 0.3s ease;
}

.filter-container.has-active-tab {
    background-color: #c2c2c2;
}

.tab {
    transition: all 0.3s ease;
    border-radius: 70px;
    cursor: pointer;
}

.furnitureBtn-container,
.priceBtn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 100%;
}

.locationBtn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 30%;
}

.people-enter-container {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 100%;
}

.location,
.people,
.price,
.furniture {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    border-radius: 70px;
    text-align: start;
    cursor: pointer;
    transition: background-color 0.2s;
}

.location:hover,
.people:hover,
.price:hover,
.furniture:hover {
    background-color: #c2c2c250;
}

.enter {
    position: absolute;
    right: 30px;
    width: auto;
    height: fit-content;
    border-radius: 100px;
    background-color: #345FCC;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: white;
    transition: background-color 0.2s;
    cursor: pointer;
    box-sizing: border-box;
    padding: 10px;
}

.text-holder {
    margin-left: 35px;
}

.vl {
    border: 1px solid #A7A7A7;
    height: 40%;
    transition: opacity 0.2s;
}

.sub-label {
    font-weight: 900;
    color: #8e8e8e;
}

.main-label {
    font-size: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.enter:hover {
    background-color: #264aa3;
}

.search-label {
    display: none;
}

.searchActive {
    display: flex;
}

.has-active-tab {
    background-color: #c2c2c2;
}

.active {
    background-color: #fff !important;
    box-shadow: 4px 0px 8px rgba(0, 0, 0, 0.1), 2px 0px 4px rgba(0, 0, 0, 0.06);
}

.activePeople {
    background-color: #fff !important;
    box-shadow: -4px 0px 8px rgba(0, 0, 0, 0.1), 2px 0px 4px rgba(0, 0, 0, 0.06);
}

.hide-vl {
    display: none;
}

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

.location-popup {
    width: 40%;
    height: 600px;
}

.showPopup {
    display: flex;
}

.location-input {
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    padding: 5px 15px;
    font-size: 16px;
    border-radius: 12px;
    margin-bottom: 40px;
}

input:focus {
    outline: none;
    border: 2px solid #0026FF;
    box-shadow: 0 0 0 2px rgba(0, 38, 255, 0.1);
}

.region {
    height: 100%;
    width: 100%;
}

.sangkat {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
}

.sangkat-children {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: fit-content;
    border: 1px solid black;
    padding: 10px 16px;
    font-weight: bold;
    border-radius: 9px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    user-select: none;
}

.sangkatChildrenActive {
    background-color: #0026ffc2;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.2), 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.furniture-popup {
    align-items: start;
    width: 30%;
    height: 265px;
    left: 21%;
}

.furniture-options {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.furniture-radio {
    margin: 20px 0px;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: bold;
}

.furniture-radio input[type="radio"] {
    opacity: 0;
    position: absolute;
}

.furniture-label {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    gap: 10px;
    border: 2px solid black;
    border-radius: 9px;
    transition: all 0.3s ease;
    user-select: none;
}

.furniture-radio input[type="radio"]:checked+.furniture-label {
    background-color: #0026ffc2;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.2), 0px 4px 12px rgba(0, 0, 0, 0.1);
}

/* Price Popup Styles */
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

/* People Popup Styles (Airbnb Style) */
.people-popup {
    width: 40%;
    height: auto;
    right: 0;
}

.guest-type-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #EBEBEB;
    width: 100%;
}

.guest-type-info {
    display: flex;
    flex-direction: column;
}

.guest-type-label {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    padding: 0;
}

.guest-type-desc {
    font-size: 14px;
    color: #717171;
    margin: 4px 0 0 0;
}

.guest-counter {
    display: flex;
    align-items: center;
    gap: 16px;
}

.counter-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #B0B0B0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.counter-btn:hover:not(:disabled) {
    border-color: #222222;
}

.counter-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.guest-count {
    font-size: 16px;
    font-weight: 400;
    min-width: 20px;
    text-align: center;
}

.guest-total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    margin-top: 8px;
    width: 100%;
}

.guest-total-label {
    font-size: 16px;
    font-weight: 500;
}

.guest-total-count {
    font-size: 16px;
    font-weight: 600;
}
</style>
