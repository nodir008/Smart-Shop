<script setup>
import { ref, reactive, watch, onMounted, onBeforeUnmount, defineProps, defineEmits   } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import { useProductsCategories } from "@/stores/productsCategories";
import { useCategoryStore } from "@/stores/categorySingleStore";
import { useFavouriteStore } from "@/stores/favouriteStore";
import { useBasketStore } from "@/stores/basketStore";
import debounce from "lodash.debounce";
import LocationIcon from "@/assets/icons/LocationIcon.vue";
import UserIcon from "@/assets/icons/UserIcon.vue";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import BasketIcon from "@/assets/icons/BasketIcon.vue";
import RusIcon from "@/assets/icons/RusIcon.vue";
import UzbIcon from "@/assets/icons/UzbIcon.vue";
import { i18n } from "@/main";

const favouriteStore = useFavouriteStore();
const basketStore = useBasketStore();
const productsCategories = useProductsCategories();
productsCategories.getCategories();

const productsStore = useProductsStore();
const categoryStore = useCategoryStore();

const show = ref(false);
const languageRu = ref(true);
const languageUz = ref(false);

const toggleShow = () => {
  show.value = !show.value;
};
const props = defineProps({
  loading: Boolean // propName nomli propertini String tipida qabul qilamiz
})

const emit  = defineEmits(['loading']);



const test = (lang) => {
  emit('loading', true); 

  console.log(lang);
  console.log(i18n.global.locale);
  if (lang == "UZ") {
    languageRu.value = true;
    languageUz.value = false;
    i18n.global.locale = "UZ";
    localStorage.setItem("language", "UZ");
  } else if (lang == "RU") {
    languageUz.value = true;
    languageRu.value = false;
    i18n.global.locale = "RU";
    localStorage.setItem("language", "RU");
  }
};

const searchInput = ref("");

watch(
  searchInput,
  debounce(() => {
    productsStore.getProducts(1 * 20 - 20, searchInput.value.trim());
  }, 500)
);

// Load language preferences from localStorage on component mount
onMounted(() => {
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage) {
    test(savedLanguage);
  }
});

// Save language preferences to localStorage on component unmount
onBeforeUnmount(() => {
  localStorage.setItem("languageRu", languageRu.value);
  localStorage.setItem("languageUz", languageUz.value);
});
</script>


<template>
  <nav class="nav">
    <div class="nav__top">
      <div class="container">
        <p class="nav__top-1">
          <LocationIcon /> {{ $t("nav__top-1") }}
          <a href="https://maps.app.goo.gl/2tNs8A9QYtZ47YLK9">Toshkent</a>
        </p>
        <p class="nav__top-2">{{ $t("nav__top-2") }}</p>
        <div class="nav__top-div">
          <!-- <RouterLink to="/orders" class="nav__top-3">Buyurtmalarim</RouterLink> -->
          <RouterLink to="/orders" class="nav__top-3">{{
            $t("nav__top-3")
          }}</RouterLink>
          <button
            class="nav__top-laungage-uz"
            @click="test('UZ')"
            v-show="languageUz"
          >
            <UzbIcon />UZ
          </button>
          <button
            class="nav__top-laungage-ru"
            @click="test('RU')"
            v-show="languageRu"
          >
            <RusIcon />RU
          </button>

          <!-- <button
            class="nav__top-laungage-uz"
            @click="$i18n.locale = 'UZ'"
          >
            <UzbIcon />UZ
          </button>
          <button
            class="nav__top-laungage-ru"
            @click="$i18n.locale = 'RU'"
          >
            <RusIcon />RU
          </button> -->
        </div>
      </div>
    </div>
    <div class="container">
      <div class="nav__titles">
        <button @click="toggleShow" class="burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <RouterLink class="nav__titles-title" to="/">Smart Shop</RouterLink>
      </div>
      <div class="nav__inputs">
        <input
          v-model="searchInput"
          type="search"
          name="text"
          class="search-bar"
          :placeholder="$t('search-bar')"
        />
        <!-- <button v-if="searchInput.trim() !== ''" @click="clearSearchInput">X</button> -->
      </div>

      <div class="nav__pages">
        <RouterLink class="nav__pages-user" to="/login">
          <UserIcon />
          <span class="nav__pages-span">{{ $t("nav__pages-user") }}</span>
        </RouterLink>
        <RouterLink class="nav__pages-favourites" to="/favourite">
          <HeartIcon />
          <span class="nav__pages-span">{{ $t("nav__pages-favourites") }}</span>
          <span v-if="favouriteStore.favourites.length > 0" class="fav-count">
            {{ favouriteStore.favourites.length }}
          </span>
        </RouterLink>

        <RouterLink
          to="/drawer"
          class="nav__pages-basket"
          @click="openDrawer = true"
        >
          <BasketIcon />
          <span class="nav__pages-span">{{ $t("nav__pages-basket") }}</span>
          <span class="basket-count" v-if="basketStore.drawer.length > 0">
            {{ basketStore.drawer.length }}
          </span>
        </RouterLink>
      </div>
    </div>
    <Transition name="fade">
      <div class="nav__category" v-show="show">
        <div class="nav__category-titles">
          <h3 class="nav__category-title">{{ $t("nav__category-title") }}</h3>
          <button class="nav__category-x" @click="show = false">X</button>
        </div>
        <div class="nav__category-pages">
          <RouterLink
            v-for="title in productsCategories.categorie"
            :to="'/category/' + title"
            class="nav__category-page"
            :key="title.id"
            @click="(show = false), categoryStore.getCategorySingle(title)"
          >
            {{ title }}
          </RouterLink>
        </div>
      </div>
    </Transition>
    <Transition name="fade2">
      <button
        v-show="show"
        class="nav__category-bg"
        @click="show = false"
      ></button>
    </Transition>
  </nav>
  <nav>
    <div class="nav__none">
      <div class="container">
        <p class="nav__none-2">{{ $t("nav__top-2") }}</p>
      <input
        v-model="searchInput"
        type="search"
        name="text"
        class="nav__none-input"
        :placeholder="$t('search-bar')"
      />
      </div>
    </div>
  </nav>
</template>
