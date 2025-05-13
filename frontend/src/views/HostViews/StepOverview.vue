<template>
    <div class="container">
        <h1 class="left-heading">It's easy to get started on Romdoul Rental</h1>
        <div class="steps-container">
            <div class="row">
                <hgroup>
                    <h2>1. Tell us about your place</h2>
                    <h3>Share some basic info, like where it is and how many guests can stay.</h3>
                </hgroup>
                <div class="image-container">
                    <img src="@/assets/images/hostingsteps/step1.jpg" alt="step1-img" />
                </div>
            </div>
            <div class="row">
                <hgroup>
                    <h2>2. Make it stand out</h2>
                    <h3>Add 5 or more photos plus a title and description—we'll help you out.</h3>
                </hgroup>
                <div class="image-container">
                    <img src="@/assets/images/hostingsteps/step2.jpg" alt="step2-img" />
                </div>
            </div>
            <div class="row">
                <hgroup>
                    <h2>3. Finish up and publish</h2>
                    <h3>Choose a starting price, verify a few details, then publish your listing.</h3>
                </hgroup>
                <div class="image-container">
                    <img src="@/assets/images/hostingsteps/step3.jpg" alt="step3-img" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HostingIntro',
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 40px;
}

.left-heading {
    width: 31%;
    font-weight: bold;
    font-size: 50px;
}

.steps-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 50%;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

hgroup {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
}

hgroup h2,
hgroup h3 {
    margin: 0;
}

hgroup h3 {
    color: grey;
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>