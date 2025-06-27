<template>
    <div class="container" @click="toggleStatusCard">
        <div class="imgText">
            <div class="imgIcon">
                <Icon v-if="!user.pfp_original_url"  icon="ion:person" width="120" height="120"  style="color: black" />
                <img v-else :src="`http://localhost:9000/romdoul/${user.pfp_original_url}`" alt="Profile Picture" class="pfp-img" @error="onImageError" />
                <Icon
                    class="notiType"
                    :icon="iconType"
                    :style="{ backgroundColor: iconBgColor }"
                    />
            </div>

            <div class="textGr">
                <h2 class="name">{{ notification.userId }}</h2>
                <span class="description">
                {{ notification.message }}
                </span>
            </div>
        </div>

        <div class="iconGr">
            <h2 class="date">{{ notification.createdAt }}</h2>
            <Icon class="icon" :icon="iconName" :color="iconColor" />
        </div>

        <StatusCard
        v-if="showCard"
        :notification="notification"
        :icon-name="iconName"
        :icon-color="iconColor"
        :type="notification.type"
        :role="role"
        :status="notification.status"
        @close="showCard = false"
        />
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import StatusCard from './statusCard.vue';
import { useNotificationStore } from '@/stores/notification';
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';

export default {
  name: 'notiComponent',
  components: {
    Icon,
    StatusCard
  },
  props: {
    notification: Object,
    iconName: String,
    iconColor: String,
    iconType: String,
    description: String,
    role: String,
    status: String

  },
  data() {
    return {
      showCard: false
    };
  },
  methods: {
    async toggleStatusCard() {
      if (!this.showCard) {
        // Mark read on open
        const notificationStore = useNotificationStore();
        await notificationStore.markAsRead(this.notification.id);
      }
      this.showCard = !this.showCard;
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    iconBgColor() {
        return this.notification.type === 'tour' ? 'rgb(236, 154, 0)' : 'rgb(52, 130, 248)';
    }
  }
};
</script>

<style scoped>
.container {
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    width: auto;
    max-height: 200px;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}
h2 {
    margin-top: 0px;
    margin-bottom: 20px;
}
span {
    font-size: 20px;
}
img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
}
.imgText {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.imgIcon {
  position: relative;
  width: 90px;
  height: 90px;
}

.imgIcon img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.notiType {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgb(236, 154, 0);
  border-radius: 50%;
  padding: 7px;
  height: 25px;
  width: 25px;
  z-index: 1;
  color: white;
}

.textGr {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}
.iconGr {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.icon {
    height: 30px;
    width: 30px;
    cursor: pointer;
}
</style>
