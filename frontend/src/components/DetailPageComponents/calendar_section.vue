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
            <div class="amenContainer">
                <div class="amenities"><Icon icon="material-symbols:wifi" width="25" height="25"/><p>Wifi</p></div>
                <div class="amenities"><Icon icon="material-symbols-light:tv-outline-rounded" width="25" height="25"/><p>TV</p></div>
                <div class="amenities"><Icon icon="fluent:oven-48-regular" width="25" height="25"/><p>Kitchen</p></div>
                <div class="amenities"><Icon icon="fluent:washer-32-regular" width="25" height="25"/><p>Washer</p></div>
                <div class="amenities"><Icon icon="icon-park-outline:coffee-machine" width="25" height="25"/><p>Coffee machine</p></div>
                <div class="amenities"><Icon icon="tabler:alarm-smoke" width="25" height="25"/><p>Smoke Alarm</p></div>
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
        <Request_tour :showTour="toggleTour" @close="handleTourPopup"></Request_tour>
        <Amenities_pop_up :showAmenities="toggleAmenities" @close="handleAmenPopUp"></Amenities_pop_up>
    </main>
</template>

<script>
import Amenities_pop_up from './amenities_pop_up.vue';
import Date_pop_up from './date_pop_up.vue';
import Request_tour from './request_tour.vue';
import StepButton from '@/components/StepButton.vue';

export default {
    name: "calendar-section",
    components:{
        Date_pop_up,
        Request_tour,
        Amenities_pop_up,
        StepButton
    },
    data(){
        return{
            selectedMoveInDate: null,
            toggleDate: false,
            furnitureType: '',     
            rentalDuration: '', 
            isDateSelected: false,
            toggleTour: false,
            toggleAmenities: false,
        }
    },
    methods:{
        handleUpdateTotal(newTotal) {
            this.totalTenant = newTotal;
        },
        handleAmenPopUp(){
            this.toggleAmenities = false
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
    margin-top: 30px

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

.amenContainer{
    margin-top: 20px;
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 100px;
    row-gap: 15px;
}
.amenities{
    display: flex;
    align-items: center;
    gap: 20px;
    padding-top: 20px;
}
.amenities p{
    margin: 0px;
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
    width: 30%;
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
</style>