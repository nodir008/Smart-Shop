import { defineStore } from "pinia";
import { useProductsStore } from "./productsStore";
import { useCategoryStore } from "./categorySingleStore";

export const useFavouriteStore = defineStore("favourite", {
  state: () => ({
    favourites: [],
    favIds: [],
    activeStates: {},
  }),
  actions: {
    getAddFavPro(product) {
      
      const favIdIndex = this.favIds?.findIndex(item => item == product);
      const indexInFavourites = this.favourites.findIndex(item => item.id === product.id);
      
      if (indexInFavourites !== -1) {
        this.favourites.splice(indexInFavourites, 1);
        this.favIds.splice(favIdIndex, 1);
        this.setActiveState(product.id, false);
      } else {
        this.favIds.push(product.id);
        this.setActiveState(product.id, true);
        this.favourites.push(product);
        this.setActiveState(product.id, true);
      }
      this.saveToLocalStorage();
    },

    removeFavProduct(id) {
      const indexToRemove = this.favourites.findIndex(item => item.id === id);
      if (indexToRemove !== -1) {
        this.favourites.splice(indexToRemove, 1);
        this.setActiveState(id, false);
      }
      this.saveToLocalStorage();
    },

    setActiveState(id, isActive) {
      this.activeStates = { ...this.activeStates, [id]: isActive };
    },

    saveToLocalStorage() {
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
      localStorage.setItem("activeStates", JSON.stringify(this.activeStates));
    },

    loadFromLocalStorage() {
      this.favourites = JSON.parse(localStorage.getItem("favourites")) || [];
      this.activeStates = JSON.parse(localStorage.getItem("activeStates")) || {};
    },
  },
  persist: true
});
