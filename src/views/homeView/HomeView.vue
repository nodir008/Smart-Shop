<script setup>
import { ref } from "vue";
import Card from "@/components/card/Card.vue";
import { useProductsStore } from "@/stores/productsStore";
import Toast from '@/components/toast/Toast.vue'

const productsStore = useProductsStore();
const currentPage = ref(1);
const limit = ref(20);

const onClickHandler = (page) => {
  console.log(page);
  productsStore.getProducts(page * 20 - 20 );
};

const newClick = () => {
  // Increment the limit value by 20
  limit.value += 20;
  productsStore.getProducts(0, '', limit.value); // Pass the updated limit to getProducts
}

productsStore.getProducts();

</script>
<template>
  <div class="home__view">
    <div class="container">
      <div v-if="!productsStore.products || productsStore.products.length === 0" class="cards__none">
        <img src="@/assets/images/input-none.png" alt="" />
        <h2 class="cards__none-title">
          Biz siz qidirayotgan narsani topa olmadik
        </h2>
        <p class="cards__none-text">
          Mahsulot nomida xatolik yoki bizda hali bunday mahsulot boʻlmasligi
          mumkin
        </p>
      </div>
      <div class="home__view-div" v-else>
        <div class="home__view-div-top">
          <h1 class="home__view-title">{{ $t('home__view-title') }}</h1>
          <vue-awesome-paginate
          class="home__view-pagination-none"
            :total-items="+productsStore.total"
            v-model="currentPage"
            :items-per-page="20"
            :max-pages-shown="5"
            paginate-buttons-class="btn"
            active-page-class="btn-active"
            back-button-class="back-btn"
            next-button-class="next-btn"
            :on-click="onClickHandler"
          />
        </div>




        <div class="cards">
          <Card v-for="item in productsStore.products" :key="item.id" :card="item" />
        </div>

            <button @click="newClick" class="hidden-home__view-pagination" > {{ $t("hidden-home__view-pagination") }}</button>
       
        



      </div>
    </div>
    
    <Toast />
  </div>
</template>