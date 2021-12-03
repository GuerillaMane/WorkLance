<template>
  <section>
    <base-card>
      <header>
        <h2>Received Messages</h2>
      </header>
      <base-spinner v-if="loadingStatus"></base-spinner>
      <ul v-if="receivedMessages.length > 0">
        <message-item v-for="message in receivedMessages" :key="message.id"
                      :email="message.userEmail" :message="message.message" :date="message.date"></message-item>
      </ul>
      <h3 v-else>You haven't received any messages yet :(</h3>
    </base-card>
  </section>
</template>

<script>
import MessageItem from "./MessageItem";
export default {
  name: "MessageList",

  components: {MessageItem},

  data() {
    return {
      loadingStatus: false,
    };
  },

  computed: {
    receivedMessages() {
      return this.$store.getters['messages/getUserMessages'];
    }
  },

  created() {
    this.loadMessages();
  },

  methods: {
    async loadMessages() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('messages/getMessages');
      } catch (error) {
        this.$notify({
          type: 'error', title: 'Error',
          text: "Something went wrong! We can't fetch your messages :("
        });
      }
      this.isLoading = false;
    },
  }
}
</script>

<style lang="scss" scoped>
.card {
  header {
    text-align: center;

    h2 {
      text-decoration: underline;
    }
  }

  ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
  }

  h3 {
    text-align: center;
    color: #414141;
    margin: 2.5rem 0 1rem;
  }
}
</style>