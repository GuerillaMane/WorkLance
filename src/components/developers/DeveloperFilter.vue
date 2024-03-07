<template>
  <!-- <base-card> -->
    <div class="container-flex">
      <div>
        <h2>Find the right developer!</h2>
        <span class="filter" v-for="area in areas" :key="area">
          <input type="checkbox" :id="area" checked v-model="filters[area]" @change="setFilter">
          <label :for="area">{{ area }}</label>
        </span>
      </div>
      
      <div class="controls">
        <base-button @click="refresh">Refresh</base-button>
        <base-button v-if="!isDeveloper && !this.isLoading" link :to="{name: 'Registration'}">
          Register as a Dev
        </base-button>
      </div>
    </div>
  <!-- </base-card> -->
</template>

<script>
export default {
  name: "DeveloperFilter",

  emits: ['update-filter', 'refresh'],

  props: {
    isLoading: {
      type: Boolean,
      required: true
    },

    isDeveloper: {
      type: Boolean,
      required: true
    }
  },

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
    },

    refresh() {
      // 'true' - for force refresh
      this.$emit('refresh', true);
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.container-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2em;
  margin: 1em 1em 0;
  padding-bottom: 2em;
  border-bottom: 1px solid #DBDCDA;
}

.controls {
  display: flex;
  gap: 1em;
}
</style>