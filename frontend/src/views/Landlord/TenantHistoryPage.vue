<template>
    <div class="popUpPage">
        <div class="overview">
            <div class="header">
                <Icon icon="maki:cross" width="30" height="30" @click="$emit('close')"></Icon>
                Overview
                <span></span>
            </div>
            <hr>

            <div class="content">
                <!-- top -->
                <div class="currentTenant">
                    <img src="/src/assets/images/property_images/property1.jpeg" alt="">
                    <div class="tenant">
                        Current Tenant

                        <div class="profile">
                            <img src="/src/assets/images/comment/_.jpeg" alt="">
                            
                            <div style="font-size: 25px;">
                                Lina Van
                                <span class="contract">Contract Expiration: 
                                    <span style="font-weight: bold;"> 16/02/2025</span>
                                </span>
                                <Icon icon="mdi:star-outline" width="50" height="50" v-for="n in 5" :key="n"></Icon>
                            </div>
                        </div>

                        <textarea class="textBox" placeholder="Write something about your tenant..."></textarea>
                    </div>
                </div>

                <div style="font-size: 28px; font-weight: bold;"> Post Tenant
                    <div class="comment">
                        <div class="landlordProfile">
                            <img src="/src/assets/images/comment/landlord.jpeg" alt="">
                            Snowy
                        </div>
                        <div class="data">
                            <span class="contract">Contract Expiration: 
                                    <span style="font-weight: bold;margin-right: 30px;"> 16/02/2025</span>
                            </span>
                            <Icon icon="material-symbols:star-rounded" width="32" height="32" v-for="s in 5" :key="s" style="color: #FFA629"></Icon>
                        </div>
                        <div class="text">
                            Remark
                            <span>Great tenant! Always paid rent on time, maintained the property well, and was respectful to neighbors. <br>
                                Communicative, responsible, and left the place in excellent condition. No issues at all—highly recommend!</span>
                        </div>
                    </div>

                    <div class="comment">
                        <div class="landlordProfile">
                            <img src="/src/assets/images/comment/landlord.jpeg" alt="">
                            Snowy
                        </div>
                        <div class="data">
                            <span class="contract">Contract Expiration: 
                                    <span style="font-weight: bold;margin-right: 30px;"> 16/02/2025</span>
                            </span>
                            <Icon icon="material-symbols:star-rounded" width="32" height="32" v-for="s in 5" :key="s" style="color: #FFA629"></Icon>
                        </div>
                        <div class="text">
                            Remark
                            <span>Great tenant! Always paid rent on time, maintained the property well, and was respectful to neighbors. <br>
                                Communicative, responsible, and left the place in excellent condition. No issues at all—highly recommend!</span>
                        </div>
                    </div>

                    <div class="comment">
                        <div class="landlordProfile">
                            <img src="/src/assets/images/comment/landlord.jpeg" alt="">
                            Snowy
                        </div>
                        <div class="data">
                            <span class="contract">Contract Expiration: 
                                    <span style="font-weight: bold; margin-right: 30px;"> 16/02/2025</span>
                            </span>
                            <Icon icon="material-symbols:star-rounded" width="32" height="32" v-for="s in 5" :key="s" style="color: #FFA629"></Icon>
                        </div>
                        <div class="text">
                            Remark
                            <span>Great tenant! Always paid rent on time, maintained the property well, and was respectful to neighbors. <br>
                                Communicative, responsible, and left the place in excellent condition. No issues at all—highly recommend!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.overview::-webkit-scrollbar{
    display: none;
}
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin: 25px 35px;
    text-decoration: none;
    color: black;
}
.content{
    margin: 30px 0 ;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 20px 80px
}
.currentTenant{
    display: flex;
    gap: 50px;
    margin-bottom: 10px;
}
.currentTenant > img{
    width: 500px;
    height: 500px;
    border-radius: 15px;
    object-fit: cover
}
.tenant{
    display: flex;
    flex-direction: column;
    gap: 30px;
    font-size: 29px;
    font-weight: bolder;
}
.profile{
    display: flex;
    gap: 30px
}
.profile > img{
    width: 150px;
    height: 150px;
    border-radius: 100px;
}
.contract{
    font-weight: 400;
    display: flex;
    font-size: 22px;
    margin: 17px 0;
    gap: 10px
}
.textBox{
    width: 570px;
    height: 224px;
    font-size: 22px;
    padding: 15px 20px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 20px;
}
.comment{
    width: 97%;
    padding: 27px 23px;
    border-radius: 20px;
    border: 1px solid #A1A1A1;
    margin-top: 30px;
}
.landlordProfile{
    display: flex;
    align-items: center;
    gap: 20px
}
.landlordProfile > img{
    width: 75px;
    height: 75px;
    border-radius: 50px;
    object-fit: cover
}
.data{
    display: flex;
    align-items: center;
    /* gap: 30px; */
}
.text{
    font-size: 25px;
}
.text > span{
    font-size: 23px;
    margin-top: 8px;
}
</style>