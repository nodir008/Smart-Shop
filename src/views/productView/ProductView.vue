<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { ref, computed, watchEffect } from "vue";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useProductSingleStore } from "@/stores/productSingleStore";
import { useFavouriteStore } from "@/stores/favouriteStore";
import { useRoute } from "vue-router";
import { useBasketStore } from "@/stores/basketStore";
import { useOrderStore } from "@/stores/orderStore";
import StarIcon from "@/assets/icons/StarIcon.vue";
import Heart2Icon from "@/assets/icons/Heart2Icon.vue";
import MinusIcon from "@/assets/icons/MinusIcon.vue";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import Toast from "@/components/toast/Toast.vue";
import CheckIcon from "@/assets/icons/Check.vue";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
import DeleteXIcon from "@/assets/icons/DeleteXIcon.vue";
import PlusIcon from "@/assets/icons/PlusIcon.vue";

const orderStore = useOrderStore();
const productQuantity = ref(1);
const favouriteStore = useFavouriteStore();
const basketStore = useBasketStore();
const thumbsSwiper = ref(null);
const showToast = ref(false);
const route = useRoute();
const modules = [FreeMode, Navigation, Thumbs];
const productSingleStore = useProductSingleStore();
productSingleStore.getSingleProduct(route.params.id);
const showLoader = ref(false);
const show = ref(false);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const calculateFormattedPrice = (price) => {
  return (price / 12).toFixed(0);
};

const calculateFormatted = () => {
  const discountedPrice =
    productSingleStore.product?.price -
    (productSingleStore.product?.price / 100) *
      productSingleStore.product?.discountPercentage;
  return discountedPrice.toFixed(0);
};

const totalFormattedPrice = computed(() => {
  const totalPrice = calculateFormatted() * productQuantity.value;
  return totalPrice.toFixed(0);
});

const decreaseQuantity = () => {
  if (productQuantity.value > 1) {
    productQuantity.value--;
  }
};

watchEffect(() => {
  if (
    0 > productQuantity.value ||
    productSingleStore.product?.stock <= productQuantity.value
  ) {
    productQuantity.value = productSingleStore.product?.stock;
  }
});

const increaseQuantity = () => {
  if (productQuantity.value < productSingleStore.product?.stock) {
    productQuantity.value++;
  }
};

const updateTotalPrice = () => {
  const discountedPrice =
    productSingleStore.product?.price * productQuantity.value -
    totalFormattedPrice.value;
  return discountedPrice.toFixed(0);
};

const handleHeartClick = () => {
  favouriteStore.activeStates[productSingleStore.product?.id] =
    !favouriteStore.activeStates[productSingleStore.product?.id];
  favouriteStore.getAddFavPro(productSingleStore.product?.id);
};

const toggleLoader = () => {
  showLoader.value = true;
  show.value = true;
  setTimeout(() => {
    showLoader.value = false;
  }, 500);
};

const addToBasket = () => {
  if (productQuantity.value <= 0 || productQuantity.value === null) {
    alert("Mahsulot miqdori 0 ga teng!");
    return;
  }
  const productId = productSingleStore.product?.id;
  if (productId) {
    basketStore.getAddDrawerPro(productId, productQuantity.value);
  }
  basketStore.changeActive(
    true,
    productSingleStore.product?.description,
    productSingleStore.product?.thumbnail
  );
  setTimeout(() => {
    productQuantity.value = 1;
    showToast.value = false;
  }, 2000);
};

