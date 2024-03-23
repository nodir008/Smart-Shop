<script setup>
import Heart2Icon from "@/assets/icons/Heart2Icon.vue";
import Basket2Icon from "@/assets/icons/Basket2Icon.vue";
import StarIcon from "@/assets/icons/StarIcon.vue";
import { ref } from "vue";
import { useFavouriteStore } from "@/stores/favouriteStore";
import { useBasketStore } from "@/stores/basketStore";
const basketStore = useBasketStore()


const favouriteStore = useFavouriteStore()

const calculateFormattedPrice = (price) => {
  return (price / 12).toFixed(0);
};

const calculateFormatted = (item) => {
  const discountedPrice =
    item.price - (item.price / 100) * item.discountPercentage;
  return discountedPrice.toFixed(0);
};

const show = ref(true);

const toggleShow = () => {
  favouriteStore.removeFavProduct()
  show.value = !show.value;
};

const toggleBasket = (favouritesId) => {
    const quantity = 1; // or any other default quantity
    basketStore.getAddDrawerPro(favouritesId, quantity);
    // basketStore.changeActive(true)
};
</script>

<template>
  <div class="favourite">
    <div class="container">
      <div v-if="favouriteStore.favourites.length === 0" class="no__favorites">
        <h2 class="no__favorites-title">
          {{ $t('no__favorites-title') }}
        </h2>
        <p class="no__favorites-text">
            {{ $t('no__favorites-text') }} 
        </p>
        <RouterLink to="/" class="no__product-link">{{ $t('no__product-link') }}</RouterLink>  
      </div>
      <div class="favourite-div">
        <h1 class="favourite__cards-title" v-if="favouriteStore.favourites.length > 0">{{ $t('favourite__cards-title') }}</h1>
        <div class="favourite__cards">
            <div class="favourite__card" v-for="item in favouriteStore.favourites"
          :key="item.id">
              <RouterLink :to="'/product/' + item.id"><img :src="item.thumbnail" alt="" /></RouterLink>
              <div class="favourite__card__theme">
                <h3 class="favourite__card__theme-title">{{ item.title }}</h3>
                <div class="favourite__card__theme-rating-div">
                  <p class="favourite__card__theme-rating"><StarIcon />{{ item.rating }}</p>
                  <!-- <span class="favourite__card__theme-sale">-{{ item.discountPercentage.toFixed(0) }}% Sale</span> -->
                  <span class="favourite__card__theme-sale">-{{ item.discountPercentage.toFixed(0) }}% Sale</span>
                </div>
                <p class="favourite__card__theme-nation">{{ calculateFormattedPrice(item.price) }} $/{{ $t('card__theme-nation') }}</p>
                <p class="favourite__card__theme-price">{{ $t('card__theme-price') }} {{ item.price }} $</p>
                <p class="favourite__card__theme-newprice">{{ $t('card__theme-newprice') }} {{ calculateFormatted(item) }} $</p>

                <button
                  class="favourite__card__icons-btnh active"
                  @click="favouriteStore.removeFavProduct(item.id)"
                >
                  <Heart2Icon />
                </button>
                <div class="favourite__card__icons">
                  <p class="favourite__card__icons-text">{{ $t('card__icons-text') }}</p>
                  <button class="favourite__card__icons-btnb" @click="toggleBasket(item.id)">
                    <Basket2Icon
                      class="favourite__card__icons-btnb-basketicon"
                    />
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
