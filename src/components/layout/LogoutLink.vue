<template>
  <a @click="logout">Logout</a>
</template>

<script>
export default {
  name: "LogoutLink",

  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$notify({
        type: 'success',
        title: 'Logout',
        text: 'You\'ve logged out successfully!',
      });
    }
  }
}
</script>

<style lang="scss" scoped>
a:hover {
  cursor: pointer !important;
}
</style>