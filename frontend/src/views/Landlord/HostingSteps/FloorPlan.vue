<template>
  <div class="container">
    <hgroup>
      <h1>Share some basics about your place</h1>
      <h2>You'll add more details later, like amenities.</h2>
    </hgroup>
    <div class="input-container">
      <div class="row">
        <span class="label">Guests</span>
        <div class="counter">
          <button class="counter-btn" @click="decrementGuests" :disabled="listingStore.listingForm.guests <= 1">
            <Icon icon="mdi:minus" width="16" height="16" />
          </button>
          <span class="guest-count">{{ listingStore.listingForm.guests }}</span>
          <button class="counter-btn" @click="incrementGuests">
            <Icon icon="mdi:plus" width="16" height="16" />
          </button>
        </div>
      </div>

      <div class="row">
        <span class="label">Bedrooms</span>
        <div class="counter">
          <button class="counter-btn" @click="decrementBedrooms" :disabled="listingStore.listingForm.bedrooms <= 1">
            <Icon icon="mdi:minus" width="16" height="16" />
          </button>
          <span class="guest-count">{{ listingStore.listingForm.bedrooms }}</span>
          <button class="counter-btn" @click="incrementBedrooms">
            <Icon icon="mdi:plus" width="16" height="16" />
          </button>
        </div>
      </div>

      <div class="row">
        <span class="label">Bathrooms</span>
        <div class="counter">
          <button class="counter-btn" @click="decrementBathrooms" :disabled="listingStore.listingForm.bathrooms <= 1">
            <Icon icon="mdi:minus" width="16" height="16" />
          </button>
          <span class="guest-count">{{ listingStore.listingForm.bathrooms }}</span>
          <button class="counter-btn" @click="incrementBathrooms">
            <Icon icon="mdi:plus" width="16" height="16" />
          </button>
        </div>
      </div>

      <div class="row">
        <span class="label">Furnished?</span>
        <div class="toggle-container">
          <button class="toggle-btn" :class="{ active: listingStore.listingForm.furnishing }"
            @click="setFurnishing(true)">
            Yes
          </button>
          <button class="toggle-btn" :class="{ active: !listingStore.listingForm.furnishing }"
            @click="setFurnishing(false)">
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useListingStore } from '@/stores/listing';
import { mapStores } from 'pinia';

export default {
  methods: {
    incrementGuests() {
      this.listingStore.updateField('guests', this.listingStore.listingForm.guests + 1);
    },
    decrementGuests() {
      if (this.listingStore.listingForm.guests > 1) {
        this.listingStore.updateField('guests', this.listingStore.listingForm.guests - 1);
      }
    },
    incrementBedrooms() {
      this.listingStore.updateField('bedrooms', this.listingStore.listingForm.bedrooms + 1);
    },
    decrementBedrooms() {
      if (this.listingStore.listingForm.bedrooms > 1) {
        this.listingStore.updateField('bedrooms', this.listingStore.listingForm.bedrooms - 1);
      }
    },
    incrementBathrooms() {
      this.listingStore.updateField('bathrooms', this.listingStore.listingForm.bathrooms + 1);
    },
    decrementBathrooms() {
      if (this.listingStore.listingForm.bathrooms > 1) {
        this.listingStore.updateField('bathrooms', this.listingStore.listingForm.bathrooms - 1);
      }
    },
    setFurnishing(value) {
      this.listingStore.updateField('furnishing', value);
    }
  },
  computed:{
    ...mapStores(useListingStore)
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 55%;
}

hgroup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: flex-start;
  width: 100%;
}

hgroup>h1 {
  margin-bottom: 10px;
  padding-top: 20px;
}

hgroup>h2 {
  margin: 0px 0px 50px;
  color: grey;
}

.input-container {
  width: 100%;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0px;
  border-bottom: 1px solid #EBEBEB;
  width: 100%;
}

.guest-type-info {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 22px;
  margin: 0;
  padding: 0;
}

.guest-type-desc {
  font-size: 14px;
  color: #717171;
  margin: 4px 0 0 0;
}

.counter {
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

.toggle-container {
  display: flex;
  gap: 10px;
}

.toggle-btn {
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 45px;
  padding: 8px 16px;
  min-width: 80px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.toggle-btn.active {
  background-color: #222222;
  border-color: #222222;
  box-shadow: none;
  color: white;
}

.toggle-btn:not(.active):hover {
  background-color: #f7f7f7;
  border-color: #999;
}
</style>