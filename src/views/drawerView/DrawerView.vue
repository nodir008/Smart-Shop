<script setup>
import { useBasketStore } from "@/stores/basketStore";
import { onMounted, ref } from "vue";
import { useOrderStore } from "@/stores/orderStore";
import { useOrderTimeStore } from "@/stores/orderTimeStore";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";
import MinusIcon from "@/assets/icons/MinusIcon.vue";
import PlusIcon from "@/assets/icons/PlusIcon.vue";

const orderStore = useOrderStore();
const orderTimeStore = useOrderTimeStore();
const basketStore = useBasketStore();
const currentDateTime = ref("");
const showOrderConfirmation = ref(false);
const drawerTitle = ref(true);

const updateQuantity = (item) => {
  const newQuantity = Math.max(1, item.quantity);
  basketStore.updateQuantity(item.id, newQuantity);
};

const calculateTotalPrice = () => {
  let total = 0;
  basketStore.drawer.forEach((item) => {
    if (item && item.price && item.quantity) {
      total += item.price * item.quantity;
    }
  });
  return total.toFixed(0);
};

const calculateNewTotalPrice = () => {
  let total = 0;
  basketStore.drawer.forEach((item) => {
    if (item && item.price && item.discountPercentage && item.quantity) {
      total +=
        (item.price - (item.price * item.discountPercentage) / 100) *
        item.quantity;
    }
  });
  return total.toFixed(0);
};

const calculateNewTotalPrice2 = () => {
  let total = 0;
  basketStore.drawer.forEach((item) => {
    if (item && item.price && item.discountPercentage && item.quantity) {
      total += ((item.price * item.discountPercentage) / 100) * item.quantity;
    }
  });
  return total.toFixed(0);
};

onMounted(() => {
  updateCurrentDateTime();

  // Update the date and time every hour
  setInterval(() => {
    updateCurrentDateTime();
  }, 3600000);
});

function updateCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = (now.getDate() + 1).toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = (now.getMinutes() + 1).toString().padStart(2, "0"); // Add 1 minute
  const seconds = now.getSeconds().toString().padStart(2, "0");

  currentDateTime.value = ` ${hours}:${minutes}:${seconds}`;
  setTimeout(updateCurrentDateTime, 1000);
}

