<template>
    <div class="container">
        <hgroup style="width: 50%;">
            <h3>Step 1</h3>
            <h1 style="margin: 10px 0px 0px 0px; font-size: 50px;">Tell us about your place</h1>
            <h3 style="margin-top: 30px; color: grey;">We'll ask you which type of property you have and if guests will
                rent a house or just
                a room. Then let us know the location and how many guests can stay.</h3>
        </hgroup>

        <div class="image-container">
            <img src="@/assets/images/hostingsteps/step4.png" alt="">
        </div>
    </div>
</template>

<script></script>


<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.image-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 600px;
}

.image-container > img{
    width: 100%;
    height: 100%;
}
</style>