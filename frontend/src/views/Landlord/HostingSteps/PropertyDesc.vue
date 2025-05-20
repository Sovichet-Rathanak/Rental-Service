<template>
    <div class="container">
        <hgroup>
            <h1>Create your description</h1>
            <h2>Share what makes your place special</h2>
        </hgroup>
        <textarea name="property-desc" id="property-desc" maxlength="500" v-model="desc"></textarea>
        <span style="align-self: flex-start;">{{ characterCount() + '/500' }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            desc: ''
        }
    },
    methods: {
        characterCount() {
            return this.desc.length;
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
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
    height: 300px;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid black;
    margin: 30px 0px 5px 0px;
}
</style>