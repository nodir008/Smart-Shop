<script setup>
import Heart2Icon from "@/assets/icons/Heart2Icon.vue";
import Basket2Icon from "@/assets/icons/Basket2Icon.vue";
import StarIcon from "@/assets/icons/StarIcon.vue";
import { useFavouriteStore } from "@/stores/favouriteStore";
import { useBasketStore } from "@/stores/basketStore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const basketStore = useBasketStore();
const favouriteStore = useFavouriteStore();

const calculateFormattedPrice = (price) => (price / 12).toFixed(0);

const calculateFormatted = (item) =>
  (item.price - (item.price / 100) * item.discountPercentage).toFixed(0);

const toastShownProducts = new Set();

const toggleBasket = (favouritesId, favouritesText, favouritesImg, til) => {
  const quantity = 1;
  basketStore.getAddDrawerPro(favouritesId, quantity);
  // Check if the toast message has already been shown for this product
  if (toastShownProducts.has(favouritesId)) {
    // If yes, return without doing anything
    return;
  }

  console.log(favouritesId);
  basketStore.toast(favouritesText, favouritesImg);
  const toastMessage = `<h3 class="toast-title">${til}</h3><div class="toast-description"><img class="toast-image" src="${basketStore.imgToast}" alt="Product Image" /> ${basketStore.descriptionToast}</div> `;
  toast(toastMessage, {
    theme: "auto",
    type: "default",
    closeOnClick: false,
    autoClose: 1000,
    hideProgressBar: true,
    dangerouslyHTMLString: true,
    limit: 5,
  });

  // Add the product ID to the set to mark that the toast message has been shown for this product
  toastShownProducts.add(favouritesId);

  // Clear the toastShownProducts set after showing toast for the current product
  setTimeout(() => {
    toastShownProducts.delete(favouritesId);
  }, 5000);
};
</script>


<template>
  <div class="favourite">
    <div class="container">
      <div v-if="favouriteStore.favourites.length === 0" class="no__favorites">
        <h2 class="no__favorites-title">
          {{ $t("no__favorites-title") }}
        </h2>
        <p class="no__favorites-text">
          {{ $t("no__favorites-text") }}
        </p>
        <RouterLink to="/" class="no__product-link">{{
          $t("no__product-link")
        }}</RouterLink>
      </div>
      <div class="favourite-div">
        <h1
          class="favourite__cards-title"
          v-if="favouriteStore.favourites.length > 0"
        >
          {{ $t("favourite__cards-title") }}
        </h1>
        <div class="favourite__cards">
          <div
            class="favourite__card"
            v-for="item in favouriteStore.favourites"
            :key="item.id"
          >
            <RouterLink :to="'/product/' + item.id"
              ><img :src="item.thumbnail" alt=""
            /></RouterLink>
            <div class="favourite__card__theme">
              <h3 class="favourite__card__theme-title">{{ item.title }}</h3>
              <div class="favourite__card__theme-rating-div">
                <p class="favourite__card__theme-rating">
                  <StarIcon />{{ item.rating }}
                </p>
                <!-- <span class="favourite__card__theme-sale">-{{ item.discountPercentage.toFixed(0) }}% Sale</span> -->
                <span class="favourite__card__theme-sale"
                  >-{{ item.discountPercentage.toFixed(0) }}% Sale</span
                >
              </div>
              <p class="favourite__card__theme-nation">
                {{ calculateFormattedPrice(item.price) }} $/{{
                  $t("card__theme-nation")
                }}
              </p>
              <p class="favourite__card__theme-price">
                {{ $t("card__theme-price") }} {{ item.price }} $
              </p>
              <p class="favourite__card__theme-newprice">
                {{ $t("card__theme-newprice") }}
                {{ calculateFormatted(item) }} $
              </p>

              <button
                class="favourite__card__icons-btnh active"
                @click="favouriteStore.removeFavProduct(item.id)"
              >
                <Heart2Icon />
              </button>
              <div class="favourite__card__icons">
                <p class="favourite__card__icons-text">
                  {{ $t("card__icons-text") }}
                </p>
                <button
                  class="favourite__card__icons-btnb"
                  @click="
                    toggleBasket(
                      item.id,
                      item.title,
                      item.thumbnail,
                      $t('fixed__theme-title-2')
                    )
                  "
                >
                  <Basket2Icon class="favourite__card__icons-btnb-basketicon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
