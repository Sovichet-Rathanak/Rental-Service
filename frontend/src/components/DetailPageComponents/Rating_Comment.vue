<template>
  <!-- Total Rating Summary -->
  <div class="totalRating">
    <Icon icon="material-symbols:star-rounded" width="40" height="40" />
    <h1>{{ ratings.length === 0 ? '0.0' : overallRating.toFixed(1) }}</h1>
    <Icon icon="mdi:dot" width="35" height="35" />
    <h1>{{ ratings.length === 0
      ? 'No rating yet'
      : ratings.length + ' rating' + (ratings.length > 1 ? 's' : '') }}</h1>
  </div>

  <!-- Rating Section -->
  <div class="ratingSection">
    <!-- Overall Rating Bar -->
    <div class="overallRating">
      <span>Overall Rating</span>
      <div class="ratingBar-wrapper" v-for="(count, index) in ratingBar" :key="index">
        <span class="countRating">{{ 5 - index }}</span>
        <div class="ratingBar">
          <div class="ratingBar-fill" :style="{ width: getBarWidth(count) }"></div>
        </div>
      </div>
    </div>

    <!-- Per-Category Ratings -->
    <div class="column_rating" v-for="(item, index) in ratingBox" :key="index">
      <hr class="customHr1" />
      <div class="box">
        <div class="text">
          <span>{{ item.title }}</span>
          <span>{{ item.rating.toFixed(1) }}</span>
        </div>
        <Icon :icon="item.icon" width="30" height="30" />
      </div>
    </div>
  </div>

  <hr class="customLine" />

  <!-- Leave a Review Button -->
  <button class="button" @click="showPopup = true">
    <Icon icon="material-symbols:rate-review-outline-rounded" width="40" height="40" />
    <span>Leave a Review or Rating</span>
  </button>

  <!-- Comment Section -->
  <div class="comment_wrap">
    <div class="totalReview">
      <Icon icon="ant-design:comment-outlined" width="40" height="40" />
      <span>{{ comments.length === 0 ? 'No review yet' : 'Total Review' + (comments.length > 1 ? 's ' : ' ') +
        comments.length }}</span>
    </div>
    <div class="container">
      <div class="commentSection" v-for="(item, index) in comments" :key="index">
        <div class="profileWrap">
          <img :src="item.Img" alt="" />
          <div class="name">
            <h2>{{ item.profileName }}</h2>
            <span>{{ item.duration }}</span>
          </div>
        </div>
        <div class="textReview">
          <h3>{{ item.date }}</h3>
          <span>{{ item.reviews }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Popup to Leave Review -->
  <div class="popup-overlay" v-if="showPopup">
    <div class="popup-container">
      <div class="header">
        <div class="heading-row">
          <h3>BKK1, Chamkarmon, Phnom Penh</h3>
          <Icon icon="mdi:close" class="close-icon" @click="closePopup" />
        </div>

        <div class="user-info">
          <img src="/src/assets/images/comment/_.jpeg" alt="User" class="user-img" />
          <div class="user-details">
            <p class="username">Romdoul</p>
            <p class="post-info">Posting publicly across Romdoul Joul Pteas</p>
          </div>
        </div>

        <p class="subheading">We value your feedback</p>
        <p class="instruction">It helps us improve. Please fill out these following questions.</p>
      </div>

      <hr class="customHr" />

      <!-- Rating Questions -->
      <div class="questions">
        <div class="question" v-for="(question, index) in questions" :key="index">
          <p>{{ question.text }}</p>
          <div class="stars">
            <Icon v-for="i in 5" :key="i" :icon="i <= question.rating ? 'mdi:star' : 'mdi:star-outline'" class="star"
              @click="question.rating = i" />
          </div>
        </div>
      </div>

      <!-- Final overrall rating -->
      <div class="final-rating">
        <p>What's your overall rating for this place?</p>
        <div class="stars">
          <Icon v-for="i in 5" :key="i" :icon="i <= finalRating ? 'mdi:star' : 'mdi:star-outline'" class="star"
            @click="finalRating = i" />
        </div>
      </div>

      <!-- Review Text -->
      <textarea v-model="newReview.reviews" @keydown.enter.prevent="submitFeedback"
        placeholder="Share details of your own experience at this place" class="feedback-input" rows="3"></textarea>

      <!-- Submit Buttons -->
      <div class="buttons">
        <button class="submit-button" @click="submitFeedback">Submit</button>
        <button class="later-button" @click="closePopup">Maybe later</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ratingData: {
        Cleanliness: [],
        Communication: [],
        Comfort: [],
        Location: [],
        Value: [],
      },
      ratingBox: [
        { title: 'Location', rating: 0, icon: 'mdi:map-marker-outline' },
        { title: 'Value', rating: 0, icon: 'mdi:currency-usd' },
        { title: 'Comfort', rating: 0, icon: 'mdi:sofa-outline' },
        { title: 'Cleanliness', rating: 0, icon: 'carbon:clean' },
        { title: 'Communication', rating: 0, icon: 'mdi:message-text-outline' },
      ],
      questions: [
        { text: 'Was the place clean and well-maintained?', category: 'Cleanliness', rating: 4 },
        { text: 'Was the landlord responsive and helpful?', category: 'Communication', rating: 4 },
        { text: 'Was the furniture and living space comfortable?', category: 'Comfort', rating: 4 },
        { text: 'Was the area safe and convenient?', category: 'Location', rating: 4 },
        { text: 'Was the place worth the rent?', category: 'Value', rating: 4 }
      ],
      comments: [],
      ratings: [],
      reviews: [],
      showPopup: false,
      finalRating: 4,
      newReview: {
        reviews: '',
      },
    };
  },
  computed: {
    overallRating() {
      if (this.ratings.length === 0) return 0;
      const total = this.ratings.reduce((a, b) => a + b, 0);
      return total / this.ratings.length;
    },
    ratingBar() {
      const counts = [0, 0, 0, 0, 0];
      this.ratings.forEach(r => {
        const index = 5 - r;
        if (index >= 0 && index <= 4) counts[index]++;
      });
      return counts;
    }
  },
  methods: {
    getBarWidth(count) {
      const totalVotes = this.ratings.length;
      if (totalVotes === 0) return '0%';
      return `${((count / totalVotes) * 100).toFixed(1)}%`;
    },
    closePopup() {
      this.showPopup = false;
      this.newReview.reviews = '';
      this.finalRating = 4;
      this.questions.forEach(q => q.rating = 4);
    },

    submitFeedback() {
      if (this.questions.some(q => q.rating === 0)) {
        alert("Please rate all questions.");
        return;
      }

      // Update category averages
      this.questions.forEach(question => {
        const cat = question.category;
        this.ratingData[cat].push(question.rating);
        const avg = this.ratingData[cat].reduce((a, b) => a + b, 0) / this.ratingData[cat].length;
        const box = this.ratingBox.find(item => item.title === cat);
        if (box) box.rating = parseFloat(avg.toFixed(2));
      });

      // Save final rating 
      this.ratings.push(this.finalRating);

      // Save the comment 
      const trimmedReview = this.newReview.reviews.trim();
      if (trimmedReview !== '') {
        this.reviews.push(trimmedReview);
        this.comments.push({
          Img: '/src/assets/images/comment/_.jpeg',
          profileName: 'Bai Jingting',
          duration: ' 3 years on Romduol Rental Service',
          date: new Date().toLocaleDateString('en-GB'),
          reviews: trimmedReview,
        });
      }

      this.closePopup();
    },
  },
};
</script>


