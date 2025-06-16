<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from './stores/user';

export default {
  async mounted() {
    try {
      await this.fetchCurrentUser();
      console.log(this.user)
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapActions(useUserStore, ['fetchCurrentUser'])
  }
}
</script>

<style>
@font-face {
  font-family: "Airbnb Font";
  src: url(assets/fonts/airbnb_font/AirbnbCereal_W_Bk.otf);
}

* {
  font-family: 'Airbnb Font';
}
</style>