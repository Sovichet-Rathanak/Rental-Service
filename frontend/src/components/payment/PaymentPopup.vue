<template>
  <div class="overlay" v-if="listingDetails && bookingDetails">
    <div class="payment-popup">
      <div class="header">
        <button @click="$emit('close')">
          <Icon icon="charm:cross" width="30" height="30" />
        </button>
        <h1>Payment</h1>
      </div>

      <div class="popup-content">
        <!-- Left: PropertyCard -->
        <div class="property-container">
          <PropertyCard
            :data="{
              id: listingDetails.id,
              title: listingDetails.title,
              price: `$${listingDetails.price_monthly}/month`,
              khan: listingDetails.region?.region_name ?? 'Unknown',
              songkat: listingDetails.songkat,
              street: listingDetails.street_address,
              image: imageMap[listingDetails.id] || getThumbnailByIndex(listingDetailsIndex),
            }"
          />
        </div>

        <!-- Right: Payment Form -->
        <div class="right-section">
          <div class="form-group">
            <label for="card">Choose your credit card</label>
            <select v-model="selectedCard" id="card">
              <option disabled value="">**** **** **** xxxx</option>
              <option v-for="card in cards" :key="card.id" :value="card.id">
                **** **** **** {{ card.cardNumber.slice(-4) }}
              </option>
            </select>
          </div>

          <div class="date-group">
            <div class="form-group half-width">
              <label>Move In Date</label>
              <input type="date" v-model="moveInDate" disabled />
            </div>
            <div class="form-group half-width">
              <label>Move Out Date</label>
              <input type="date" v-model="dueDate" disabled />
            </div>
          </div>

          <div class="form-group">
            <label>Rental Duration</label>
            <input type="text" v-model="rentalDuration" disabled />
          </div>

          <div class="form-group">
            <label>Total Amount</label>
            <p class="amount">${{ totalAmount }}</p>
          </div>

          <button class="pay-now" @click="submitPayment">Pay Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useListingStore } from '@/stores/listing';
import PropertyCard from '@/components/PropertyCard.vue';
import { Icon } from '@iconify/vue';

export default {
  components: { PropertyCard, Icon },
  props: {
    bookingId: { type: String, required: true },
    listingId: { type: String, required: true },
  },
  setup(props, { emit }) {
    const listingStore = useListingStore();

    const cards = ref([]);
    const selectedCard = ref('');
    const moveInDate = ref('');
    const dueDate = ref('');
    const rentalDuration = ref('');
    const totalAmount = ref(0);
    const bookingDetails = ref(null);

    const imageMap = ref({});

    const listingDetails = computed(() =>
      listingStore.listings.find(l => l.id === props.listingId) || null
    );

    const listingDetailsIndex = computed(() =>
      listingStore.listings.findIndex(l => l.id === props.listingId)
    );

    async function fetchCards() {
      try {
        const res = await fetch('http://localhost:3000/api/payments-info');
        const data = await res.json();
        cards.value = data.map(card => ({
          id: card.id,
          cardNumber: card.cardNumber,
        }));
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    }

    async function fetchBookingDetails() {
      try {
        const res = await fetch('http://localhost:3000/api/booking');
        const bookings = await res.json();
        const booking = bookings.find(b => b.id === props.bookingId);
        if (booking) {
          bookingDetails.value = booking;
          moveInDate.value = booking.moveInDate;
          dueDate.value = booking.moveOutDate;
          rentalDuration.value = booking.rentalDuration === 'yearly' ? 'Yearly' : 'Monthly';
          updateTotalAmount();
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    }

    async function fetchImagesForListings() {
      for (const listing of listingStore.listings) {
        try {
          const images = await listingStore.fetchListingImagesById(listing.id);
          if (images && images.length > 0) {
            const thumb = images.find(img => img.isThumbnail) || images[0];
            const key = thumb.isThumbnail
              ? thumb.thumbnail_url
              : `original/${thumb.original_url}`;
            imageMap.value[listing.id] = `http://localhost:9000/romdoul/${key}`;
          }
        } catch (err) {
          console.error("Failed to load image for listing:", listing.id, err);
        }
      }
    }

    function getThumbnailByIndex(index) {
      const images = listingStore.listingImages[index];
      if (!images || images.length === 0) return '/placeholder.jpg';

      const thumb = images.find(img => img.isThumbnail);
      const imageToUse = thumb || images[0];

      const key = imageToUse.isThumbnail
        ? imageToUse.thumbnail_url
        : `original/${imageToUse.original_url}`;
      return `http://localhost:9000/romdoul/${key}`;
    }

    function updateTotalAmount() {
      if (!rentalDuration.value || !listingDetails.value) return;

      totalAmount.value =
        rentalDuration.value === 'Yearly'
          ? listingDetails.value.price_yearly
          : listingDetails.value.price_monthly;
    }

    async function submitPayment() {
      if (!selectedCard.value) {
        alert('Please select a credit card.');
        return;
      }

      if (!bookingDetails.value || !listingDetails.value) {
        alert('Missing booking or listing information.');
        return;
      }

      // Defensive extraction of userId (UUID)
      const tenantData = bookingDetails.value.tenant;
      const userId = typeof tenantData === 'object' && tenantData.id ? tenantData.id : tenantData;

      // Debug logging
      console.log('Tenant data:', tenantData);
      console.log('Extracted userId:', userId);

      if (!userId || typeof userId !== 'string' || !/^[0-9a-fA-F-]{36}$/.test(userId)) {
        alert('Invalid user ID. Cannot proceed with payment.');
        return;
      }
      
      console.log('Tenant data:', bookingDetails.value.tenant);
      console.log('Extracted userId:', bookingDetails.value.tenant?.id);

      const payload = {
        userId: bookingDetails.value.tenant.id,  // <-- this must be a UUID
        listingId: props.listingId,
        bookingId: props.bookingId,
        paymentInfoId: selectedCard.value,
        amount: totalAmount.value,
        paymentMethod: 'credit_card',
        status: 'pending',
        transactionId: `txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        paymentDate: new Date().toISOString(),
      };

      try {
        const res = await fetch('http://localhost:3000/api/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok) {
          console.error('API Error:', result);
          throw new Error(result.message || 'Failed to submit payment.');
        }

        console.log('Payment submitted:', result);
        alert('Payment submitted successfully!');
        emit('close');
      } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed. Please try again.');
      }
    }

    onMounted(async () => {
      await listingStore.fetchAllListingsWithImages();
      await fetchImagesForListings();
      await fetchCards();
      await fetchBookingDetails();
    });

    return {
      listingDetails,
      listingDetailsIndex,
      bookingDetails,
      cards,
      selectedCard,
      moveInDate,
      dueDate,
      rentalDuration,
      totalAmount,
      imageMap,
      getThumbnailByIndex,
      submitPayment,
    };
  },
};
</script>

<style scoped>
/* Your existing styles here */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 110vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.payment-popup {
  border-radius: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  margin-top: 100px;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: white;
}
.header {
  padding-left: 5%;
  display: flex;
  gap: 35%;
  border-bottom: 1px solid lightgray;
}
.header button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.popup-content {
  display: flex;
  gap: 3.5rem;
  padding: 3rem;
}
.property-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
}
.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 60%;
  padding-right: 10px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.date-group {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}
.half-width {
  flex: 1;
}
label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
}
input,
select {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.amount {
  font-weight: bold;
  font-size: 1.2rem;
}
.pay-now {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}
.pay-now:hover {
  background-color: #0056b3;
}
</style>
