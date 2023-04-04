<template>
  
    <AppHeader/>
    <div class="main-page">
      <router-view></router-view>
      <AppFooter class="" />
    </div>

</template>

<script>
import { store } from "./stores/store";
import AppHeader from './components/AppHeader.vue'; 
import AppFooter from './components/AppFooter.vue'; 
export default {
  components: { AppHeader, AppFooter },
  data() {
    return {};
  },
  mounted() {
    store.fn.loadStorage()
  },
  beforeUnmount(){
    store.fn.saveStorage()
  }
};
</script>

<style lang="scss">
@use "./styles/main.scss";
.main-page{
  height: calc(100vh - 74px);
  
}
</style>
