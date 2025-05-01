<template>
    <nav>
        <router-link class="past-route" :to="{ name: 'Account Setting' }">Account</router-link>
        <Icon icon="material-symbols:chevron-right-rounded" width="30" height="30" style="color: #000" />
        <span class="current-route">{{ this.$route.name }}</span>
    </nav>
</template>

<script>
export default {

}

</script>

<style scoped>
nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.past-route {
    color: black;
    font-weight: 600;
    font-size: 20px;
}

.current-route {
    color: black;
    font-weight: 600;
    font-size: 20px;
    text-decoration: none;
    cursor: default;
}
</style>