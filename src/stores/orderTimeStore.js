import { defineStore } from "pinia";

export const useOrderTimeStore = defineStore("orderTime", {
  state: () => ({
    ordersTime: [],
    totalPrice: 0,
    totalSalePrice: 0,
    totalSale: 0,
    total: 0,
  }),
  actions: {
    buyOrderTimeStore(index, item) {
      for (let i = 0; i < this.ordersTime.length; i++) {
        if (i === index) {
          this.ordersTime[i].cardBuyShow = false;
          this.ordersTime[i].cardNoneShow = false;
          this.ordersTime[i].cardBuyShowP = true;
          this.ordersTime[i].cardNoneShowP = false;
    
          const addTotalPrice = this.ordersTime[i].quantity * item.price;
          const addTotalSalePrice = addTotalPrice - ((item.price * item.discountPercentage) / 100) * item.quantity;
          const addTotalSale = ((item.price * item.discountPercentage) / 100) * item.quantity;
          this.totalPrice += addTotalPrice;
          this.totalSalePrice += addTotalSalePrice;
          this.totalSale += addTotalSale;
        }
      }
      this.total += 1;
    },
    

    removeOrderTimeStore(index) {
      for (let i = 0; i < this.ordersTime.length; i++) {
        if (i === index) {
          this.ordersTime[i].cardBuyShow = false;
          this.ordersTime[i].cardNoneShow = false;
          this.ordersTime[i].cardBuyShowP = false;
          this.ordersTime[i].cardNoneShowP = true;
        }
      }
    },
  },
  persist: true,
});
