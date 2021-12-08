<template>
  <teleport to="body">
    <div v-if="show" class="backdrop" @click="closeAlert"></div>
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
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

dialog {
  margin: 0;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #424242;
  position: fixed;
  left: calc(50% - 10rem);
  width: 20rem;
  top: 25vh;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

  h2, h3 {
    font-weight: normal;
    text-align: center;
  }
}

.alert {
  &-enter-active {
    animation: animate-alert 0.5s ease-out;
  }

  &-leave-active {
    animation: animate-alert 0.5s ease-out reverse;
  }
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