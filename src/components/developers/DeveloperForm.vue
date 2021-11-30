<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: v$.newDeveloper.firstname.$invalid}">
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname"
             v-model.trim="newDeveloper.firstname"
             @blur="v$.newDeveloper.firstname.$touch()" />

      <template v-if="v$.newDeveloper.firstname.$dirty">
        <div v-for="error of v$.newDeveloper.firstname.$silentErrors" :key="error.$message">
          <div class="error-message">{{ error.$message }}</div>
        </div>
      </template>
    </div>

    <div class="form-control" :class="{invalid: v$.newDeveloper.lastname.$invalid}">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname"
             v-model.trim="newDeveloper.lastname"
             @blur="v$.newDeveloper.lastname.$touch()" />

      <template v-if="v$.newDeveloper.lastname.$dirty">
        <div v-for="error of v$.newDeveloper.lastname.$errors" :key="error.$message">
          <div class="error-message">{{ error.$message }}</div>
        </div>
      </template>
    </div>

    <div class="form-control" :class="{'invalid': v$.newDeveloper.description.$invalid}">
      <label>Description</label>
      <textarea id="description"
                v-model.trim="newDeveloper.description"
                @blur="v$.newDeveloper.description.$touch()"></textarea>

      <template v-if="v$.newDeveloper.description.$dirty">
        <div v-for="error of v$.newDeveloper.description.$errors" :key="error.$message">
          <div class="error-message">{{ error.$message }}</div>
        </div>
      </template>
    </div>

    <div class="form-control" :class="{invalid: v$.newDeveloper.rate.$invalid}">
      <label for="rate">Hourly rate</label>
      <input type="number" id="rate"
             v-model="newDeveloper.rate"
             @blur="v$.newDeveloper.rate.$touch()" />

      <template v-if="v$.newDeveloper.rate.$dirty">
        <div v-for="error of v$.newDeveloper.rate.$errors" :key="error.$message">
          <div class="error-message">{{ error.$message }}</div>
        </div>
      </template>
    </div>

    <div class="form-control">
      <h3>Areas of Expertise</h3>
      <div class="form-checkbox" v-for="area in areas" :key="area">
        <input type="checkbox" :id="area" :value="area" v-model="areas">
        <label :for="area">{{ area }}</label>
      </div>

      <template v-if="v$.newDeveloper.areas.$dirty">
        <div v-for="error of v$.newDeveloper.areas.$errors" :key="error.$message">
          <div class="error-message">{{ error.$message }}</div>
        </div>
      </template>
    </div>

    <base-button class="form-submit">Register</base-button>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required, alpha, minValue} from "@vuelidate/validators";

export default {
  name: "DeveloperForm",

  emits: ['save-data'],

  setup() {
    return {
      v$: useVuelidate({
        $lazy: true
      })
    };
  },

  data() {
    return {
      newDeveloper: {
        firstname: null,
        lastname: null,
        areas: [],
        description: null,
        rate: null
      },
      isFormValid: true,
    };
  },

  validations() {
    return {
      newDeveloper: {
        firstname: {required, alpha},
        lastname: {required, alpha},
        areas: {required},
        description: {required, alpha},
        rate: {required, minValue: minValue(1)}
      }
    };
  },

  computed: {
    areas() {
      return this.$store.getters['devs/getAreas'];
    }
  },

  methods: {
    submitForm() {
      console.log(this.v$.newDeveloper);

      // this.$emit('save-data', this.newDeveloper);
      // this.$router.replace({name: 'Developers'});
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}
</style>