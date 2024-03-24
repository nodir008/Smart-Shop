import { defineStore } from "pinia";
import { useCategoryStore } from "./categorySingleStore";
import { useProductsStore } from "./productsStore";
import { useOrderStore } from "./orderStore";

export const useBasketStore = defineStore("basket", {
  state: () => ({
    drawer: [],
    isBasketActive: false,
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
        this.drawer[productIndex].quantity = quantity;
      }
    },

    incrementQuantity(id) {
      const productIndex = this.drawer.findIndex((item) => item.id === id);
      if (productIndex !== -1) {
        this.drawer[productIndex].quantity++;
      }
    },

    decrementQuantity(id) {
      const productIndex = this.drawer.findIndex((item) => item.id === id);
      if (productIndex !== -1 && this.drawer[productIndex].quantity > 1) {
        this.drawer[productIndex].quantity--;
      }
    },

    isInBasket(id) {
      return this.drawer.some((item) => item.id === id);
    },

    resetDrawer() {
      this.drawer = [];
    },

    // addToOrderStore() {
    //   const productsStore = useProductsStore();
    //   const orderStore = useOrderStore();
    //   const categorySingle = useCategoryStore();

    //   this.drawer.forEach((item) => {
    //     const ordersPro = productsStore.products?.find((product) => product.id === item.id);
    //     // const ordersPro = productsStore.total?.find((product) => product.id === item.id)
    //     console.log(ordersPro);
    //     const ordersCatrgory = categorySingle.category?.find((product) => product.id === item.id);

    //     if (ordersPro || ordersCatrgory) {
    //       const orderItem = ordersPro || ordersCatrgory;
    //       const indexInOrders = orderStore.orders.findIndex((orderItem) => orderItem.id === item.id);

    //       if (indexInOrders !== -1) {
    //         orderStore.orders[indexInOrders].quantity += item.quantity;
    //       } else {
    //         orderStore.orders.push({ ...orderItem, quantity: item.quantity });
    //       }
    //     }
    //   });

    //   this.resetDrawer();
    // },

    addToOrderStore() {
      const orderStore = useOrderStore();

      this.drawer.forEach((item) => {
        orderStore.orders.push({ ...item });
      });

      this.resetDrawer();
    },

    changeActive(bool) {
      this.isBasketActive = bool;
      setTimeout(() => {
        this.isBasketActive = false;
      }, 2000);
    },
  },
  persist: true,
});
