<template>

    <body>
        <header>
            <HeaderNav2></HeaderNav2>
        </header>
        <main>
            <BreadCrumbs></BreadCrumbs>
            <hgroup style="width: 40%;">
                <h1>Your Payment Methods</h1>
                <h3 style="color:  grey; margin-top: 40px;">Once you have added a payment method, this is where you can
                    come to track and manage it.</h3>
            </hgroup>
        </main>
        <footer>
            <FooterComponent></FooterComponent>
        </footer>
    </body>
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
export default {
    components: {
        HeaderNav2,
        FooterComponent,
        BreadCrumbs
    }
}
</script>

<style scoped>
header {
    margin: 30px 0px;
}

main {
    padding-inline: 300px;
    display: flex;
    flex-direction: column;
    align-items: start;
}
</style>