<style scoped>
.totalRating {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 100px 0px 20px 0px;
}

.totalRating>h1 {
  font-size: 30px;
  font-weight: bold;
}

.totalRating>span {
  font-size: 35px;
  font-weight: bold;
}

.ratingSection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 20px;
}

/* overall rating */
.overallRating {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  font-size: 22px;
  font-weight: bold;
}

/* ratigng bar */
.countRating {
  font-size: 24px;
  font-weight: bold;
}

.ratingBar-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: -6px
}

.ratingBar-wrapper>span {
  font-size: 21px;
  font-weight: 600;
}

.ratingBar {
  width: 250px;
  height: 10px;
  background-color: #D9D9D9;
  border-radius: 5px;
  margin: 0;
}

.ratingBar-fill {
  width: 80%;
  height: 100%;
  background-color: #000000;
  border-radius: 5px;
}

/* line */
.customHr1 {
  height: 200px;
  margin: 10px 40px;
  background-color: rgba(0, 0, 0, 0.5);
}

/* column rating */
.column_rating {
  display: flex;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 40px;
  padding-top: 35px;
  justify-content: space-evenly
}

.text {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 13px;
}

.text>span {
  font-size: 20px;
  font-weight: bold;
}

.customLine {
  width: 100%;
  height: 0px;
  margin: 60px 0px;
}

