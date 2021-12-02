<template>
  <the-header></the-header>
  <router-view></router-view>
  <notifications classes="error-notification" position="bottom right"></notifications>
<!--  <the-footer></the-footer>-->
</template>

<script>
import TheHeader from "./components/layout/TheHeader";
// import TheFooter from "./components/layout/TheFooter";

export default {
  name: 'App',

  components: {
    TheHeader,
    // TheFooter
  }
}
</script>

<style></style>
