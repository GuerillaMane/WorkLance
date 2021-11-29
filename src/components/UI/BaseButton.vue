<template>
  <button v-if="isButton" :class="styleType">
    <slot></slot>
  </button>

  <router-link v-else :class="styleType" :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "BaseButton",

  props: {
    styleType: {
      type: String,
      required: false,
      default: 'outline'
    },

    link: {
      type: Boolean,
      required: false,
      default: true
    },

    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped>
button, a {
  text-decoration: none;
  padding: 0.5rem 1rem;
  font: inherit;
  background-color: #FEC8D8;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
}

.flat {
  background-color: transparent;
  color: black;
}

.flat:hover, .flat:active {
  background-color: #FEC8D8;
}

.outline {
  background-color: #FEC8D8;
  border: 1px solid black;
  color: black;
}

.outline:hover, .outline:active {
  background-color: #F692BC;
  border: 1px solid black;
}
</style>