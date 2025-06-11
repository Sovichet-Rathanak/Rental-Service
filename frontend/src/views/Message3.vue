<template>
    <div class="message-page">
        <div class="message-wrapper">
            <div class="left-side">
                <div class="message-header">
                    <h1>Messages</h1>
                    <div class="icon">
                        <button class="search-btn">
                            <Icon icon="ic:baseline-search" width="25" height="25" />
                        </button>
                    </div>
                </div>

                <div class="btn-tabs">
                    <button class="tab-active">All<Icon icon="mingcute:down-fill" width="20" height="20"  style="color: #fff; position: absolute; padding: 3px" /></button>
                    <button class="tab-unactive">Unread</button>
                </div>

                <div class="profile-image">
                    <button class="profile1" :class="{ 'selected': selectedUser === 'Lina Van' }" @click="selectUser('Lina Van')">
                        <img :src="linaImage" alt="Lina Van Avatar" class="profile-pic" />
                        <span class="user-name">Lina Van</span>
                        <p>How much b?</p>
                        <p1>3:01PM</p1>
                    </button>
                    <button class="profile2" :class="{ 'selected': selectedUser === 'Sa Synin' }" @click="selectUser('Sa Synin')">
                        <img :src="saSyninImage" alt="Sa Synin Avatar" class="profile-pic" />
                        <span class="user-name">Sa Synin</span>
                        <p>Hello b</p>
                        <p1>2:34PM</p1>
                    </button>
                </div>
            </div>

            <div class="right-side">
                <div class="conversation">
                    <div class="chat-header">
                        <p>{{ selectedUser }}</p>
                        <div class="icon-group">
                            <Icon icon="ic:baseline-search" width="30" height="30" />
                            <Icon icon="material-symbols:call" width="30" height="30" style="color: #000" />
                            <Icon icon="nrk:more" width="30" height="30" style="color: #000" />
                        </div>
                    </div>

                    <div class="chat-conversation" ref="chatContainer">
                        <div v-for="(message, index) in messages[selectedUser]" :key="index" :class="message.isSent ? 'sent-message' : 'received-message'">
                            <p>{{ message.text }}</p>
                        </div>
                    </div>

                    <div class="reply-chat">
                        <Icon icon="uiw:paper-clip" width="25" height="25" style="color: #000; margin-left: 30px;" />
                        <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="write a message..." class="message-input" />
                        <Icon v-if="newMessage.trim()" icon="fluent:send-28-filled" width="25" height="25" style="color: #000" @click="sendMessage" class="send-icon" />
                        <div class="text-reply" :class="{ 'shift-left': newMessage.trim() }">
                            <Icon icon="proicons:emoji" width="25" height="25" style="color: #000" />
                            <Icon icon="uil:microphone" width="25" height="25" style="color: #000" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Notification from '@/components/message/NotificationPopUp.vue';
import AdminHeader from '@/components/headerComponents/AdminHeader.vue';
import HeaderNav3 from '@/components/Landlord/HeaderNav3.vue';
import linaImage from '@/assets/images/message/lina.jpg'; // Import Lina's image
import saSyninImage from '@/assets/images/message/sa-synin.jpg'; // Import Sa Synin's image

export default {
    components: {
        AdminHeader,
        HeaderNav3,
        Notification
    },
    name: 'Message',
    data() {
        return {
            linaImage, // Make images available in template
            saSyninImage,
            selectedUser: 'Lina Van', // Default selected user
            newMessage: '', // For typing new messages
            messages: {
                'Lina Van': [
                    { text: 'Hi b', isSent: false },
                    { text: 'I\'m interested in your house.', isSent: false },
                    { text: 'How much b?', isSent: false }
                ],
                'Sa Synin': [
                    { text: 'Hello b', isSent: false }
                ]
            }
        };
    },
    methods: {
        selectUser(user) {
            this.selectedUser = user; // Update the selected user
            this.scrollToBottom(); // Scroll to the bottom when switching users
        },
        sendMessage() {
            if (this.newMessage.trim()) {
                this.messages[this.selectedUser].push({
                    text: this.newMessage,
                    isSent: true // Mark the message as sent
                });
                this.newMessage = ''; // Clear the input field
                this.$nextTick(() => {
                    this.scrollToBottom(); // Scroll to the bottom after sending a message
                });
            }
        },
        scrollToBottom() {
            const chatContainer = this.$refs.chatContainer;
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom of the chat
            }
        }
    },
    mounted() {
        this.scrollToBottom(); // Scroll to the bottom when the component is mounted
    }
};
</script>

<style scoped>
.message-page {
    background: #ffffff;
}

