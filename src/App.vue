<template>
  <the-header></the-header>
  <router-view></router-view>

<!--  <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from-->
<!--    <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>-->
<!--  </div>-->
</template>

<script>
import TheHeader from "./components/layout/TheHeader";

export default {
  name: 'App',

  components: {
    TheHeader
  }
}
</script>

<style>
@import "assets/styles/main.css";
</style>
