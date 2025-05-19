<template>
  <div class="notifications" v-if="visible">
    <h2 class="title">Notifications</h2>
    <div class="tab-buttons">
      <button class="tab-button" @click="activeTab = 'Messages'">Messages</button>
      <button class="tab-button active" @click="activeTab = 'Requests'">Requests</button>
    </div>
    <div class="message-content">
      <div v-for="(message, index) in filteredMessages" :key="index" class="message-item">
        <img :src="message.avatar" :alt="`${message.name} Avatar`" class="avatar" />
        <div class="message-details">
          <div class="message-name">{{ message.name }}</div>
          <div class="message-text">{{ message.text }}</div>
          <div v-if="message.isRequest" class="action-buttons">
            <button class="accept-btn" @click="acceptRequest(index)">Accept</button>
            <button class="reject-btn" @click="rejectRequest(index)">Reject</button>
          </div>
        </div>
        <div class="message-meta">
          <div v-if="message.time" class="message-time">{{ message.time }}</div>
          <div v-if="message.date" class="message-date">{{ message.date }}</div>
        </div>
      </div>
    </div>
    <button class="close-btn" @click="$emit('close')">
      <Icon icon="material-symbols:close-rounded" width="25" height="25"  style="color: #000" />
    </button>
  </div>
</template>

<script>
import linaImage from '@/assets/images/message/lina.jpg';
import saSyninImage from '@/assets/images/message/sa-synin.jpg';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeTab: 'Requests', // Default to Requests tab
      messages: [
        {
          name: 'Sa Synin',
          text: 'Sa Synin is requesting a house tour on 16/3/2025',
          time: '08:00 PM',
          date: '16/3/2025',
          isRequest: true,
          avatar: saSyninImage,
          status: 'pending' // Track request status
        },
        {
          name: 'Lina Van',
          text: "You approved tenant's stay",
          time: '',
          date: '9/2/2025',
          isRequest: false,
          avatar: linaImage
        },
        {
          name: 'Lina Van',
          text: "You approved tenant's stay",
          time: '',
          date: '9/2/2025',
          isRequest: false,
          avatar: linaImage
        },
        {
          name: 'Lina Van',
          text: "You approved tenant's stay",
          time: '',
          date: '9/2/2025',
          isRequest: false,
          avatar: linaImage
        }
      ]
    };
  },
  computed: {
    filteredMessages() {
      // Filter messages based on active tab
      if (this.activeTab === 'Messages') {
        return this.messages.filter(msg => !msg.isRequest);
      }
      return this.messages.filter(msg => msg.isRequest || msg.date);
    }
  },
  methods: {
    acceptRequest(index) {
      this.messages[index].status = 'accepted';
      this.messages[index].text = 'You accepted Sa Synin’s house tour request';
      this.messages[index].isRequest = false;
      this.messages[index].time = ''; // Remove time after action
      this.messages[index].date = '14/5/2025'; // Update date to current date (01:42 AM +07, May 14, 2025)
    },
    rejectRequest(index) {
      this.messages[index].status = 'rejected';
      this.messages[index].text = 'You rejected Sa Synin’s house tour request';
      this.messages[index].isRequest = false;
      this.messages[index].time = '';
      this.messages[index].date = '14/5/2025';
    }
  },
  mounted() {
    console.log('Messages:', this.messages);
  }
};
</script>

<style scoped>
.notifications {
  background: #ffffff;
  padding: 20px 40px;
  border-radius: 30px;
  width: 450px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-height: 300px;
  position: absolute; 
  z-index: 1000; /* Ensure it appears above other content */
  margin-left: -620px; 
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
  align-items: flex-start;
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
  margin-bottom: 10px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.accept-btn {
  padding: 5px 15px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
}

.accept-btn:hover {
  background-color: #0056b3;
}

.reject-btn {
  padding: 5px 15px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
}

.reject-btn:hover {
  background-color: #f0f0f0;
}

.message-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
}

.message-time {
  font-size: 12px;
  color: #666666;
}

.message-date {
  font-size: 12px;
  color: #666666;
  text-align: right;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666666;
}

.close-btn:hover {
  color: #000000;
}
</style>