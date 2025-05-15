<template>
    <div class="container">
        <hgroup>
            <h1 style="margin: 0;">Share some basics about your place</h1>
            <h3 style="margin: 10px 0px 25px 0px; color: grey;">You'll add more details later, like amenities.</h3>
        </hgroup>
        <div class="input-container">
            <div class="row">
                <span class="label">Guests</span>
                <div class="counter">
                    <button class="counter-btn" @click="decrementGuests" :disabled="InternalGuestCount <= 1">
                        <Icon icon="mdi:minus" width="16" height="16" />
                    </button>
                    <span class="guest-count">{{ InternalGuestCount }}</span>
                    <button class="counter-btn" @click="incrementGuests">
                        <Icon icon="mdi:plus" width="16" height="16" />
                    </button>
                </div>
            </div>

            <div class="row">
                <span class="label">Bedrooms</span>
                <div class="counter">
                    <button class="counter-btn" @click="decrementBedrooms" :disabled="InternalBedroomCount <= 1">
                        <Icon icon="mdi:minus" width="16" height="16" />
                    </button>
                    <span class="guest-count">{{ InternalBedroomCount }}</span>
                    <button class="counter-btn" @click="incrementBedrooms">
                        <Icon icon="mdi:plus" width="16" height="16" />
                    </button>
                </div>
            </div>

            <div class="row">
                <span class="label">Bathrooms</span>
                <div class="counter">
                    <button class="counter-btn" @click="decrementBathrooms" :disabled="InternalBathroomCount <= 1">
                        <Icon icon="mdi:minus" width="16" height="16" />
                    </button>
                    <span class="guest-count">{{ InternalBathroomCount }}</span>
                    <button class="counter-btn" @click="incrementBathrooms">
                        <Icon icon="mdi:plus" width="16" height="16" />
                    </button>
                </div>
            </div>

            <div class="row">
                <span class="label">Furnished?</span>
                <div class="toggle-container">
                    <button class="toggle-btn" :class="{ 'active': IsFurnished }" @click="IsFurnished = true">
                        Yes
                    </button>
                    <button class="toggle-btn" :class="{ 'active': !IsFurnished }" @click="IsFurnished = false">
                        No
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            InternalGuestCount: 1,
            InternalBedroomCount: 1,
            InternalBathroomCount: 1,
            IsFurnished: true
        }
    },
    methods: {
        incrementGuests() {
            this.InternalGuestCount++;
            this.$emit('update:guestCount', this.InternalGuestCount);
        },
        decrementGuests() {
            if (this.InternalGuestCount > 1) {
                this.InternalGuestCount--;
            }
            this.$emit('update:guestCount', this.InternalGuestCount);
        },
        incrementBedrooms() {
            this.InternalBedroomCount++;
            this.$emit('update:bedroomCount', this.InternalBedroomCount);
        },
        decrementBedrooms() {
            if (this.InternalBedroomCount > 1) {
                this.InternalBedroomCount--;
            }
            this.$emit('update:bedroomCount', this.InternalBedroomCount);
        },
        incrementBathrooms() {
            this.InternalBathroomCount++;
            this.$emit('update:bathroomCount', this.InternalBathroomCount);
        },
        decrementBathrooms() {
            if (this.InternalBathroomCount > 1) {
                this.InternalBathroomCount--;
            }
            this.$emit('update:bathroomCount', this.InternalBathroomCount);
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 55%;
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