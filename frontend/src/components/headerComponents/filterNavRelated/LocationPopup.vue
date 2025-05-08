<template>
    <div class="common-popup location-popup" :class="{ showPopup: visible }">
        <h3 class="popup-title">Search For Your Prefered Location</h3>
        <input class="location-input" type="text" placeholder="Toul Kork, Boeng Keng Kang, etc.">

        <div class="location-header">
            <h3 class="location-title">Locations</h3>
            <h5 class="location-subtitle">Select Your Prefered Location</h5>
        </div>

        <div class="region">
            <h4 class="region-title">Chamkarmon</h4>
            <div class="sangkat">
                <div class="sangkat-children" @click="toggleSangkat" :class="{ sangkatChildrenActive: activeOption }">
                    <Icon icon="solar:city-bold-duotone" width="20" height="20"
                        :style="{ color: activeOption ? '#fff' : '#000' }" />
                    Tonle Basac
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LocationPopup',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        activeOption: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggleSangkat() {
            this.$emit('toggle-sangkat');
        }
    }
}
</script>

<style scoped>
.location-popup {
    width: 40%;
    height: 400px;
    left: 0;
}

.popup-title {
    margin: 10px 0px;
}

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

.location-input {
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    padding: 5px 15px;
    font-size: 16px;
    border-radius: 12px;
    margin-bottom: 20px;
}

.location-input:focus {
    outline: none;
    border: 2px solid #0026FF;
    box-shadow: 0 0 0 2px rgba(0, 38, 255, 0.1);
}

.location-header {
    margin-bottom: 20px;
}

.location-title {
    margin: 0px;
}

.location-subtitle {
    margin: 0px;
    color: grey;
}

.region {
    height: 100%;
    width: 100%;
}

.region-title {
    margin: 0px 0px 10px 0px;
}

.sangkat {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
}

.sangkat-children {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: fit-content;
    border: 1px solid black;
    padding: 10px 16px;
    font-weight: bold;
    border-radius: 9px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    user-select: none;
}

.sangkatChildrenActive {
    background-color: #0026ffc2;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.2), 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>