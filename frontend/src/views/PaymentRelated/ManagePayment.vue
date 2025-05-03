<template>
    <body>
        <header>
            <HeaderNav2></HeaderNav2>
        </header>
        <main>
            
        </main>
        <footer>
            <FooterComponent></FooterComponent>
        </footer>
    </body>
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import FooterComponent from '@/components/FooterComponent.vue';
export default{
    components:{
        HeaderNav2,
        FooterComponent
    }
}
</script>

<style scoped>
</style>