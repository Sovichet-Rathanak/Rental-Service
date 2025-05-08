<template>
    <div class="container" @click="toggleStatusCard">
      <div class="imgText">
        <img :src="imgUrl" alt="pfp" />
        <div class="textGr">
          <h2 class="name">{{ name }}</h2>
          <span class="description">{{ description }}</span>
        </div>
      </div>
  
      <div class="iconGr">
        <h2 class="date">{{ date }}</h2>
        <Icon 
          class="icon"
          :icon="iconName"
          :color="iconColor"
        />
      </div>
  

    </div>      
    <StatusCard
        v-if="showCard"
        :notification="selectedNotification"
        :icon-name="iconName"
        :icon-color="iconColor"
        @close="showCard = false"
    />
</template>
  
<script>
import { Icon } from '@iconify/vue';
import StatusCard from './statusCard.vue';

export default {
    name: 'notiComponent',
    components: {
        Icon,
        StatusCard
    },
    props: {
        imgUrl: String,
        name: String,
        description: String,
        date: String,
        iconName: {
            type: String,
            default: 'mdi:bell'
        },
        iconColor: {
            type: String,
            default: 'green'
        },
    },
    data() {
        return {
            showCard: false,
            selectedNotification: null
        };
    },
    computed: {
        status() {
            if (this.iconName === 'teenyicons:tick-circle-solid') {
                return "Approved";
            } else if (this.iconName === 'gridicons:cross-circle') {
                return "Declined";
            } else {
                return "Pending";
            }
        }
    },
    methods: {
        toggleStatusCard() {
        this.selectedNotification = {
            propertyName: "Cozy Apartment in Toul Kork",
            requestedDate: this.date,
            status: this.status
        };
        this.showCard = !this.showCard;
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
