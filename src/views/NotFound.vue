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

<style scoped>
a {
  color: #F692BC;
  text-decoration: none;
}

a:hover {
  cursor: pointer;
  color: #f379ac !important;
}

a:visited {
  color: #F692BC;
}

.page-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page-404 > *:not(:first-child):not(:last-child) {
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
</style>