.message-wrapper {
    display: flex;
    min-height: calc(100vh - 100px);
    max-height: min-content;
    width: 100%;
}

.left-side {
    width: 32%;
    border-right: 1px solid black;
    background-color: rgb(255, 255, 255);
}

.right-side {    
    width: 65%; 
    min-height: calc(100vh - 100px);
    position: relative; 
}

.conversation {
    width: 100%;  
    height: 100%; 
}

.chat-conversation {
    border-top: 1px solid black; 
    width: 100%;
    height: 670px;
    background-color: rgb(255, 255, 255);
    overflow-y:scroll;
    display: flex;
    flex-direction: column;
}

.received-message p {
    font-size: 18px;
    color: #ffffff;  
    font-weight: bold;
    background-color: #000000;
    border-radius: 15px;
    display: inline-block;
    padding: 8px 12px;
    margin: 10px;
    margin-top: 25px;
    margin-left: 30px;
}

.sent-message {
    align-self: flex-end;
    margin-right: 30px;
    margin-top: 10px;
}

.sent-message p {
    font-size: 18px;
    color: #ffffff;
    background-color: rgb(15, 7, 173);
    padding: 8px 12px;
    border-radius: 15px;
    margin: 5px;
    display: inline-block;
    font-weight: bold;
}

.message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 20px;
    margin-top: 25px;

}

.message-header h1 {
    font-size: 30px;
    padding-left: 50px;
    margin-top: 0px;

}

.icon {
    margin-right: 50px;
    display: flex;
    gap: 20px;
}

.search-btn, .filter-btn {
    cursor: pointer;
    padding: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 50px; 
    height: 50px;
    background-color: #f0f0f0; 
    border-radius: 50%; 
    border: none;
    transition: background-color 0.3s; /* Smooth hover effect */
}

.btn-tabs {
    display: flex;
    gap: 10px;
    padding-left: 50px;
    margin-top: -25px;
}

.tab-unactive {
    position: relative;
    margin-top: 15px;
    width: 100px;
    padding: 10px;
    background-color: white;
    color: black;
    border: 1px solid #000;
    border-radius: 30px; 
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
}

.tab-active {
    margin-top: 15px;
    width: 100px;
    padding: 10px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 30px; 
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
}

.profile-image {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 45px;
    position: relative;
    margin-left: 50px;
    justify-content: space-between; /* Space between image and text */
}

.profile1, .profile2 {
    display: flex;
    align-items: center; /* Align items vertically */
    position: relative;
    margin-top: 0;
    width: 100%;
    padding: 10px;
    color: black;
    border-radius: 0; 
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    gap: 10px; /* Adjusted gap for better spacing */
    background-color: white;
    border: none;
}

.profile1.selected, .profile2.selected {
    background-color: rgba(0, 0, 255, 0.5); /* Change background color when selected */
    color: rgb(255, 255, 255);
}

.profile-pic {
    width: 60px;
    height: 60px;
    border-radius: 50%; 
    object-fit: cover; /* Ensure image fills container */
    margin-left: 10px; /* Match original icon margin */
    margin-right: 10px; /* Space between image and name */
}

.user-name {
    font-size: 26px;
    font-weight: bold;
    margin-top: -25px;
    color: inherit; /* Inherit color from parent (black or white when selected) */
}

.profile1 p, .profile2 p {
    position: absolute;
    font-size: 15px;
    margin-left: 90px;
    margin-top: 60px;
    color: rgb(86, 85, 85);
}

.profile1.selected p, .profile2.selected p {
    color:white;
}

.profile1 p1, .profile2 p1 {
    position: absolute;
    font-size: 15px;
    margin-left: 450px;
    margin-top: 40px;
    color: rgb(86, 85, 85);
}

.profile1.selected p1, .profile2.selected p1 {
    color: white;
}

.chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* gap: 1050px;  */
    background-color: white;
    height: 10%;
}

.reply-chat {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    background-color: white; 
    border-radius: 0; 
    gap: 10px;
}

.icon-group {
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: end;
    margin-top: 15px;
}

.chat-header p {
    font-size: 26px;
    color: #000; 
    margin: 0;
    margin-left: 30px;
    margin-top: 10px;
    font-weight: bold;
}

.icon-group > [data-icon] {
    width: 25px;
    height: 25px;
}

.text-reply {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-right: 50px;
    transition: margin-left 0.3s ease;
}

.text-reply.shift-left {
    margin-left: 10px;
}

.message-input {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    color: #000;
    background-color: #f0f0f0;
}

.message-input::placeholder {
    color: #969696;
}

.send-icon {
    cursor: pointer;
}
</style>