import { defineStore } from "pinia";
import apiProducts from "@/helpers/api";

export const useCategoryStore = defineStore("categorySingle", {
  state: () => ({
    category: null,
  }),
  actions: {
    async getCategorySingle(title) {
      try {
        const res = await apiProducts.getCategorySingle(title);
        this.category = res.products.map(item => ({...item, category: title}));
      } catch (error) {
        console.error(error);
      }
    },
  },
  persist: true
});
