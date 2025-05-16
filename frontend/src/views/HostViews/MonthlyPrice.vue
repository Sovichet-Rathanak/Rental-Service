<template>
    <div class="container">
        <hgroup>
            <h1>Now, set a monthly base price</h1>
            <h2>You'll set your yearly price next.</h2>
        </hgroup>
        <div class="input-container">
            <input class="currency-input" maxlength="7" type="text" name="monthly-rent" id="monthly-rent" v-model="monthRent" @input="formatInput">
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                monthRent: '$',
            }
        },
        methods:{
            formatInput(){
                let val = this.monthRent.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.monthRent = '$' + val;
            }
        }
    }
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    align-items: center;
    width: 100%;
}

h1 {
    margin-bottom: 10px;
    padding-top: 20px;
}

h2 {
    margin: 0px 0px 20px;
    color: grey;
}

.input-container{
    display: flex;
    justify-content: center;
    align-items: center;
}

.currency-input{
    text-align: center;
    background-color: transparent;
    border: none;
    font-size: 100px;
    width: 50%;
}

.currency-input:focus{
    outline: none;
}
</style>