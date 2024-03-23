<script setup>
import UserIcon from "@/assets/icons/UserIcon.vue";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import BasketIcon from "@/assets/icons/BasketIcon.vue";
import HomeIcon from "@/assets/icons/HomeIcon.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
</script>

<template>
    <div class="bottoms">
        <div class="container">
            <RouterLink class="bottoms__link" to="/">
              <HomeIcon class="bottoms__icon" /> {{ $t("bottoms__link-1") }}
            </RouterLink>
            <RouterLink class="bottoms__link" to="/">
                <SearchIcon class="bottoms__icon" /> {{ $t("bottoms__link-2") }}
            </RouterLink>
            <RouterLink class="bottoms__link" to="/favourite">
              <HeartIcon class="bottoms__icon" /> {{ $t("bottoms__link-3") }}
            </RouterLink>
            <RouterLink to="/drawer" class="bottoms__link" @click="openDrawer = true">
              <BasketIcon class="bottoms__icon" /> {{ $t("bottoms__link-4") }}
            </RouterLink>
            <RouterLink class="bottoms__link" to="/login">
                <UserIcon class="bottoms__icon" /> {{ $t("bottoms__link-5") }}
            </RouterLink>
        </div>
    </div>
</template>
