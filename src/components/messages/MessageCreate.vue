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

    <progress-bar v-if="loadingStatus"></progress-bar>

    <div class="actions">
      <base-button :disabled="loadingStatus">Send Message</base-button>
    </div>
  </form>
</template>

<script>
import ProgressBar from "../UI/ProgressBar";
export default {
  name: "MessageCreate",
  components: {ProgressBar},
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
    },

    loadingStatus() {
      return this.$store.getters['messages/getLoadingStatus'];
    }
  },

  methods: {
    sendMessage() {
      if (this.validateForm()) {
        const requestData = {
          devId: this.devId,
          email: this.email,
          message: this.message
        };

        this.$store.dispatch('messages/addMessage', requestData);
      }
    },

    validateForm() {
      if (!this.email || !this.message) {
        this.$notify({
          type: 'warn', title: 'Warning',
          text: 'Try to enter some data in contact form first!'
        });
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