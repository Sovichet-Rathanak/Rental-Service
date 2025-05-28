<template>
    <admin-header></admin-header>
    <router-view></router-view>

</template>

<script>
import AdminHeader from '@/components/headerComponents/AdminHeader.vue';
export default {
    components: {
        AdminHeader
    }
}
</script>