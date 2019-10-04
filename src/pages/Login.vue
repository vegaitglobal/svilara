<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="email" v-model="credentials.email" placeholder="Email" />
    <input type="password" name="password" v-model="credentials.password" placeholder="Password" />
    <button type="button" @click.prevent="submit">Login</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async submit() {
      try {
        let vm = this;
        let response = await this.$store.dispatch("login", vm.credentials);
        if (parseInt(response.status) === 200) {
          this.$router.push("/");
        }
      } catch (err) {
        if (parseInt(err.response.status) === 400) {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: err.response.data.errors[0].message
          });
        } else if (parseInt(err.response.status) === 401) {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: err.response.data.message
          });
        }
        this.error = err.response.data;
      }
    }
  }
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>