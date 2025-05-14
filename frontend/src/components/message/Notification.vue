<template>
  <div class="notifications">
    <h2 class="title">Notifications</h2>
    <div class="tab-buttons">
      <button class="tab-button active">Messages</button>
      <button class="tab-button">Requests</button>
    </div>
    <div class="message-content">
      <div v-for="(message, index) in messages" :key="index" class="message-item">
        <img :src="message.avatar" alt="Avatar" class="avatar" />
        <div class="message-details">
          <div class="message-name">{{ message.name }}</div>
          <div class="message-text">{{ message.text }}</div>
        </div>
        <div class="message-meta">
          <div v-if="message.time" class="message-time">{{ message.time }}</div>
          <div v-if="message.unread" class="unread-dot"></div>
          <div v-if="message.date" class="message-date">{{ message.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import linaImage from '@/assets/images/message/lina.jpg'; // Import image directly

export default {
  data() {
    return {
      messages: [
        {
          name: 'Lina Van',
          text: 'Hello B, plus pkun hz :)',
          time: '08:00 PM',
          date: '',
          unread: true,
          avatar: linaImage
        },
        {
          name: 'Lina Van',
          text: 'Hello B, dach tirk hz :)',
          time: '',
          date: 'Sat',
          avatar: linaImage
        },
        {
          name: 'Lina Van',
          text: 'Hello B, dach tirk hz :)',
          time: '',
          date: '9/2/2025',
          avatar: linaImage
        },
        {
          name: 'Lina Van',
          text: 'Hello B, dach tirk hz :)',
          time: '',
          date: '9/2/2025',
          avatar: linaImage
        },
        {
          name: 'Lina Van',
          text: 'Hello B, dach tirk hz :)',
          time: '',
          date: '9/2/2025',
          avatar: linaImage
        }
      ]
    };
  },
  mounted() {
    console.log('Messages:', this.messages); // Debug log
  }
};
</script>

<style scoped>
.notifications {
  background: #ffffff;
  padding: 10px;
  border-radius: 30px;
  width: 400px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-height: 500px; /* Ensure visibility */
  margin-right: 85px;
  margin-top: -90px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000000;
}

.tab-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #787878;
  padding-bottom: 20px;
  width: 100%;
}

.tab-button {
  padding: 8px 20px;
  border: none;
  background: #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #666666;
}

.tab-button.active {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  color: #000000;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}

.message-details {
  flex-grow: 1;
}

.message-name {
  font-size: 18px;
  font-weight: 600;
  color: #000000;
}

.message-text {
  font-size: 14px;
  color: #666666;
}

.message-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
}

.message-time {
  font-size: 12px;
  color: #666666;
}

.unread-dot {
  width: 12px;
  height: 12px;
  background: #1e90ff;
  border-radius: 50%;
  margin-top: 5px;
}

.message-date {
  font-size: 12px;
  color: #666666;
  text-align: right;
}
</style>