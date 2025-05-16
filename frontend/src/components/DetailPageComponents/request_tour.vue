<template>
    <div class="tour-container-overlay" v-if="showTour">
        <div class="tour-container">
            <div class="header">
                <h2>Request a tour</h2>
                <button @click="$emit('close')"><Icon icon="charm:cross" width="27px" /></button>
            </div>
            <div class="body-container">
                <h2>Select a preferred date for tour</h2>
                <div class="detail-container">
                    <VDatePicker :attributes="attributes" expanded borderless view="weekly" v-model="date" mode="dateTime" is12hr/>
                </div>
                <div class="host-pfp">
                    <h3>Will be sent to</h3>
                    <div class="host-des">
                        <Icon icon="octicon:feed-person-16" width="75" height="75" style="color: #000"/>
                        <div class="host-detail">
                            <h3>Hosted by Shen Yue</h3>
                            <p>4 years hosting</p>
                            <h4>+855 622 7293</h4>
                        </div>
                    </div>
                </div>
                <p class="condition">
                    By contacting this property, you agree to our <u>Term of use </u>Visit our <u>Privacy Portal</u> 
                    for more information. When you click Send tour request, 
                    we’ll send your inquiry to the property manager so they can reach out and answer your questions.
                </p>
            </div> 
            <div class="footer">
                <button class="send-tour" @click="$emit('close')">Send tour request</button>
            </div>             
        </div>
    </div>
</template>

<script>
export default{
    name: "request-tour",
    date(){
        return {
            date: new Date(),
            showTour: true,
        };
    },
    props:{
        showTour:{
            type: Boolean,
            require: true
        }
    },
    methods:{
        closeTour(){
            this.showTour = false;
        }
    }
};
</script>

<style scoped>
.tour-container-overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}
.tour-container{
    background-color: white;
    width: 700px;
    height: 900px;
    border-radius: 30px;
}
.header{
    display: flex;
    justify-content: space-around;
    gap: 100px;
    padding-left: 220px;
    align-items: center;
    border-bottom: 1px solid gray;
}
.header button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}
.body-container{
    display: flex;
    flex-direction: column;
    margin-top: -40px;
    padding: 50px;
    gap: 20px;
    justify-content: space-evenly;
}
.detail-container{
    display: flex;
    justify-content: center;
}
.host-des{
    display: flex;
    gap: 20px;
    align-items: center;
}
.host-detail h3,h4,p{
    padding: 0px;
    margin: 10px;
}
.footer{
    display: flex;
    justify-content: center;
    margin-top: -20px;
}
.send-tour{
    display: flex;
    width: 70%;
    justify-content: center;
    align-items: center;
    background-color: #3B82F6;
    color: white;
    border: none;
    font-weight: bold;
    font-size: 20px;
    padding: 15px;
    border-radius: 20px;
}
::v-deep(.vc-day-content){
    font-size: 20px !important;
    font-family:  'Airbnb Font';
    padding: 30px !important;
}
::v-deep(.vc-title){
    font-size: 20px !important;
    font-family:  'Airbnb Font';
    background-color: transparent;
}
::v-deep(.vc-weekday){
    padding: 20px;
}
</style>