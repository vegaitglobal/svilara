<template>
  <div>Loading...</div>
</template>

<script>
export default {
  name: "logout",
  created() {
    this.logout();
  },
  methods: {
    async logout() {
      try {
        let response = await this.$store.dispatch("logout");
        this.$router.push("/login");
      } catch (error) {
        console.error(error.response);
      }
    }
  }
};
</script>
