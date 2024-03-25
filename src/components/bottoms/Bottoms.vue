<script setup>
import UserIcon from "@/assets/icons/UserIcon.vue";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import BasketIcon from "@/assets/icons/BasketIcon.vue";
import HomeIcon from "@/assets/icons/HomeIcon.vue";
import Heart2Icon from "@/assets/icons/Heart2Icon.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import Katalog from "../katalog/Katalog.vue";
import Kabinet from "../kabinet/Kabinet.vue";
import { ref, onMounted } from "vue";
import { useBasketStore } from "@/stores/basketStore";
import { useFavouriteStore } from "@/stores/favouriteStore";
import { useRoute } from "vue-router";

const route = useRoute();
const basketStore = useBasketStore();
const favouriteStore = useFavouriteStore();
const katalog = ref(false);
const kabinet = ref(false);
const activeLink = ref("");

onMounted(() => {
    const storedLink = localStorage.getItem("activeLink");
    if (storedLink) {
        activateLink(storedLink);
    }
});

function activateLink(link) {
    if (link !== "login") {
        localStorage.setItem("activeLink", link);
    }
    activeLink.value = link;
    katalog.value = link === "search";
    kabinet.value = link === "login";
    window.scrollTo(0, 0);
}

function closeKatalog() {
    katalog.value = false;
    kabinet.value = false;
}
</script>

<template>
    <div class="bottoms">
        <div class="container">
            <RouterLink @click="activateLink('')" :class="{ active: route.fullPath === '/' && !katalog && !kabinet}" class="bottoms__link" to="/">
                <HomeIcon class="bottoms__icon" /> {{ $t("bottoms__link-1") }}
            </RouterLink>
            <button @click="activateLink('search')" :class="{ active: katalog }" class="bottoms__link"><SearchIcon class="bottoms__icon" /> {{ $t("bottoms__link-2") }}</button>
            <RouterLink @click="activateLink('favourite')" :class="{ active: route.fullPath === '/favourite' && !katalog && !kabinet }" class="bottoms__link" to="/favourite">
                <HeartIcon v-if="favouriteStore.favourites.length == 0" class="bottoms__icon" />
                <Heart2Icon v-else class="bottoms__icon" />
                {{ $t("bottoms__link-4") }}
            </RouterLink>
            <RouterLink @click="activateLink('drawer')" :class="{ active: activeLink === 'drawer' }" class="bottoms__link bottoms__link-drawer" to="/drawer">
                <BasketIcon class="bottoms__icon" /> {{ $t("bottoms__link-3") }}
                <span class="bottoms__icon-span" v-if="basketStore.drawer.length">{{ basketStore.drawer.length }}</span>
            </RouterLink>
            <button @click="activateLink('login')" :class="{ active: kabinet }" class="bottoms__link"><UserIcon class="bottoms__icon" /> {{ $t("bottoms__link-5") }}</button>
        </div>
    </div>
    <Transition name="katalog-transition">
        <Katalog v-show="katalog" @closeKatalog="closeKatalog" />
    </Transition>
    <Transition name="kabinet-transition">
        <Kabinet v-show="kabinet" @closeKatalog="closeKatalog"  />
    </Transition>
</template>
