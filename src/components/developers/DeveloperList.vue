<template>
  <section>
    <base-card>
      <developer-filter
        @update-filter="updateFilters" @refresh="loadDevs"
        :is-loading="isLoading" :is-developer="isDeveloper"
      ></developer-filter>

      <base-spinner v-if="isLoading"></base-spinner>

      <div v-else-if="isDevelopers" class="container-grid">
        <developer-item v-for="dev in filteredDevelopers" :key="dev.id"
                        v-bind="dev"></developer-item>
      </div>

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
    async loadDevs(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('devs/loadDevelopers', {forceRefresh: refresh});
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
.container-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 40%);
  gap: 1.5em 3em;
  justify-content: center;
  padding-block: 2em;
}

h4 {
  text-align: center;
  padding: 4em;
}

@media screen and (max-width: 1023px) {
  .container-grid {
    display: grid;
    justify-items: stretch;
    grid-template-columns: 1fr;
  }
}
</style>