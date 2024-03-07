<template>
  <div class="card-item">
    <h3>{{ fullname }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-chip v-for="area in areas" :key="area"
                 :styleType="area" :text="area"></base-chip>
    </div>

    <div class="actions">
      <base-button link styleType="flat" :to="{path: `/devs/${id}/contact`}">Contact</base-button>
      <base-button link :to="{path: `/devs/${id}`}">View</base-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeveloperItem",

  props: ['id', 'firstname', 'lastname', 'rate', 'areas'],

  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname;
    }
  }
}
</script>

<style lang="scss" scoped>
.card-item {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 10px;
  padding: 1rem;

  h3 {
    font-size: 1.5rem;
  }

  h3, h4, div {
    margin: 0.5rem 0;
  }
}
</style>