<template>
    <div class="common-popup people-popup" :class="{ showPopup: visible }">
        <h3 style="margin: 0px 0px 20px 0px;">Who's staying?</h3>

        <!-- Adults Counter -->
        <div class="guest-type-row">
            <div class="guest-type-info">
                <h4 class="guest-type-label">Adults</h4>
                <p class="guest-type-desc">Ages 13 or above</p>
            </div>
            <div class="guest-counter">
                <button class="counter-btn" @click="decrementAdults" :disabled="InternalAdultCount <= 1">
                    <Icon icon="mdi:minus" width="16" height="16" />
                </button>
                <span class="guest-count">{{ InternalAdultCount }}</span>
                <button class="counter-btn" @click="incrementAdults">
                    <Icon icon="mdi:plus" width="16" height="16" />
                </button>
            </div>
        </div>

        <!-- Children Counter -->
        <div class="guest-type-row">
            <div class="guest-type-info">
                <h4 class="guest-type-label">Children</h4>
                <p class="guest-type-desc">Ages 2-12</p>
            </div>
            <div class="guest-counter">
                <button class="counter-btn" @click="decrementChildren" :disabled="InternalChildrenCount <= 0">
                    <Icon icon="mdi:minus" width="16" height="16" />
                </button>
                <span class="guest-count">{{ InternalChildrenCount }}</span>
                <button class="counter-btn" @click="incrementChildren">
                    <Icon icon="mdi:plus" width="16" height="16" />
                </button>
            </div>
        </div>

        <!-- Total Count Display -->
        <div class="guest-total-row">
            <span class="guest-total-label">Total guests:</span>
            <span class="guest-total-count">{{ InternalAdultCount + InternalChildrenCount }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'PeoplePopup',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        adultCount:{
            type: Number,
            default: 1,
        },
        childrenCount:{
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            InternalAdultCount: parseInt(this.adultCount),
            InternalChildrenCount: parseInt(this.childrenCount)
        }
    },
    methods: {
        incrementAdults() {
            this.InternalAdultCount++;
            console.log(typeof(this.InternalAdultCount))
            this.$emit('incrementAdults');
        },
        decrementAdults() {
            if (this.InternalAdultCount > 1) {
                this.InternalAdultCount--;
            }
            this.$emit('decrementAdults');
        },
        incrementChildren() {
            this.InternalChildrenCount++;
            this.$emit('incrementChildren');
        },
        decrementChildren() {
            if (this.InternalChildrenCount > 0) {
                this.InternalChildrenCount--;
            }
            this.$emit('decrementChildren');
        },
    }
}
</script>

<style scoped>
.common-popup {
    position: absolute;
    display: none;
    z-index: 1000;
    top: 120px;
    background-color: white;
    border-radius: 24px;
    flex-direction: column;
    align-items: start;
    padding: 30px 40px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2), 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.people-popup {
    width: 40%;
    height: auto;
    right: 0;
}

.guest-type-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #EBEBEB;
    width: 100%;
}

.guest-type-info {
    display: flex;
    flex-direction: column;
}

.guest-type-label {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    padding: 0;
}

.guest-type-desc {
    font-size: 14px;
    color: #717171;
    margin: 4px 0 0 0;
}

.guest-counter {
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

.guest-total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    margin-top: 8px;
    width: 100%;
}

.guest-total-label {
    font-size: 16px;
    font-weight: 500;
}

.guest-total-count {
    font-size: 16px;
    font-weight: 600;
}
</style>