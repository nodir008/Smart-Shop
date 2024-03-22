<script setup>
import UserIcon from "@/assets/icons/UserIcon.vue";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import BasketIcon from "@/assets/icons/BasketIcon.vue";


</script>

<template>
<div class="bottoms">
  <div class="container">
        <RouterLink class="nav__pages-user" to="/">
        <p>Home</p>
        </RouterLink>

        <RouterLink class="nav__pages-user" to="/login">
          <UserIcon />
        </RouterLink>
        <RouterLink class="nav__pages-favourites" to="/favourite">
          <HeartIcon />
        </RouterLink>

        <RouterLink
          to="/drawer"
          class="nav__pages-basket"
          @click="openDrawer = true"
        >
          <BasketIcon />
        </RouterLink>
  </div>
</div>
</template>