<script setup>
import appleIcon from "@/assets/icons/AppleIcon.vue";
import googlePlayIcon from "@/assets/icons/GooglePlayIcon.vue";
import { ref } from "vue";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";

const activeClass1 = ref(false);
const activeClass2 = ref(false);
const activeClass3 = ref(false);

const toggleActiveClass1 = () => {
    activeClass1.value = !activeClass1.value;
    activeClass3.value = false;
    activeClass2.value = false;
};

const toggleActiveClass2 = () => {
    activeClass2.value = !activeClass2.value;
    activeClass1.value = false;
    activeClass3.value = false;
};

const toggleActiveClass3 = () => {
    activeClass3.value = !activeClass3.value;
    activeClass1.value = false;
    activeClass2.value = false;
};
</script>

<template>
    <footer class="footer">
        <div class="container">
            <div class="footer__top">
                <ul class="footer__links">
                    <h3 class="footer__link-title">{{ $t("footer__link-title-1") }}</h3>
                    <li class="footer__link">{{ $t("footer__link-1") }}</li>
                    <li class="footer__link">{{ $t("footer__link-2") }}</li>
                </ul>
                <ul class="footer__links">
                    <h3 class="footer__link-title">{{ $t("footer__link-title-2") }}</h3>
                    <li class="footer__link">{{ $t("footer__link-3") }}</li>
                    <li class="footer__link">{{ $t("footer__link-4") }}</li>
                </ul>
                <ul class="footer__links">
                    <h3 class="footer__link-title">{{ $t("footer__link-title-3") }}</h3>
                    <li class="footer__link">{{ $t("footer__link-5") }}</li>
                    <li class="footer__link">{{ $t("footer__link-6") }}</li>
                </ul>
                <div class="footer__apps">
                    <h3 class="footer__link-title footer__link-title-none">{{ $t("footer__link-title-4") }}</h3>
                    <div class="footer__app">
                        <p class="footer__app-link"><appleIcon /> AppStore</p>
                        <p class="footer__app-link"><googlePlayIcon /> Google Play</p>
                    </div>
                    <h3 class="footer__apps-title">{{ $t("footer__apps-title") }}</h3>
                    <div class="footer__link-contact">
                        <a href="#"><img src="@/assets/images/instagram.png" alt="" /></a>
                        <a href="#"><img src="@/assets/images/telegram.png" alt="" /></a>
                    </div>
                </div>
            </div>
            <div class="footer__bottom">
                <span class="hspan"></span>
                <div class="footer__bottom-item">
                    <ul class="footer__bottom-links">
                        <li class="footer__bottom-link">{{ $t("footer__bottom-link-1") }}</li>
                        <li class="footer__bottom-link">{{ $t("footer__bottom-link-2") }}</li>
                    </ul>
                    <p class="footer__bottom-text">
                        {{ $t("footer__bottom-text") }}
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <footer class="footer-none">
        <div class="container">
            <div class="footer__none-top">
                <div class="footer__links">
                    <div class="footer__links-title" @click="toggleActiveClass1">
                        <h3 class="footer__none-link-title">{{ $t("footer__link-title-1") }}</h3>
                        <ArrowIcon class="footer__none-link-icon" :class="{ active: activeClass1 }" />
                    </div>
                    <div class="footer__links-dropdown" :class="{ active: activeClass1 }">
                        <li class="footer__none-link">{{ $t("footer__link-1") }}</li>
                        <li class="footer__none-link">{{ $t("footer__link-2") }}</li>
                    </div>
                </div>
                <div class="footer__links">
                    <div class="footer__links-title" @click="toggleActiveClass2">
                        <h3 class="footer__none-link-title">{{ $t("footer__link-title-2") }}</h3>
                        <ArrowIcon class="footer__none-link-icon" :class="{ active: activeClass2 }" />
                    </div>
                    <div class="footer__links-dropdown" :class="{ active: activeClass2 }">
                        <li class="footer__none-link">{{ $t("footer__link-3") }}</li>
                        <li class="footer__none-link">{{ $t("footer__link-4") }}</li>
                    </div>
                </div>
                <div class="footer__links">
                    <div class="footer__links-title" @click="toggleActiveClass3">
                        <h3 class="footer__none-link-title">{{ $t("footer__link-title-3") }}</h3>
                        <ArrowIcon class="footer__none-link-icon" :class="{ active: activeClass3 }" />
                    </div>
                    <div class="footer__links-dropdown" :class="{ active: activeClass3 }">
                        <li class="footer__none-link">{{ $t("footer__link-5") }}</li>
                        <li class="footer__none-link">{{ $t("footer__link-6") }}</li>
                    </div>
                </div>
                <div class="footer__apps">
                    <h3 class="footer__link-title footer__link-title-none">{{ $t("footer__link-title-4") }}</h3>
                    <div class="footer__app">
                        <p class="footer__app-link"><appleIcon class="footer__app-link-icon" /> AppStore</p>
                        <p class="footer__app-link"><googlePlayIcon /> Google Play</p>
                    </div>
                    <h3 class="footer__apps-title">{{ $t("footer__apps-title") }}</h3>
                    <div class="footer__link-contact">
                        <a href="#"><img src="@/assets/images/instagram.png" alt="" /></a>
                        <a href="#"><img src="@/assets/images/telegram.png" alt="" /></a>
                    </div>
                </div>
            </div>
            <div class="footer__none-bottom">
                <li class="footer__bottom-link">{{ $t("footer__bottom-link-1") }}</li>
                <li class="footer__bottom-link">{{ $t("footer__bottom-link-2") }}</li>
                <p class="footer__bottom-text">
                    {{ $t("footer__bottom-text") }}
                </p>
            </div>
        </div>
    </footer>
</template>
