<template>
    <div class="popUpPage">
        <div class="overview">
            <div class="header">
                <Icon style="position: absolute; left: 20px; cursor: pointer;" icon="maki:cross" width="30" height="30"
                    @click="$emit('close')"></Icon>
                <span>Overview</span>
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

                            <div style="font-size: 24px;">
                                Lina Van
                                <span class="contract">Contract Expiration:
                                    <span style="font-weight: bold;"> 16/02/2025</span>
                                </span>
                                <Icon width="45" height="45" v-for="n in 5" :key="n"
                                    :icon="n <= selectedRating ? 'mdi:star' : 'mdi:star-outline'"
                                    :style="{ color: n <= selectedRating ? 'orange' : 'black', cursor: 'pointer' }"
                                    @click="selectedRating = n"></Icon>
                            </div>
                        </div>

                        <textarea class="textBox" placeholder="Write something about your tenant..."
                            v-model="commentText" @keydown.enter.exact.prevent="submitComment"></textarea>
                        <div class="submitButton">
                            <button @click="submitComment">Send</button>
                        </div>
                    </div>
                </div>

                <div style="font-size: 28px; font-weight: bold;"> Post Tenant
                    <div class="comment" v-for="(post, index) in postedComments" :key="index">
                        <div class="landlordProfile">
                            <img src="/src/assets/images/comment/landlord.jpeg" alt="">
                            Snowy
                        </div>
                        <div class="data">
                            <span class="contract">Contract Expiration:
                                <span style="font-weight: bold;margin-right: 30px;"> 16/02/2025</span>
                            </span>
                            <Icon icon="mdi:star" width="33" height="33" v-for="i in post.rating" :key="i"
                                style="color: #FFA629"></Icon>
                        </div>
                        <div class="text">
                            <span>{{ post.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            selectedRating: 4,
            commentText: '',
            postedComments: []
        };
    },
    methods: {
        submitComment() {
            if (!this.commentText.trim() || this.selectedRating === 0) return;

            this.postedComments.push({
                rating: this.selectedRating,
                text: this.commentText.trim()
            });

            this.commentText = '';
            this.selectedRating = 4;
        }
    }
};
</script>


<style scoped>
.popUpPage {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
}

.overview {
    max-height: 90vh;
    max-width: 90vw;
    width: 1250px;
    background: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
}

.overview::-webkit-scrollbar {
    display: none;
}

.header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin: 25px 35px;
    color: black;
    position: relative;
}

.content {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 20px 80px
}

.currentTenant {
    display: flex;
    gap: 50px;
}

.currentTenant>img {
    width: 500px;
    height: 436px;
    border-radius: 15px;
    object-fit: cover
}

.tenant {
    display: flex;
    flex-direction: column;
    gap: 25px;
    font-size: 27px;
    font-weight: bolder;
}

.profile {
    display: flex;
    gap: 30px
}

.profile>img {
    width: 120px;
    height: 120px;
    border-radius: 100px;
}

.contract {
    font-weight: 400;
    display: flex;
    font-size: 20px;
    margin: 11px 0;
    gap: 10px
}

.textBox {
    resize: none;
    width: 535px;
    height: 155px;
    font-size: 22px;
    padding: 15px 20px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    margin-top: -5px
}

.submitButton {
    display: flex;
    justify-content: end;
}

button {
    background-color: #487CFF;
    display: flex;
    align-items: center;
    color: white;
    padding: 10px 22px;
    border-radius: 15px;
    border: none;
    font-size: 20px;
    font-weight: bold;
    margin-top: -7px
}

.comment {
    width: 1090px;
    padding: 27px 23px;
    border-radius: 20px;
    border: 1px solid #A1A1A1;
    margin-top: 30px;
}

.landlordProfile {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 26px;
}

.landlordProfile>img {
    width: 70px;
    height: 70px;
    border-radius: 50px;
    object-fit: cover
}

.data {
    display: flex;
    align-items: center;
}

.text>span {
    font-size: 22px;
    margin-top: 8px;
}
</style>