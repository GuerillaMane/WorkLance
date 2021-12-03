<template>
  <teleport to="body">
    <transition name="alert">
      <dialog open v-if="show" @click="closeAlert">
        <h2>{{ title }}</h2>
        <h3>{{ alertMessage }}</h3>
        <slot></slot>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "BaseAlert",

  emits: ['close'],

  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false,
    },
    alertMessage: {
      type: String,
      required: true
    },
    alertType: {
      type: String,
      required: false,
      default: 'info'
    },
    alertDuration: {
      type: Number,
      required: false,
      default: 5000
    }
  },

  data() {
    return {
      timeoutId: null,
    };
  },

  mounted() {
    console.log('created');
    this.timeoutId = setTimeout(() => {
      this.closeAlert();
    }, this.alertDuration);
  },

  methods: {
    closeAlert() {
      clearTimeout(this.timeoutId);
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
dialog {
  margin: 0;
  border-radius: 15px;
  border: 1px solid #424242;
  position: fixed;
  left: calc(50% - 10rem);
  width: 20rem;
  top: 5vh;
  background-color: #f87e7e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

  h2, h3 {
    font-weight: normal;
    text-align: center;
  }
}

.alert-enter-active {
  animation: animate-alert 0.5s ease-out;
}

.alert-leave-active {
  animation: animate-alert 0.5s ease-out reverse;
}

@keyframes animate-alert {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>