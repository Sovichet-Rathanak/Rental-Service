<template>
  <div class="tour-container-overlay" v-if="showTour">
    <div class="tour-container">
      <div class="header">
        <h2>Request a tour</h2>
        <button @click="$emit('close')">
          <Icon icon="charm:cross" width="27px" />
        </button>
      </div>

      <div class="body-container">
        <h2>Select a preferred date for tour</h2>
        <div class="detail-container">
          <VDatePicker
            expanded
            borderless
            v-model="tourDateTime"
            view="weekly"
            mode="dateTime"
            is12hr
            :min-date="new Date()"
            :min-time="minTime"
            :max-time="maxTime"
            :date-disabled="disabledDates"
            :attributes="dateAttributes"
          />
        </div>

        <div class="host-pfp">
          <h3>Will be sent to</h3>
          <div class="host-des">
            <Icon icon="octicon:feed-person-16" width="75" height="75" style="color: #000" />
            <div class="host-detail">
              <h3>Hosted by {{ hostname }}</h3>
              <!-- <h4>{{ listing.owner.email }}</h4> -->
            </div>
          </div>
        </div>

        <p class="condition">
          By contacting this property, you agree to our
          <u>Terms of use</u>. Visit our <u>Privacy Portal</u> for more information. When you click
          Send tour request, we’ll send your inquiry to the property manager so they can reach out and answer your questions.
        </p>
      </div>

      <div class="footer">
        <button class="send-tour" @click="submitTour" :disabled="!tourDateTime">
          Send tour request
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useBookingStore } from "@/stores/booking";
import { useListingStore } from "@/stores/listing";

export default {
  name: "RequestTour",
  props: {
    showTour: Boolean,
    listingId: String,
  },
  emits: ["close", "submitTour"],
  setup(props, { emit }) {
    const tourDateTime = ref(null);
    const bookingStore = useBookingStore();

    // Host info
    const hostname = computed(() => listing.value?.owner?.name || "Host");
    const hostEmail = computed(() => listing.value?.owner?.email || "No email");

    // Limit time selection to 8am–5pm
    const minTime = new Date(0, 0, 0, 8, 0); // 8:00 AM
    const maxTime = new Date(0, 0, 0, 17, 0); // 5:00 PM

    // Disable past dates
    const disabledDates = (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    };

    // Highlight booked dates (can be set dynamically)
    const bookedDates = ref([]); // e.g., ["2025-07-01", "2025-07-02"]
    const dateAttributes = computed(() =>
      bookedDates.value.map((dateStr) => ({
        key: `booked-${dateStr}`,
        dot: true,
        dates: new Date(dateStr),
        customData: { isBooked: true },
        popover: {
          label: "Already booked",
          visibility: "hover",
        },
        contentClass: "booked-dot",
      }))
    );

    // Watch selected time and update store
    watch(tourDateTime, (newVal) => {
      if (!newVal) return;
      const date = newVal.toISOString().split("T")[0];
      const time = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(newVal);

      bookingStore.updateBookingField("tourDate", date);
      bookingStore.updateBookingField("tourTime", time);
    });

    // Submit tour request
    const submitTour = () => {
      if (!tourDateTime.value) return;
      emit("submitTour", tourDateTime.value);
      emit("close");
    };

    return {
      tourDateTime,
      listing,
      hostname,
      hostEmail,
      minTime,
      maxTime,
      disabledDates,
      dateAttributes,
      submitTour,
    };
  },
};
</script>

<style scoped>
.tour-container-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.tour-container {
  background-color: white;
  width: 700px;
  height: 900px;
  border-radius: 30px;
}
.header {
  display: flex;
  justify-content: space-around;
  gap: 100px;
  padding-left: 220px;
  align-items: center;
  border-bottom: 1px solid gray;
}
.header button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.body-container {
  display: flex;
  flex-direction: column;
  margin-top: -40px;
  padding: 50px;
  gap: 20px;
  justify-content: space-evenly;
}
.detail-container {
  display: flex;
  justify-content: center;
}
.host-des {
  display: flex;
  gap: 20px;
  align-items: center;
}
.host-detail h3,
h4,
p {
  padding: 0px;
  margin: 10px;
}
.footer {
  display: flex;
  justify-content: center;
  margin-top: -20px;
}
.send-tour {
  display: flex;
  width: 70%;
  justify-content: center;
  align-items: center;
  background-color: #3b82f6;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 20px;
  padding: 15px;
  border-radius: 20px;
}
::v-deep(.vc-day-content) {
  font-size: 20px !important;
  font-family: "Airbnb Font";
  padding: 30px !important;
}
::v-deep(.vc-title) {
  font-size: 20px !important;
  font-family: "Airbnb Font";
}
::v-deep(.vc-weekday) {
  padding: 20px;
}
::v-deep(.vc-day-content.vc-disabled) {
  background-color: #f7f7f7;
  cursor: not-allowed;
}
::v-deep(.vc-dot) {
  background-color: #f44336;
}
.booked-dot {
  position: relative;
}
.booked-dot::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
}
</style>
