<script setup>
import { createI18n } from 'vue-i18n'
import { ref, defineProps, watch, onMounted } from "vue";
import { useFavouriteStore } from "@/stores/favouriteStore";
import { useBasketStore } from "@/stores/basketStore";
import StarIcon from "@/assets/icons/StarIcon.vue";
import Heart2Icon from "@/assets/icons/Heart2Icon.vue";
import Basket2Icon from "@/assets/icons/Basket2Icon.vue";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

onMounted(() => {
  window.scrollTo(0, 0);
});
const basketStore = useBasketStore();
const favouriteStore = useFavouriteStore();
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const calculateFormattedPrice = (price) => {
  return (price / 12).toFixed(0);
};

const calculateFormatted = () => {
  const discountedPrice =
    props.card.price - (props.card.price / 100) * props.card.discountPercentage;
  return discountedPrice.toFixed(0);
};

const handleHeartClick = () => {
  favouriteStore.activeStates[props.card.id] =
    !favouriteStore.activeStates[props.card.id];
  favouriteStore.getAddFavPro(props.card.id);
};
const toastShownProducts = new Set();

const toggleBasket = (til) => {
  const quantity = 1;
  basketStore.getAddDrawerPro(props.card.id, quantity);
  if (toastShownProducts.has(props.card.id)) {
    return;
  }
  
  basketStore.toast(props.card.title, props.card.thumbnail);

  const toastMessage = `<h3 class="toast-title">${til}</h3><div class="toast-description"><img class="toast-image" src="${basketStore.imgToast}" alt="Product Image" /> ${basketStore.descriptionToast}</div> `;
  toast(toastMessage, {
    "theme": "auto",
    "type": "default",
    "closeOnClick": false,
    // "pauseOnFocusLoss": false,
    "autoClose": 1000,
    "hideProgressBar": true,
    "dangerouslyHTMLString": true,
    "limit": 5
  });

  toastShownProducts.add(props.card.id);

  setTimeout(() => {
    toastShownProducts.delete(props.card.id);
  }, 3000); 
};



const scrollToTop = (cardId) => {
 // window.scrollTo(0, 0);
} 

</script>

<template>
  <div class="card">
    <RouterLink @click="scrollToTop(card.id)" :to="'/product/' + card.id"><img :src="card.thumbnail" alt="" /></RouterLink>
    <div class="card__theme">
      <h3 class="card__theme-title">{{ card.title }}</h3>
      <div class="card__theme-rating-div">
        <p class="card__theme-rating">
          <StarIcon />{{ card.rating }}
        </p>
        <span class="card__theme-sale">-{{ card.discountPercentage.toFixed(0) }}% Sale</span>
      </div>
      <p class="card__theme-nation">
        {{
          $t("card__theme-nation")
        }} {{ calculateFormattedPrice(card.price) }} $
      </p>
      <p class="card__theme-price">
        {{ $t("card__theme-price") }} {{ card.price }}$
      </p>

      <button class="card__icons-btnh" @click="handleHeartClick">
        <HeartIcon class="card__icons-btnh-1" v-if="!favouriteStore.activeStates[card.id]" />
        <Heart2Icon class="card__icons-btnh-2" v-else />
      </button>
      <div class="card__icons">
        <p class="card__theme-newprice">
          {{ $t("card__theme-newprice") }} {{ calculateFormatted() }}$
        </p>

        <button class="card__icons-btnb" @click="toggleBasket($t('fixed__theme-title-2'))">
          <Basket2Icon class="card__icons-btnb-basketicon" />
        </button>
      </div>
    </div>
  </div>
</template>
