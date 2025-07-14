<template>
  <div class="notification-filter">
    <button v-for="(btn, index) in filterButtons" :key="index" :class="{ active: filterType === btn.value }"
      @click="notificationStore.setFilter(btn.value)">
      {{ btn.label }}
    </button>
  </div>

  <div class="notiList">
    <NotificationItems v-for="notif in filteredNotifications" :key="notif.id" :notification="notif"
      :icon-name="getIcon(notif.status)" :icon-color="getColor(notif.status)"
      :icon-type="notif.type === 'tour' ? 'material-symbols:tour-rounded' : 'bi:house-up-fill'" :role="userRole"
      :listing="notif.listing" :status="notif.status" />
  </div>
  <div class="debug">
    <!-- <p v-for="notif in filteredNotifications" :key="notif.id">
    DEBUG: {{ notif.message }} | Type: {{ notif.type }} | Create: {{ notif.createdAt }}
  </p> -->
  </div>
</template>
<script>
import NotificationItems from '@/components/notificationComponent/NotificationItems.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import { useNotificationStore } from '@/stores/notification';

export default {
  name: 'notification',
  components: {
    NotificationItems,
  },
  setup() {
    const notificationStore = useNotificationStore();
    const { filteredNotifications, filterType } = storeToRefs(notificationStore);
    const userStore = useUserStore()
    const userRole = userStore.role
    const status = useNotificationStore.status
    const filterButtons = [
      { label: 'All', value: 'all' },
      { label: 'Tour Request', value: 'tour' },
      { label: 'Rent Request', value: 'rent' }
    ];

    const getIcon = (status) => {
      if (status === 'approved') return 'teenyicons:tick-circle-solid';
      if (status === 'declined') return 'gridicons:cross-circle';
      if (status === 'cancelled') return 'mdi:cancel';
      return 'ion:hourglass-outline';
    };

    const getColor = (status) => {
      if (status === 'approved') return 'green';
      if (status === 'declined') return 'red';
      if (status === 'cancelled') return 'red';
      return '#2D01CE';
    };
    onMounted(() => {
      if (userStore.user && userStore.user.id) {
        notificationStore.fetchNotifications(userStore.user.id).then(() => {
          console.log('Fetched Notifications:', notificationStore.notifications);
        });
      }
    });

    return {
      notificationStore,
      filteredNotifications,
      filterType,
      filterButtons,
      getIcon,
      getColor,
      userRole
    };
  }
};
</script>
<style scoped>
main {
  padding-inline: 300px;
}

.notification-filter {
  display: flex;
  gap: 10px;
}

.notification-filter button {
  border: none;
  color: lightgray;
  background-color: transparent;
  font-size: 20px;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}

.notification-filter button.active {
  color: black;
}

.breadContainer {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  margin-bottom: 20px;
}

.notiList {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>