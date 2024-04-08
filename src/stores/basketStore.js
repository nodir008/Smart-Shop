import { defineStore } from "pinia";
import { useCategoryStore } from "./categorySingleStore";
import { useProductsStore } from "./productsStore";
import { useOrderStore } from "./orderStore";

export const useBasketStore = defineStore("basket", {
  state: () => ({
    drawer: [],
    isBasketActive: false,
    imgToast: null,
    descriptionToast: null
  }),
  actions: {
    getAddDrawerPro(id, quantity) {
      const productsStore = useProductsStore();
      if (productsStore.products) {
        const drawerItem = productsStore.products.find(
          (item) => item.id === id
        );
        const categorySingle = useCategoryStore();
        const drawerCategory = categorySingle.category?.find(
          (item) => item.id == id
        );

        const drawerToAdd = drawerItem || drawerCategory;
        if (drawerToAdd) {
          const indexInDrawer = this.drawer.findIndex((item) => item.id === id);
          if (indexInDrawer !== -1) {
            this.drawer[indexInDrawer].quantity += quantity;
          } else {
            this.drawer.push({ ...drawerToAdd, quantity });
          }
        }
      }
    },

    removeDrawerProduct(id) {
      const indexToRemove = this.drawer.findIndex((item) => item.id === id);
      if (indexToRemove !== -1) {
        this.drawer.splice(indexToRemove, 1);
      }
    },

    updateQuantity(id, quantity) {
      const productIndex = this.drawer.findIndex((item) => item.id === id);
      if (productIndex !== -1) {
        if (quantity < 1000) {
          this.drawer[productIndex].quantity = quantity;
        } else {
          this.drawer[productIndex].quantity = 999;
        }
      }
    },

    incrementQuantity(id) {
      const productIndex = this.drawer.findIndex((item) => item.id === id);
      if (productIndex !== -1) {
        if (this.drawer[productIndex].quantity < 999) {
          this.drawer[productIndex].quantity++;
        } else {
          this.drawer[productIndex].quantity = 1;
        }
      }
    },

    decrementQuantity(id) {
      const productIndex = this.drawer.findIndex((item) => item.id === id);
      if (productIndex !== -1 && this.drawer[productIndex].quantity > 1) {
        this.drawer[productIndex].quantity--;
      }
    },

    addToOrderStore() {
      const orderStore = useOrderStore();

      this.drawer.forEach((item) => {
        orderStore.orders.push({ ...item });
      });

      this.resetDrawer();
    },

    resetDrawer() {
      this.drawer = [];
    },

    changeActive(bool, description, thumbnail) {
      this.isBasketActive = bool;
      this.descriptionToast = description;
      this.imgToast = thumbnail;
      setTimeout(() => {
        this.isBasketActive = false;
      }, 2000);
    },
  },
  persist: true,
});
