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

            <LocationPopup :visible="activeTab === 'location'" :active-option="activeSangkatChild"
                @toggle-sangkat="setActiveSangkat"></LocationPopup>

            <FurniturePopup :visible="activeTab === 'furniture'" :furnitureStatus="furnitureStatus"
                @update:furniture-status="updateFurnitureStatus"></FurniturePopup>

            <PricePopup :visible="activeTab === 'price'" :max-price="maxPrice" :min-price="minPrice" @setPrice=""></PricePopup>

            <PeoplePopup :visible="activeTab === 'people'" :adultCount="adultCount" :children-count="childrenCount" @incrementAdults=""
                @decrementAdults="decrementAdults" @incrementChildren="incrementChildren"
                @decrementChildren="decrementChildren"></PeoplePopup>
        </div>
    </div>
</template>

<script>
import LocationPopup from './LocationPopup.vue';
import FurniturePopup from './FurniturePopup.vue';
import PricePopup from './PricePopup.vue';
import PeoplePopup from './PeoplePopup.vue';

export default {
    components: {
        LocationPopup,
        FurniturePopup,
        PricePopup,
        PeoplePopup
    },
    data() {
        return {
            activeTab: null,
            activeSangkatChild: false,
            furnitureStatus: null,
            minPrice: 200,
            maxPrice: 1000,
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
        updateFurnitureStatus(status) {
            this.furnitureStatus = status;
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

<style scoped>
.filternav-container {
    width: 100%;
    margin-top: 90px;
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

.showPopup {
    display: flex;
}
</style>