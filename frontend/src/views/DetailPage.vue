<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>
    <div class="main-container">
        <!-- ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. Components goes here ˚. ✦.˳·˖✶ ⋆.✧̣̇˚. -->
        <AccommadationImg></AccommadationImg>
        <Calendar_section :listingId="listingId" :tenantId="tenantId" />
        <Rating></Rating>
        <h1 style="font-weight: bold; margin: 50px 0px 30px 0px;">Where you'll be</h1>
        <div class="map-container">
            <MapComponent></MapComponent>
        </div>
        <HostInfoSection></HostInfoSection>
    </div>
    <footer>
        <FooterComponent></FooterComponent>
    </footer>
</template>

<script>
import AccommadationImg from '@/components/AccommadationImg.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import HostInfoSection from '@/components/HostInfoSection.vue';
import Rating from '@/components/DetailPageComponents/Rating_Comment.vue';
import MapComponent from '@/components/MapComponent.vue';
import Calendar_section from '@/components/DetailPageComponents/calendar_section.vue';
import { useBookingStore } from "@/stores/booking";
import { mapActions, mapState } from "pinia";

export default {
    components: {
        HeaderNav2,
        FooterComponent,
        AccommadationImg,
        HostInfoSection,
        Rating,
        MapComponent,
        Calendar_section
    },
    
    data() {
    return {
      tenantId: 'be31efbe-80a9-4b85-88b0-52b5bb48aeac' ,
      listingId: '2f285e02-48ae-4782-be51-15d1c02c7cc3'
    //   listingId: route.params.id
    };
  },
  computed: {
    ...mapState(useBookingStore, ["bookings"])
  },
  methods: {
    ...mapActions(useBookingStore, [
      "updateBookingField"
    ]),
  }
  
}
</script>

<style scoped>
.main-container {
    padding-inline: 250px;
    min-height: 100vh;
}

.map-container {
    width: 100%;
    height: 500px;
    overflow: hidden;
    border-radius: 20px;
    background-color: grey;
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
