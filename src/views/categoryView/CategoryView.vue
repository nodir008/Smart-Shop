<script setup>
import { useCategoryStore } from "@/stores/categorySingleStore";
import { useFavouriteStore } from "@/stores/favouriteStore";
import { useBasketStore } from "@/stores/basketStore";
import { useRoute } from "vue-router";;
import StarIcon from "@/assets/icons/StarIcon.vue";
import Heart2Icon from "@/assets/icons/Heart2Icon.vue";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import Basket2Icon from "@/assets/icons/Basket2Icon.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useOrderTimeStore } from "@/stores/orderTimeStore";
import { useOrderStore } from "@/stores/orderStore";

const route = useRoute();
const categoryStore = useCategoryStore();
const favouriteStore = useFavouriteStore();
const basketStore = useBasketStore();
const orderStore = useOrderStore();
const orderTimeStore = useOrderTimeStore();

categoryStore.getCategorySingle(route.params.category);

const calculateFormattedPrice = (price) => (price / 12).toFixed(0);
const calculateFormatted = (price, discountPercentage) => (price - (price / 100) * discountPercentage).toFixed(0);

const handleHeartClick = (item) => {
  favouriteStore.activeStates[item] = !favouriteStore.activeStates[item];
  favouriteStore.getAddFavPro(item);
};

const toastShownProducts = new Set();

const addToBasket = (til, item, itemText, itemImg) => {
  const quantity = 1;
  basketStore.getAddDrawerPro(item, quantity);
  if (toastShownProducts.has(item.id)) {
    return;
  }

  basketStore.toast(itemText, itemImg);

  const toastMessage = `<h3 class="toast-title">${til}</h3><div class="toast-description"><img class="toast-image" src="${basketStore.imgToast}" alt="Product Image" /> ${basketStore.descriptionToast}</div> `;
  toast(toastMessage, {
    "theme": "auto",
    "type": "default",
    "closeOnClick": false,
    "autoClose": 1000,
    "hideProgressBar": true,
    "dangerouslyHTMLString": true,
    "limit": 5
  });
  
  toastShownProducts.add(item.id);
  
  setTimeout(() => {
    toastShownProducts.delete(item.id);
  }, 3000); 
};

const isActiveCard = (itemId) => {
  let isActive = false;
  orderStore.orders.forEach((element) => {
    if (element.id === itemId && element.stock === element.quantity) {
      isActive = true;
    }
  });

  orderTimeStore.ordersTime.forEach((element) => {
    if (element.id === itemId && element.stock === element.quantity) {
      isActive = true;
    }
  });

  return isActive;
};

</script>

<template>
  <div class="category">
    <div class="container">
      <h1 class="category-title">{{ route.params.category }}</h1>
      <div class="category__cards">
        <div
          class="card "
          :class="{ active: isActiveCard(item.id)}"
          v-for="item in categoryStore.category"
          :key="item.id"
        >
          <RouterLink :to="'/product/' + item.id">
            <img :src="item.thumbnail" alt="" />
          </RouterLink>
          <div class="card__active2 " :class="{ active: isActiveCard(item.id)  }"><span>Mahsulot mavjud emas</span></div>
          <div class="card__theme">
            <button class="card__icons-btnh" @click="handleHeartClick(item)">
              <HeartIcon class="card__icons-btnh-1" v-if="!favouriteStore.activeStates[item?.id]" />
              <Heart2Icon class="card__icons-btnh-2" v-else />
            </button>
            <h3 class="card__theme-title">{{ item.title }}</h3>
            <div class="card__theme-rating-div">
              <p class="card__theme-rating"><StarIcon />{{ item.rating }}</p>
              <span class="card__theme-sale">-{{ item.discountPercentage.toFixed(0) }}% Sale</span>
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
              <button class="card__icons-btnb" @click="addToBasket($t('fixed__theme-title-2'), item, item.title, item.thumbnail)">
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
