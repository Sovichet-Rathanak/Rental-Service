<template>
    <header>
        <combined-header></combined-header>
    </header>
    <main>
        <div class="homescreen-container">
            <banner-animate></banner-animate>
            <div class="property-container">
                <PropertyCard v-for="(listing, index) in listings" :key="listing.id" :data="{
                    id: listing.id,
                    title: listing.title,
                    price: '$' + listing.price_monthly + '/month',
                    khan: listing.region?.region_name ?? 'Unknown',
                    songkat: listing.songkat,
                    street: listing.street_address,
                    image: getThumbnailByIndex(index),
                    rating: listing.rating,
                }" />
            </div>
            <h3 style="font-weight: bold; font-size: 20px;">Continue Exploring Accommodations</h3>
            <button class="midlength-btn">Show More</button>
        </div>
    </main>
    <footer>
        <footer-component></footer-component>
    </footer>
</template>

<script>
import CombinedHeader from '@/components/headerComponents/CombinedHeader.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import BannerAnimate from '@/components/bannerComponents/Banner-Animate.vue';
import PropertyCard from '@/components/PropertyCard.vue';
import Rating from '@/components/DetailPageComponents/Rating_Comment.vue';
import { mapActions, mapState } from 'pinia';
import { useListingStore } from '@/stores/listing';
import { useWishlistStore } from '@/stores/wishlist';

export default {
    components: {
        CombinedHeader,
        FooterComponent,
        BannerAnimate,
        PropertyCard,
        Rating,
    },
    async mounted() {
        await this.fetchAllListingsWithImages();
        const wishlistStore = useWishlistStore();

        const user = JSON.parse(localStorage.getItem('user'));
        if(user?.id) {
            console.log('Setting userId in wishlist store:', user.id)
            wishlistStore.setUserId(user.id);
            await wishlistStore.fetchWishlist();
        }
    },
    computed: {
        ...mapState(useListingStore, ['listings', 'listingImages']),
    },
    methods: {
        ...mapActions(useListingStore, ['fetchAllListingsWithImages', 'getThumbnailByIndex']),
        ...mapActions(useWishlistStore, ['fetchWishlist'])
    }
}
</script>

<style scoped>
.homescreen-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -45px;
    background-color: white;
    border-radius: 55px 55px 0px 0px;
}

.property-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(355px, 355px));
    justify-content: center;
    align-items: start;
    gap: 35px;
    padding: 0px 200px 30px 200px;
    background-color: white;
    border-radius: 50px 50px 0px 0px;
    width: 100%;
    box-sizing: border-box;
}


.midlength-btn {
    background-color: black;
    font-weight: bold;
    color: white;
    width: 200px;
    height: 70px;
    border: 1px solid black;
    border-radius: 20px;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
}
</style>