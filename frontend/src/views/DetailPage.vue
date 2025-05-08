<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>
    <body>
        <main>
            <!-- ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. Components goes here ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. -->
            <AccommadationImg></AccommadationImg>
            <Rating></Rating>
            <HostInfoSection></HostInfoSection>
        </main> 
    </body>
    <footer>
        <FooterComponent></FooterComponent>
    </footer>
</template>

<script>
import AccommadationImg from '@/components/AccommadationImg.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import HostInfoSection from '@/components/HostInfoSection.vue';
import Rating from '@/components/DetailPageComponents/Rating_Comment.vue'
export default {
    components: {
        HeaderNav2,
        FooterComponent,
        AccommadationImg,
        HostInfoSection,
        Rating
    }
}
</script>

<style scoped>
main {
    padding-inline: 200px;
}
</style>
