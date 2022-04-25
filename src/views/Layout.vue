<template>
  <div>
    <div class="">
      <nav-bar></nav-bar>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from '../components/MyFooter.vue'
import NavBar from '../components/NavBar.vue'
export default {
  components: {NavBar,  MyFooter },
}
</script>

<style>
.container {
  margin: 0 auto;
  background-color: rgb(204, 200, 200);
}
.main-content {
  margin-top: 8px;
}

</style>