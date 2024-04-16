import { defineStore } from "pinia";
import apiProducts from "@/helpers/api";

export const useCategoryStore = defineStore("categorySingle", {
  state: () => ({
    category: null,
  }),
  actions: {
    async getCategorySingle(title) {
      try {
        this.category = (await apiProducts.getCategorySingle(title)).products.map(item => ({ ...item, category: title }));
      } catch (error) {
        console.error(error);
      }
    },
  },
  persist: true
});
