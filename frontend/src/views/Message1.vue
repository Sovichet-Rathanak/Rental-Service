<template>
    <header>
        <MessageHeader></MessageHeader>
    </header>
    <div class="main-container">
        <EmptyMessage></EmptyMessage>
    </div>
</template>

<script>;
import EmptyMessage from '@/components/message/EmptyMessage.vue';
import MessageHeader from '@/components/message/MessageHeader.vue';
export default {
    components: {
        EmptyMessage,
        MessageHeader
    }
}
</script>

<style scoped>
</style>