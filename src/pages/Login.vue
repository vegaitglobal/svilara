<template>
  <div id="login">
    <Sidebar />
    <h1>Login</h1>
    <input type="text" name="email" v-model="credentials.email" placeholder="Email" />
    <input type="password" name="password" v-model="credentials.password" placeholder="Password" />
    <button type="button" class="btn btn__purple btn__large" @click.prevent="submit">Login</button>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "Login",
  components: {
    Sidebar
  },
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

<style scoped lang="scss">
#login {
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  h1 {
    margin-bottom: 30px;
  }
  input {
    display: block;
    margin: 0 auto 20px;
    width: 300px;
    padding: 10px;
  }
  .btn {
    margin-top: 30px;
  }
}
</style>