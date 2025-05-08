<template>
    <div class="swiper bannerContainer">
        <div class="swiper-wrapper">
            <Banner class="swiper-slide" :imgUrl="img1" />
            <Banner class="swiper-slide" :imgUrl="img2" />
            <Banner class="swiper-slide" :imgUrl="img3" />
            <Banner class="swiper-slide" :imgUrl="img1" />
            <Banner class="swiper-slide" :imgUrl="img2" />
            <Banner class="swiper-slide" :imgUrl="img3" />
        </div>

        <div class="swiper-pagination"></div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Banner from './Banner.vue';
import Swiper from 'swiper/bundle'; 
import 'swiper/css/bundle';

export default {
    name: "banner-animate",
    components: {
        Banner,
    },
    data() {
        return {
        img1: new URL('@/assets/images/banner/img1.jpg', import.meta.url).href,
        img2: new URL('@/assets/images/banner/img2.jpg', import.meta.url).href,
        img3: new URL('@/assets/images/banner/img3.jpg', import.meta.url).href,
        };
    },
    mounted() {
        new Swiper('.swiper', {
        direction: 'horizontal', 
        loop: true,
        slidesPerView: 'auto',

        //adding space between each banner
        spaceBetween: 30,

        autoplay: {
            delay: 3000,  //add auto transition every 3secs
            disableOnInteraction: false,  //continue autoplay even after interact with pagination and btns
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        });
    },
};
</script>

<style scoped>
.bannerContainer {
    width: 1300px;  
    margin: 70px 0px;
    display: flex;
    justify-content: center;
}

/*opacity for btn 0 only visible when hover*/
.swiper-button-prev, .swiper-button-next {
    opacity: 0; 
    transition: opacity 0.5s ease-in-out; 
    color: gray;
}

.bannerContainer:hover .swiper-button-prev,
.bannerContainer:hover .swiper-button-next {
    opacity: 1;
}

.swiper-wrapper {
    display: flex;
}

.swiper-slide {
    display: flex;
    justify-content: center;
}

/*get original image height and width*/
img {
    max-width: 100%;
    height: auto;
}
</style>
