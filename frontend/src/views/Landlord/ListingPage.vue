<template>
    <div>
        <header-nav-3></header-nav-3>
        <div class="title" v-if="titleListingPage">
            <h1>Your Listing</h1>
            <div class="icons">
                <div class="search">
                    <Icon icon="ic:baseline-search" width="35" height="35"></Icon>
                </div>

                <div class="list">
                    <Icon icon="tabler:layout-list" width="35" height="35"></Icon>
                </div>

                <div class="addNew">
                    <Icon icon="material-symbols:add" width="35" height="35"></Icon>
                </div>
            </div>
        </div>

        <router-view></router-view>
    </div>
</template>
<script>
import HeaderNav3 from '@/components/Landlord/HeaderNav3.vue';
import ListingOverview from '@/components/Landlord/ListingOverview.vue';
import TenantHistoryPage from './TenantHistoryPage.vue';

export default {
    components: {
        HeaderNav3,
        ListingOverview,
        TenantHistoryPage
    },
    computed: {
        titleListingPage(){
            return this.$route.path === '/listing'
        }
    }
}
</script>

<style scoped>
.title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 200px 0 200px;
}
.icons{
    display: flex;
    gap: 20px;
    align-items: center;
    text-align: center;
}
.search, .list, .addNew{
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: #F3F3F3;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>