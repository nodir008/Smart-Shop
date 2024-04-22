import { defineStore } from "pinia";
import { useCategoryStore } from "./categorySingleStore";
import { useProductsStore } from "./productsStore";
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
    getAddDrawerPro(id, quantity) {
      const useCategory = useCategoryStore();
      const useProducts = useProductsStore();
      const drawerItem = useProducts.products.find(item => item.id === id);
      const drawerCategory = useCategory.category?.find(item => item.id == id);
      const drawerToAdd = drawerItem || drawerCategory;
      if (drawerToAdd) {
        const indexInDrawer = this.drawer.findIndex(item => item.id === id);
        indexInDrawer !== -1
          ? this.drawer[indexInDrawer].quantity += quantity
          : this.drawer.push({ ...drawerToAdd, quantity, isdrawerForActive: true });
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
