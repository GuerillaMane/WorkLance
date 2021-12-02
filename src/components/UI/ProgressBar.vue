<template>
  <div class="loader">
    <div class="loaderBar"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar"
}
</script>

<style lang="scss" scoped>
.loader {
  width: 500px;
  margin: 2rem;
  border-radius: 10px;
  border: 4px solid transparent;
  position: relative;
  padding: 1px;

  &:before {
    content: '';
    border: 1px solid dimgray;
    //border: 1px solid $base-border;
    border-radius: 10px;
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
  }

  .loaderBar {
    position: absolute;
    border-radius: 10px;
    top: 0;
    right: 100%;
    bottom: 0;
    left: 0;
    background: dimgray;
    //background: $base-border;
    width: 0;
    animation: progressBar 2s linear infinite;
  }
}

@keyframes progressBar {
  0% {
    left: 0;
    right: 100%;
    width: 0;
  }
  10% {
    left: 0;
    right: 75%;
    width: 25%;
  }
  90% {
    right: 0;
    left: 75%;
    width: 25%;
  }
  100% {
    left: 100%;
    right: 0;
    width: 0;
  }
}
</style>