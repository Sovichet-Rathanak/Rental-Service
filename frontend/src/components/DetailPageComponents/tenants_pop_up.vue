<template>
    <div class="tenant-container" v-if="showTenant">
        <div class="tenant-type-row">
            <div class="tenant-info">
                <h3>Adults</h3>
                <p>Age 18+</p>
            </div>
            <div class="tenant-counter">
                <button @click="decreaseAdult" :disabled="AdultCountVal <= 1"><Icon icon="mdi:minus"/></button>
                <span>{{ AdultCountVal }}</span>
                <button @click="increaseAdult"><Icon icon="mdi:plus"/></button>
            </div>
        </div>
        <div class="tenant-type-row">
            <div class="tenant-info">
                <h3>Children</h3>
                <p>Age 2-17</p>
            </div>
            <div class="tenant-counter">
                <button @click="decreaseChild" :disabled="ChildCountVal < 1"><Icon icon="mdi:minus" /></button>
                <span>{{ ChildCountVal }}</span>
                <button @click="increaseChild"><Icon icon="mdi:plus" /></button>
            </div>
        </div>
        <div class="tenant-type-row">
            <div class="tenant-info">
                <h3>Infants</h3>
                <p>Under 2</p>
            </div>
            <div class="tenant-counter">
                <button @click="decreaseInfant" :disabled="InfantCountVal < 1"><Icon icon="mdi:minus" /></button>
                <span>{{ InfantCountVal }}</span>
                <button @click="increaseInfant"><Icon icon="mdi:plus"/></button>
            </div>
        </div>
        <div class="tenant-type-row">
            <div class="tenant-info">
                <h3>Pets</h3>
                <u>Bringing a service animal?</u>
            </div>
            <div class="tenant-counter">
                <button @click="decreasePet" :disabled="PetCountVal < 1"><Icon icon="mdi:minus" /></button>
                <span>{{ PetCountVal }}</span>
                <button @click="increasePet"><Icon icon="mdi:plus" /></button>
            </div>
        </div>
        <div class="total-container">
            <p>Total Tenants: {{ AdultCountVal + ChildCountVal + InfantCountVal + PetCountVal}}</p>
            <button class="close" @click="emitClosewithTotal">Close</button>
        </div>
        
    </div>
    
</template>

<script>
export default{
    name: 'tenant-pop-up',
    props:{
        showTenant:{
            type: Boolean,
            require: true
        },
        adultCount: {
            type: Number,
            default: 1
        },
        childCount: {
            type: Number,
            default: 0
        },
        infantCount: {
            type: Number,
            default: 0
        },
        petCount: {
            type: Number,
            default: 0
        },
        totalCount: {
            type: Number,
            default: 0
        }
    },
    data(){
        return{
            AdultCountVal: parseInt(this.adultCount),
            ChildCountVal: parseInt(this.childCount),
            InfantCountVal: parseInt(this.infantCount),
            PetCountVal: parseInt(this.petCount),
            totalCountVal: parseInt(this.totalCount)
        }
    },
    methods:{
        increaseAdult(){
            this.AdultCountVal++;
            console.log(typeof(this.AdultCountVal))
            this.$emit('increaseAdult');
        },
        decreaseAdult(){
            if(this.AdultCountVal > 1){
                this.AdultCountVal--;
            }
            this.$emit('decreaseAdult');
        },
        increaseChild(){
            this.ChildCountVal++;
            console.log(typeof(this.ChildCountVal))
            this.$emit('increaseChild');
        },
        decreaseChild(){
            if(this.ChildCountVal >= 1){
                this.ChildCountVal--;
            }
            this.$emit('decreaseChild');
        },
        increaseInfant(){
            this.InfantCountVal++;
            console.log(typeof(this.InfantCountVal))
            this.$emit('increaseInfant');
        },
        decreaseInfant(){
            if(this.InfantCountVal >= 1){
                this.InfantCountVal--;
            }
            this.$emit('decreaseInfant');
        },
        increasePet(){
            this.PetCountVal++;
            console.log(typeof(this.PetCountVal))
            this.$emit('increasePet');
        },
        decreasePet(){
            if(this.PetCountVal >= 1){
                this.PetCountVal--;
            }
            this.$emit('decreasePet');
        },
        emitClosewithTotal(){
            const total = this.AdultCountVal + this.ChildCountVal + this.InfantCountVal + this.PetCountVal;
            this.$emit('update-total', total); 
            this.$emit('close');
        }
        
    }
}

</script>

<style scoped>
.tenant-container{
    position: absolute;
    width: 350px;
    z-index: 1000;
    top: 1122px;
    left: 1075px;
    background-color: white;
    border-radius: 24px;
    flex-direction: column;
    padding: 30px 40px;
    box-shadow: 1px 1px 5px 4px lightgray;
}
.tenant-type-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tenant-type-row p,u{
    margin-top: -10px;
    color: gray;
}
.tenant-counter button{
    background-color: transparent;
    border-radius: 50%;
    border: 1px solid lightgrey;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.tenant-counter{
    display: flex;
    align-items: center;
    gap: 20px;
}
.tenant-counter button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.total-container{
    width: 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18px;
    justify-content: space-between;
}
.close{
    border: none;
    text-decoration: underline;
    background-color: transparent;
    font-size: 18px;
    font-weight: bold;
    margin-top: 15px;
    cursor: pointer;
}

</style>