<template lang="">
  <Loader v-if="store.dt.loading" />
  <main v-else>
    <div class="bg-first-section"></div>
    <div class="container">
      <h3 class="title" style="margin-top: 10vh">I nostri ristoranti</h3>
        <div class="py-1 mt-2  custom-bg w-100 rounded-1"></div>
      <Carousel></Carousel>
      <div class="py-5">
        <h3 class="pt-3 title">Le nostre cagetorie</h3>
        <div class="py-1 mt-2 mb-5 custom-bg w-100 rounded-1"></div>
        <div class="row g-2 g-sm-4">
          <div
            v-for="(element, i) in store.dt.categoriesList"
            :class="colSelector(i)"
            class="col-12  px-3 pb-4 col-sm-6 img-section position-relative filter-hover"
          >
            <router-link
              :to="'/i-nostri-ristoranti'"
              @click="onCardClick(element.name)"
            >
              <img
                class="my-img-fluid rounded-4"
                :src="store.dt.categoriesImgs[i]"
                alt=""
              />
              <span class="description">{{ element.name }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="custom-bg">
        <div class="my-col">
          <div>
            <h2 class="pb-4 title text-center">Lavora con noi!</h2>
          </div>
          <p class="text-center pb-4">
            Diventa partner di DeliveBoo e raggiungi sempre più clienti. Ci
            occupiamo noi di prendere gli ordini, così che la tua unica
            preoccupazione sia continuare a preparare il miglior cibo.
          </p>
          <a class="text-center" href="http://127.0.0.1:8000">
            <button class="btn btn-custom btn-white">Lavora con noi!</button>
          </a>
        </div>
        <div class="row"></div>
      </div>
    </div>
  </main>
</template>

<script>
import { store } from "../stores/store";
import Loader from "../components/Loader.vue";
import SearchBar from "../components/SearchBar.vue";
import Carousel from "../components/Carousel.vue";
export default {
  components: { Loader, SearchBar, Carousel },
  data() {
    return {
      store,
    };
  },
  methods: {
    colSelector(num) {
      if (num % 4 === 0) {
        return "col-md-5";
      } else if ((num - 1) % 4 === 0) {
        return "col-md-7";
      } else {
        if (num % 2 === 0) {
          return "col-md-7";
        } else {
          return "col-md-5";
        }
      }
    },
    onCardClick(category) {
      store.dt.selectedCategories = [];
      store.dt.selectedCategories.push(category);
      store.dt.headerLinks[1].active = true;
    },
  },
  mounted() {
    store.fn.fetchCategories();
    store.fn.fetchRestaurants();
    store.fn.loadStorage();

  },
  beforeUnmount() {
    store.fn.saveStorage()
  },
};
</script>

<style scoped lang="scss">

.bg-first-section {
  background-image: url("../assets/bg-homepage.jpg");
  height: 60vh;
  background-position: center;
  /* Center the image */
  background-repeat: no-repeat;
  /* Do not repeat the image */
  background-size: cover;
}

.title {
  // font-family: bold;
  font-weight: bolder;
  font-size: 3rem;
}

.img-section {
  height: 200px;
}

.my-img-fluid {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 1px 1px 14px #000000;
}

.description {
  font-size: 3rem;
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
  color: white;
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);

  * {
    box-shadow: 10px 10x black;
  }
}

.filter-hover {
  filter: grayscale(0);
  transform: scale(1);
  transition: filter, 0.5s, transform, 0.5s;

  &:hover {
    filter: grayscale(100%);
    transform: scale(1.05);
  }
}

.my-col {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 64px 16px;
  color: #ffff;
}

.btn-white {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
  color: #c76262 !important;

  &:hover {
    background-color: #ffffff !important;
    transform: scale(1.05);
  }
}

@media screen and (max-width: 1000px) {
  .description {
    font-size: 2.5rem;
  }
}

</style>
