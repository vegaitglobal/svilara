<template>
  <div id="login">
    <h1>Zaboravili ste lozinku?</h1>
    <h5>Unesite email adresu na koju će Vam stići email sa podacima za promenu lozinke.</h5>
    <input
      type="text"
      name="email"
      v-model="credentials.email"
      placeholder="Email"
      v-on:keyup="() => set('email', credentials.email, form)"
      />
    <span v-if="form.email.error" class="error">{{form.email.error}}</span>
    <button
      type="button"
      class="btn btn__purple btn__large"
      @click.prevent="sendEmail"
      :disabled="!validate(form)"
    >Pošalji</button>
  </div>
</template>

<script>
import {
  required,
  set,
  validate
} from "vue-val";

export default {
  name: "ForgotPassword",
  data() {
    return {
      credentials: {
        email: ""
      },
      set,
      validate,
      form: {
        email: {
          valid: false,
          error: null,
          constraints: [required]
        }
      }
    };
  },
  methods: {
    async sendEmail() {
      try {
        let vm = this;
        let response = await this.$store.dispatch("forgot", vm.credentials);
        if (parseInt(response.status) === 200) {
          //console.error('forgot successful')
          this.$swal({
            type: "success",
            title: "Uspešno...",
            text:
              "Molimo Vas da pogledate Vaš mejl i da kliknete na poslati link da biste nastavili."
          });
        }
      } catch (err) {
        if (parseInt(err.response.status) === 404) {
          //console.error(err.response.data.error);
          this.$swal({
            type: "error",
            title: "Oops...",
            text: err.response.data.error
          });
        }
        //if (parseInt(err.response.status) === 400) {
        //this.$swal({
        // type: "error",
        // title: "Oops...",
        // text: err.response.data.error
        // });
        // }
        //else if (parseInt(err.response.status) === 401) {
        //this.$swal({
        // type: "error",
        //title: "Oops...",
        //text: err.response.data.message
        //});
        // }
        this.error = err.response.data;
      }
    }
  }
};
</script>