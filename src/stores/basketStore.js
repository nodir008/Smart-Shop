import { defineStore } from "pinia";
import { useOrderStore } from "./orderStore";


export const useBasketStore = defineStore("basket", {
  state: () => ({
    drawer: [],
    isBasketActive: false,
    imgToast: null,
    descriptionToast: null,
    imgOrder: [],
    showOrderConfirmation: false
  }),
  actions: {
    getAddDrawerPro(product, quantity) {
      const indexInDrawer = this.drawer.findIndex(item => item.id === product.id);
      const maxStock = product.stock;
      
      if (indexInDrawer !== -1) {
        // Product already exists in the drawer
        const currentQuantity = this.drawer[indexInDrawer].quantity;
        const newQuantity = currentQuantity + quantity;
        this.drawer[indexInDrawer].quantity = Math.min(newQuantity, maxStock);
      } else {
        // Product does not exist in the drawer
        const actualQuantity = Math.min(quantity, maxStock);
        this.drawer.push({ ...product, quantity: actualQuantity, isdrawerForActive: true });
      }
    },
    

    removeDrawerProduct(id) {
      const indexToRemove = this.drawer.findIndex(item => item.id === id);
      indexToRemove !== -1 && this.drawer.splice(indexToRemove, 1);
    },

    updateQuantity(id, quantity) {
      const productIndex = this.drawer.findIndex(item => item.id === id);
      const maxStock = this.drawer[productIndex].stock;
      if (productIndex !== -1)
        this.drawer[productIndex].quantity = Math.min(quantity, maxStock);
    },

    incrementQuantity(id) {
      const productIndex = this.drawer.findIndex(item => item.id === id);
      if (productIndex !== -1) {
        const maxStock = this.drawer[productIndex].stock;
        if (this.drawer[productIndex].quantity < maxStock) {
          this.drawer[productIndex].quantity++;
        }
      } 
    },


    decrementQuantity(id) {
      const productIndex = this.drawer.findIndex(item => item.id === id);
      if (productIndex !== -1 && this.drawer[productIndex].quantity > 1)
        this.drawer[productIndex].quantity--;
    },

    addToOrderStore() {
      const useOrder = useOrderStore();
      const itemsToAdd = this.drawer.filter(item => item.isdrawerForActive);
      useOrder.orders.push(...itemsToAdd);
      itemsToAdd.forEach(item => {
        this.removeDrawerProduct(item.id);
        this.imgOrder.push(item.thumbnail);
      });
      this.showOrderConfirmation = true;
      setTimeout(() => { this.showOrderConfirmation = false; }, 3000);
      setTimeout(() => { this.imgOrder = []; }, 3200);
    },

    resetDrawer() {
      this.drawer = [];
    },

    changeActive(bool, description, thumbnail) {
      this.isBasketActive = bool;
      this.descriptionToast = description;
      this.imgToast = thumbnail;
      setTimeout(() => { this.isBasketActive = false; }, 2000);
    },

    toast(title, thumbnail) {
      this.descriptionToast = title;
      this.imgToast = thumbnail;
    },
  },
  persist: true,
});
