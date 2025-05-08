<template>

    <body>
        <header>
            <HeaderNav2></HeaderNav2>
        </header>
        <main>
            <!-- ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. Components goes here ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. -->
            <AccommadationImg></AccommadationImg>
            <Rating></Rating>
            <HostInfoSection></HostInfoSection>
            <h2 style="font-weight: bold; margin: 30px 0px;">Where you'll be</h2>
            <div class="map-container">
                <MapComponent></MapComponent>
            </div>
        </main>
        <footer>
            <FooterComponent></FooterComponent>
        </footer>
    </body>
</template>

<script>
import AccommadationImg from '@/components/AccommadationImg.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import HostInfoSection from '@/components/HostInfoSection.vue';
import Rating from '@/components/DetailPageComponents/Rating_Comment.vue'import MapComponent from '@/components/MapComponent.vue';
export default {
    components: {
        HeaderNav2,
        FooterComponent,
        AccommadationImg,
        HostInfoSection,
        Rating,
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
