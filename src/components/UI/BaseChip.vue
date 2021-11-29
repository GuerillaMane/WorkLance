<template>
  <span class="chip" :class="styleType">
    {{ textToUpper }}
  </span>
</template>

<script>
export default {
  name: "BaseChip",

  props: {
    styleType: {
      type: String,
      required: false,
      default: null
    },

    text: {
      type: String,
      required: true
    }
  },

  computed: {
    textToUpper() {
      return this.text.toUpperCase();
    }
  }
}
</script>

<style scoped>
.chip {
  background-color: #ccc;
  color: #424242;
  border-radius: 25px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.design {
  background-color: #8d006e;
  color: white;
}
</style>