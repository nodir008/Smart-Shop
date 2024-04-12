<script setup>
import { useBasketStore } from "@/stores/basketStore";
import { onMounted, ref, computed } from "vue";
import { useOrderStore } from "@/stores/orderStore";
import { useOrderTimeStore } from "@/stores/orderTimeStore";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";
import MinusIcon from "@/assets/icons/MinusIcon.vue";
import PlusIcon from "@/assets/icons/PlusIcon.vue";

// Ma'lumotlar va funksiyalar
const orderStore = useOrderStore();
const basketStore = useBasketStore();
const currentDateTime = ref("");
const showOrderConfirmation = ref(false);
const drawerTitle = ref(true);

// Check if all items are selected
const checkboxAdd = computed(() => {
    return basketStore.drawer.every((item) => item.isdrawerForActive);
});

// Maxsulotlar sonini yangilash funksiyasi
const updateQuantity = (item) => {
    const newQuantity = Math.max(1, item.quantity);
    basketStore.updateQuantity(item.id, newQuantity);
};

// Umumiy narxni hisoblash funksiyasi
const calculateTotalPrice = () => {
    let total = 0;
    basketStore.drawer.forEach((item) => {
        if (item && item.price && item.quantity && item.isdrawerForActive) {
            total += item.price * item.quantity;
        }
    });
    return total.toFixed(0);
};

// Chegirma qo'llanilgan yangi umumiy narxni hisoblash funksiyasi
const calculateNewTotalPrice = () => {
    let total = 0;
    basketStore.drawer.forEach((item) => {
        if (item && item.price && item.discountPercentage && item.quantity && item.isdrawerForActive) {
            total += (item.price - (item.price * item.discountPercentage) / 100) * item.quantity;
        }
    });
    return total.toFixed(0);
};

// Chegirma miqdorini hisoblash funksiyasi
const calculateNewTotalPrice2 = () => {
    let total = 0;
    basketStore.drawer.forEach((item) => {
        if (item && item.price && item.discountPercentage && item.quantity && item.isdrawerForActive) {
            total += ((item.price * item.discountPercentage) / 100) * item.quantity;
        }
    });
    return total.toFixed(0);
};

// Maxsulot narxini hisoblash funksiyasi
const calculateItemPrice = (item) => {
    if (item && item.price && item.discountPercentage && item.quantity) {
        const discountedPrice = item.price - (item.price * item.discountPercentage) / 100;
        return (discountedPrice * item.quantity).toFixed(0);
    }
    return "0";
};

// Maxsulotlar umumiy narxini hisoblash funksiyasi
const calculateTotalItemPrice = (item) => {
    if (item && item.price && item.quantity) {
        return (item.price * item.quantity).toFixed(0);
    }
    return "0";
};

// Buyurtmaga qo'shish funksiyasi

const addToOrder = () => {
    basketStore.drawer.forEach((item) => {
        if (item.isdrawerForActive) {
            const now = new Date();
            const deliveryTime = new Date(now.getTime() + 60000);

            const deliveryTimeFormatted = deliveryTime.toLocaleString();
            orderStore.setDeliveryTime(deliveryTimeFormatted);
            console.log(deliveryTimeFormatted);

            setTimeout(() => {
                orderStore.removeOrder();
            }, 60000);
            basketStore.addToOrderStore();
        }
    });
};

const toggleCheckboxAdd = () => {
    // Har bir element uchun isdrawerForActive qiymatini qarshilavchi qilib sozlash
    const newValue = !checkboxAdd.value;
    basketStore.drawer.forEach((item) => {
        item.isdrawerForActive = newValue;
    });
};
</script>

