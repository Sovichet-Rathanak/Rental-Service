<template>
  <div class="status-card-overlay">
    <div class="status-card">
      <button class="close-btn" @click.stop="$emit('close')">
        <Icon class="icon" icon="iconamoon:arrow-left-2-light" />
      </button>

      <img src="@/assets/images/property_images/property1.jpeg" alt="" />

      <div class="detailContainer">
        <div class="detail">
          <Icon class="icon" icon="solar:home-outline" />
          <p>Property: {{ notification.name }}</p>
        </div>
        <div class="detail">
          <Icon class="icon" icon="solar:calendar-linear" />
          <p>Requested Date: {{ notification.date }}</p>
        </div>
        <div class="detail">
          <Icon class="icon" :icon="iconName" :color="iconColor" />
          <p>Status: {{ notification.status }}</p>
        </div>
      </div>

      <div v-if="notification.status === 'Pending'" class="button-group">
        <!-- ================= Tenant ================= -->
        <div class="rent-container" v-if="role === 'tenant'">
          <button class="cancel" @click.stop="$emit('close')">
            <Icon class="icon" icon="iconoir:cancel" />
            <span>Cancel {{ notification.type === 'tour' ? 'Tour' : 'Request' }}</span>
          </button>

          <button v-if="notification.type === 'rent'" class="pay" @click="payNow">
            <Icon class="icon" icon="uiw:pay" />
            <span>Pay now</span>
          </button>
        </div>

        <!-- ============ Tour Request for Landlord ============ -->
        <div class="rent-container" v-if="role === 'landlord' && type === 'tour'">
          <button class="cancel" @click="declineRequest">
            <Icon class="icon" icon="iconoir:cancel" />
            <span>Decline Tour</span>
          </button>
          <button class="pay" @click="approveRequest">
            <Icon class="icon" icon="charm:tick" />
            <span>Approve Tour</span>
          </button>
        </div>

        <!-- ============ Rent Request for Landlord ============ -->
        <div class="rent-container" v-else-if="role === 'landlord' && type === 'rent'">
          <button class="cancel" @click="declineRequest">
            <Icon class="icon" icon="iconoir:cancel" />
            <span>Decline Tenant</span>
          </button>
          <button class="pay" @click="approveRequest">
            <Icon class="icon" icon="charm:tick" />
            <span>Approve Tenant</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import { useNotificationStore } from '@/stores/notification';

export default {
  components: {
    Icon
  },
  props: {
    notification: Object,
    iconName: String,
    iconColor: String,
    type: String,
    role: String,
    status: String
  },
  methods: {
    payNow() {
      console.log('Proceed to payment');
      this.$emit('close');
    },
    approveRequest() {
      const notificationStore = useNotificationStore();
      const newNotif = {
        id: Date.now(),
        name: this.notification.name,
        description: `Your ${this.notification.type} request has been approved by the landlord.`,
        type: this.notification.type,
        status: 'Approved',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        imgUrl: this.notification.imgUrl
      };
      notificationStore.addNotification(newNotif);
      this.$emit('close');
    },
    declineRequest() {
      const notificationStore = useNotificationStore();
      const newNotif = {
        id: Date.now(),
        name: this.notification.name,
        description: `Your ${this.notification.type} request has been declined by the landlord.`,
        type: this.notification.type,
        status: 'Declined',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        imgUrl: this.notification.imgUrl
      };
      notificationStore.addNotification(newNotif);
      this.$emit('close');
    }
  },
  computed: {
    isTenant() {
      return this.role === 'tenant';
    },
    isLandlord() {
      return this.role === 'landlord';
    }
  },
  mounted() {
    console.log('Role:', this.role)
    console.log('Status:', this.status)
  }
};
</script>


<style scoped>
.status-card-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.status-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  padding-inline: 20px;
}

.status-card img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 10px;
  z-index: 999;
}

.detailContainer {
  display: flex;
  flex-direction: column;
  padding-inline: 20px;
}

.detail {
  display: flex;
  flex-direction: row;
  align-items: center;
}

p {
  margin-left: 10px;
  font-weight: bold;
  font-size: 17px;
}

.icon {
  width: 27px;
  height: 27px;
}

.button-group {
  margin-top: 20px;
  border-top: 1px solid lightgray;
  display: flex;
  justify-content: center;
  width: 100%;
}

.button-group button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 17px;
  padding-top: 15px;
}

.rent-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
