<template>
  <router-view></router-view>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useUserStore } from './stores/user';

export default {
  async mounted() {
    try {
      await this.fetchCurrentUser();
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapActions(useUserStore, ['fetchCurrentUser'])
  },
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