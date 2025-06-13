<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>

  <main>
    <div class="breadContainer">
      <BreadCrumbs style="margin: 30px 0px; align-self: flex-start;" />
      <h1>Notifications</h1>
      <NotificationList></NotificationList>
    </div>
  </main>

  <footer>
    <FooterComponent />
  </footer>
</template>
<script>
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import notiComponent from '@/components/notificationComponent/NotificationItems.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import { useNotificationStore } from '@/stores/notification';
import { storeToRefs } from 'pinia';
import NotificationList from '@/components/notificationComponent/NotificationList.vue';

export default {
  components: {
    FooterComponent,
    HeaderNav2,
    notiComponent,
    BreadCrumbs,
    NotificationList
  },
  setup() {
    const notificationStore = useNotificationStore();
    const { filteredNotifications, filterType } = storeToRefs(notificationStore);

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
      getColor
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