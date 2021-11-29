<template>
  <section>
    <developer-filter @update-filter="updateFilters"></developer-filter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button>Refresh</base-button>
      </div>

      <ul v-if="isDevelopers">
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
    };
  },

  computed: {
    filteredDevelopers() {
      const devs = this.$store.getters['devs/getDevelopers'];
      return devs.filter(dev => {
        return this.activeFilters.some(key => dev.areas.includes(key))
      });
    },

    isDevelopers() {
      return this.filteredDevelopers.length > 0;
    }
  },

  methods: {
    updateFilters(filters) {
      this.activeFilters = filters;
    }
  }
}
</script>

<style scoped>
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