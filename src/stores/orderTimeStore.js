import { defineStore } from "pinia";
import { useProductsStore } from "./productsStore";

export const useOrderTimeStore = defineStore("orderTime", {
  state: () => ({
    ordersTime: [],
    totalPrice: 0, 
  }),
  actions: {
    orderTimeStoreAdd(id, quantity) {
      const productsStore = useProductsStore();
      const ordersTimePro = productsStore.products?.find((item) => item.id === id);

      if (ordersTimePro) {
        const indexInorders = this.ordersTime.findIndex((item) => item.id === id);

        if (indexInorders !== -1) {
          this.ordersTime[indexInorders].quantity += quantity;
        } else {
          this.ordersTime.push({ ...ordersTimePro, quantity });
        }
      }
    },
    buyOrderTimeStore(id) {
      const productIndex = this.ordersTime.findIndex((item) => item.id === id);
      if (this.ordersTime[productIndex].id == id) {
        this.ordersTime[productIndex].cardBuyShow = false;
        this.ordersTime[productIndex].cardNoneShow = false;
        this.ordersTime[productIndex].cardBuyShowP = true;
        this.ordersTime[productIndex].cardNoneShowP = false;
      }
    },
    removeOrderTimeStore(id) {
      const productIndex = this.ordersTime.findIndex((item) => item.id === id);
      if (productIndex !== -1) {
        this.ordersTime.splice(productIndex, 1);
      }
    }
  },
  persist: true,
});
