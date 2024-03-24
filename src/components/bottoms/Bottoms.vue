<script setup>
import UserIcon from "@/assets/icons/UserIcon.vue";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import BasketIcon from "@/assets/icons/BasketIcon.vue";
import HomeIcon from "@/assets/icons/HomeIcon.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import Katalog from "../katalog/Katalog.vue";
import { ref, onMounted } from "vue";

const katalog = ref(false);
const activeLink = ref(""); // hold the active link

// Checking localStorage for previously stored active link on page load
onMounted(() => {
    const storedLink = localStorage.getItem("activeLink");
    if (storedLink) {
        activateLink(storedLink);
    }
});

function activateLink(link) {
    activeLink.value = link;
    localStorage.setItem("activeLink", link); // Save the active link to localStorage
    if (link === "search") {
        katalog.value = true; // if link is 'search', set katalog to true
    } else {
        katalog.value = false; // for other links, set katalog to false
    }
    window.scrollTo(0, 0); // Sahifani tepaga qaytarish
}
</script>

<template>
    <div class="bottoms">
        <div class="container">
            <RouterLink @click="activateLink('home')" :class="{ active: activeLink === 'home' }" class="bottoms__link" to="/">
                <HomeIcon class="bottoms__icon" /> {{ $t("bottoms__link-1") }}
            </RouterLink>
            <button @click="activateLink('search')" :class="{ active: activeLink === 'search' }" class="bottoms__link"><SearchIcon class="bottoms__icon" /> {{ $t("bottoms__link-2") }}</button>
            <RouterLink @click="activateLink('favourite')" :class="{ active: activeLink === 'favourite' }" class="bottoms__link" to="/favourite">
                <HeartIcon class="bottoms__icon" /> {{ $t("bottoms__link-4") }}
            </RouterLink>
            <RouterLink @click="activateLink('drawer')" :class="{ active: activeLink === 'drawer' }" class="bottoms__link" to="/drawer">
                <BasketIcon class="bottoms__icon" /> {{ $t("bottoms__link-3") }}
            </RouterLink>
            <RouterLink @click="activateLink('login')" :class="{ active: activeLink === 'login' }" class="bottoms__link" to="/login">
                <UserIcon class="bottoms__icon" /> {{ $t("bottoms__link-5") }}
            </RouterLink>
        </div>
    </div>
    <Transition name="katalog-transition">
        <Katalog v-show="katalog" @closeKatalog="katalog = false" />
    </Transition>
</template>
