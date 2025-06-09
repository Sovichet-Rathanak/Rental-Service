<template>
    <header>
        <combined-header></combined-header>
    </header>
    <main>
        <div class="homescreen-container">
            <banner-animate></banner-animate>
            <div class="property-container">
                <property-card v-for="property in propertyList" :key="property.id" :data="property" />
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

export default {
    components: {
        CombinedHeader,
        FooterComponent,
        BannerAnimate,
        PropertyCard,
        Rating,
    },
    data() {
        return {
            propertyList: [
                { id: 1, title: 'Room in BKK1', price: '$3000/month', rating: '4.5', location: 'BKK1, Chbar Ampov, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 2, title: 'Studio BKK1', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 3, title: 'Modern Flat BKK1', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 4, title: 'Cozy Room in BKK1', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 5, title: 'Elegant BKK1 Apt', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 6, title: 'Spacious BKK1', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 7, title: 'Stylish Unit BKK1', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 8, title: 'Bright Apt in BKK1', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 9, title: 'New Room BKK1', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 10, title: 'Luxury BKK1 Stay', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 11, title: 'Affordable Room', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 12, title: 'Quiet BKK1 Flat', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 13, title: 'Simple Space BKK1', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
                { id: 14, title: 'Top Floor BKK1', price: '$3000/month', rating: '4.5', location: 'BKK1, Chamkarmon, Phnom Penh', image: '/src/assets/images/property_images/property1.jpeg' },
            ]

        }
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
    align-items: center;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    background-color: white;
    gap: 35px;
    padding: 0px 200px 30px 200px;
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