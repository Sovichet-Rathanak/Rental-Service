<template>
    <main>
        <div class="desContainer">
            <h2>Cozy apartment in Toul Kork</h2>
            <p>1 bedroom, 1 bathroom</p>
            <div style="display: flex; align-items: center; margin-top: 20px; font-size: 18px; gap: 5px; text-decoration: underline;"><Icon icon="material-symbols:star-rounded" width="20" height="20"/>2500 reviews</div>
            <div class="host_pfp">
                <Icon icon="octicon:feed-person-16" width="75" height="75" style="color: #000" />
                <div class="host_des">
                    <h3>Hosted by Shen Yue</h3>
                    <p>4 years hosting</p>
                </div>
            </div>
            <h3>About this place</h3>
            <p>Take it easy to enjoy peaceful moment</p>
            <h3>The space</h3>
            <p>Big yard</p>
            <h3>What this place offer</h3>
            <div class="fave-amen-container">
                <StepButton v-for="(amenity, index) in guestFavorites" :key="'fave-' + index" :label="amenity.label"
                    :icon="amenity.icon" :active="selectedAmenities.includes(amenity)"
                    @setActive="toggleAmenity(amenity)"></StepButton>
            </div>
            <button class="showAmen" @click="toggleAmenities = true">Show all amenities</button>
        </div>
        <div class="calContainer">
            <h3>Pick Your Stay Duration</h3>
            <div class="filter">
                <div class="filter-detail-row" @click="toggleDate = true">
                    <h3>Move-in date</h3>
                    <p class="filter-choice" @click="toggleDate = true"> {{ isDateSelected ? formatDate(selectedMoveInDate) : 'Add date' }} </p>
                </div>
                <div class="filter-detail-row-tenant" @click="toggleTenant = true">
                    <div>
                        <h3>Tenants</h3>
                        <p class="filter-choice">{{ totalTenant }} Tenants</p>
                    </div>
                    <div><Icon icon="iconoir:nav-arrow-down" width="35" height="35" style="color: #000; cursor: pointer"/></div>
                </div>
                <div class="filter-detail-row">
                    <h3>Furniture</h3>
                    <div class="filter-btn-group">
                        <button class="select-status-btn"  :class="{ 'active-btn': furnitureType === 'furnished'}" @click="setFurniture('furnished')">Fully Furnished</button>
                        <button class="select-status-btn"  :class="{ 'active-btn': furnitureType === 'empty' }" @click="setFurniture('empty')">Empty Room</button>
                    </div>
                </div>
                <div class="filter-detail-last-row">
                    <h3>Rental Duration</h3>
                    <div class="filter-btn-group">
                        <button class="select-status-btn" :class="{ 'active-btn': rentalDuration === 'monthly' }" @click="setRentalDuration('monthly')">Monthly</button>
                        <button class="select-status-btn" :class="{ 'active-btn': rentalDuration === 'yearly' }" @click="setRentalDuration('yearly')">Yearly</button>
                    </div>
                </div>
            </div>
            <button class="check-availability" @click="toggleTour = true">Check availability </button>
        </div>
        <Date_pop_up :show="toggleDate" @close="handleCloseDatePopup" @update-date="handleSelectedDate"/>
        <Tenants_pop_up :show-tenant="toggleTenant" @close="toggleTenant = false" @update-total="handleUpdateTotal"></Tenants_pop_up>
        <Request_tour :showTour="toggleTour" @close="handleTourPopup"></Request_tour>
        <Amenities_pop_up :showAmenities="toggleAmenities" @close="handleAmenPopUp"></Amenities_pop_up>
    </main>
</template>

<script>
import Amenities_pop_up from './amenities_pop_up.vue';
import Date_pop_up from './date_pop_up.vue';
import Request_tour from './request_tour.vue';
import Tenants_pop_up from './tenants_pop_up.vue';
import StepButton from '@/components/StepButton.vue';

