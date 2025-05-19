<template>
    <div>
        <header-nav-3></header-nav-3>
        <router-view></router-view>
    </div>
</template>
<script>
import HeaderNav3 from '@/components/Landlord/HeaderNav3.vue';
import ListingOverview from '@/components/Landlord/LisitngPage.vue';
import TenantHistoryPage from './TenantHistoryPage.vue';

export default {
    components: {
        HeaderNav3,
        ListingOverview,
        TenantHistoryPage
    },
}
</script>