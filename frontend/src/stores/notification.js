import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    filterType: 'all',
    notifications: [],
  }),

  getters: {
    filteredNotifications(state) {
      if (state.filterType === 'all') return state.notifications;
      return state.notifications.filter(n => n.type === state.filterType);
    },
  },

  actions: {
    setFilter(type) {
      this.filterType = type;
    },

    addNotification(notification) {
      this.notifications.unshift(notification);
    },

    async fetchNotifications() {
      const userStore = useUserStore();

      if (!userStore.user?.id || !userStore.authToken) {
        console.error('User not logged in or missing token');
        this.notifications = [];
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/api/notifications/user/${userStore.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${userStore.authToken}`,
            },
          }
        );
        this.notifications = res.data;
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        this.notifications = [];
      }
    },

    async markAsRead(notificationId) {
      const userStore = useUserStore();

      if (!userStore.authToken) {
        console.error('Missing token, cannot mark as read');
        return;
      }

      try {
        await axios.patch(
          `http://localhost:3000/api/notifications/${notificationId}`,
          { isRead: true },
          {
            headers: {
              Authorization: `Bearer ${userStore.authToken}`,
            },
          }
        );
        const notif = this.notifications.find(n => n.id === notificationId);
        if (notif) notif.isRead = true;
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    },

    async performAction(notificationId, action) {
      const userStore = useUserStore();

      if (!userStore.user?.id || !userStore.authToken) {
        console.error('User not logged in or missing token');
        return;
      }

      try {
        await axios.post(
          `http://localhost:3000/api/notifications/${notificationId}/action`,
          { action },
          {
            headers: {
              Authorization: `Bearer ${userStore.authToken}`,
            },
          }
        );
        await this.fetchNotifications();
      } catch (error) {
        console.error(`Failed to ${action} notification:`, error);
        throw error;
      }
    },

    // Create booking notification (tenant initiates booking)
    async createBookingNotifications({ senderId, receiverId, type, bookingId, tenantName }) {
      const userStore = useUserStore();

      if (!userStore.user?.id || !userStore.authToken) {
        console.error('User not logged in or missing token');
        return;
      }

      try {
        const res = await axios.post(
            'http://localhost:3000/api/notifications/booking/request',
          {
            senderId,
            receiverId,
            type,
            bookingId,
            tenantName,
          },
          {
            headers: {
              Authorization: `Bearer ${userStore.authToken}`,
            },
          }
        );
        console.log("✅ Notification sent successfully!");

        await this.fetchNotifications();
        return res.data;
      } catch (error) {
  console.error("❌ Failed to send booking notification:");
  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
  } else {
    console.error("Error:", error.message);
  }
  throw error;
}

    },

    // Notify booking action (approve, decline, cancel, pay)
    async notifyBookingAction({ tenantUserId, landlordUserId, action, type, bookingId }) {
      const userStore = useUserStore();

      if (!userStore.user?.id || !userStore.authToken) {
        console.error('User not logged in or missing token');
        return;
      }

      try {
        const res = await axios.post(
          'http://localhost:3000/api/notifications/booking/action',
          {
            tenantUserId,
            landlordUserId,
            action,
            type,
            bookingId,
          },
          {
            headers: {
              Authorization: `Bearer ${userStore.authToken}`,
            },
          }
        );
        await this.fetchNotifications();
        return res.data;
      } catch (error) {
        console.error('Failed to notify booking action:', error);
        throw error;
      }
    },
  },
});
