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
      try {
        const res = await apiProducts.getProducts(skip, keyword, limit)
        this.products = res.products
        this.total = res.total
      } catch (error) {
        console.error(error);
      }
    },
    async getSearch(keyword) {
      try {
        const res = await apiProducts.getSearch(keyword)
        this.products = res.products
        this.total = res.total
      } catch (error) {
        console.error(error);
      }
    },
  },
  persist: true
})