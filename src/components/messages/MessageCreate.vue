<template>
  <form @submit.prevent="sendMessage">
    <div class="form-control">
      <label for="email">Your e-mail</label>
      <input type="email" id="email" v-model="email"/>
    </div>

    <div class="form-control">
      <label for="message">Your message</label>
      <textarea id="message" rows="4" v-model="message"></textarea>
    </div>

    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "MessageCreate",

  data() {
    return {
      email: '',
      message: '',
      isFormValid: true
    };
  },

  computed: {
    devId() {
      return this.$route.params.id;
    }
  },

  methods: {
    sendMessage() {
      this.isFormValid = true;

      if (this.validateForm()) {
        const requestData = {
          devId: this.devId,
          email: this.email,
          message: this.message
        };

        this.$store.dispatch('messages/addMessage', requestData);
        this.$router.replace({name: 'Developers'});
      }
    },

    validateForm() {
      if (!this.email || !this.message) {
        this.isFormValid = false;
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>
form {
  margin: 2rem 1rem 1rem !important;
}

.actions {
  padding-top: 0.5rem;
  justify-content: center;
}
</style>