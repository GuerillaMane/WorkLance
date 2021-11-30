<template>
  <base-card>
    <h2>Find the right developer!</h2>
    <span class="filter" v-for="area in areas" :key="area">
      <input type="checkbox" :id="area" checked v-model="filters[area]" @change="setFilter">
      <label :for="area">{{ area }}</label>
    </span>
  </base-card>
</template>

<script>
export default {
  name: "DeveloperFilter",

  emits: ['update-filter'],

  data() {
    return {
      filters: {}
    };
  },

  computed: {
    areas() {
      return this.$store.getters['devs/getAreas'];
    }
  },

  mounted() {
    this.initFilters();
    this.setFilter();
  },

  methods: {
    initFilters() {
      this.areas.forEach(key => {
        this.filters[key] = true;
      });
    },

    setFilter() {
      let filterList = Object.keys(this.filters).filter(key => this.filters[key]);
      this.$emit('update-filter', filterList);
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}
</style>