<script setup>
import { ref, defineProps } from "vue";
import { useBasketStore } from "@/stores/basketStore";
import { useProductSingleStore } from "@/stores/productSingleStore";
const productSingleStore = useProductSingleStore();
const props = defineProps({
  productQuantity: Number,
});

const basketStore = useBasketStore();
console.log(basketStore.drawer);
</script>

<template>
  <div class="fixed" :class="{ active: basketStore.isBasketActive }">
    <!-- <div v-for="(item, i) in basketStore.drawer" :key="i"> -->
      <img
        class="fixed__img"
        :src="basketStore.imgToast"
        alt=""
      />
      <div class="fixed__theme">
        <div class="fixed__theme-top">
          <h3 class="fixed__theme-title">{{ $t("fixed__theme-title") }}</h3>
          <p class="fixed__theme-x" @click="basketStore.changeActive(false)">
            X
          </p>
        </div>
        <div class="fixed__theme-bottom">
          <p class="fixed__theme-text">
            {{  basketStore.descriptionToast}}
            <span v-if="productQuantity > 1">x {{ productQuantity }}</span>
          </p>
          <RouterLink to="/drawer" class="fixed__theme-drawer">
            {{ $t("fixed__theme-drawer") }}
          </RouterLink>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<style scoped>
.fixed {
  position: fixed;
  top: 31px;
  right: 200px;
  z-index: -1;
  width: 600px;
  min-height: 100px;
  border: 1px solid black;
  background: #fff;
  opacity: 0;
  transform: translateX(100px);
  transition: 0.5s;
  display: flex;
  gap: 20px;
  padding: 5px 10px;
}

.fixed.active {
  opacity: 1;
  transform: translateX(0);
  z-index: 10;
}

.fixed__img {
  height: 100px;
  width: 100px;
  object-fit: cover;
}

.fixed__theme-title {
  font-size: 16px;
  color: #5e5e5e;
}

.fixed__theme-top {
  display: flex;
  justify-content: space-between;
}

.fixed__theme {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
}

.fixed__theme-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.fixed__theme-text {
  font-size: 14px;
  width: 290px;
}

.fixed__theme-drawer {
  font-size: 18px;
  font-weight: 700;
  color: #7000ff
}

.fixed__theme-text span {
  font-weight: 700;
}

.fixed__theme-x {
  font-size: 16px;
  cursor: pointer;
}
</style>
