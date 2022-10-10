<template>
    <div class="custom-swiper">
        <swiper
            :slidesPerView="1"
            :cssMode="true"
            :navigation="true"
            :loop="true"
            :pagination="{
                clickable: true
            }"
            :mousewheel="true"
            :keyboard="true"
            :autoplay="{
                delay: 2500,
                disableOnInteraction: false
            }"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide v-for="(item, index) in imgList" :key="index">
                <img :src="item.url" alt="" />
            </swiper-slide>
        </swiper>
    </div>
</template>
<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard } from 'swiper'

const modules = [Autoplay, Navigation, Pagination, Mousewheel, Keyboard]

const imgList = ref([
    {
        url: new URL('../../assets/testimg/1.jpeg', import.meta.url).href
    },
    {
        url: new URL('../../assets/testimg/2.jpeg', import.meta.url).href
    },
    {
        url: new URL('../../assets/testimg/3.jpeg', import.meta.url).href
    }
])
</script>
<style scoped lang="scss">
.custom-swiper {
    margin-top: 2px;
    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 300px;
        // height: 100%;
        object-fit: cover;
        object-position: 50% 50%;
    }
}
</style>
