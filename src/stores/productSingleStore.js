import { defineStore } from "pinia";
import apiProducts from "@/helpers/api";

export const useProductSingleStore = defineStore("productSingle", {
  state: () => ({
    product: null,
  }),
  actions: {
    async getSingleProduct(id) {
      try {
        const res = await apiProducts.getSingleProduct(id);
        // console.log(res);
        this.product = res;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
