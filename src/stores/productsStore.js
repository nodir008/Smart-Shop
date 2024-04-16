import { defineStore } from 'pinia'
import apiProducts from '@/helpers/api'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: null,
    total: null,
    locale: 'UZ'
  }),
  actions: {
    async getProducts(skip = 0, keyword = "", limit = 20) {
      const { products, total } = await this.fetchProducts(apiProducts.getProducts, skip, keyword, limit);
      this.products = products;
      this.total = total;
    },
    async getSearch(keyword) {
      const { products, total } = await this.fetchProducts(apiProducts.getSearch, 0, keyword);
      this.products = products;
      this.total = total;
    },
    async fetchProducts(apiMethod, ...args) {
      try {
        const res = await apiMethod(...args);
        return { products: res.products, total: res.total };
      } catch (error) {
        console.error(error);
        return { products: null, total: null };
      }
    },
  },
  persist: true
});
