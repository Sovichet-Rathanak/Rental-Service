import { defineStore } from "pinia";
import axios from "axios";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    bookings: [],
    bookingDates: [],
    rentingList: [],
    bookingForm: {
      tenantId: "",
      listingId: "",
      moveInDate: "",
      rentalDuration: "",
      tourDate: "",
      tourTime: "",
    },
    statusMessage: "",
  }),
  actions: {
    updateBookingField(key, value) {
      this.bookingForm[key] = value;
    },

    resetBookingForm() {
      this.bookingForm = {
        tenantId: "",
        listingId: "",
        moveInDate: "",
        rentalDuration: "",
        tourDate: "",
        tourTime: "",
      };
    },

    async createBooking() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/booking",
          this.bookingForm
        );
        const bookingId = response.data.id;
        console.log("Booking created", response.data);

        this.resetBookingForm();

        return response.data;
      } catch (err) {
        console.error("Booking error:", err);
        throw err;
      }
    },

    async fetchRentingList(tenantId) {
      try {
        const res = await axios.get(`http://localhost:3000/api/booking/renting-list/${tenantId}`);
        this.rentingList = res.data;
        return res.data
      } catch (error) {
        console.error("Failed to fetch renting list:", error);
      }
    },

    
      async fetchBookedDates(listingId) {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/booking/listing/${listingId}`
          );
          this.bookedDates = res.data.map((booking) => booking.tourDate); 
        } catch (err) {
          console.error("Error fetching booked dates:", err);
        }
      },
    
  },

  persist: true,
});