<template>
    <div class="drawer-div">
        <div class="container">
            <h2 class="drawer-title" v-if="basketStore.drawer.length > 0">
                {{ $t("drawer-title") }}
                <span class="drawer-span">{{ basketStore.drawer.length }} {{ $t("drawer-span") }}</span>
            </h2>

            <div class="drawer">
                <div class="drawer__products" v-if="basketStore.drawer.length > 0">
                    <div class="drawer__products-top">
                        <div class="drawer__products-top__checklist">
                            <p class="drawer__products-top-title">
                                {{ $t("drawer__products-top-title") }}
                            </p>
                            <div class="checkbox-wrapper-33">
                                <label class="checkbox">
                                    <input class="checkbox__trigger visuallyhidden" type="checkbox" v-model="checkboxAdd" @click="toggleCheckboxAdd" />
                                    <span class="checkbox__symbol">
                                        <svg aria-hidden="true" class="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 14l8 7L24 7"></path>
                                        </svg>
                                    </span>
                                </label>
                            </div>
                        </div>
                        

                        <div class="drawer__products-top-div">
                            <p class="drawer__products-top-div-text">
                                {{ $t("drawer__products-top-div-text") }}
                            </p>
                            <p class="drawer__products-top-div-title">
                                {{ $t("drawer__products-top-div-title") }}
                            </p>
                        </div>
                    </div>
                    <div class="drawer__cards">
                        <div class="drawer__card" v-for="item in basketStore.drawer" :key="item.id">
                            <span class="drawer__products-span"></span>
                            <div class="drawer__card-card">
                                <div class="checkbox-wrapper-12">
                                    <div class="cbx">
                                        <input type="checkbox" v-model="item.isdrawerForActive" />

                                        <label for="cbx-12"></label>
                                        <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                                            <path d="M2 8.36364L6.23077 12L13 2"></path>
                                        </svg>
                                    </div>

                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <filter id="goo-12">
                                                <feGaussianBlur result="blur" stdDeviation="4" in="SourceGraphic"></feGaussianBlur>
                                                <feColorMatrix result="goo-12" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" mode="matrix" in="blur"></feColorMatrix>
                                                <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
                                            </filter>
                                        </defs>
                                    </svg>
                                </div>
                                <img class="drawer__card-img" :src="item.thumbnail" alt="" />
                                <div class="drawer__card-div">
                                    <div class="drawer__card-theme">
                                        <RouterLink class="drawer__card-theme-description" :to="'/product/' + item.id">
                                            {{ item.description }}
                                        </RouterLink>
                                        <button class="drawer__card-theme-delete" @click="basketStore.removeDrawerProduct(item.id)"><DeleteIcon />{{ $t("drawer__card-theme-delete") }}</button>
                                    </div>
                                    <div class="drawer__card-count">
                                        <div class="drawer__card-count-theme">
                                            <p class="drawer__card-count-theme-vendor">
                                                {{ $t("drawer__card-count-theme-vendor-b") }}
                                                <span>{{ item.brand }}</span>
                                            </p>
                                            <p class="drawer__card-count-theme-vendor">
                                                {{ $t("drawer__card-count-theme-vendor-c") }}
                                                <RouterLink class="drawer__card-count-theme-vendor-rout" :to="'/category/' + item.category"> {{ item.category }}</RouterLink>
                                            </p>
                                        </div>
                                        <div class="drawer__card-count-count-div">
                                            <div class="drawer__card-count-count">
                                                <button class="drawer__card-count-count-btn" @click="basketStore.decrementQuantity(item.id)">
                                                    <MinusIcon class="drawer__card-count-count-btn-minus" :class="{ active: item.quantity === 1 }" />
                                                </button>
                                                <input class="drawer__card-count-count-inp" type="number" v-model="item.quantity" @input="updateQuantity(item)" />

                                                <button class="drawer__card-count-count-btn" @click="basketStore.incrementQuantity(item.id)">
                                                    <PlusIcon class="drawer__card-count-count-btn-plus" />
                                                </button>
                                            </div>
                                            <p class="drawer__card-count-count-div-text" :class="{ active: item.quantity >= 2 }">
                                                {{ (item.price - (item.price * item.discountPercentage) / 100).toFixed(0) }}
                                                $/ 1{{ $t("drawer__card-count-count-div-text") }}
                                            </p>
                                        </div>

                                        <div class="drawer__card-count-price">
                                            <p class="drawer__card-count-price1">{{ calculateItemPrice(item) }} $</p>
                                            <p class="drawer__card-count-price2">{{ calculateTotalItemPrice(item) }} $</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="drawer__card-none">
                                <div class="drawer__card-none-images">
                                    <div class="drawer__card-none-images-div">
                                        <img class="drawer__card-img" :src="item.thumbnail" alt="" />
                                    <div class="drawer__card-none-theme">
                                        <RouterLink class="drawer__card-theme-description" :to="'/product/' + item.id">
                                            {{ item.title }}
                                        </RouterLink>
                                        <div class="drawer__card-count-theme">
                                            <p class="drawer__card-count-theme-vendor">
                                                {{ $t("drawer__card-count-theme-vendor-b") }}
                                                <span>{{ item.brand }}</span>
                                            </p>
                                            <p class="drawer__card-count-theme-vendor">
                                                {{ $t("drawer__card-count-theme-vendor-c") }}
                                                <RouterLink class="drawer__card-count-theme-vendor-rout" :to="'/category/' + item.category"> {{ item.category }}</RouterLink>
                                            </p>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="checkbox-wrapper-12">
                                        <div class="cbx">
                                            <input type="checkbox" v-model="item.isdrawerForActive" />
    
                                            <label for="cbx-12"></label>
                                            <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                                                <path d="M2 8.36364L6.23077 12L13 2"></path>
                                            </svg>
                                        </div>
    
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <filter id="goo-12">
                                                    <feGaussianBlur result="blur" stdDeviation="4" in="SourceGraphic"></feGaussianBlur>
                                                    <feColorMatrix result="goo-12" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" mode="matrix" in="blur"></feColorMatrix>
                                                    <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
                                                </filter>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <div class="drawer__card-none-div">
                                    <div class="drawer__card-none-count-div">
                                        <div class="drawer__card-count-count">
                                            <button class="drawer__card-count-count-btn" @click="basketStore.decrementQuantity(item.id)">
                                                <MinusIcon class="drawer__card-count-count-btn-minus" :class="{ active: item.quantity === 1 }" />
                                            </button>
                                            <input class="drawer__card-count-count-inp" type="number" v-model="item.quantity" @input="updateQuantity(item)" />

                                            <button class="drawer__card-count-count-btn" @click="basketStore.incrementQuantity(item.id)">
                                                <PlusIcon class="drawer__card-count-count-btn-plus" />
                                            </button>
                                        </div>
                                        <p class="drawer__card-none-count-count-div-text" :class="{ active: item.quantity >= 2 }">
                                            {{ (item.price - (item.price * item.discountPercentage) / 100).toFixed(0) }}
                                            $/ 1{{ $t("drawer__card-count-count-div-text") }}
                                        </p>
                                    </div>

                                    <div class="drawer__card-none-count">
                                        <div class="drawer__card-count-price">
                                            <p class="drawer__card-count-price2">{{ calculateTotalItemPrice(item) }} $</p>
                                            <p class="drawer__card-count-price1">{{ calculateItemPrice(item) }} $</p>
                                        </div>
                                        <button class="drawer__card-theme-delete" @click="basketStore.removeDrawerProduct(item.id)"><DeleteIcon />{{ $t("drawer__card-theme-delete") }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="no__product" v-show="drawerTitle" v-else>
                    <p class="no__product-text">{{ $t("no__product-text") }}</p>
                    <p class="order__no__product-text2">
                        {{ $t("order__no__product-text2") }}
                    </p>
                    <RouterLink to="/" class="no__product-link">{{ $t("no__product-link") }}</RouterLink>
                </div>
                <div class="drawer__price" v-if="basketStore.drawer.length > 0">
                    <h3 class="drawer__price-title" v-if="basketStore.drawer.length == 1">
                        {{ $t("drawer__price-title-1") }}
                    </h3>
                    <h3 class="drawer__price-title" v-else>
                        {{ $t("drawer__price-title-2") }}
                    </h3>
                    <div class="drawer__price-products">
                        <p class="drawer__price-products-text">{{ $t("drawer__price-products-text") }}({{ basketStore.drawer.length }}):</p>
                        <p class="drawer__price-products-price">{{ calculateTotalPrice() }} $</p>
                    </div>
                    <!-- <p class="drawer__price-text">Yetkazib berish M03 10 (Ertaga)</p> -->
                    <p class="drawer__price-text">{{ $t("drawer__price-text") }}{{ currentDateTime }}</p>
                    <div class="drawer__price-price">
                        <p class="drawer__price-price-title">
                            {{ $t("drawer__price-price-title") }}
                        </p>
                        <div class="drawer__price-price-sum">
                            <p class="drawer__price-price-sum1">{{ calculateNewTotalPrice() }} $</p>
                            <p class="drawer__price-price-sum2">{{ $t("drawer__price-price-sum2") }}{{ calculateNewTotalPrice2() }} $</p>
                        </div>
                    </div>
                    <button class="drawer__price-btn" @click="addToOrder">
                        {{ $t("drawer__price-btn") }}
                    </button>
                </div>
            </div>
            <div v-show="showOrderConfirmation" class="no__product">
                <h1 class="no__product-text">
                    {{ $t("no__product-text-2") }}
                </h1>
                <RouterLink class="no__product-link" to="/orders"> {{ $t("no__product-link-2") }}</RouterLink>
            </div>
        </div>
    </div>
</template>
