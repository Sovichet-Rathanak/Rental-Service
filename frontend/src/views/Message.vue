<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>
    <div class="main-container">
        <EmptyMessage></EmptyMessage>
    </div>
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import EmptyMessage from '@/components/message/EmptyMessage.vue';
export default {
    components: {
        HeaderNav2,
        EmptyMessage
    }
}
</script>

<style scoped>
</style>
