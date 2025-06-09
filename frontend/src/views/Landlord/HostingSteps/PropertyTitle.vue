<template>
    <div class="container">
        <hgroup>
            <h1>Now, let's give your place a title</h1>
            <h2>Short titles work best. Have fun with it—you can always change it later.</h2>
        </hgroup>
        <textarea name="property-title" id="property-title" maxlength="32" v-model="title"></textarea>
        <span style="align-self: flex-start;">{{ characterCount + '/32' }}</span>
    </div>
</template>

<script>
import { useListingStore } from '@/stores/listing';
import { mapStores } from 'pinia';

export default {
    computed: {
        ...mapStores(useListingStore),

        title: {
            get() {
                return this.listingStore.listingForm.title;
            },

            set(value) {
                this.listingStore.updateField('title', value);
            }
        },

        characterCount() {
            return this.title.length;
        },
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 54%;
}

h1 {
    margin-bottom: 10px;
    padding-top: 20px;
}

h2 {
    margin: 0px 0px 20px;
    color: grey;
}

textarea {
    font-size: 20px;
    resize: none;
    height: 200px;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid black;
    margin: 30px 0px 5px 0px;
}
</style>