<template>
  <section>
    <developer-filter @update-filter="updateFilters"></developer-filter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button @click="loadDevs">Refresh</base-button>
        <base-button v-if="!isDeveloper && !this.isLoading" link :to="{name: 'Registration'}">
          Register as a Dev
        </base-button>
      </div>

      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="isDevelopers">
        <developer-item v-for="dev in filteredDevelopers" :key="dev.id"
                        v-bind="dev"></developer-item>
      </ul>
      <h4 v-else>No devs found...</h4>
    </base-card>
  </section>
</template>

<script>
import DeveloperFilter from "./DeveloperFilter";
import DeveloperItem from "./DeveloperItem";

export default {
  name: "DevelopersList",

  components: {DeveloperFilter, DeveloperItem},

  data() {
    return {
      activeFilters: [],
      isLoading: false
    };
  },

  computed: {
    filteredDevelopers() {
      const devs = this.$store.getters['devs/getDevelopers'];
      return devs.filter(dev => {
        return this.activeFilters.some(key => dev.areas.includes(key))
      });
    },

    isDeveloper() {
      return this.$store.getters['devs/isDeveloper'];
    },

    isDevelopers() {
      return this.filteredDevelopers.length > 0;
    }
  },

  created() {
    this.loadDevs();
  },

  methods: {
    async loadDevs() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('devs/loadDevelopers');
      } catch (error) {
        this.$notify({
          type: 'error', title: 'Error',
          text: "Something went wrong! We can't find any developer :("
        });
      }
      this.isLoading = false;
    },

    updateFilters(filters) {
      this.activeFilters = filters;
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h4 {
  text-align: center;
  margin: 1rem;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>