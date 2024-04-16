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
    getAddFavPro(id) {
      const productsStore = useProductsStore();
      const favPro = productsStore.products?.find(item => item.id == id);
      const categorySingle = useCategoryStore();
      const favCategory = categorySingle.category?.find(item => item.id == id);
      const indexInFavourites = this.favourites.findIndex(item => item.id === id);
      const favIdIndex = this.favIds?.findIndex(item => item == id);

      if (indexInFavourites !== -1) {
        this.favourites.splice(indexInFavourites, 1);
        this.favIds.splice(favIdIndex, 1);
        this.setActiveState(id, false);
      } else {
        this.favIds.push(id);
        this.setActiveState(id, true);
        this.favourites.push(favPro || favCategory);
        if (favCategory) this.setActiveState(id, true);
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
