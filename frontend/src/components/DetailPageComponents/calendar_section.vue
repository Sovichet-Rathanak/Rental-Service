<template>
  <main>
    <div class="desContainer">
      <div style="display: flex; flex-direction: column">
        <h1>{{ listing.title }}</h1>
        <p>Suitable for {{ listing.guests }} Guest(s), {{ listing.bedrooms }} Bedroom(s), {{ listing.bathrooms }}
          Bathroom</p>
          <p>{{ listing.owner.id }}</p>
        <div style="
            display: flex;
            align-items: center;
            margin-top: 20px;
            font-size: 22px;
            gap: 5px;
            text-decoration: underline;
          ">
          <Icon icon="material-symbols:star-rounded" width="28" height="28" />4.4 Rating
        </div>
      </div>
      <div class="host_pfp">
        <Icon v-if="!thumbnail_url" icon="fluent:person-circle-32-filled" width="90" height="90"
          style="color: black;" />
        <img :src="`http://localhost:9000/romdoul/${thumbnail_url}`" alt="PFP" class="profile-pic"
          style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover;">
        <div class="host_des">
          <h2>{{ hostname }}</h2>
        </div>
      </div>
      <h2>About this place</h2>
      <p>{{ listing.description }}</p>

      <div style="margin-top: 40px">
        <h2>What this place offer</h2>
        <div class="amenContainer">
          <div class="amenities" v-for="amenity in visibleAmenities">
            <Icon :icon="amenity.icon_name" width="24" height="24" style="color: black" />
            <span>{{ amenity.name }}</span>
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
            <button class="select-status-btn" :class="{ 'active-btn': rentalDuration === 'monthly' }"
              @click="setRentalDuration('monthly')">
              Monthly
            </button>
            <button class="select-status-btn" :class="{ 'active-btn': rentalDuration === 'yearly' }"
              @click="setRentalDuration('yearly')">
              Yearly
            </button>
          </div>
        </div>
      </div>
        <button class="check-availability" @click="checkAvailability">
        {{ isAvailableChecked ? "Book Now" : "Check Availability" }}
      </button>
      <p v-if="validationMessage" class="warning-msg">{{ validationMessage }}</p>
    </div>
    <Date_pop_up :show="toggleDate" @close="handleCloseDatePopup" @update-date="handleSelectedDate" />
    <Request_tour :showTour="toggleTour" @close="handleTourPopup" @submitTour="handleTourSubmit"></Request_tour>
    <Amenities_pop_up :amenities="amenities" :showAmenities="toggleAmenities" @close="handleAmenPopUp">
    </Amenities_pop_up>
  </main>
</template>

<script>
import Date_pop_up from "./date_pop_up.vue";
import Request_tour from "./request_tour.vue";
import Amenities_pop_up from "./amenities_pop_up.vue";
import { useBookingStore } from "@/stores/booking";
import { useNotificationStore } from "@/stores/notification";
import { useUserStore } from "@/stores/user";
import { mapActions, mapState } from "pinia";

export default {
  name: "calendar-section",
  components: {
    Date_pop_up,
    Request_tour,
    Amenities_pop_up,
  },
  props: {
    listing: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    listingId: {
      type: String,
      require: true,
    },
    amenities: {
      type: Array,
      require: true
    },
    thumbnail_url: {
      type: String,
      require: false
    },
    hostname:{
      type: String,
      require: true
    }
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
      isAvailableChecked: false, // controls button state
    };
  },
  computed: {
    ...mapState(useBookingStore, ["bookings"]),
    visibleAmenities() {
      if (this.amenities.length < 6) {
        return this.amenities.slice(0, 3);
      }
      return this.amenities.slice(0, 6);
    }
  },
  methods: {
    ...mapActions(useBookingStore, ["updateBookingField", "createBooking"]),

    handleAmenPopUp() {
      this.toggleAmenities = false;
    },
    setRentalDuration(duration) {
      this.rentalDuration = duration;
      this.updateBookingField("rentalDuration", duration);
      this.validationMessage = "";
      this.isAvailableChecked = false; 
    },
    handleSelectedDate(date) {
      this.selectedMoveInDate = date;
      const formatted = date ? date.toISOString().split("T")[0] : "";
      this.updateBookingField("moveInDate", formatted);
      this.validationMessage = "";
      this.isAvailableChecked = false; 
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
      if (!this.isAvailableChecked) {
        // First click: validate and open popup
        if (!this.selectedMoveInDate || !this.rentalDuration) {
          this.validationMessage = "Please select move-in date and rental duration.";
          return;
        }
        this.validationMessage = "";
        this.isAvailableChecked = true;
        this.toggleTour = true;
      } else {
        // Second click: create booking & send notification
        this.handleTourSubmit();
      }
    },

    async handleTourSubmit() {
      const notificationStore = useNotificationStore();
      const userStore = useUserStore();

      // try {
        const data = await this.createBooking();
        console.log("Booking successful:", data);

        const landlordId = data?.listing?.owner?.id || data?.listing?.landlordId || data?.listing?.landlord_id;
        if (!landlordId) {
          alert("Landlord ID not found in the booking data. Cannot send notification.");
          return;
        }
        const tenantName = `${userStore.user.firstname} ${userStore.user.lastname}`;
        const senderId = `${userStore.user.id}`

        await notificationStore.createBookingNotifications({
          senderId: String(senderId),
          receiverId: String(landlordId), 
          type: "tour",
          bookingId: data.id,
          tenantName,
        });

        return data;
      // } catch (err) {
      //   const message = err.response?.data?.message || "Booking failed"; 
      //   this.error = message;

      //   if (message.includes("already taken")) {
      //     alert("This time slot is already taken. Please choose a different one.");
      //   } else {
      //     alert(message);
      //   }
      // }
    },
  },

  mounted() {
    this.updateBookingField("tenantId", this.userId);
    this.updateBookingField("listingId", this.listingId);
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 30px;
  padding: 0 30px;
}

.desContainer {
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.host_pfp {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.amenContainer {
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 20px 40px;
  margin-top: 20px;
}

.amenities {
  display: flex;
  align-items: center;
  gap: 15px;
}

.showAmen {
  width: fit-content;
  font-size: 16px;
  padding: 12px 20px;
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid black;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
}

.calContainer {
  flex: 1 1 30%;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
  background-color: white;
}

h1,
h2,
h3 {
  margin: 0;
}

p {
  font-size: 18px;
  line-height: 1.4;
  margin: 5px 0;
}

.filter {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid lightgray;
  border-radius: 16px;
}

.filter-detail-row,
.filter-detail-last-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-choice {
  font-size: 16px;
  color: #555;
  cursor: pointer;
  text-decoration: underline;
}

.filter-btn-group {
  display: flex;
  gap: 10px;
}

.select-status-btn {
  flex: 1;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid gray;
  cursor: pointer;
  background-color: white;
  font-weight: 500;
}

.active-btn {
  background-color: rgb(55, 120, 240);
  color: white;
  border: none;
}

.check-availability {
  width: 100%;
  padding: 15px;
  border-radius: 25px;
  background-color: rgb(55, 120, 240);
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
}

.warning-msg {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
