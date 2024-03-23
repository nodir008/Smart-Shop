<script setup>
import { useProductsCategories } from "@/stores/productsCategories";
import { useCategoryStore } from "@/stores/categorySingleStore"
;
const categoryStore = useCategoryStore();
const productsCategories = useProductsCategories();
productsCategories.getCategories();
</script>

<template>
    <div class="katalog">
            <h3 class="katalog-title">{{ $t("nav__category-title") }}</h3>
        <RouterLink
            v-for="title in productsCategories.categorie"
            :to="'/category/' + title"
            class="nav__category-page"
            :key="title.id"
            @click="katalog = false, categoryStore.getCategorySingle(title)"
          >
            {{ title }}
          </RouterLink>
    </div>
</template>