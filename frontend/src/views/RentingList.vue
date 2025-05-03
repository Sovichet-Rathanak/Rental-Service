<template>
    <body>
        <header>
            <HeaderNav2></HeaderNav2>
        </header>
        <main>
            <BreadCrumbs style="margin: 30px 0px;"></BreadCrumbs>
            <div class="current-rent">
                <h1 style="margin: 0px 0px 20px 0px;">Currently Renting</h1>
                <div class="card-container">
                    <PropertyCard></PropertyCard>
                </div>
            </div>

            <div class="past-rent">
                <h1 style="margin: 30px 0px 20px 0px;">Renting History</h1>
                <div class="card-container">
                    <PropertyCard></PropertyCard>
                </div>
            </div>
        </main>
        <footer>
            <FooterComponent></FooterComponent>
        </footer>
    </body>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import PropertyCard from '@/components/PropertyCard.vue';

export default {
    components: {
        HeaderNav2,
        BreadCrumbs,
        FooterComponent,
        PropertyCard
    }
}
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-inline: 300px;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-direction: row;
}
</style>