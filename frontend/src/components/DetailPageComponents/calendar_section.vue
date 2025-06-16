<template>
  <main>
    <div class="desContainer">
      <div style="display: flex; flex-direction: column">
        <h1>Cozy apartment in Toul Kork</h1>
        <p>Suitable for 2 tenants, 1 Bedroom, 1 Bathroom, Furnished</p>
        <div
          style="
            display: flex;
            align-items: center;
            margin-top: 20px;
            font-size: 22px;
            gap: 5px;
            text-decoration: underline;
          "
        >
          <Icon
            icon="material-symbols:star-rounded"
            width="28"
            height="28"
          />4.4 Rating
        </div>
      </div>
      <div class="host_pfp">
        <Icon
          icon="octicon:feed-person-16"
          width="75"
          height="75"
          style="color: #000"
        />
        <div class="host_des">
          <h2>Hosted by Shen Yue</h2>
          <p>4 years hosting</p>
        </div>
      </div>
      <h2>About this place</h2>
      <p>Take it easy to enjoy peaceful moment</p>

      <div style="margin-top: 40px">
        <h2>What this place offer</h2>
        <div class="amenContainer">
          <div class="amenities">
            <Icon icon="material-symbols:wifi" width="25" height="25" />
            <p>Wifi</p>
          </div>
          <div class="amenities">
            <Icon
              icon="material-symbols-light:tv-outline-rounded"
              width="25"
              height="25"
            />
            <p>TV</p>
          </div>
          <div class="amenities">
            <Icon icon="fluent:oven-48-regular" width="25" height="25" />
            <p>Kitchen</p>
          </div>
          <div class="amenities">
            <Icon icon="fluent:washer-32-regular" width="25" height="25" />
            <p>Washer</p>
          </div>
          <div class="amenities">
            <Icon
              icon="icon-park-outline:coffee-machine"
              width="25"
              height="25"
            />
            <p>Coffee machine</p>
          </div>
          <div class="amenities">
            <Icon icon="tabler:alarm-smoke" width="25" height="25" />
            <p>Smoke Alarm</p>
          </div>
        </div>
        <button class="showAmen" @click="toggleAmenities = true">
          Show all amenities
        </button>
      </div>
    </div>

    <div class="calContainer">
      <h2>Pick Your Stay Duration</h2>
      <div class="filter">
        <div class="filter-detail-row" @click="toggleDate = true">
          <h3>Move-in date</h3>
          <p class="filter-choice" @click="toggleDate = true">
            {{ isDateSelected ? formatDate(selectedMoveInDate) : "Add date" }}
          </p>
        </div>
        <div class="filter-detail-last-row">
          <h3>Rental Duration</h3>
          <div class="filter-btn-group">
            <button
              class="select-status-btn"
              :class="{ 'active-btn': rentalDuration === 'monthly' }"
              @click="setRentalDuration('monthly')"
            >
              Monthly
            </button>
            <button
              class="select-status-btn"
              :class="{ 'active-btn': rentalDuration === 'yearly' }"
              @click="setRentalDuration('yearly')"
            >
              Yearly
            </button>
          </div>
        </div>
      </div>
      <button class="check-availability" @click="checkAvailability">
        Check availability
      </button>
      <p v-if="validationMessage" class="warning-msg">{{ validationMessage }}</p>
    </div>
    <Date_pop_up
      :show="toggleDate"
      @close="handleCloseDatePopup"
      @update-date="handleSelectedDate"
    />
    <Request_tour
      :showTour="toggleTour"
      @close="handleTourPopup"
      @submitTour="handleTourSubmit"
    ></Request_tour>
    <Amenities_pop_up
      :showAmenities="toggleAmenities"
      @close="handleAmenPopUp"
    ></Amenities_pop_up>
  </main>
</template>

<script>
import Date_pop_up from "./date_pop_up.vue";
import Request_tour from "./request_tour.vue";
import Amenities_pop_up from "./amenities_pop_up.vue";
import { useBookingStore } from "@/stores/booking";
import { mapActions, mapState } from "pinia";

