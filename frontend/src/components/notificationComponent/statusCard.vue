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

      <div v-if="notification.status === 'pending'" class="button-group">
        <!-- ================= Tour Tenant ================= -->
        <div class="rent-container" v-if="notification.role === 'tenant' && notification.type === 'tour'">
          <button class="cancel" @click="cancelRequest">
            <Icon class="icon" icon="iconoir:cancel" />
            <span>Cancel {{ notification.type === 'tour' ? 'tour' : 'request' }}</span>
          </button>
        </div>

        <!-- ================= Rent Tenant ================= -->
        <div class="rent-container" v-if="notification.role === 'tenant' && notification.type === 'rent'">
          <button v-if="notification.type === 'rent'" class="pay" @click="payNow">
            <Icon class="icon" icon="uiw:pay" @click="payNow"/>
            <span>Pay now</span>
          </button>
        </div>

        <!-- ============ Tour Request for Landlord ============ -->
        <div class="rent-container" v-if="notification.role === 'landlord' && notification.type === 'tour'">
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
        <div class="rent-container" v-else-if="notification.role === 'landlord' && notification.type === 'rent'">
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
import axios from 'axios';
import { useUserStore } from '@/stores/user';
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
    async approveRequest() {
      const store = useNotificationStore();
      try {
        await store.performAction(this.notification.id, 'approve');
        alert('Request approved.');
        this.$emit('close');
      } catch (error) {
        console.error(error);
        alert('Failed to approve request.');
      }
    },
    async declineRequest() {
      const store = useNotificationStore();
      try {
        await store.performAction(this.notification.id, 'decline');
        alert('Request declined.');
        this.$emit('close');
      } catch (error) {
        console.error(error);
        alert('Failed to decline request.');
      }
    },
    async payNow() {
      const store = useNotificationStore();
      try {
        await store.performAction(this.notification.id, 'pay');
        alert('Payment successful.');
        this.$emit('close');
      } catch (error) {
        console.error(error);
        alert('Failed to process payment.');
      }
    },
    async cancelRequest() {
      const store = useNotificationStore();
      try {
        await store.performAction(this.notification.id, 'cancel');
        alert('Request cancelled.');
        this.$emit('close');
      } catch (error) {
        console.error(error);
        alert('Failed to cancel request.');
      }
    }
  },
  computed: {
    isTenant() {
      return this.notification.role === 'tenant';
    },
    isLandlord() {
      return this.notification.role === 'landlord';
    }
  },
  mounted() {
    console.log('Role:', this.notification.role)
    console.log('Status:', this.notification.status)
    console.log('Type:', this.notification.type)
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
