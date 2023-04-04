<template>
  <div class="shadow-container">
    <div class="container pb-5">
      <div
        v-for="(dish, i) in store.dt.dishesList"
        class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4"
      >
        <div class="col">
          <div class="card shadow">
            <img :src="dish.image" class="card-img-top" alt="..." />

            <div class="card-body">
              <h5 class="card-title">{{ dish.name }}</h5>
              <p class="card-text">{{ dish.description }}</p>
              <p>
                Ingredienti: <strong>{{ dish.ingredients }}</strong>
              </p>
              <p>Prezzo: {{ dish.price }}€</p>
            </div>

            <div class="my-3 bg-white">
              <button
                @click="onLessClick"
                class="btn btn-sm btn-primary btn-custom"
              >
                -
              </button>
              <span class="px-3">{{ store.dt.quantityDish }}</span>
              <button
                @click="onPlusClick"
                class="btn btn-sm btn-primary btn-custom m-3"
              >
                +
              </button>
              <button class="btn btn-sm btn-primary btn-custom">
                <span></span>
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
              <button class="btn btn-sm btn-primary btn-custom">
                Aggiungi per {{ dish.price * store.dt.quantityDish }} €
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../../stores/store";
import axios from "axios";
export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    onLessClick() {
      if (store.dt.quantityDish === 1) {
        store.dt.quantityDish = 1;
      } else {
        store.dt.quantityDish--;
      }
    },
    onPlusClick() {
      store.dt.quantityDish++;
    },
  },
  mounted() {
    store.fn.showDishes(1);
  },
};
</script>

<style lang="scss" scoped>
@use "../../styles/main.scss";
.card {
  height: 100%;
  background-color: #f9fafa;
  img {
    aspect-ratio: 3/4;
    object-fit: cover;
  }
}

.shadow-container {
  // box-shadow:
  box-shadow: inset 0px 8px 6px -6px #888, inset 0px 8px 6px -6px #888;
}
</style>
