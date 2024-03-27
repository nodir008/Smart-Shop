import { defineStore } from "pinia";
import { useProductsStore } from "./productsStore";

export const useOrderTimeStore = defineStore("orderTime", {
  state: () => ({
    ordersTime: [],
    totalPrice: 0,
    totalSalePrice: 0,
    totalSale: 0,
  }),
  actions: {
    buyOrderTimeStore(index, item) {
      // const productIndex = this.ordersTime. === index;
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
    },

    // removeOrderTimeStore(id) {
    //   const productIndex = this.ordersTime.findIndex((item) => item.id === id);
    //   if (productIndex !== -1) {
    //     this.ordersTime.splice(productIndex, 1);
    //   }
    // },

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

    // calculateTotalPrice() {
    //   let totalPrice = 0;
    //   this.ordersTime.forEach((item) => {
    //     totalPrice += item.quantity * item.price;
    //   });
    //   this.totalPrice = totalPrice;
    // },


    // calculateTotalItemPrice() {
    //   let price = 0;
    //   this.ordersTime.forEach((item) => {
    //     totalPrice - item.price * item.quantity
    //   });
    //   this.totalPrice = price; // Update totalPrice using mutation
    //   console.log(this.totalPrice);
    // },




  },
  persist: true,
});
