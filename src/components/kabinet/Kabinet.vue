<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits } from "vue";
import { RouterLink } from "vue-router";
import ShoppingIcon from "@/assets/icons/ShoppingIcon.vue";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import LocationIcon from "@/assets/icons/LocationIcon.vue";
import UzbIcon from "@/assets/icons/UzbIcon.vue";
import RusIcon from "@/assets/icons/RusIcon.vue";
import { i18n } from "@/main";
import ArrowIcon from '@/assets/icons/ArrowIcon.vue'
const emits = defineEmits(["closeKatalog"]);
const kabinet = ref(false);

const languageRu = ref(true);
const languageUz = ref(false);

const activeClass1 = ref(false);
const activeClass2 = ref(false);

const toggleActiveClass1 = () => {
    activeClass1.value = !activeClass1.value;
    activeClass2.value = false;
};

const toggleActiveClass2 = () => {
    activeClass2.value = !activeClass2.value;
    activeClass1.value = false;
};

const test = (lang) => {
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

    emits("loadingLaungage");
};

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
    <div class="kabinet">
        <div class="kabinet__sign">
            <div class="container">
                <RouterLink to="/login" class="kabinet__sign-in" @click="emits('closeKatalog')">{{ $t("kabinet__sign-in") }} </RouterLink> /
                <RouterLink to="/sign-up" class="kabinet__sign-in" @click="emits('closeKatalog')"> {{ $t("kabinet__sign-up") }} </RouterLink>
            </div>
        </div>
        <div class="kabinet__top">
            <div class="container">
                <RouterLink to="/orders" class="kabinet__top-orders" @click="emits('closeKatalog')"><ShoppingIcon /> {{ $t("nav__top-3") }} </RouterLink>
                <RouterLink to="/favourite" class="kabinet__top-orders" @click="emits('closeKatalog')"><HeartIcon /> {{ $t("bottoms__link-4") }} </RouterLink>
                <p class="kabinet__top-orders"><LocationIcon /> {{ $t("nav__top-1") }} <a href="https://maps.app.goo.gl/2tNs8A9QYtZ47YLK9">Toshkent</a></p>
            </div>
        </div>
        <div class="kabinet__bottom">
            <div class="container">
                <button class="kabinet__bottom-laungage-uz" @click="test('UZ')" v-show="languageUz"><RusIcon /> Язык сайта: Русский</button>
                <button class="kabinet__bottom-laungage-ru" @click="test('RU')" v-show="languageRu"><UzbIcon /> Sayt tili: Оʻzbekcha</button>
                
                <div class="kabinet__bottom-links">

                    <div class="kabinet__bottom-link">
                        <div class="kabinet__bottom-title" @click="toggleActiveClass1">
                            <h3 class="footer__none-link-title">{{ $t("footer__link-title-1") }}</h3>
                            <ArrowIcon class="footer__none-link-icon" :class="{ active: activeClass1 }" />
                        </div>
                        <div class="footer__links-dropdown" :class="{ active: activeClass1 }">
                            <li class="footer__none-link">{{ $t("footer__link-1") }}</li>
                            <li class="footer__none-link">{{ $t("footer__link-2") }}</li>
                        </div>
                    </div>
                    <div class="kabinet__bottom-link">
                        <div class="kabinet__bottom-title" @click="toggleActiveClass2">
                            <h3 class="footer__none-link-title">{{ $t("footer__link-title-2") }}</h3>
                            <ArrowIcon class="footer__none-link-icon" :class="{ active: activeClass2 }" />
                        </div>
                        <div class="footer__links-dropdown" :class="{ active: activeClass2 }">
                            <li class="footer__none-link">{{ $t("footer__link-3") }}</li>
                            <li class="footer__none-link">{{ $t("footer__link-4") }}</li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
