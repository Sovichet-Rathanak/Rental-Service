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
      const userId = userStore.user?.id;

      if (!userId) {
        console.error('User ID is missing');
        this.notifications = [];
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/api/notifications/user/${userId}`);
        this.notifications = res.data;
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        this.notifications = [];
      }
    },

    // async markAsRead(notificationId) {
    //   try {
    //     await axios.patch(`http://localhost:3000/api/notifications/${notificationId}`, {
    //       isRead: true,
    //     });
    //     const notif = this.notifications.find(n => n.id === notificationId);
    //     if (notif) notif.isRead = true;
    //   } catch (error) {
    //     console.error('Failed to mark notification as read:', error);
    //   }
    // },

    async performAction(notificationId, action) {
      const userStore = useUserStore();
      const userId = userStore.user?.id;

      if (!userId) {
        console.error('User not logged in — missing userId');
        return;
      }

      try {
        await axios.post(`http://localhost:3000/api/notifications/${notificationId}/action`, {
          action,
          userId,
        });
        await this.fetchNotifications();
      } catch (error) {
        console.error(`Failed to ${action} notification:`, error);
        throw error;
      }
    },


    async createBookingNotifications({ listing, type, bookingId }) {
      const userStore = useUserStore();
      const user = userStore.user;
      const userId = user?.id;

      if (!userId) {
        console.error('User ID is missing');
        return;
      }

      try {
        const res = await axios.post('http://localhost:3000/api/notifications/booking/request', {
          senderId: userId,
          receiverId: listing.owner.id,
          type,
          bookingId,
          tenantName: `${user.firstname} ${user.lastname}`,
        });

        console.log('Notification sent successfully!');
        await this.fetchNotifications();
        return res.data;
      } catch (error) {
        console.error('Failed to send booking notification:', error);
        throw error;
      }
    },

    async notifyBookingAction({ listing, action, type, bookingId }) {
      const userStore = useUserStore();
      const userId = userStore.user?.id;

      if (!userId) {
        console.error('User ID is missing');
        return;
      }

      try {
        const res = await axios.post('http://localhost:3000/api/notifications/booking/action', {
          tenantUserId: userId,
          landlordUserId: listing.owner.id,
          action,
          type,
          bookingId,
        });

        await this.fetchNotifications();
        return res.data;
      } catch (error) {
        console.error('Failed to notify booking action:', error);
        throw error;
      }
    },
  },
});