const addToOrder = (productId) => {
  if (productQuantity.value <= 0 || productQuantity.value === null) {
    alert("Mahsulot miqdori 0 ga teng!");
    return;
  }
  if (productId === productSingleStore.product?.id) {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + 60000);

    const deliveryTimeFormatted = `${deliveryTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${deliveryTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${deliveryTime
      .getSeconds()
      .toString()
      .padStart(2, "0")} ${deliveryTime
      .getDate()
      .toString()
      .padStart(2, "0")}-${(deliveryTime.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${deliveryTime.getFullYear()}`;
    orderStore.setDeliveryTime(deliveryTimeFormatted);
  }

  if (productId) {
    orderStore.orderStoreAdd(productId, productQuantity.value);
    showToast.value = true;

    setTimeout(() => {
      productQuantity.value = 1;
      showToast.value = false;
    }, 2000);

    setTimeout(() => {
      orderStore.orders.forEach((item) => {
        orderStore.removeOrder(item.id);
      });
    }, 60000);
  }
};
</script>

<template>
  <section class="product">
    <div class="container">
      <div class="product__images">
        <swiper
          v-if="productSingleStore.product?.images.length > 1"
          @swiper="setThumbsSwiper"
          :grabCursor="true"
          :spaceBetween="1"
          :slidesPerView="productSingleStore.product?.images.length"
          :freeMode="true"
          :watchSlidesProgress="true"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide
            imgper-slide
            v-for="(image, i) in productSingleStore.product?.images"
            :key="i"
            ><img class="swiper__slide-img" :src="image" alt=""
          /></swiper-slide>
        </swiper>
        <swiper
          :style="{
            '--swiper-pagination-color': '#fff',
            '--swiper-navigation-color': 'grey',
          }"
          :spaceBetween="10"
          :navigation="true"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="modules"
          :grabCursor="true"
          class="mySwiper2"
          :class="{ active: productSingleStore.product?.images.length == 1 }"
        >
          <swiper-slide
            v-for="(image, i) in productSingleStore.product?.images"
            :key="i"
            ><img class="swiper__slide-img2" :src="image" alt=""
          /></swiper-slide>
        </swiper>
      </div>

      <div class="product__theme">
        <div class="product__theme-rating">
          <div class="product__theme-rating-text">
            <p class="product__theme-rating-rating">
              <StarIcon />{{ productSingleStore.product?.rating }} (
              <span class="product__theme-rating-rating-s">
                {{ $t("product__theme-rating-rating-s") }}
              </span>
              )
            </p>
            <p class="product__theme-rating-stock">
              {{ productSingleStore.product?.stock }}
              {{ $t("product__theme-rating-stock") }}
            </p>
          </div>
          <!-- @click="toggleFavorite" :class="{ active: isFavourite }" -->
          <button
            class="product__theme-rating-favourite"
            @click="handleHeartClick"
          >
            <HeartIcon
              class="product__theme-rating-favourite-headericon-1"
              v-if="
                !favouriteStore.activeStates[productSingleStore.product?.id]
              "
            />
            <Heart2Icon
              class="product__theme-rating-favourite-headericon-2"
              v-else
            />
            {{
              favouriteStore.activeStates[productSingleStore.product?.id]
                ? $t("product__theme-rating-favourite-headericon-2")
                : $t("product__theme-rating-favourite-headericon-1")
            }}
          </button>
        </div>
        <h2 class="product__theme-title">
          {{ productSingleStore.product?.title }}
        </h2>
        <div class="product__theme-product">
          <p class="product__theme-product-title">
            {{ $t("product__theme-product-title") }}
          </p>
          <p class="product__theme-product-text">
            {{ $t("product__theme-product-text") }}
          </p>
        </div>
        <span class="product-span"></span>
        <div class="product__theme-theme">
          <h4 class="product__theme-theme-title">
            {{ $t("product__theme-theme-title") }}
          </h4>
          <p class="product__theme-theme-text">
            {{ productSingleStore.product?.description }}
          </p>
        </div>
        <p class="product__theme-count-count">
          {{ $t("product__theme-count-count") }}
        </p>
        <div class="product__theme-count">
          <div class="product__theme-count-number">
             
            <button
              class="product__theme-count-number-b"
              @click="decreaseQuantity"
            >
              <MinusIcon
                class="product__theme-count-number-b-icon1"
                :class="{ active: productQuantity === 1 }"
              />
            </button>
            <input
              v-model="productQuantity"
              class="product__theme-count-number-n"
              type="number"
              name=""
              id=""
            />
            <button
              class="product__theme-count-number-b"
              @click="increaseQuantity"
            >
            <span class="tooltiptext" :class="{active: productQuantity === productSingleStore.product?.stock}"> {{ $t("productSingleStore__product-stock-laungage") }} {{ productSingleStore.product?.stock }} {{ $t("product__theme-count-text-2") }}</span>
              <PlusIcon
                class="product__theme-count-number-b-icon2"
                :class="{
                  active: productQuantity === productSingleStore.product?.stock,
                }"
              />
            </button>
          </div>
          <p class="product__theme-count-text">
            {{ $t("product__theme-count-text") }}
            {{ productSingleStore.product?.stock }}
            {{ $t("product__theme-count-text-2") }}
          </p>
        </div>
        <p class="product__theme-price-price">
          {{ $t("product__theme-price-price") }}
        </p>
        <div class="product__theme-price">
          <p class="product__theme-price-price1">{{ totalFormattedPrice }} $</p>
          <p class="product__theme-price-price2">
            {{ productSingleStore.product?.price * productQuantity }}$
          </p>
          <p class="product__theme-price-price3">
            {{ productQuantity }} {{ $t("product__theme-price-price3-1") }}-{{
              updateTotalPrice()
            }}$ {{ $t("product__theme-price-price3-2") }}
          </p>
          <!-- <p class="product__theme-price-price3">
            {{ $t("product__theme-price-price3-1") }}  -{{ updateTotalPrice() }}$ {{ $t("product__theme-price-price3-2") }} {{ productQuantity }} {{ $t("product__theme-price-price3-3") }} 
          </p> -->

          <p class="product__theme-price-text">
            {{ $t("product__theme-price-text") }}
          </p>
        </div>
        <div class="product__theme-term" @click="toggleLoader">
          <div class="product__theme-term-div">
            <p class="product__theme-term-p">
              {{ $t("product__theme-term-p") }}
              {{
                calculateFormattedPrice(
                  productSingleStore.product?.price * productQuantity
                )
              }}$
            </p>
            <span class="product__theme-term-s">{{
              $t("product__theme-term-s")
            }}</span>
          </div>
          <ArrowIcon class="product__theme-term-icon" v-if="!showLoader" />
          <span class="product__theme-term-loader" v-else></span>
        </div>
        <div class="product__theme-btns">
          <button class="product__theme-btns-btn" @click="addToBasket">
            {{ $t("product__theme-btns-btn") }}
          </button>
          <button
            class="product__theme-btns-btn-18"
            @click="addToOrder(productSingleStore.product.id)"
          >
            <span class="text-container">
              <span class="text"> {{ $t("product__theme-btns-btn-18") }}</span>
            </span>
          </button>
        </div>
      </div>

      <div class="product__theme-none">
        <div class="product__theme-rating">
          <div class="product__theme-rating-text">
            <p class="product__theme-rating-rating">
              <StarIcon />{{ productSingleStore.product?.rating }} (
              <span class="product__theme-rating-rating-s">
                {{ $t("product__theme-rating-rating-s") }}
              </span>
              )
            </p>
            <p class="product__theme-rating-stock">
              {{ productSingleStore.product?.stock }}
              {{ $t("product__theme-rating-stock") }}
            </p>
          </div>
          <button
            class="product__theme-rating-favourite"
            @click="handleHeartClick"
          >
            <HeartIcon
              class="product__theme-rating-favourite-headericon-1"
              v-if="
                !favouriteStore.activeStates[productSingleStore.product?.id]
              "
            />
            <Heart2Icon
              class="product__theme-rating-favourite-headericon-2"
              v-else
            />
            <span>{{
              favouriteStore.activeStates[productSingleStore.product?.id]
                ? $t("product__theme-rating-favourite-headericon-2")
                : $t("product__theme-rating-favourite-headericon-1")
            }}</span>
          </button>
        </div>
        <h2 class="product__theme-title">
          {{ productSingleStore.product?.title }}
        </h2>
        <div class="product__theme-price">
          <p class="product__theme-price-price1">{{ totalFormattedPrice }} $</p>
          <p class="product__theme-price-price2">
            {{ productSingleStore.product?.price * productQuantity }}$
          </p>
          <p class="product__theme-price-price3">
            {{ productQuantity }} {{ $t("product__theme-price-price3-1") }}-{{
              updateTotalPrice()
            }}$ {{ $t("product__theme-price-price3-2") }}
          </p>
        </div>
        <div class="product__theme-product">
          <p class="product__theme-product-title">
            {{ $t("product__theme-product-title") }}
          </p>
          <p class="product__theme-product-text">
            {{ $t("product__theme-product-text") }}
          </p>
        </div>

        <div class="product__theme-theme">
          <h4 class="product__theme-theme-title">
            {{ $t("product__theme-theme-title") }}
          </h4>
          <p class="product__theme-theme-text">
            {{ productSingleStore.product?.description }}
          </p>
        </div>
        <span class="product-span"></span>
        <div class="product__theme-term" @click="toggleLoader">
          <div class="product__theme-term-div">
            <p class="product__theme-term-p">
              {{ $t("product__theme-term-p") }}
              {{
                calculateFormattedPrice(
                  productSingleStore.product?.price * productQuantity
                )
              }}$
            </p>
            <span class="product__theme-term-s">{{
              $t("product__theme-term-s")
            }}</span>
          </div>
          <ArrowIcon class="product__theme-term-icon" v-if="!showLoader" />
          <span class="product__theme-term-loader" v-else></span>
        </div>

        <div class="product__theme-none-basket">
          <div class="product__theme-count-number">
            <button
              class="product__theme-count-number-b"
              @click="decreaseQuantity"
            >
              <MinusIcon
                class="product__theme-count-number-b-icon1"
                :class="{ active: productQuantity === 1 }"
              />
            </button>
            <input
              v-model="productQuantity"
              class="product__theme-count-number-n"
              type="number"
              name=""
              id=""
            />
            <button
              class="product__theme-count-number-b"
              @click="increaseQuantity"
            >
              <PlusIcon class="product__theme-count-number-b-icon2" />
            </button>
          </div>
          <button
            class="product__theme-none-basket-btns-btn"
            @click="addToBasket"
          >
            {{ $t("product__theme-btns-btn") }}
          </button>
        </div>
      </div>
    </div>
  </section>
  <button class="product__nation-bg" :class="{ active: show }"></button>
  <div
    class="product__nation-div"
    :class="{ active: show }"
    @click="show = false"
  >
    <div class="product__nation" @click.stop="">
      <DeleteXIcon class="product__nation-x" @click="show = false" />
      <h1 class="product__nation-title">{{ $t("product__nation-title") }}</h1>
      <p class="product__nation-text">
        {{ $t("product__nation-text") }}
      </p>
      <div class="product__nation-pasport">
        <div class="product__nation-pasport1">
          <img src="@/assets/images/step-1.svg" alt="" />
          <h3 class="product__nation-pasport-title">
            {{ $t("product__nation-pasport-title") }}
          </h3>
        </div>
        <div class="product__nation-separator"></div>
        <div class="product__nation-pasport1">
          <img src="@/assets/images/step-2.svg" alt="" />
          <div class="product__nation-pasport1-div">
            <h3 class="product__nation-pasport-title">
              {{ $t("product__nation-pasport-title-2") }}
            </h3>
            <p class="product__nation-pasport-text">
              {{ $t("product__nation-pasport-text") }}
            </p>
          </div>
        </div>
        <div class="product__nation-separator"></div>
        <div class="product__nation-pasport1">
          <img src="@/assets/images/step-3.svg" alt="" />
          <h3 class="product__nation-pasport-title">
            {{ $t("product__nation-pasport-title-3") }}
          </h3>
        </div>
      </div>
      <ul class="product__nation-ul">
        <li class="product__nation-ul-li">
          <CheckIcon class="product__nation-ul-li-icon" />
          {{ $t("product__nation-ul-li-1") }}
        </li>
        <li class="product__nation-ul-li">
          <CheckIcon class="product__nation-ul-li-icon" />
          {{ $t("product__nation-ul-li-2") }}
        </li>
        <li class="product__nation-ul-li">
          <CheckIcon class="product__nation-ul-li-icon" />
          {{ $t("product__nation-ul-li-3") }}
        </li>
      </ul>
      <RouterLink to="/installment" class="product__nation-btn">{{
        $t("product__nation-btn")
      }}</RouterLink>
    </div>
  </div>

  <button
    class="product__nation-bg-2"
    :class="{ active: show }"
    @click="show = false"
  ></button>
  <div class="product__nation-div-2" :class="{ active: show }">
    <div class="product__nation-2" @click.stop="">
      <DeleteXIcon class="product__nation-x" @click="show = false" />
      <h1 class="product__nation-title">{{ $t("product__nation-title") }}</h1>
      <p class="product__nation-text">
        {{ $t("product__nation-text") }}
      </p>
      <div class="product__nation-pasport">
        <div class="product__nation-pasport1">
          <img src="@/assets/images/step-1.svg" alt="" />
          <h3 class="product__nation-pasport-title">
            {{ $t("product__nation-pasport-title") }}
          </h3>
        </div>
        <div class="product__nation-separator"></div>
        <div class="product__nation-pasport1">
          <img src="@/assets/images/step-2.svg" alt="" />
          <div class="product__nation-pasport1-div">
            <h3 class="product__nation-pasport-title">
              {{ $t("product__nation-pasport-title-2") }}
            </h3>
            <p class="product__nation-pasport-text">
              {{ $t("product__nation-pasport-text") }}
            </p>
          </div>
        </div>
        <div class="product__nation-separator"></div>
        <div class="product__nation-pasport1">
          <img src="@/assets/images/step-3.svg" alt="" />
          <h3 class="product__nation-pasport-title">
            {{ $t("product__nation-pasport-title-3") }}
          </h3>
        </div>
      </div>
      <ul class="product__nation-ul">
        <li class="product__nation-ul-li">
          <CheckIcon class="product__nation-ul-li-icon" />
          {{ $t("product__nation-ul-li-1") }}
        </li>
        <li class="product__nation-ul-li">
          <CheckIcon class="product__nation-ul-li-icon" />
          {{ $t("product__nation-ul-li-2") }}
        </li>
        <li class="product__nation-ul-li">
          <CheckIcon class="product__nation-ul-li-icon" />
          {{ $t("product__nation-ul-li-3") }}
        </li>
      </ul>
      <RouterLink to="/installment" class="product__nation-btn">{{
        $t("product__nation-btn")
      }}</RouterLink>
    </div>
  </div>
  <Toast :productQuantity="productQuantity" />

  <div class="product__theme-toast" :class="{ active: showToast }">
    <img
      class="fixed__img"
      :src="productSingleStore.product?.thumbnail"
      alt=""
    />
    <div class="fixed__theme">
      <div class="fixed__theme-top">
        <h3 class="fixed__theme-title">{{ $t("fixed__theme-title") }}</h3>
        <!-- <p class="fixed__theme-x" @click="showToast = false">X</p> -->
      </div>

      <div class="fixed__theme-bottom">
        <p class="fixed__theme-text" v-if="productQuantity <= 1">
          {{ productSingleStore.product?.description }}
        </p>
        <p class="fixed__theme-text" v-else>
          {{ productSingleStore.product?.description }}

          <span>x {{ productQuantity }} </span>
        </p>
        <!-- <RouterLink to="/orders" class="product__theme-toast-orders">Buyurtmalarimga otish</RouterLink> -->
      </div>
    </div>
  </div>
</template>