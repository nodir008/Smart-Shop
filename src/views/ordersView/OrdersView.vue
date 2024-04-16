<script setup>
import { useOrderStore } from '@/stores/orderStore';
import { useOrderTimeStore } from '@/stores/orderTimeStore';

const orderTimeStore = useOrderTimeStore()
const orderStore = useOrderStore();

const calculateTotalPrice = () => {
    let total = 0;
    orderStore.orders.forEach((item) => {
        if (item && item.price && item.quantity) {
            total += item.price * item.quantity;
        }
    });
    return total.toFixed(0);
};

const calculateNewTotalPrice = () => {
    let total = 0;
    orderStore.orders.forEach((item) => {
        if (item && item.price && item.discountPercentage && item.quantity) {
            total += (item.price - (item.price * item.discountPercentage) / 100) * item.quantity;
        }
    });
    return total.toFixed(0);
};

const calculateNewTotalPrice2 = () => {
    let total = 0;
    orderStore.orders.forEach((item) => {
        if (item && item.price && item.discountPercentage && item.quantity) {
            total += (item.price * item.discountPercentage / 100) * item.quantity;
        }
    });
    return total.toFixed(0);
};

const calculateItemPrice = (item) => {
    if (item && item.price && item.discountPercentage && item.quantity) {
        const discountedPrice = (item.price - (item.price * item.discountPercentage) / 100);
        return (discountedPrice * item.quantity).toFixed(0);
    }
    return '0';
};

const calculateTotalItemPrice = (item) => {
    if (item && item.price && item.quantity) {
        return (item.price * item.quantity).toFixed(0);
    }
    return '0';
};
</script>

<template>
    <div class="order-div">
        <div class="orders">
            <div class="container">
                <h1 class="orders-title" v-if="orderStore.orders.length > 0"> {{ $t("orders-title") }}</h1>
                <div class="drawer">
                    <div class="drawer__products" v-if="orderStore.orders.length > 0">
                        <div class="drawer__products-top">
                            <p class="drawer__products-top-title">{{ $t("drawer__products-top-title") }}</p>
                            <p class="drawer__card-time-data-2">{{ orderStore.deliveryTime   }}</p>
                        </div>
                        <div class="drawer__cards">
                            <div class="drawer__card" v-for="item in orderStore.orders" :key="item.id">
                                <span class="drawer__products-span"></span>
                                <div class="drawer__card-card">
                                    <img class="drawer__card-img" :src="item.thumbnail" alt="" />
                                    <div class="drawer__card-div">
                                        <div class="drawer__card-theme">
                                            <RouterLink class="drawer__card-theme-description" :to="'/product/' + item.id">
                                                {{ item.description }}
                                            </RouterLink>
                                        </div>
                                        <!-- <div class="drawer__card-time">
                                            <p class="drawer__card-time-text">{{ $t("drawer__card-time-text") }}</p>
                                            <p class="drawer__card-time-data">{{ orderStore.deliveryTime   }}</p>
                                        </div> -->
                                        <div class="drawer__card-count">
                                            <div class="drawer__card-count-theme">
                                                <p class="drawer__card-count-theme-vendor">
                                                    {{ $t("drawer__card-count-theme-vendor-b") }}  <span>{{ item.brand }}</span>
                                                </p>
                                                <p class="drawer__card-count-theme-vendor">
                                                    {{ $t("drawer__card-count-theme-vendor-c") }} 
                                                    <RouterLink class="drawer__card-count-theme-vendor-rout"
                                                        :to="'/category/' + item.category">
                                                        {{ item.category }}
                                                    </RouterLink>
                                                </p>
                                            </div>
                                            <div class="drawer__card-count-count-div">
                                                <p class="drawer__card-count-count-div-txt">
                                                    {{ item.quantity }} {{ $t("drawer__card-count-count-div-text") }}
                                                </p>
                                            </div>

                                            <div class="drawer__card-count-price">
                                                <p class="drawer__card-count-price1">
                                                    {{ calculateItemPrice(item) }} $
                                                </p>
                                                <p class="drawer__card-count-price2">
                                                    {{ calculateTotalItemPrice(item) }} $
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--  -->
                                <div class="drawer__card-none">
                                    <div class="order__card-none-images">
                                        <img class="drawer__card-img" :src="item.thumbnail" alt="" />
                                        <div class="drawer__card-none-theme">
                                            <RouterLink class="drawer__card-theme-description" :to="'/product/' + item.id">
                                                {{ item.title }}
                                            </RouterLink>
                                            <div class="drawer__card-count-theme">
                                                <p class="drawer__card-count-theme-vendor">
                                                    {{ $t("drawer__card-count-theme-vendor-b") }} <span>{{ item.brand }}</span>
                                                </p>
                                                <p class="drawer__card-count-theme-vendor">
                                                    {{ $t("drawer__card-count-theme-vendor-c") }}
                                                    <RouterLink class="drawer__card-count-theme-vendor-rout" :to="'/category/' + item.category"> {{ item.category }}</RouterLink>
                                                </p>
                                            </div>
                                        </div>
                                            <!-- <div class="drawer__card-time">
                                                <p class="drawer__card-time-text">{{ $t("drawer__card-time-text") }}</p>
                                                <p class="drawer__card-time-data">{{ orderStore.deliveryTime   }}</p>
                                            </div> -->
                                    </div>
                                    <div class="drawer__card-none-div">
                                        <div class="drawer__card-none-count-div">
                                                <p class="drawer__card-count-count-div-txt">
                                                    {{ item.quantity }} {{ $t("drawer__card-count-count-div-text") }}
                                                </p>
                                        </div>
        
                                        <div class="drawer__card-none-count">
                                            <div class="drawer__card-count-price">
                                                <p class="drawer__card-count-price2">{{ calculateTotalItemPrice(item) }} $</p>
                                                <p class="drawer__card-count-price1">{{ calculateItemPrice(item) }} $</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <!-- <div class="no__product" v-else>
                        <p class="order__no__product-title">Siz xozircha mahsulot buyurtma qilmagansiz</p>
                        <p class="order__no__product-text2">Bosh sahifadagi to’plamlardan yoki kerakli mahsulotni qidiruv orqali toping</p>
                        <RouterLink to="/" class="no__product-link">Bosh sahifa</RouterLink>
                      </div> -->
                    <div class="order__price" v-if="orderStore.orders.length > 0">
                        <h3 class="order__price-title" v-if="orderStore.orders.length == 1">{{ $t("drawer__price-title-1") }}</h3>
                        <h3 class="order__price-title" v-else>{{ $t("drawer__price-title-2") }}</h3>
                        <div class="order__price-products">
                            <p class="order__price-products-text">
                                {{ $t("drawer__price-products-text") }} ({{ orderStore.orders.length }}):
                            </p>
                            <p class="order__price-products-price">
                                {{ calculateTotalPrice() }} $
                            </p>
                        </div>
                        <!-- <p class="order__price-text">Yetkazib berish M03 10 (Ertaga)</p> -->
                        <p class="order__price-text">{{ $t("order__price-text") }} </p>
                        <div class="order__price-price">
                            <p class="order__price-price-title">{{ $t("order__price-price-title") }}</p>
                            <div class="order__price-price-sum">
                                <p class="order__price-price-sum1">
                                    {{ calculateNewTotalPrice() }} $
                                </p>
                                <p class="order__price-price-sum2">
                                    {{ $t("drawer__price-price-sum2") }} {{ calculateNewTotalPrice2() }} $
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>