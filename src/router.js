import { createRouter, createWebHistory } from "vue-router";
import WelcomePage from "./pages/Welcome.vue";
import RestaurantsIndexPage from "./pages/restaurants/Index.vue";
import RestautantShowPage from "./pages/restaurants/Show.vue";
import CartShow from "./pages/Cart.vue";
import DishShowPage from "./components/dishes/SingleDish.vue";
import NotFoundPage from "./pages/NotFound.vue";
import Checkout from "./pages/Checkout.vue";

const router = createRouter({
  // Serve ad indicare come gestire l'url al cambio pagina
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: WelcomePage,
    },
    {
      path: "/i-nostri-ristoranti",
      name: "restaurants",
      component: RestaurantsIndexPage,
    },
    {
      path: "/ristorante/:name",
      name: "ristorante",
      component: RestautantShowPage,
    },
    {
      path: "/piatto/:id",
      name: "dish",
      component: DishShowPage,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundPage,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartShow,
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: Checkout,
    },
  ],
});

export { router };
