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
// const productQuantity = ref(parseInt(localStorage.getItem("productQuantity")) || 1);
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
  productQuantity.value = Math.max(1, productQuantity.value - 1);
};

watchEffect(() => {
  if (productQuantity.value < 0) {
    productQuantity.value = 1;
  }
  // localStorage.setItem("productQuantity", productQuantity.value.toString());
});

const increaseQuantity = () => {
  productQuantity.value++;
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
  const productId = productSingleStore.product?.id;
  if (productId) {
    basketStore.getAddDrawerPro(productId, productQuantity.value);
  }
  basketStore.changeActive(true);
  setTimeout(() => {
    productQuantity.value = 1;
  }, 1000);
};

const addToOrder = (productId) => {
  if (productId === productSingleStore.product?.id) {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + 60000); // 1 minute in milliseconds

    const deliveryTimeFormatted = `${deliveryTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${deliveryTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${deliveryTime
      .getSeconds()
      .toString()
      .padStart(2, "0")} ${deliveryTime.getDate().toString().padStart(2, "0")}-${(
      deliveryTime.getMonth() + 1
    )
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
          @swiper="setThumbsSwiper"
          :loop="true"
          :grabCursor="true"
          :spaceBetween="1"
          :slidesPerView="3"
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
          :loop="true"
          :spaceBetween="10"
          :navigation="true"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="modules"
          :grabCursor="true"
          class="mySwiper2"
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
              <span class="product__theme-rating-rating-s"> ball </span> )
            </p>
            <p class="product__theme-rating-stock">
              {{ productSingleStore.product?.stock }} ta buyurtma
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
                ? "Istaklarda"
                : "Istaklarga"
            }}
          </button>
        </div>
        <h2 class="product__theme-title">
          {{ productSingleStore.product?.title }}
        </h2>
        <div class="product__theme-product">
          <p class="product__theme-product-title">Yetkazib berish:</p>
          <p class="product__theme-product-text">
            1 kunda bepul. Mahsulot buyurtirilgan kunning ertasiga mahsulotni
            rasmiy topshirish punktlarimizga yetkazamiz.
          </p>
        </div>
        <span class="product-span"></span>
        <div class="product__theme-theme">
          <h4 class="product__theme-theme-title">Mahsulot haqida qisqacha:</h4>
          <p class="product__theme-theme-text">
            {{ productSingleStore.product?.description }}
          </p>
        </div>
        <p class="product__theme-count-count">Miqdor:</p>
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
              <PlusIcon class="product__theme-count-number-b-icon2" />
            </button>
          </div>
          <p class="product__theme-count-text">Sotuvda bor</p>
        </div>
        <p class="product__theme-price-price">Narx:</p>
        <div class="product__theme-price">
          <p class="product__theme-price-price1">{{ totalFormattedPrice }} $</p>
          <p class="product__theme-price-price2">
            {{ productSingleStore.product?.price * productQuantity }}$
          </p>
          <p class="product__theme-price-price3">
            {{ productQuantity }} tasidan -{{ updateTotalPrice() }}$ chegirma
            bolayabdi
          </p>
          <p class="product__theme-price-text">Savdo</p>
        </div>
        <div class="product__theme-term" @click="toggleLoader">
          <div class="product__theme-term-div">
            <p class="product__theme-term-p">
              Oyiga
              {{
                calculateFormattedPrice(
                  productSingleStore.product?.price * productQuantity
                )
              }}$
            </p>
            <span class="product__theme-term-s"> muddatli to'lov</span>
          </div>
          <ArrowIcon class="product__theme-term-icon" v-if="!showLoader" />
          <span class="product__theme-term-loader" v-else></span>
        </div>
        <div class="product__theme-btns">
          <button class="product__theme-btns-btn" @click="addToBasket">
            Savatga qo'shish
          </button>
          <button class="product__theme-btns-btn-18" @click="addToOrder(productSingleStore.product.id)">
            <span class="text-container">
              <span class="text"> Tugmani 1 bosishda xarid qilish</span>
            </span>
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
      <h1 class="product__nation-title">Smart Shop Nasiya muddatli to’lovi</h1>
      <p class="product__nation-text">
        So‘rovnomani to‘ldiring — keyin siz xaridlarni muddatli to‘lovga
        olishingiz mumkin bo‘ladi
      </p>
      <div class="product__nation-pasport">
        <div class="product__nation-pasport1">
          <img src="@/assets/images/step-1.svg" alt="" />
          <h3 class="product__nation-pasport-title">
            Pasport ma‘lumotlarini yoki karta identifikatorini qo‘shing
          </h3>
        </div>
        <div class="product__nation-separator"></div>
        <div class="product__nation-pasport1">
          <img src="@/assets/images/step-2.svg" alt="" />
          <div class="product__nation-pasport1-div">
            <h3 class="product__nation-pasport-title">
              Shaxsingizni tasdiqlang
            </h3>
            <p class="product__nation-pasport-text">
              Shunday qilib, siz to‘lovni amalga oshirayotganingizni aniq bilib
              olamiz
            </p>
          </div>
        </div>
        <div class="product__nation-separator"></div>
        <div class="product__nation-pasport1">
          <img src="@/assets/images/step-3.svg" alt="" />
          <h3 class="product__nation-pasport-title">
            Birinchi to‘lovsiz Uzum Nasiyadan muddatli to’lovga sotib oling
          </h3>
        </div>
      </div>
      <ul class="product__nation-ul">
        <li class="product__nation-ul-li">
          <CheckIcon class="product__nation-ul-li-icon" /> Boshlang‘ich
          to‘lovsiz
        </li>
        <li class="product__nation-ul-li">
          <CheckIcon class="product__nation-ul-li-icon" />12 oygacha muddatli
          to‘lov
        </li>
        <li class="product__nation-ul-li">
          <CheckIcon class="product__nation-ul-li-icon" />25 000 000 so‘mgacha
          limit
        </li>
      </ul>
      <RouterLink to="/installment" class="product__nation-btn"
        >Batafsil shartlar</RouterLink
      >
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
        <h3 class="fixed__theme-title">Mahsulotga buyurtma berildi</h3>
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
