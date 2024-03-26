<script setup>
import { useProductsCategories } from "@/stores/productsCategories";
import { useCategoryStore } from "@/stores/categorySingleStore";
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  katalog: Boolean,
});
const emits = defineEmits(["closeKatalog"]);

const categoryStore = useCategoryStore();
const productsCategories = useProductsCategories();

const closeKatalogAndLoadCategory = (title) => {
  emits("closeKatalog");
  categoryStore.getCategorySingle(title);
  scrollToTop();
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <div class="katalog">
    <h3 class="katalog-title">{{ $t("nav__category-title") }}</h3>
    <RouterLink
      v-for="title in productsCategories.categorie"
      :to="'/category/' + title"
      class="nav__category-page"
      :key="title.id"
      @click="closeKatalogAndLoadCategory(title)"
    >
      {{ title }}
    </RouterLink>
  </div>
</template>
