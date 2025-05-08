<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>
    <body>
        <main>
            <!-- ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. Components goes here ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. -->
             <HostInfoSection></HostInfoSection>
        </main> 
    </body>
    <footer>
        <FooterComponent></FooterComponent>
    </footer>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import HostInfoSection from '@/components/HostInfoSection.vue';

export default {
    components: {
        HeaderNav2,
        FooterComponent,
        HostInfoSection,
    }
}
</script>

<style scoped>
main {
    padding-inline: 200px;
}
</style>
