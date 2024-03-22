<script setup>
// import { useBasketStore } from '@/stores/basketStore';
import { onMounted, ref } from "vue";
import { useOrderTimeStore } from "@/stores/orderTimeStore";
import { useOrderStore } from "@/stores/orderStore";

const orderStore = useOrderStore();

const orderTimeStore = useOrderTimeStore();
const calculateTotalPrice = () => {
    let total = 0;
    orderTimeStore.ordersTime.forEach((item) => {
        if (item && item.price && item.quantity) {
            total += item.price * item.quantity;
        }
    });
    return total.toFixed(0);
};

const calculateNewTotalPrice = () => {
    let total = 0;
    orderTimeStore.ordersTime.forEach((item) => {
        if (item && item.price && item.discountPercentage && item.quantity) {
            total += (item.price - (item.price * item.discountPercentage) / 100) * item.quantity;
        }
    });
    return total.toFixed(0);
};

const calculateNewTotalPrice2 = () => {
    let total = 0;
    orderTimeStore.ordersTime.forEach((item) => {
        if (item && item.price && item.discountPercentage && item.quantity) {
            total += ((item.price * item.discountPercentage) / 100) * item.quantity;
        }
    });
    return total.toFixed(0);
};

const calculateItemPrice = (item) => {
    if (item && item.price && item.discountPercentage && item.quantity) {
        const discountedPrice = item.price - (item.price * item.discountPercentage) / 100;
        return (discountedPrice * item.quantity).toFixed(0);
    }
    return "0";
};

const calculateTotalItemPrice = (item) => {
    if (item && item.price && item.quantity) {
        return (item.price * item.quantity).toFixed(0);
    }
    return "0";
};
</script>

<template>
    <div class="orderTime-div">
        <div class="orders">
            <div class="container">
                <h1 class="orders-title" v-if="orderTimeStore.ordersTime.length || orderStore.orders.length > 0">Sotib olingan mahsulotlar</h1>

                <div class="drawer">
                    <div class="drawer__products" v-if="orderTimeStore.ordersTime.length || orderStore.orders.length > 0">
                        <div class="drawer__products-top">
                            <p class="drawer__products-top-title" v-if="orderTimeStore.ordersTime.length > 0">Hamma mahsulotlar</p>
                            <p class="drawer__products-top-title" v-else>Mahsulot sotib olmagansiz</p>
                        </div>
                        <div class="drawer__cards">
                            <div class="drawer__card" v-for="item in orderTimeStore.ordersTime" :key="item.id">
                                <span class="drawer__products-span"></span>
                                <div class="drawer__card-card">
                                    <img class="drawer__card-img" :src="item.thumbnail" alt="" />
                                    <div class="drawer__card-div">
                                        <div class="drawer__card-theme">
                                            <RouterLink class="drawer__card-theme-description" :to="'/product/' + item.id">
                                                {{ item.description }}
                                            </RouterLink>
                                        </div>
                                        <div class="drawer__card-count">
                                            <div class="drawer__card-count-theme">
                                                <p class="drawer__card-count-theme-vendor">
                                                    Brand: <span>{{ item.brand }}</span>
                                                </p>
                                                <p class="drawer__card-count-theme-vendor">
                                                    Category:
                                                    <RouterLink class="drawer__card-count-theme-vendor-rout" :to="'/category/' + item.category">
                                                        {{ item.category }}
                                                    </RouterLink>
                                                </p>
                                            </div>
                                            <div class="drawer__card-count-count-div">
                                                <p class="drawer__card-count-count-div-txt">{{ item.quantity }} dona</p>
                                            </div>
                                            <div class="drawer__card-count-buy">
                                                <button class="drawer__card-count-buy-btn">Qabul qilish</button>
                                                <button class="drawer__card-count-buy-btn">Qaytarib yuborish</button>
                                            </div>
                                            <div class="drawer__card-count-price">
                                                <p class="drawer__card-count-price1">{{ calculateItemPrice(item) }} $</p>
                                                <p class="drawer__card-count-price2">{{ calculateTotalItemPrice(item) }} $</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="no__product" v-else>
                        <p class="order__no__product-title">{{ $t('order__no__product-title') }}</p>
                        <p class="order__no__product-text2">{{ $t('order__no__product-text2') }}</p>
                        <RouterLink to="/" class="no__product-link">{{ $t('no__product-link') }}</RouterLink>
                    </div>
                    <div class="order__price" v-if="orderTimeStore.ordersTime.length || orderStore.orders.length > 0">
                        <h3 class="order__price-title" v-if="orderTimeStore.ordersTime.length == 1">Buyurtmangiz</h3>
                        <h3 class="order__price-title" v-else>Buyurtmalaringiz</h3>
                        <div class="order__price-products">
                            <p class="order__price-products-text">Mahsulotlar ({{ orderTimeStore.ordersTime.length }}):</p>
                            <p class="order__price-products-price">{{ calculateTotalPrice() }} $</p>
                        </div>
                        <!-- <p class="order__price-text">Yetkazib berish M03 10 (Ertaga)</p> -->
                        <p class="order__price-text">Yetkazib berildi</p>
                        <div class="order__price-price">
                            <p class="order__price-price-title">Jami:</p>
                            <div class="order__price-price-sum">
                                <p class="order__price-price-sum1">{{ calculateNewTotalPrice() }} $</p>
                                <p class="order__price-price-sum2">Tejovingiz: {{ calculateNewTotalPrice2() }} $</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
