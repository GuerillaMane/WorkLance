<template>
  <the-header></the-header>

  <router-view v-slot="slotProps">
    <transition name="routing" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>

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

<style lang="scss">
.routing {
  &-enter-active {
    animation: animate-routing 0.3s ease-out;
  }

  &-leave-active {
    animation: animate-routing 0.3s ease-out reverse;
  }
}

@keyframes animate-routing {
  from {
    opacity: 0;
    transform: translateY(-25px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
