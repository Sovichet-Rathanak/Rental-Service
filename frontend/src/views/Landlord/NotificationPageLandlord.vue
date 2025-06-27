<template>
  <div class="container">
    <h1>Notifications</h1>
    <NotificationList></NotificationList>
  </div>
  <footer>
    <FooterComponent />
  </footer>
</template>
<script>
import FooterComponent from '@/components/FooterComponent.vue';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '@/stores/notification';
import NotificationList from '@/components/notificationComponent/NotificationList.vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

export default {
  components: {
    FooterComponent,
    NotificationList
  },
  setup() {
    const notificationStore = useNotificationStore();
    const { filteredNotifications, filterType } = storeToRefs(notificationStore);
    const userStore = useUserStore()

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
    onMounted(() => {
      notificationStore.fetchNotifications(userStore.user.id); 
    });


    return {
      notificationStore,
      filteredNotifications,
      filterType,
      filterButtons,
      getIcon,
      getColor
    };
  }
};
</script>
<style scoped>
.container{
  padding-inline: 200px;
}
</style>