export default {
    name: "calendar-section",
    components:{
        Date_pop_up,
        Tenants_pop_up,
        Request_tour,
        Amenities_pop_up,
        StepButton
    },
    data(){
        return{
            selectedMoveInDate: null,
            toggleDate: false,
            toggleTenant: false,
            totalTenant: 0,
            furnitureType: '',     
            rentalDuration: '', 
            isDateSelected: false,
            toggleTour: false,
            toggleAmenities: false,

            selectedAmenities: [],
            guestFavorites: [
                {
                    label: "Wifi",
                    icon: 'material-symbols:wifi'
                },
                {
                    label: "TV",
                    icon: 'material-symbols-light:tv-outline-rounded'
                },
                {
                    label: "Kitchen",
                    icon: 'fluent:oven-48-regular'
                },
                {
                    label: "Washer",
                    icon: 'fluent:washer-32-regular'
                },
                {
                    label: "Free parking",
                    icon: 'iconoir:parking'
                },
                {
                    label: "Paid parking",
                    icon: 'maki:parking-paid'
                }
            ]
        }
    },
    methods:{
        handleUpdateTotal(newTotal) {
            this.totalTenant = newTotal;
        },
        handleAmenPopUp(){
            this.toggleAmenities = false
        },
        setFurniture(type) {
            this.furnitureType = type;
        },
        setRentalDuration(duration) {
            this.rentalDuration = duration;
        },
        handleSelectedDate(date) {
            this.selectedMoveInDate = date;
            console.log('Selected move-in date:', date); 
        },
        handleCloseDatePopup() {
            this.isDateSelected = true; 
            this.toggleDate = false; 
        },
        handleTourPopup(){
            this.toggleTour = false
        },
        formatDate(date) {
            if (!date) return '';
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        },
        toggleAmenity(amenity) {
            if (this.selectedAmenities.includes(amenity)) {
                this.selectedAmenities = this.selectedAmenities.filter(a => a !== amenity);
            } else {
                this.selectedAmenities.push(amenity);
            }
        }
    }
}

</script>

<style scoped>
main{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 70px;
}
.showAmen{
    width: 250px;
    font-size: 20px;
    padding: 15px;
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid black;
    font-weight: bold;
    margin-top: 20px

}
.active-btn{
    background-color: rgb(55, 120, 240);
    color: white;
}
h2, h3{
    margin-top: 20px;
    margin-bottom: -10px ;
}
button {
    border: 1px solid lightgray;
    background-color: transparent;
    border-radius: 10px;
    font-size: 15px;
    padding: 10px;
    cursor: pointer;
}
p{
    font-size: 18px;
    margin-bottom: 0px;
}

.fave-amen-container {
    display: grid;
    align-self: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 40px 5px 20px 5px;
}

.desContainer{
    display: flex;
    flex-direction: column;
}

.host_pfp{
    display: flex;
    gap: 20px;
    align-items: center;
    margin-top: 20px;
}
.calContainer{
    padding-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 50px;
    border-radius: 20px;
    box-shadow: 1px 1px 5px 5px lightgray;
    margin-top: 20px;
    width: 35%;
    height: 70%;
}
.filter{
    display: grid;
    grid-template-rows: auto auto auto auto;
    row-gap: 5px;
    margin-top: 25px;
    border: 1px solid lightgray;
    border-radius: 20px;
}
.filter-detail-row{
    border-bottom: 1px solid lightgray;
    padding-left: 20px;
    padding-bottom: 10px;
}
.filter-detail-last-row{
    padding-left: 20px;
    padding-bottom: 10px;
}
.filter-btn-group{
    padding-top: 20px;
    padding-bottom: 5px;
    display: flex;
    gap: 15px;
}
.filter-choice{
    color: gray;
    cursor: pointer;
}
.check-availability{
    width: 100%;
    border-radius: 25px;
    padding: 20px;
    font-size: 20px;
    background-color: rgb(55, 120, 240);
    border: none;
    color: white;
    font-weight:900;
    margin-top: 20px;
}
.filter-detail-row-tenant{
    border-bottom: 1px solid lightgray;
    padding-left: 20px;
    padding-bottom: 10px;
    padding-right: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>