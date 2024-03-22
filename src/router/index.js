import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import { useProductsStore } from "@/stores/productsStore";
import { useProductsCategories } from "@/stores/productsCategories";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/product/:id",
      name: "product",
      component: () => import("../pages/ProductPage.vue"),
      beforeEnter(to, from) {
        const productsStore = useProductsStore();
        const exists = to.params.id <= productsStore?.total && to.params.id > 0;
        // console.log(exists);
        if (!exists) {
          return {
            name: "NotFound",
            params: { pathMatch: to.path.split("/").slice(1) },
            query: to.query,
            hash: to.hash,
          };
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/LoginPage.vue"),
    },
    {
      path: "/favourite/",
      name: "favourite",
      component: () => import("../pages/FavouritePage.vue"),
    },
    {
      path: "/drawer",
      name: "drawer",
      component: () => import("../pages/DrawerPage.vue"),
    },
    {
      path: "/category/:category",
      name: "category",
      component: () => import("../pages/CategoryPage.vue"),
      beforeEnter(to, from) {
        const productsCategories = useProductsCategories();
        const exists = productsCategories.categorie.includes(
          to.params.category
        );
        // console.log(exists);
        if (!exists) {
          return {
            name: "NotFound",
            params: { pathMatch: to.path.split("/").slice(1) },
            query: to.query,
            hash: to.hash,
          };
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../pages/NotFoundPage.vue"),
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("../pages/OrdersPage.vue"),
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("../pages/SignUpPage.vue"),
    },
    {
      path: "/installment",
      name: "installment",
      component: () => import("../pages/InstallmentPage.vue"),
    },
    // {
    //   path: '/category/:pathMatch(.*)*',
    //   name: 'NotFound',
    //   component: () => import('../pages/NotFoundPage.vue')
    // },
    // {
    //   path: '/product/:id/:pathMatch(.*)*',
    //   name: 'NotFound',
    //   component: () => import('../pages/NotFoundPage.vue')
    // },
  ],
});

export default router;
