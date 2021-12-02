<template>
  <div v-if="selectedDev">
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
          <base-button v-if="!isContactForm" link :to="contactLink" styleType="outline">Contact!</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
  </div>
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
      return this.selectedDev?.firstname + ' ' + this.selectedDev?.lastname;
    },

    contactLink() {
      return this.$route.path + '/contact';
    },

    isContactForm() {
      return this.$route.name === 'Contact Developer';
    }
  },

  mounted() {
    this.selectDev();
  },

  methods: {
    selectDev() {
      let devs = this.$store.getters['devs/getDevelopers'];
      if (!devs.length) {
        this.$notify({
          type: 'error', title: 'Error',
          text: "Something went wrong!"
        });
        this.$router.replace({name: 'Developers'});
      }
      this.selectedDev = devs.find(dev => dev.id === this.id);
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  * {
    margin: 0.5rem;
  }

  header {
    * {
      margin: 1rem 0.5rem;
    }
  }
}
</style>