import { defineStore } from "pinia";
import apiProducts from "@/helpers/api";

export const useProductsCategories = defineStore("productsCategories", {
  state: () => ({
    categorie: null,
  }),
  actions: {
    async getCategories() {
      try {
        const res = await apiProducts.getCategories();
        // console.log(res);
        this.categorie = res
      } catch (error) {
        console.error(error);
      }
    },
  },
  persist: true
});
