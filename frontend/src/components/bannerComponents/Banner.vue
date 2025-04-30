<template>
    <div class="imgContainer">
        <img :src="imgUrl" alt="banner">
    </div>
</template>

<script>
    export default{
        name: "banner",
        props: {
            imgUrl: String,
        }

    }
</script>

<style scoped>
.imgContainer{
    display: flex;
    object-fit: contain;
    height: 150px;
    width: fit-content;
    border-radius: 10px;
    border: none;
    background-color: aquamarine;
}
</style>