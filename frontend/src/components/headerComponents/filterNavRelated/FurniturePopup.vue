<template>
    <div class="common-popup furniture-popup" :class="{ showPopup: visible }">
        <h3 class="popup-title">Select Your Furniture Status</h3>
        <div class="furniture-options">
            <label class="furniture-radio" @click="toggleFurniture(true)">
                <span class="furniture-label" :class="{ active: internalFurnitureStatus === true }">
                    <Icon icon="fluent-emoji-high-contrast:couch-and-lamp" width="26" height="26"
                        :style="{ color: internalFurnitureStatus === true ? '#fff' : '#000' }" />
                    Furnished
                </span>
            </label>

            <label class="furniture-radio" @click="toggleFurniture(false)">
                <span class="furniture-label" :class="{ active: internalFurnitureStatus === false }">
                    <Icon icon="mingcute:empty-box-line" width="26" height="26"
                        :style="{ color: internalFurnitureStatus === false ? '#fff' : '#000' }" />
                    Unfurnished
                </span>
            </label>

        </div>
    </div>
</template>


<script>
export default {
    name: 'FurniturePopup',
    props: {
        visible: Boolean,
        furnitureStatus: {
            type: [Boolean, null],
            default: null
        }
    },
    data() {
        return {
            internalFurnitureStatus: this.furnitureStatus
        }
    },
    watch: {
        furnitureStatus(newVal) {
            this.internalFurnitureStatus = newVal;
        }
    },
    methods: {
        toggleFurniture(value) {
            // Toggle logic: unselect if clicked same again
            this.internalFurnitureStatus = this.internalFurnitureStatus === value ? null : value;
            this.$emit('update:furniture-status', this.internalFurnitureStatus);
        }
    }
}
</script>


<style scoped>
.common-popup {
    position: absolute;
    display: none;
    z-index: 1000;
    top: 120px;
    left: 21%;
    width: 30%;
    height: 265px;
    padding: 30px 40px;
    background-color: white;
    border-radius: 24px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    overflow-y: auto;
    flex-direction: column;
    align-items: flex-start;
}

.showPopup {
    display: flex;
}

.popup-title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
}

.furniture-options {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
}

.furniture-radio {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: bold;
}

.furniture-radio input[type="radio"] {
    display: none;
}

.furniture-label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    height: 30px;
    padding: 12px 16px;
    border: 2px solid black;
    border-radius: 10px;
    transition: all 0.25s ease-in-out;
    user-select: none;
    font-size: 16px;
}

.furniture-label.active {
    background-color: #0026ffc2;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.2), 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>