<script setup>
import { useCategoryStore } from "@/stores/categorySingleStore";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useFavouriteStore } from "@/stores/favouriteStore";
import StarIcon from "@/assets/icons/StarIcon.vue";
import Heart2Icon from "@/assets/icons/Heart2Icon.vue";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import Basket2Icon from "@/assets/icons/Basket2Icon.vue";
import { useBasketStore } from "@/stores/basketStore";
const basketStore = useBasketStore()

const route = useRoute();
const favouriteStore = useFavouriteStore()
const categoryStore = useCategoryStore();
categoryStore.getCategorySingle(route.params.category);

const calculateFormattedPrice = (price) => {
  return (price / 12).toFixed(0);
};

const calculateFormatted = (price, discountPercentage) => {
  const discountedPrice = price - (price / 100) * discountPercentage;
  return discountedPrice.toFixed(0);
};

const handleHeartClick = (itemId) => {
  favouriteStore.activeStates[itemId] = !favouriteStore.activeStates[itemId]
  favouriteStore.getAddFavPro(itemId)
};

const toggleBasket = (itemId) => {
    const quantity = 1;
    basketStore.getAddDrawerPro(itemId, quantity);
};

const scrollToTop = () => {
    window.scrollTo(0, 0);
};
</script>

<template>
  <div class="category">
    <div class="container">
      <h1 class="category-title">{{ route.params.category }}</h1>
      <div class="category__cards">
        <div
          class="card"
          v-for="item in categoryStore.category"
          :key="item.id"
          :card="item"
        >
          <RouterLink @click="scrollToTop" :to="'/product/' + item.id"
            ><img :src="item.thumbnail" alt=""
          /></RouterLink>
          <div class="card__theme">
            <button class="card__icons-btnh" @click="handleHeartClick(item.id)">
              <HeartIcon class="card__icons-btnh-1" v-if="!favouriteStore.activeStates[item?.id] " />
              <Heart2Icon class="card__icons-btnh-2" v-else />
            </button>
            <h3 class="card__theme-title">{{ item.title }}</h3>
            <div class="card__theme-rating-div">
              <p class="card__theme-rating"><StarIcon />{{ item.rating }}</p>
              <span class="card__theme-sale"
                >-{{ item.discountPercentage.toFixed(0) }}% Sale</span
              >
            </div>
            <p class="card__theme-nation">
              {{ calculateFormattedPrice(item.price) }} $/{{ $t('card__theme-nation') }}
            </p>
            <p class="card__theme-price">{{ $t('card__theme-price') }} {{ item.price }}$</p>
            <p class="card__theme-newprice">
              {{ $t('card__theme-newprice') }}
              {{ calculateFormatted(item.price, item.discountPercentage) }}$
            </p>
            <div class="card__icons">
              <p class="card__icons-text">{{ $t('card__icons-text') }} </p>
              <button class="card__icons-btnb" @click="toggleBasket(item.id)">
                <Basket2Icon class="card__icons-btnb-basketicon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.category__cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.category-title {
  font-size: 30px;
  margin: 30px 0;
  text-transform: capitalize;
}

.category__cards {
  margin-bottom: 100px;
}
</style>
