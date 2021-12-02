<template>
  <div class="notification">
    <transition-group name="notification-animate" class="messages">
      <div class="notification-content" v-for="message in messages" :key="message.id">
        <div class="notification-text">
          <span>{{ message.title }}</span>
          <span>{{ message.text }}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "BaseNotification",

  props: {
    messages: {
      type: Array,
      required: true
    },

    duration: {
      type: Number,
      required: false,
      default: 3000
    }
  },

  data() {
    return {
      messagesLocal: this.messages,
    };
  },

  watch: {
    messagesLocal: {
      handler() {
        this.hideTimeout();
      },
      deep: true
    }
  },

  methods: {
    hideTimeout() {
      if (this.messagesLocal.length) {
        setTimeout(() => {
          this.messagesLocal.splice(this.messagesLocal.length - 1, 1)
        }, this.duration);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  top: 6.5rem;
  right: 1rem;
  z-index: 10;

  .messages {
    display: flex;
    flex-direction: column;
  }

  &-content {
    padding: 1rem;
    border-radius: 5px;
    color: #FFF;
    display: flex;
    height: 75px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    background: $error;
  }

  &-text {
    display: flex;
    flex-direction: column;
  }

  &-animate {
    &-enter-from {
      transform: translateX(120px);
      opacity: 0;
    }

    &-enter-active {
      transition: all 0.6s ease;
    }

    &-enter-to {
      opacity: 1;
    }

    &-leave-from {
      height: 75px;
      opacity: 1;
    }

    &-leave-active {
      transition: transform 0.6s ease, opacity 0.6s, height 0.6s 0.2s;
    }

    &-leave-to {
      transform: translateX(120px);
      opacity: 0;
    }

    &-move {
      transition: all 0.6s ease;
    }
  }
}
</style>