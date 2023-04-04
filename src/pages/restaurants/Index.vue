<template>
  <Loader v-if="store.dt.loading" />
  <div v-else class="container">
    <button
      @click="filtering = true"
      :class="filtering ? 'active' : ''"
      class="btn btn-primary btn-custom open-search shadow d-block d-md-none"
    >
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
    <div class="my-container">
      <div
        class="link-container shadow py-4 overflow-auto"
        :class="filtering ? 'active' : ''"
      >
        <span class="title ps-3 custom-color">Categoria</span>
        <button
          @click="filtering = false"
          class="btn-close close-search"
          aria-label="Close"
        ></button>
        <div
          class="pt-3 px-3"
          v-for="category in store.dt.categoriesList"
          :key="category.id"
          @click="store.fn.fetchRestaurants(category.name)"
        >
          <div class="form-check my-form-check">
            <input
              class="form-check-input my-checkbox"
              type="checkbox"
              id="flexCheckChecked"
              :checked="store.dt.selectedCategories.includes(category.name)"
            />
            <label class="form-check-label text-category ps-2">{{
              category.name
            }}</label>
          </div>
        </div>
        <div
          @click="
            store.dt.selectedCategories = [];
            store.fn.fetchRestaurants();
          "
          class="custom-color text-decoration-underline delete-categories ps-3"
        >
          Svuota campi di ricerca
        </div>
      </div>
      <strong><h1 style="padding-top: 9vh;">I ristoranti su DeliveBoo</h1></strong>

      <SearchBar @filterName="filterChild"></SearchBar>
      <div class="d-none d-md-block text-center mb-3 fw-bolder">
        <button
          @click="filtering ? (filtering = false) : (filtering = true)"
          :class="filtering ? 'active' : ''"
          class="btn btn-primary btn-custom open-search shadow static"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div
        v-if="store.dt.restaurantsMessage !== ''"
        class="alert alert-info custom-color fw-bolder py-4 fs-4"
      >
        {{ store.dt.restaurantsMessage }}
      </div>
      <div class="py-4">
        <div class="row g-3 g-sm-5 justify-content-center mb-5">
          <div
            class="col-12 col-md-6 pb-4 px-3 col-lg-4"
            v-for="(restaurant, i) in filterRestaurants"
            :key="i"
          >
            <div class="card shadow rounded-3 overflow-hidden">
              <div v-if="restaurant">
                <div class="img-container position-relative">
                  <img
                    v-if="restaurant.image.includes('http')"
                    class="my-img-fluid"
                    :src="restaurant.image"
                    alt=""
                  />
                  <img
                    v-else
                    class="my-img-fluid"
                    :src="store.dt.beUrl + '/storage/' + restaurant.image"
                    alt=""
                  />
                </div>
                <h2 class="title">{{ restaurant.name }}</h2>
                <div class="category-badge">
                  <span
                    class="badge custom-bg m-2"
                    v-for="(category, index) in restaurant.categories"
                    :key="index"
                  >
                    {{ category.name }}
                  </span>
                </div>

                <div class="d-flex justify-content-center pb-3 pt-4">
                  <router-link
                    :to="{
                      name: 'ristorante',
                      params: { name: restaurant.name.replace(/\s+/g, '-') },
                    }"
                    @click="onMenuClick(restaurant.id)"
                    class="btn btn-primary btn-custom"
                    >Menù</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../../stores/store";
import Loader from "../../components/Loader.vue";
import SearchBar from "../../components/SearchBar.vue";
export default {
  data() {
    return {
      store,
      filtering: false,
      filter: "",
    };
  },

  methods: {
    onMenuClick(restaurantId) {
      store.dt.selectedRestaurant = restaurantId;
    },
    filterChild(filterName) {
      this.filter = filterName;
    },
  },
  computed: {
    filterRestaurants() {
      if (this.filter === "") {
        return store.dt.restaurantsList;
      } else {
        return store.dt.restaurantsList.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(this.filter.toLowerCase())
        );
      }
    },
  },
  mounted() {
    store.fn.loadStorage();
    store.fn.fetchCategories();
    store.fn.fetchRestaurants();
  },
  beforeUnmount() {
    store.fn.saveStorage();
  },
  components: { Loader, SearchBar },
};
</script>

<style lang="scss" scoped>
.alert-info {
  text-align: center;
  background-color: #c7626245 !important;
  border-color: #c76262;
}

.open-search {
  position: fixed;
  border-radius: 50% !important;
  height: 60px;
  width: 60px;
  top: 89px;
  left: 15px;
  z-index: 15;
  transition: left, 0.5s, opacity, 0.5s;

  &.static {
    position: static !important;
    height: 80px;
    width: 80px;

    &.active {
      opacity: 1;
    }
  }

  &.active {
    left: -150px;
    opacity: 0;
  }
}

.link-container {
  width: 250px;
  position: fixed;
  left: -400px;
  top: 74px;
  bottom: 0;
  background-color: white !important;
  z-index: 15;
  opacity: 0;
  transition: all, 0.5s;

  .delete-categories {
    cursor: pointer;
    margin-top: 3rem;
  }

  &.active {
    left: 0;
    opacity: 0.99;
  }

  .close-search {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

.my-container {
  min-height: calc(100vh - 214px);
}

.title {
  /* font-family: bold; */
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  padding-bottom: 1rem;
}

.img-container {
  width: 100%;
  height: 150px;
  object-fit: cover;
  padding-bottom: 1rem;
}

.my-img-fluid {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.my-form-check {
  * {
    transition: transform, 0.5s, font-weight, 0.5s, color, 0.5s;
  }

  &:hover {
    cursor: pointer;

    .my-checkbox {
      // width: 20px;
      // height: 20px;
      transform: scale(1.05);

      &:hover {
        cursor: pointer;
      }
    }

    .text-category {
      font-weight: bold;
      color: #c76262;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.card {
  transition: transform, 0.5s;

  &:hover {
    transform: scale(1.05);
  }
}

.category-badge {
  position: absolute;
  top: 0;
  z-index: 3;
}
</style>
