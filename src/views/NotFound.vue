<template>
  <div class="page-404">
    <div class="gif-404"></div>
    <h2>This page doesn't exists!</h2>
    <h3>Please return to the <a @click="$router.back()">
      previous page</a> or
      <router-link :to="{name: 'Home'}">Home</router-link>
      page!
    </h3>
    <h4>Error 404</h4>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style lang="scss" scoped>
.page-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  *:not(:first-child):not(:last-child) {
    margin-bottom: 15px;
  }

  .gif-404 {
    background-repeat: no-repeat;
    background-image: url('../../public/404.gif');
    width: 80%;
    height: 400px;
    margin-top: 50px;
    background-position: center;
  }

  a {
    color: $base-hover;
    text-decoration: none;
  }

  a:hover {
    cursor: pointer;
    color: $base-border !important;
  }

  a:visited {
    color: $base-hover;
  }
}
</style>