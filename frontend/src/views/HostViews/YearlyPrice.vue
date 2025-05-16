<template>
    <div class="container">
        <hgroup>
            <h1>Now, set a yearly base price</h1>
            <h2>Set a deal to encourage customer to rent yearly.</h2>
        </hgroup>
        <div class="input-container">
            <input class="currency-input" maxlength="10" type="text" name="yearly-rent" id="yearly-rent" v-model="yearRent" @input="formatInput">
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                yearRent: '$',
            }
        },
        methods:{
            formatInput(){
                let val = this.yearRent.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.yearRent = '$' + val;
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