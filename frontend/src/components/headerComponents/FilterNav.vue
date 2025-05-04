<template>
    <div class="filter-container" :class="{ 'has-active-tab': activeTab !== null }">
        <div class="locationBtn-container tab" :class="{ active: activeTab === 'location' }"
            @click="setActiveTab('location')">
            <button class="location">
                <p class="text-holder">
                    <span class="main-label" style="font-size: 24px;">
                        Location
                        <Icon icon="mingcute:location-fill" width="24" height="24" />
                    </span>
                    <span class="sub-label">Search Location</span>
                </p>
            </button>
            <span class="vl"></span>
        </div>

        <div class="roomsBtn-container tab" :class="{ active: activeTab === 'rooms' }" @click="setActiveTab('rooms')">
            <button class="rooms">
                <p class="text-holder">
                    <span class="main-label" style="font-size: 24px;">
                        Rooms
                        <Icon icon="fluent:conference-room-16-filled" width="26" height="26" />
                    </span>
                    <span class="sub-label">Number of Rooms</span>
                </p>
            </button>
            <span class="vl"></span>
        </div>

        <div class="priceBtn-container tab" :class="{ active: activeTab === 'price' }" @click="setActiveTab('price')">
            <button class="price">
                <p class="text-holder">
                    <span class="main-label" style="font-size: 24px;">
                        Price
                        <Icon icon="fa-solid:money-bill-wave" width="27.5" height="22" />
                    </span>
                    <span class="sub-label">Price Range</span>
                </p>
            </button>
            <span class="vl"></span>
        </div>

        <div class="furniture-enter-container tab" :class="{ active: activeTab === 'furniture' }"
            @click="setActiveTab('furniture')">
            <button class="furniture">
                <p class="text-holder">
                    <span class="main-label">
                        Furniture
                        <Icon icon="maki:furniture" width="24" height="24" />
                    </span>
                    <span class="sub-label">Furniture Status</span>
                </p>
            </button>
            <button class="enter" @click.stop>
                <Icon icon="iconoir:search" width="32" height="32" />
                <h2 class="search-label" :class="{ searchActive: activeTab === 'furniture' }">Search</h2>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: null
        }
    },
    methods: {
        setActiveTab(tabName) {
            if (this.activeTab === tabName) {
                this.activeTab = null;
            } else {
                this.activeTab = tabName;
            }
        }
    }
}
</script>

<style>
.filter-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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

.roomsBtn-container,
.priceBtn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 100%;
}

.locationBtn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 30%;
}

.furniture-enter-container {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 100%;
}

.location,
.rooms,
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
.rooms:hover,
.price:hover,
.furniture:hover {
    background-color: #c2c2c250;
}

.enter {
    position: absolute;
    right: 30px;
    width: auto;
    height: 75px;
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
    padding-inline: 10px;
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
    box-shadow: 4px 0px 2px rgba(109, 109, 109, 0.66);
}
</style>