.button {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 22px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 12px;
  height: 65px;
  width: auto;
  padding: 0 20px;
  cursor: pointer;
  background-color: white;
}

.button:hover {
  background-color: #fafafa;
  /* border: none; */
}

.button:active {
  background-color: #f6f6f6;
  /* border: none; */
}

/* comment section */
.totalReview {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: bold;
  margin: 40px 0px 30px 0px;
}

.totalReview>span {
  font-size: 25px;
  font-weight: bold;
}

.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.commentSection {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 55px 0 30px 0;
  font-size: 22px;
  font-weight: bold;
  width: 90%;
}

.profileWrap {
  display: flex;
  gap: 20px;
  align-items: center;
}

.profileWrap>img {
  width: 95px;
  height: 95px;
  border-radius: 50%;
}

.name {
  display: flex;
  flex-direction: column;
  margin: 0;
}

.name>h2 {
  font-size: 25px;
  font-weight: bold;
  margin: 0;
}

.name>span {
  font-size: 20px;
  font-weight: 450;
  margin-top: 10px;
}

.textReview {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
}

.textReview>h3 {
  font-size: 21px;
  font-weight: bold;
  margin: 0;
}

.textReview>span {
  font-size: 23px;
  font-weight: 450;
  margin: 0;
  white-space: pre-line;
}

/* PopUp page */
.popup-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.popup-container {
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  padding: 10px 25px 40px 35px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-height: 80vh;
  overflow-y: auto;

  /* Hide scrollbar (cross-browser) */
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.popup-container::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari */
}

.header {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.heading-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.heading-row h3 {
  font-size: 22px;
  font-weight: bold;

}

.close-icon {
  font-size: 23px;
  cursor: pointer;
  color: #888;
  transition: color 0.2s;
  width: 30px;
  height: 30px;
}

.close-icon:hover {
  color: #000;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 15px 0 40px 0;
}

.user-img {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.username {
  font-size: 21px;
  font-weight: bold;
  margin: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.post-info {
  font-size: 19px;
  color: gray;
  margin: 0;
}

.subheading {
  text-align: center;
  font-weight: 600;
  margin: 0;
  font-size: 22px;
}

.instruction {
  text-align: center;
  font-size: 20px;
  color: #666;
  margin: 0;
}

.customHr {
  border: 0;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
}

.questions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question p {
  font-size: 21px;
  margin-bottom: 5px;
}

.final-rating {
  margin-top: 35px;
}

.final-rating p {
  margin-bottom: 10px;
  font-size: 21px;
}

.stars {
  display: flex;
  gap: 4px;
}

.star {
  width: 37px;
  height: 37px;
  color: #facc15;
  cursor: pointer;
}

.feedback-input {
  width: 97%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-top: 25px;
  font-size: 18px;
  resize: none;
}

.buttons {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.submit-button {
  background-color: #4537FF;
  color: white;
  padding: 10px 40px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 17px;
  cursor: pointer;
  border: none;
}

.submit-button:hover {
  background-color: #3131d4;
}

.submit-button:active {
  background-color: #7474f1;
}

.later-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
}

.later-button:hover {
  color: #000;
  text-decoration: underline;
}

.later-button:active {
  color: #888888;
  text-decoration: underline;
}
</style>