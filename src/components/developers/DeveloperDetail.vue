<template>
  <section>
    <base-card>
      <h2>{{ fullname }}</h2>
      <h3>${{ selectedDev.rate }}/hour</h3>
    </base-card>
  </section>

  <section>
    <base-card>
      <base-chip v-for="area in selectedDev.areas" :key="area" :styleType="area" :text="area"></base-chip>
      <p>{{ selectedDev.description }}</p>
    </base-card>
  </section>

  <section>
    <base-card>
      <header>
        <h2>Are you interested? Reach out now!</h2>
        <base-button link :to="contactLink" styleType="outline">Contact!</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
</template>

<script>
export default {
  name: "DeveloperDetail",

  props: ['id'],

  data() {
    return {
      selectedDev: null,
    };
  },

  computed: {
    fullname() {
      return this.selectedDev.firstname + ' ' + this.selectedDev.lastname;
    },

    contactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    }
  },

  created() {
    this.selectedDev = this.$store.getters['devs/getDevelopers'].find(dev => dev.id === this.id);
  }
}
</script>

<style scoped>
.card > * {
  margin: 0.5rem;
}

header * {
  margin: 1rem 0.5rem;
}
</style>