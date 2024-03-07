<template>
  <div class="container">
    <base-card>
      <!-- <header>
        <img :src="require('../../public/hard-work.png')" alt="WorkLance icon">
        <h2>WorkLance</h2>
      </header> -->

      <base-alert fixed :show="loadingStatus" title="Authenticating...">
        <base-spinner></base-spinner>
      </base-alert>

      <form @submit.prevent="login">
        <div class="form-control" :class="{invalid: v$.loginData.email.$invalid}">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="loginData.email"
                @blur="v$.loginData.email.$touch()"/>

          <div class="error-container">
            <template v-if="v$.loginData.email.$dirty">
              <div v-for="error of v$.loginData.email.$errors" :key="error.$message">
                <div class="error-message">{{ error.$message }}</div>
              </div>
            </template>
          </div>
        </div>

        <div class="form-control" :class="{invalid: v$.loginData.password.$invalid}">
          <label for="password">Password</label>
          <div class="form-control-password">
            <input :type="typePassword" id="password" v-model="loginData.password"
                  @blur="v$.loginData.password.$touch()"/>
            <a @mousedown="showPassword" @mouseup="hidePassword">
              <font-awesome-icon icon="eye"></font-awesome-icon>
            </a>
          </div>

          <div class="error-container">
            <template v-if="v$.loginData.password.$dirty">
              <div v-for="error of v$.loginData.password.$errors" :key="error.$message">
                <div class="error-message">{{ error.$message }}</div>
              </div>
            </template>
          </div>
        </div>

        <div class="container-row">
          <base-button>Login</base-button>
          <base-button link style-type="flat" @click="signup">Signup</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required, email} from "@vuelidate/validators";

export default {
  name: "Login",

  setup() {
    return {
      v$: useVuelidate({
        $lazy: true
      })
    };
  },

  data() {
    return {
      loginData: {
        email: null,
        password: null
      },

      typePassword: 'password',

      loadingStatus: false
    };
  },

  validations() {
    return {
      loginData: {
        email: {required, email},
        password: {required}
      }
    };
  },

  methods: {
    login() {
      if (this.isFormValid()) {
        this.loadingStatus = true;
        this.$store.dispatch('login', this.loginData)
            .catch(() => {
              this.$notify({
                type: 'error',
                title: 'Error',
                text: 'Failed to authenticate!',
              });
            })
            .then(() => {
              this.loadingStatus = false;
            });
      }
    },

    signup() {
      if (this.isFormValid()) {
        this.loadingStatus = true;
        this.$store.dispatch('signup', this.loginData)
            .catch(error => {
              if (error.response.data.error.message === 'EMAIL_EXISTS') {
                this.$notify({
                  type: 'error',
                  title: 'Error',
                  text: 'The email address you entered is already registered!',
                });
              } else {
                this.$notify({
                  type: 'error',
                  title: 'Error',
                  text: 'Failed to authenticate!',
                });
              }
            })
            .then(() => {
              this.loadingStatus = false;
            })
      }
    },

    isFormValid() {
      if (!this.v$.loginData.$invalid) {
        return true;
      } else {
        this.$notify({
          type: 'warn', title: 'Warning',
          text: 'Please enter a valid email and password!'
        });
        return false;
      }
    },

    showPassword() {
      this.typePassword = 'text';
    },

    hidePassword() {
      this.typePassword = 'password';
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: auto;
}

.card {
  margin-top: 4rem;
  padding: 2em 2em 1em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    background: $base-bg;
    margin-bottom: 1rem;
    padding: 1.5rem;
    width: 100%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;

    display: inherit;
    justify-content: center;
    align-items: center;

    img {
      height: 5rem;
      width: 5rem;
      margin-right: 1.5rem;
    }

    h2 {
      margin: 0;
    }
  }

  form {
    width: 45%;

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
    }

    input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 30px $base-input-bg inset !important;
    }

    .invalid {
      .form-control-password {
        border: 1px solid red;
      }
    }

    .form-control-password {
      display:flex;
      flex-direction: row;
      border: 1px solid #ccc;

      &:focus-within {
        background-color: $base-input-bg;
        border: 1px solid $base-border;
      }

      input {
        flex-grow: 2;
        border: none;
      }

      a {
        padding-right: 5px;
        display: flex;
        align-items: center;
        color: dimgray;

        &:hover {
          cursor: pointer;
          color: black;
        }
      }
    }

    //button {
    //  display: block;
    //  margin: 1.25rem auto;
    //}

    .container-row {
      align-items: center;
      justify-content: center;

      button {
        margin: 1.25rem 0.5rem;
      }
    }
  }
}
</style>