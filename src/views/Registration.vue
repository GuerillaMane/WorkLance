<template>
  <section>
    <base-card>
      <h2>Register as a freelancer now!</h2>
      <developer-form @save-data="saveData"></developer-form>
    </base-card>
  </section>
</template>

<script>
import DeveloperForm from "../components/developers/DeveloperForm";

export default {
  name: "Registration",

  components: {DeveloperForm},

  methods: {
    saveData(data) {
      this.$store.dispatch('devs/setDeveloper', data);
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>