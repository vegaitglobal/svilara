<template>
  <div>Loading...</div>
</template>

<script>
export default {
  name: "verifyEmail",
  created() {
    this.sendToken();
  },
  methods: {
    async sendToken() {
      try {
        let token = this.$route.params.token;
        let response = await this.$store.dispatch("verifyEmail", token);
        if (parseInt(response.status) === 200) {
          this.$swal({
            type: "success",
            title: "Mail verified",
            text: "You can now login to your account"
          }).then(function() {
            window.location.href = "/#/login";
          });
        }
      } catch (error) {
        if (parseInt(error.response.status) === 400) {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: error.response.data.message
          }).then(function() {
            window.location.href = "/#/register";
          });
        }
      }
    }
  }
};
</script>
