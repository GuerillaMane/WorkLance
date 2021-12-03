<template>
  <li>
    <div class="container-column">
      <p class="date">{{ dateToLocale }}</p>
    </div>

    <div class="container-row">
      <a :href="emailLink">{{ email }}</a>
      <p>{{ timeToLocale }}</p>
    </div>

    <p class="message">{{ message }}</p>
  </li>
</template>

<script>
export default {
  name: "MessageItem",

  props: ['date', 'email', 'message'],

  computed: {
    timeToLocale() {
      return new Date(this.date).toLocaleTimeString();
    },
    dateToLocale() {
      return new Date(this.date).toLocaleDateString();
    },
    emailLink() {
      return 'mailto:' + this.email;
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 1rem;

  .container-row {
    justify-content: space-between;

    p {
      color: #404040;
    }

    a {
      color: #3d008d;
      text-decoration: none;
      font-weight: bold;
    }

    a:hover,
    a:active {
      color: #8d007a;
    }
  }

  .date {
    text-align: center;
    margin-bottom: 0.75rem;
    color: #404040;
    border: 1px solid #404040;
    border-radius: 20px;
    width: 125px
  }

  .message {
    margin: 1rem 0 0 0;
  }
}
</style>