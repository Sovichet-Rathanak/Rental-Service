<template>
    <header>
        <header-nav-3></header-nav-3>
    </header>
    <div class="container">
        <router-view></router-view>
    </div>
</template>
<script>
import HeaderNav3 from '@/components/Landlord/HeaderNav3.vue';

export default {
    components: {
        HeaderNav3,
    },
}
</script>

<style scoped>
.container{
    padding-inline: 200px;
}
</style>