<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>
    <body>
        <main>
            <!-- ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. Components goes here ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. -->
        </main> 
    </body>
    <footer>
        <FooterComponent></FooterComponent>
    </footer>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';

export default {
    components: {
        HeaderNav2,
        FooterComponent
    }
}
</script>

<style scoped>
main {
    padding-inline: 200px;
}
</style>