const calculateItemPrice = (item) => {
  if (item && item.price && item.discountPercentage && item.quantity) {
    const discountedPrice =
      item.price - (item.price * item.discountPercentage) / 100;
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

const addToOrder = () => {
  basketStore.addToOrderStore();
  const now = new Date();
  const deliveryTime = new Date(now.getTime() + 60000);

  // Construct delivery time including hour, minute, day, month, and year
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

  // Remove products from order after 1 minute
  setTimeout(() => {
    orderStore.orders.forEach((item) => {
      orderStore.removeOrder(item.id);
    });
  }, 60000);

  // Show the order confirmation message for 3 seconds
  showOrderConfirmation.value = true;
  drawerTitle.value = false;
  setTimeout(() => {
    showOrderConfirmation.value = false;
    drawerTitle.value = true;
  }, 3000);
};
</script>


<template>
  <div class="drawer-div">
    <div class="container">
      <h2 class="drawer-title" v-if="basketStore.drawer.length > 0">
        {{ $t("drawer-title") }}
        <span class="drawer-span"
          >{{ basketStore.drawer.length }} {{ $t("drawer-span") }}</span
        >
      </h2>

      <div class="drawer">
        <div class="drawer__products" v-if="basketStore.drawer.length > 0">
          <div class="drawer__products-top">
            <p class="drawer__products-top-title">
              {{ $t("drawer__products-top-title") }}
            </p>
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
            <div
              class="drawer__card"
              v-for="item in basketStore.drawer"
              :key="item.id"
            >
              <span class="drawer__products-span"></span>
              <div class="drawer__card-card">
                <img class="drawer__card-img" :src="item.thumbnail" alt="" />
                <div class="drawer__card-div">
                  <div class="drawer__card-theme">
                    <RouterLink
                      class="drawer__card-theme-description"
                      :to="'/product/' + item.id"
                    >
                      {{ item.description }}
                    </RouterLink>
                    <button
                      class="drawer__card-theme-delete"
                      @click="basketStore.removeDrawerProduct(item.id)"
                    >
                      <DeleteIcon />{{ $t("drawer__card-theme-delete") }}
                    </button>
                  </div>
                  <div class="drawer__card-count">
                    <div class="drawer__card-count-theme">
                      <p class="drawer__card-count-theme-vendor">
                        {{ $t("drawer__card-count-theme-vendor-b") }}
                        <span>{{ item.brand }}</span>
                      </p>
                      <p class="drawer__card-count-theme-vendor">
                        {{ $t("drawer__card-count-theme-vendor-c") }}
                        <RouterLink
                          class="drawer__card-count-theme-vendor-rout"
                          :to="'/category/' + item.category"
                        >
                          {{ item.category }}</RouterLink
                        >
                      </p>
                    </div>
                    <div class="drawer__card-count-count-div">
                      <div class="drawer__card-count-count">
                        <button
                          class="drawer__card-count-count-btn"
                          @click="basketStore.decrementQuantity(item.id)"
                        >
                          <MinusIcon
                            class="drawer__card-count-count-btn-minus"
                            :class="{ active: item.quantity === 1 }"
                          />
                        </button>
                        <input
                          class="drawer__card-count-count-inp"
                          type="number"
                          v-model="item.quantity"
                          @input="updateQuantity(item)"
                        />

                        <button
                          class="drawer__card-count-count-btn"
                          @click="basketStore.incrementQuantity(item.id)"
                        >
                          <PlusIcon class="drawer__card-count-count-btn-plus" />
                        </button>
                      </div>
                      <p
                        class="drawer__card-count-count-div-text"
                        :class="{ active: item.quantity >= 2 }"
                      >
                        {{
                          (
                            item.price -
                            (item.price * item.discountPercentage) / 100
                          ).toFixed(0)
                        }}
                        $/ 1{{ $t("drawer__card-count-count-div-text") }}
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

              <div class="drawer__card-none">
                <div class="drawer__card-none-images">
                  <img class="drawer__card-img" :src="item.thumbnail" alt="" />
                  <div class="drawer__card-none-theme">
                    <RouterLink
                      class="drawer__card-theme-description"
                      :to="'/product/' + item.id"
                    >
                      {{ item.title }}
                    </RouterLink>
                    <div class="drawer__card-count-theme">
                      <p class="drawer__card-count-theme-vendor">
                        {{ $t("drawer__card-count-theme-vendor-b") }}
                        <span>{{ item.brand }}</span>
                      </p>
                      <p class="drawer__card-count-theme-vendor">
                        {{ $t("drawer__card-count-theme-vendor-c") }}
                        <RouterLink
                          class="drawer__card-count-theme-vendor-rout"
                          :to="'/category/' + item.category"
                        >
                          {{ item.category }}</RouterLink
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="drawer__card-none-div">
                  <div class="drawer__card-none-count-div">
                    <div class="drawer__card-count-count">
                      <button
                        class="drawer__card-count-count-btn"
                        @click="basketStore.decrementQuantity(item.id)"
                      >
                        <MinusIcon
                          class="drawer__card-count-count-btn-minus"
                          :class="{ active: item.quantity === 1 }"
                        />
                      </button>
                      <input
                        class="drawer__card-count-count-inp"
                        type="number"
                        v-model="item.quantity"
                        @input="updateQuantity(item)"
                      />

                      <button
                        class="drawer__card-count-count-btn"
                        @click="basketStore.incrementQuantity(item.id)"
                      >
                        <PlusIcon class="drawer__card-count-count-btn-plus" />
                      </button>
                    </div>
                    <p
                      class="drawer__card-none-count-count-div-text"
                      :class="{ active: item.quantity >= 2 }"
                    >
                      {{
                        (
                          item.price -
                          (item.price * item.discountPercentage) / 100
                        ).toFixed(0)
                      }}
                      $/ 1{{ $t("drawer__card-count-count-div-text") }}
                    </p>
                  </div>

                  <div class="drawer__card-none-count">
                    <div class="drawer__card-count-price">
                      <p class="drawer__card-count-price2">
                        {{ calculateTotalItemPrice(item) }} $
                      </p>
                      <p class="drawer__card-count-price1">
                        {{ calculateItemPrice(item) }} $
                      </p>
                    </div>
                    <button
                      class="drawer__card-theme-delete"
                      @click="basketStore.removeDrawerProduct(item.id)"
                    >
                      <DeleteIcon />{{ $t("drawer__card-theme-delete") }}
                    </button>
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
          <RouterLink to="/" class="no__product-link">{{
            $t("no__product-link")
          }}</RouterLink>
        </div>
        <div class="drawer__price" v-if="basketStore.drawer.length > 0">
          <h3 class="drawer__price-title" v-if="basketStore.drawer.length == 1">
            {{ $t("drawer__price-title-1") }}
          </h3>
          <h3 class="drawer__price-title" v-else>
            {{ $t("drawer__price-title-2") }}
          </h3>
          <div class="drawer__price-products">
            <p class="drawer__price-products-text">
              {{ $t("drawer__price-products-text") }}({{
                basketStore.drawer.length
              }}):
            </p>
            <p class="drawer__price-products-price">
              {{ calculateTotalPrice() }} $
            </p>
          </div>
          <!-- <p class="drawer__price-text">Yetkazib berish M03 10 (Ertaga)</p> -->
          <p class="drawer__price-text">
            {{ $t("drawer__price-text") }}{{ currentDateTime }}
          </p>
          <div class="drawer__price-price">
            <p class="drawer__price-price-title">
              {{ $t("drawer__price-price-title") }}
            </p>
            <div class="drawer__price-price-sum">
              <p class="drawer__price-price-sum1">
                {{ calculateNewTotalPrice() }} $
              </p>
              <p class="drawer__price-price-sum2">
                {{ $t("drawer__price-price-sum2")
                }}{{ calculateNewTotalPrice2() }} $
              </p>
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
        <RouterLink class="no__product-link" to="/orders"
          >   {{ $t("no__product-link-2") }}</RouterLink
        >
      </div>
    </div>
  </div>
</template>
