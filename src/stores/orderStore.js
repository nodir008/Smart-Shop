import { defineStore } from "pinia";
import { useOrderTimeStore } from "./orderTimeStore";
import { useProductsStore } from "./productsStore";
import { useCategoryStore } from "./categorySingleStore";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
    deliveryTime: null,
  }),
  actions: {
    orderStoreAdd(id, quantity) {
      const productsStore = useProductsStore();
      const ordersPro = productsStore.products?.find((item) => item.id === id);
      const categorySingle = useCategoryStore();
      const ordersCategory = categorySingle.category?.find((item) => item.id == id);

      const orderToAdd = ordersPro || ordersCategory;
      if (orderToAdd) {
        const indexInOrders = this.orders.findIndex((item) => item.id === id);
        if (indexInOrders !== -1) {
          this.orders[indexInOrders].quantity += quantity;
        } else {
          this.orders.push({ ...orderToAdd, quantity });
        }
      }
    },

    resetOrder() {
      this.orders = [];
    },

    removeOrder() {
      const orderTimeStore = useOrderTimeStore();
      this.orders.forEach((item) => {
        orderTimeStore.ordersTime.push({...item, cardBuyShowP: false, cardNoneShowP: false, cardBuyShow: true, cardNoneShow: true});
      });
      this.resetOrder();
    },

    setDeliveryTime(newTime) {
      this.deliveryTime = newTime;
      localStorage.setItem("deliveryTime", newTime); 
      console.log(newTime);
    },
  },
  persist: true,
});
