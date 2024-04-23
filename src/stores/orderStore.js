import { defineStore } from "pinia";
import { useOrderTimeStore } from "./orderTimeStore";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
    deliveryTime: null,
  }),
  actions: {
    orderStoreAdd(product, quantity) {
      if (product.id) {
        const indexInOrders = this.orders.findIndex(item => item.id === product.id);
        indexInOrders !== -1
          ? this.orders[indexInOrders].quantity += quantity
          : this.orders.push({ ...product, quantity });
      }
    },

    resetOrder() {
      this.orders = [];
    },

    removeOrder() {
      const orderTimeStore = useOrderTimeStore();
      this.orders.forEach(item => {
        orderTimeStore.ordersTime.push({ ...item, cardBuyShowP: false, cardNoneShowP: false, cardBuyShow: true, cardNoneShow: true, quantity: item.quantity });
      });
      this.orders = [];
    },

    setDeliveryTime(newTime) {
      this.deliveryTime = newTime;
      localStorage.setItem("deliveryTime", newTime);
    },
  },
  persist: true,
});
