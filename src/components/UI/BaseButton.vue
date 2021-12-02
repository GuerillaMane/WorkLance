<template>
  <button class="button-base" v-if="!link" :class="styleType">
    <slot></slot>
  </button>

  <router-link class="button-base" v-else :class="styleType" :to="to">
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
      default: false
    },

    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style lang="scss" scoped>
button, a {
  text-decoration: none;
  padding: 0.5rem 1rem;
  font: inherit;
  background-color: $base-bg;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  border-radius: 30px;
  /*margin-right: 0.5rem;*/
}

button:disabled {
  background-color: gray;
  cursor: wait;
}

.flat {
  background-color: transparent;
  color: black;
}

.flat:hover:not([disabled]), .flat:active {
  background-color: $base-bg;
}

.outline {
  background-color: $base-bg;
  border: 1px solid black;
  color: black;
}

.outline:hover:not([disabled]), .outline:active {
  background-color: $base-hover;
  border: 1px solid black;
}
</style>