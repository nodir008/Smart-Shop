<script setup>
import HomeView from "../views/homeView/HomeView.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import { carusel1, carusel2, carusel3, carusel4, carusel5, carusel6, carusel7 } from "@/helpers/images";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import "swiper/css";
const photos = [carusel1, carusel2, carusel3, carusel4, carusel5, carusel6, carusel7];
</script>

<template>
    <header class="header">
        <div class="container">
            <Swiper
                :style="{
                    '--swiper-pagination-color': 'red',
                }"
                class="slide"
                :modules="[Autoplay, Pagination]"
                :grabCursor="true"
                :loop="true"
                :autoplay="{ delay: 5000 }"
                :pagination="{
                    clickable: true,
                }"
            >
                <SwiperSlide v-for="(photo, i) in photos" :key="i">
                    <!-- <img class="header__img" :src="`src/assets/images/${photo}`" alt="" /> -->
                    <img class="header__img" :src="photo" alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    </header>
    <HomeView />
</template>

<style>
.header__img {width: 100%;}
</style>