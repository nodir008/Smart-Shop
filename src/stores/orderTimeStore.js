import { defineStore } from "pinia";
import { useProductsStore } from "./productsStore";

export const useOrderTimeStore = defineStore("orderTime", {
  state: () => ({
    ordersTime: [],
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
  },
  persist: true,
});