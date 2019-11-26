<template>
  <div id="login">
    <Sidebar />
    <h1>Ulogujte se</h1>
    <input type="text" name="email" v-model="credentials.email" placeholder="Email" />
    <input type="password" name="password" v-model="credentials.password" placeholder="Lozinka" />
    <button type="submit" class="btn btn__purple btn__large" @click.prevent="submit">Login</button>
    <button class="link" @click.prevent="redirectToForgotPasssword">Zaboravili ste lozinku?</button>
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
       console.log(JSON.stringify(response))
        if (parseInt(response.status) === 200) {
          this.$router.push("/admin");
        }
      } catch (err) {
       console.log(JSON.stringify(err))
        if (parseInt(err.response.status) === 400) {

          this.$swal({
            type: "error",
            title: "Oops...",
            text: err.response.data.error
          });
        }
        //else if (parseInt(err.response.status) === 401) {
          //this.$swal({
           // type: "error",
            //title: "Oops...",
            //text: err.response.data.message
          //});
       // }
        this.error = err.response.data;
      }
    },
    redirectToForgotPasssword() {
      this.$router.push("/admin/forgot-password");
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

#login {
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  @include breakpoint(mob) {
    padding: 0;
  }
  h1,
  h5 {
    max-width: 600px;
    margin: 0 auto 30px;
  }
  input {
    display: block;
    margin: 0 auto 20px;
    width: 300px;
    padding: 10px;
    @include breakpoint(mob) {
      width: 220px;
    }
  }
  .btn {
    display: block;
    margin: 30px auto 40px;
  }
}
</style>