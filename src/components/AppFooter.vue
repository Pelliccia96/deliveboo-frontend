<template lang="">
    <footer class="bg-dark pb-3 pt-5 ">
        <div class="container pb-3">
            <div class="row justify-content-between align-items-center">
                <div class="col-md-4 col-sm-8  ">
                    <router-link class="text-decoration-none " :to="'/'" @click="onLogoClick()">
                        <div class= "fs-1 fw-bold d-flex align-items-center text-light mb-5">
                            <i class="fa-solid fa-bowl-food px-2"></i>
                            DeliveBoo
                        </div>
                    </router-link>
                </div>
                <div class="col-md-4 col-sm-8 ">
                    <div class="text-white"><span class="fw-semibold">Boolean Careers </span>&#8226; Classe #79 &#8226; <i><span class="fw-bold">DreamTeam6</span></i> <br> <small>Copyright 2022/2023 &#169; Privacy policy &#174;</small></div>
                </div>
            </div>
        </div>
    </footer>
</template>
  
<script>
import { store } from "../stores/store";
export default {
    data() {
        return {

        };
    },
    methods: {
        onLogoClick() {
      store.dt.headerLinks.forEach((element) => {
        element.active = false;
      });
    }
    },
    mounted() {

    },
};
</script>
  
<style lang="scss" scoped>

</style>