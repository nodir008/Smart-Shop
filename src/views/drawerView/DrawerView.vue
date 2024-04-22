<script setup>
import { useBasketStore } from "@/stores/basketStore";
import { onMounted, ref, computed } from "vue";
import { useOrderStore } from "@/stores/orderStore";
import { useOrderTimeStore } from "@/stores/orderTimeStore";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";
import MinusIcon from "@/assets/icons/MinusIcon.vue";
import PlusIcon from "@/assets/icons/PlusIcon.vue";
import CheckIcon from "@/assets/icons/Check.vue";

const orderStore = useOrderStore();
const basketStore = useBasketStore();
const currentDateTime = ref("");
const drawerTitle = ref(true);

const updateCurrentDateTime = () => {
  const now = new Date();
  const futureTime = new Date(now.getTime() + 60000);
  currentDateTime.value = futureTime.toLocaleString();
};

onMounted(() => {
  updateCurrentDateTime();
  setInterval(updateCurrentDateTime, 1000);
});

const checkboxAdd = computed(() => {
  return basketStore.drawer.every((item) => item.isdrawerForActive);
});

const updateQuantity = (item) => {
  const newQuantity = Math.max(1, item.quantity);
  basketStore.updateQuantity(item.id, newQuantity);
};

const calculateTotalPrice = () => {
  return basketStore.drawer.reduce((total, item) => {
    if (item && item.price && item.quantity && item.isdrawerForActive) {
      total += item.price * item.quantity;
    }
    return total;
  }, 0).toFixed(0);
};

const calculateNewTotalPrice = () => {
  return basketStore.drawer.reduce((total, item) => {
    if (item && item.price && item.discountPercentage && item.quantity && item.isdrawerForActive) {
      total += (item.price - (item.price * item.discountPercentage) / 100) * item.quantity;
    }
    return total;
  }, 0).toFixed(0);
};

const calculateNewTotalPrice2 = () => {
  return basketStore.drawer.reduce((total, item) => {
    if (item && item.price && item.discountPercentage && item.quantity && item.isdrawerForActive) {
      total += ((item.price * item.discountPercentage) / 100) * item.quantity;
    }
    return total;
  }, 0).toFixed(0);
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

const addToOrder = () => {
  basketStore.drawer.forEach((item) => {
    if (item.isdrawerForActive) {
      const now = new Date();
      const deliveryTime = new Date(now.getTime() + 60000);
      basketStore.showOrderConfirmation = true;

      const deliveryTimeFormatted = deliveryTime.toLocaleString();
      orderStore.setDeliveryTime(deliveryTimeFormatted);

      setTimeout(() => {
        orderStore.removeOrder();
      }, 60000);
      basketStore.addToOrderStore();
    }
  });
};

const toggleCheckboxAdd = () => {
  const newValue = !checkboxAdd.value;
  basketStore.drawer.forEach((item) => {
    item.isdrawerForActive = newValue;
  });
};

const isAllItemsInactive = computed(() => {
  return basketStore.drawer.every((item) => !item.isdrawerForActive);
});

const activeItemCount = computed(() => {
  return basketStore.drawer.filter(item => item.isdrawerForActive).length;
});



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
            <div class="drawer__products-top__checklist">
              <p class="drawer__products-top-title">
                {{ $t("drawer__products-top-title") }}
              </p>
              <div class="checkbox-wrapper-33">
                <label class="checkbox">
                  <input
                    class="checkbox__trigger visuallyhidden"
                    type="checkbox"
                    v-model="checkboxAdd"
                    @click="toggleCheckboxAdd"
                  />
                  <span class="checkbox__symbol">
                    <svg
                      aria-hidden="true"
                      class="icon-checkbox"
                      width="28px"
                      height="28px"
                      viewBox="0 0 28 28"
                      version="1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
            <div
              class="drawer__card"
              v-for="item in basketStore.drawer"
              :key="item.id"
            >
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
                        <feGaussianBlur
                          result="blur"
                          stdDeviation="4"
                          in="SourceGraphic"
                        ></feGaussianBlur>
                        <feColorMatrix
                          result="goo-12"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                          mode="matrix"
                          in="blur"
                        ></feColorMatrix>
                        <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </div>
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
                        <span class="tooltiptext" :class="{active: item.quantity == item.stock}"> {{ $t("productSingleStore__product-stock-laungage") }} {{ item.quantity }} {{ $t("product__theme-count-text-2") }}</span>
                          <PlusIcon class="drawer__card-count-count-btn-plus" :class="{active: item.quantity == item.stock}" />
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
                  <div class="drawer__card-none-images-div">
                    <img
                      class="drawer__card-img"
                      :src="item.thumbnail"
                      alt=""
                    />
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
                  <div class="checkbox-wrapper">
                    <label>
                      <input type="checkbox" v-model="item.isdrawerForActive" />
                      <span class="checkbox"></span>
                    </label>
                  </div>
                  <!-- <input type="checkbox" v-model="item.isdrawerForActive" /> -->
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
                        <PlusIcon class="drawer__card-count-count-btn-plus" :class="{active: item.quantity == item.stock}"  />
                      </button>
                    </div>
                    <p
                      class="drawer__card-none-count-count-div-text"
                      :class="{ active: item.quantity > 1 }"
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
                activeItemCount 
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
          <button
            class="drawer__price-btn"
            :class="{ active: isAllItemsInactive }"
            @click="addToOrder"
          >
            {{ $t("drawer__price-btn") }}
          </button>
        </div>
      </div>
      <div
        :class="{ active: basketStore.showOrderConfirmation }"
        class="no__product-driwer"
      >
        <h3 v-if="basketStore.imgOrder.length === 1 ">{{ $t("fixed__theme-title") }} </h3>
        <h3 v-if="basketStore.imgOrder.length !== 1 ">{{ $t("fixed__theme-title-3") }} </h3>
        <div class="no__product-driwer-items"  >
          <img v-for="(image, i) in basketStore.imgOrder" :key="i" :src="image" alt="" />
        </div>
        <RouterLink class="no__product-driwer-links" to="/orders">{{
          $t("no__product-link-2")
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>