export default {
  name: "calendar-section",
  components: {
    Date_pop_up,
    Request_tour,
    Amenities_pop_up,
  },
  props: {
    listingId: {
      type: String,
      required: true,
    },
    tenantId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedMoveInDate: null,
      toggleDate: false,
      rentalDuration: "",
      isDateSelected: false,
      toggleTour: false,
      toggleAmenities: false,
      validationMessage: "",
    };
  },
  computed: {
    ...mapState(useBookingStore, ["bookings"]),
  },
  methods: {
    ...mapActions(useBookingStore, ["updateBookingField", "createBooking"]),

    handleAmenPopUp() {
      this.toggleAmenities = false;
    },
    setRentalDuration(duration) {
      this.rentalDuration = duration;
      this.updateBookingField("rentalDuration", duration);

      if (this.rentalDuration && this.selectedMoveInDate) {
    this.validationMessage = ""; // Clear only if both are selected
  }
    },
    handleSelectedDate(date) {
      this.selectedMoveInDate = date;
      console.log("Selected move-in date:", date);

      const formatted = date ? date.toISOString().split("T")[0] : "";
      this.updateBookingField("moveInDate", formatted);

      if (this.rentalDuration && this.selectedMoveInDate) {
    this.validationMessage = ""; 
  }
    },
    handleCloseDatePopup() {
      this.isDateSelected = true;
      this.toggleDate = false;
    },
    handleTourPopup() {
      this.toggleTour = false;
    },
    formatDate(date) {
      if (!date) return "";
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    },

    checkAvailability() {
      if (!this.selectedMoveInDate || !this.rentalDuration) {
        this.validationMessage =
          "Please select move-in date and rental duration.";
        return;
      }

      this.validationMessage = "";
      this.toggleTour = true;
    },

    async handleTourSubmit() {
      try {
        const data = await this.createBooking();
        console.log("Booking successful:", data);
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || "Booking failed";
        if (message.includes("already taken")) {
          alert(
            "This time slot is already taken. Please choose a different one."
          );
        } else {
          alert(message);
        }

        throw err;
      }
    },
  },

  mounted() {
    this.updateBookingField("tenantId", this.tenantId);
    this.updateBookingField("listingId", this.listingId);
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
}
.showAmen {
  width: 250px;
  font-size: 20px;
  padding: 15px;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid black;
  font-weight: bold;
  margin-top: 30px;
}
.active-btn {
  background-color: rgb(55, 120, 240);
  color: white;
}
h2,
h3,
h1 {
  margin-top: 20px;
  margin-bottom: -5px;
}
button {
  border: 1px solid lightgray;
  background-color: transparent;
  border-radius: 10px;
  font-size: 15px;
  padding: 10px;
  cursor: pointer;
}
p {
  font-size: 20px;
  margin-bottom: 0px;
}

.amenContainer {
  margin-top: 20px;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 170px;
  row-gap: 15px;
}
.amenities {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 20px;
}
.amenities p {
  margin: 0px;
}
.desContainer {
  display: flex;
  flex-direction: column;
  position: relative;
}

.host_pfp {
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 40px 0;
}
.calContainer {
  margin-top: 100px;
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  border-radius: 20px;
  box-shadow: 1px 1px 5px 5px lightgray;
  margin-top: 20px;
  width: 30%;
  height: 70%;
  position: relative;
}
.id {
  position: absolute;
  right: 41%;
  top: 72%;
}
.filter {
  display: grid;
  grid-template-rows: auto auto auto auto;
  row-gap: 5px;
  margin-top: 25px;
  border: 1px solid lightgray;
  border-radius: 20px;
}
.filter-detail-row {
  border-bottom: 1px solid lightgray;
  padding-left: 20px;
  padding-bottom: 10px;
}
.filter-detail-last-row {
  padding-left: 20px;
  padding-bottom: 10px;
}
.filter-btn-group {
  padding-top: 20px;
  padding-bottom: 5px;
  display: flex;
  gap: 15px;
}
.check-availability {
  width: 100%;
  border-radius: 25px;
  padding: 20px;
  font-size: 20px;
  background-color: rgb(55, 120, 240);
  border: none;
  color: white;
  font-weight: 900;
  margin-top: 20px;
}

.warning-msg {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

</style>
