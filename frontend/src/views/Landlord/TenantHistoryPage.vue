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
                            
                            <div style="font-size: 24px;">
                                Lina Van
                                <span class="contract">Contract Expiration: 
                                    <span style="font-weight: bold;"> 16/02/2025</span>
                                </span>
                                <Icon width="45" height="45" v-for="n in 5" :key="n"
                                    :icon="n <= selectedRating ? 'mdi:star' : 'mdi:star-outline'"
                                    :style="{color: n <= selectedRating ? 'orange' : 'black', cursor: 'pointer'}"
                                    @click="selectedRating = n"
                                ></Icon>
                            </div>
                        </div>

                        <textarea class="textBox" placeholder="Write something about your tenant..."
                            v-model="commentText"
                            @keydown.enter.exact.prevent="submitComment"
                        ></textarea>
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
                            <Icon icon="mdi:star" width="33" height="33" 
                                v-for="i in post.rating" :key="i" style="color: #FFA629"></Icon>
                        </div>
                        <div class="text">
                            Remark
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
      selectedRating: 0,
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

      // Reset form
      this.commentText = '';
      this.selectedRating = 0;
    }
  }
};
</script>


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
}
.currentTenant > img{
    width: 500px;
    height: 436px;
    border-radius: 15px;
    object-fit: cover
}
.tenant{
    display: flex;
    flex-direction: column;
    gap: 25px;
    font-size: 27px;
    font-weight: bolder;
}
.profile{
    display: flex;
    gap: 30px
}
.profile > img{
    width: 120px;
    height: 120px;
    border-radius: 100px;
}
.contract{
    font-weight: 400;
    display: flex;
    font-size: 20px;
    margin: 11px 0;
    gap: 10px
}
.textBox{
    width: 535px;
    height: 190px;
    font-size: 22px;
    padding: 15px 20px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 20px;
}
.comment{
    width: 1090px;
    padding: 27px 23px;
    border-radius: 20px;
    border: 1px solid #A1A1A1;
    margin-top: 30px;
}
.landlordProfile{
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 26px;
}
.landlordProfile > img{
    width: 70px;
    height: 70px;
    border-radius: 50px;
    object-fit: cover
}
.data{
    display: flex;
    align-items: center;
}
.text > span{
    font-size: 22px;
    margin-top: 8px;
}
</style>