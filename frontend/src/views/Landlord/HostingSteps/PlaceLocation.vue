<template>
    <div class="container">
        <div class="left-content">
            <hgroup>
                <h1>Where is your place located?</h1>
                <h2>Your address is only shared with guests after confirmation</h2>
            </hgroup>

            <div class="input-container">
                <div class="custom-selector">
                    <select class="region-selector" name="regions" id="regions">
                        <option value="" disabled selected>Select your region</option>
                        <option value="optionA">Option A</option>
                        <option value="optionB">Option B</option>
                        <option value="optionC">Option C</option>
                        <option value="optionD">Option D</option>
                    </select>
                    <Icon class="icon-chevron" icon="stash:chevron-down-duotone" width="24" height="24" />
                </div>

                <div class="address-input">
                    <input type="text" placeholder="Street Address">
                    <input type="text" placeholder="Apt, floor, house number">
                    <input type="text" placeholder="Sangkat/khan/phum">
                </div>
            </div>
        </div>

        <div class="right-content">
            <MapComponent></MapComponent>
        </div>
    </div>
</template>

<script>
import MapComponent from '@/components/MapComponent.vue';
export default {
    components: {
        MapComponent
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 100px;
    width: 100%;
    height: 100%;
}

.left-content {
    width: 40%;
}

.right-content {
    height: 90%;
    border-radius: 20px;
    overflow: hidden;
    width: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(0, 0, 0, 0.08);
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 640px;
    gap: 24px;
}

.custom-selector {
    position: relative;
    width: 100%;
    height: 60px;
    cursor: pointer;
    background-color: white;
    border-radius: 14px;
    box-sizing: border-box;
    border: 1px solid #dddddd;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.custom-selector>select {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    font-size: 16px;
    font-weight: 500;
    color: #222222;
    cursor: pointer;
    padding: 0 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.custom-selector>select:focus {
    outline: none;
}

.icon-chevron {
    position: absolute;
    top: 16px;
    right: 20px;
    z-index: 2;
    color: #222222;
    opacity: 0.7;
    pointer-events: none;
    transition: transform 0.3s ease;
}

.custom-selector:hover .icon-chevron {
    opacity: 1;
}

.address-input {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
}

.address-input input {
    height: 60px;
    padding: 0 20px;
    font-size: 16px;
    border: 1px solid #dddddd;
    border-radius: 14px;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.address-input input::placeholder {
    color: #aaaaaa;
}

.address-input input:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.address-input input:focus {
    border-color: #222222;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    outline: none;
}
</style>