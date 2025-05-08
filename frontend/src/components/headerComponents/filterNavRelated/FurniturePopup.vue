<template>
    <div class="common-popup furniture-popup" :class="{ showPopup: visible }">
        <h3 class="popup-title">Select Your Furniture Status</h3>
        <div class="furniture-options">
            <label class="furniture-radio">
                <input type="radio" name="furniture" value="furnished"
                    :checked="internalFurnitureStatus === 'furnished'" @change="updateFurnitureStatus('furnished')" />
                <span class="furniture-label">
                    <Icon icon="fluent-emoji-high-contrast:couch-and-lamp" width="26" height="26"
                        :style="{ color: internalFurnitureStatus === 'furnished' ? '#fff' : '#000' }" />
                    Furnished
                </span>
            </label>

            <label class="furniture-radio">
                <input type="radio" name="furniture" value="unfurnished"
                    :checked="internalFurnitureStatus === 'unfurnished'"
                    @change="updateFurnitureStatus('unfurnished')" />
                <span class="furniture-label">
                    <Icon icon="mingcute:empty-box-line" width="26" height="26"
                        :style="{ color: internalFurnitureStatus === 'unfurnished' ? '#fff' : '#000' }" />
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
        visible: {
            type: Boolean,
            default: false
        },
        furnitureStatus: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            internalFurnitureStatus: this.furnitureStatus
        }
    },
    watch: {
        furnitureStatus(newValue) {
            this.internalFurnitureStatus = newValue;
        }
    },
    methods: {
        updateFurnitureStatus(value) {
            this.internalFurnitureStatus = value;
            this.$emit('update:furniture-status', value);
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

.showPopup {
    display: flex;
}

.popup-title {
    margin: 0px 0px 20px 0px;
}

.furniture-popup {
    align-items: start;
    width: 30%;
    height: 265px;
    left: 21%;
}

.furniture-options {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.furniture-radio {
    margin: 20px 0px;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: bold;
}

.furniture-radio input[type="radio"] {
    opacity: 0;
    position: absolute;
}

.furniture-label {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    gap: 10px;
    border: 2px solid black;
    border-radius: 9px;
    transition: all 0.3s ease;
    user-select: none;
}

.furniture-radio input[type="radio"]:checked+.furniture-label {
    background-color: #0026ffc2;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.2), 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>