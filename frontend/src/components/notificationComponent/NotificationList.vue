<template>
    <div class="notification-filter">
    <button
        v-for="(btn, index) in filterButtons"
        :key="index"
        :class="{ active: filterType === btn.value }"
        @click="notificationStore.setFilter(btn.value)"
    >
        {{ btn.label }}
    </button>
    </div>

    <div class="notiList">
      <NotificationItems
        v-for="notif in filteredNotifications"
        :key="notif.id"
        :notification="notif"
        :icon-name="getIcon(notif.status)"
        :icon-color="getColor(notif.status)"
        :icon-type="notif.type === 'tour' ? 'material-symbols:tour-rounded' : 'bi:house-up-fill'"
        :role="userRole"
        :status="notif.status"
      />
    </div>
</template>
<script>
import NotificationItems from '@/components/notificationComponent/NotificationItems.vue';
import { useNotificationStore } from '@/stores/notification';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

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
    const filterButtons = [
      { label: 'All', value: 'all' },
      { label: 'Tour Request', value: 'tour' },
      { label: 'Rent Request', value: 'rent' }
    ];

    const getIcon = (status) => {
      if (status === 'Approved') return 'teenyicons:tick-circle-solid';
      if (status === 'Declined') return 'gridicons:cross-circle';
      return 'ion:hourglass-outline';
    };

    const getColor = (status) => {
      if (status === 'Approved') return 'green';
      if (status === 'Declined') return 'red';
      return '#2D01CE';
    };


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