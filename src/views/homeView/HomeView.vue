<script setup>
import { ref, watchEffect } from "vue";
import Card from "@/components/card/Card.vue";
import { useProductsStore } from "@/stores/productsStore";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const productsStore = useProductsStore();
const limit = ref(30);
const isLoading = ref(false);
const currentPage = ref(+route.query.page || 1);


function onClickHandler(page) {
    router.push(page === 1 ? "/" : `/?page=${page}`);
    productsStore.getProducts(page * limit.value - limit.value);  
};

function notfound(){
  if(+route.query.page > 7 || +route.query.page === '' ){
    router.push(`/notfound`);
  }
//   if(+route.query.page === '' ){
//     router.push(`/notfound`);
//   }
}
notfound();

const newClick = () => {
    if (limit.value <= productsStore.total) {
        console.log(limit.value <= productsStore.total);
        isLoading.value = true;
        limit.value += 30;
        productsStore.getProducts(0, "", limit.value).then(() => {
            isLoading.value = false;
        });
    } 
};

const newClick2 = () => {
    if (limit.value >= productsStore.total) {
        productsStore.getProducts();
        limit.value = 30;
        scrollToTop();
    }
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

watchEffect(() => {
    productsStore.getProducts(currentPage.value * limit.value - limit.value);
});
</script>

<template>
    <div class="home__view">
        <div class="container">
            <div v-if="!productsStore.products || productsStore.products.length === 0" class="cards__none">
                <img src="@/assets/images/input-none.png" alt="" />
                <h2 class="cards__none-title">
                    {{ $t("cards__none-title") }}
                </h2>
                <p class="cards__none-text">
                    {{ $t("cards__none-text") }}
                </p>
            </div>
            <div class="home__view-div" v-else>
                <div class="home__view-div-top">
                    <h1 class="home__view-title">{{ $t("home__view-title") }}</h1>
                    <vue-awesome-paginate
                        class="home__view-pagination-none"
                        :total-items="+productsStore.total"
                        v-model="currentPage"
                        :items-per-page="30"
                        :max-pages-shown="3"
                        paginate-buttons-class="btn"
                        active-page-class="btn-active"
                        back-button-class="back-btn"
                        next-button-class="next-btn"
                        :on-click="onClickHandler"
                    />
                </div>
                <span class="home__view-hspan"></span>
                <div class="cards">
                    <Card v-for="item in productsStore.products" :key="item.id" :card="item" />
                </div>
                <button v-if="limit <= productsStore.total" @click="newClick" class="hidden-home__view-pagination">
                    <div v-if="isLoading" class="home__view-loader"></div>
                    {{ isLoading ? "" : $t("hidden-home__view-pagination") }}
                </button>

                <button v-else @click="newClick2" class="hidden-home__view-pagination">
                    <div v-if="isLoading" class="home__view-loader"></div>
                    {{ isLoading ? "" : $t("hidden-home__view-pagination-2") }}
                </button>
            </div>
        </div>
    </div>
</template>
