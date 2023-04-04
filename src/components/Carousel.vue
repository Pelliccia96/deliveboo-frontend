<template>
    <div class="pt-5">
        <div class="pt-4 d-flex">
          <div class="slider">
            <div class="slide-track">
              <div class="my-img-container slide p-2" v-for="(restaurants, i) in store.dt.restaurantsList">
                <router-link
                    :to="{
                      name: 'ristorante',
                      params: { name: restaurants.name },
                    }"
                    @click="onMenuClick(restaurants.id)"
                    class="h-100">
                    <img v-if="restaurants.image.includes('http')" class="my-img-fluid  rounded-3" :src="restaurants.image" alt="..." />
                    <img v-else class="my-img-fluid rounded-3" :src="store.dt.beUrl + '/storage/' + restaurants.image" alt="..." />
                  </router-link>
              </div>
            </div>
          </div>
        </div>
    </div>    
</template>
  
  <script>
  import { store } from "../stores/store";
  export default {
    data() {
      return {
        store,
      };
    },
    methods: {
      onMenuClick(restaurantId) {
      store.dt.selectedRestaurant = restaurantId;
    },
     },
    mounted() {
  },
  };
  </script>
  
  <style lang="scss" scoped>
  @use "../styles/main.scss";

  .my-img-container{
    width: 300px;
    height: 200px;
  }

  .my-img-fluid{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }


@mixin white-gradient {
	background: linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
}

$animationSpeed: 20s;

// Animation
@keyframes scroll {
	0% { transform: translateX(0); }
	100% { transform: translateX(calc(-250px * 1))}
}


// Styling
.slider {
	height: 200px;
	margin: auto;
	overflow:hidden;
	position: relative;
	// width: 960px;
	
	&::before,
	&::after {
		@include white-gradient;
		content: "";
		height: 200px;
		position: absolute;
		width: 100px;
		z-index: 2;
	}
	
	&::after {
		right: 0;
		top: 0;
		transform: rotateZ(180deg);
	}

	&::before {
		left: 0;
		top: 0;
	}
	
	.slide-track {
		animation: scroll $animationSpeed linear infinite;
		display: flex;
		width: calc(250px * 14);
	}
	
	.slide {
		height: 200px;
		width: 300px;
	}
}
  
  </style>
  