<template>
  <div id="login">
    <h1>Ulogujte se</h1>
    <input
      type="text"
      name="email"
      v-model="credentials.email"
      placeholder="Email"
      v-on:keyup="() => set('email', credentials.email, form)"
    />
    <span v-if="form.email.error" class="error">{{form.email.error}}</span>
    <input
      type="password"
      name="password"
      v-model="credentials.password"
      placeholder="Lozinka"
      v-on:keyup="() => set('password', credentials.password, form)"
    />
    <span v-if="form.password.error" class="error">{{form.password.error}}</span>
    <button
      type="submit"
      class="btn btn__purple btn__large"
      @click.prevent="submit"
      :disabled="!validate(form)"
    >
      Login
    </button>
    <button class="link" @click.prevent="redirectToForgotPasssword">
      Zaboravili ste lozinku?
    </button>
  </div>
</template>

<script>
import {
  required,
  set,
  validate,
  messages
} from "vue-val";

export default {
  name: "Login",
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      },
      set,
      validate,
      form: {
        email: {
          valid: false,
          error: null,
          constraints: [required]
        },
        password: {
          valid: false,
          error: null,
          constraints: [required]
        }
      }
    };
  },
  methods: {
    async submit() {
      try {
        let vm = this;
        let response = await this.$store.dispatch("login", vm.credentials);
        if (response.data.success) {
          this.$router.push("/admin");
        } else {
          this.$swal({
            type: "warning",
            title: "Oops...",
            text: response.data.error
          });
        }
      } catch (err) {
        //console.error(JSON.stringify(err))
        //if (parseInt(err.response.status) === 400) {

        this.$swal({
          type: "error",
          title: "Oops...",
          text: err.response.data.error
        });
        //}
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
  .error {
    text-align: left;
    max-width: 322px;
    margin: -10px auto 20px !important;
  }
  .btn {
    display: block;
    margin: 30px auto 40px;
  }
}
</style>
