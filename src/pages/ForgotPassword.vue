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
      await this.$store.dispatch("forgot", this.credentials)
      .then(() => {
        this.$swal({
            type: "success",
            title: "Uspešno...",
            text:
              "Molimo Vas da pogledate Vaš mejl i da kliknete na poslati link da biste nastavili."
          });
      })
      .catch((err) => {
           this.$swal({
            type: "error",
            title: "Oops...",
            text: err && err.response ? err.response.data.error : 'Došlo je do greške!'
          });
      });
    }
  }
};
</script>