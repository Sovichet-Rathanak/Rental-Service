<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>

    <body>
        <main>
            <!-- ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. Components goes here ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. -->
            <h2 style="font-weight: bold; margin: 30px 0px;">Where you'll be</h2>
            <div class="map-container">
                <MapComponent></MapComponent>
            </div>
        </main>
    </body>
    <footer>
        <FooterComponent></FooterComponent>
    </footer>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import MapComponent from '@/components/MapComponent.vue';
export default {
    components: {
        HeaderNav2,
        FooterComponent,
        MapComponent
    }
}
</script>

<style scoped>
main {
    padding-inline: 200px;
    height: 100vh;
}

.map-container {
    width: 100%;
    height: 50%;
    overflow: hidden;
    border-radius: 20px;
    background-color: grey;
    box-shadow: 5px 5px 17px rgb(0, 0, 0.1, .5);
}
</style>
