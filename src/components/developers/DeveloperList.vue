<template>
  <section>Filter</section>

  <section>
    <ul v-if="isDevelopers">
      <li v-for="dev in developers" :key="dev.id">
        {{ dev.firstName + ' ' + dev.lastName }}
      </li>
    </ul>
    <h4 v-else>No devs found...</h4>
  </section>
</template>

<script>
export default {
  name: "DevelopersList",

  computed: {
    developers() {
      return this.$store.getters['devs/getDevelopers'];
    },

    isDevelopers() {
      return this.developers.length > 0;
    }
  }
}
</script>

<style scoped>

</style>