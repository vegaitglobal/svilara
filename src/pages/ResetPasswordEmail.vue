<template>
  <div>
    <div class="reset-password">
        <div class="input-row">
            <label for="password">Lozinka</label>
            <input
                name="password"
                class="form-control"
                v-model="data.password"
                type="password"
                value
                placeholder="* * * * * * *"
                v-on:keyup="() => set('password', data.password, form)"
            />
            <span v-if="form.password.error" class="error">{{form.password.error}}</span>
        </div>

        <div class="input-row">
            <label for="password_confirmation">Ponovite lozinku</label>
            <input
                name="password_confirmation"
                class="form-control"
                v-model="data.password_confirmation"
                type="password"
                value
                placeholder="* * * * * * *"
                v-on:keyup="() => set('password_confirmation', data.password_confirmation, form)"
            />
            <span v-if="form.password_confirmation.error" class="error">{{form.password_confirmation.error}}</span>
        </div>

        <div>
        <input
            @click.prevent="resetPassword"
            class="btn btn-main btn__purple btn__large"
            type="submit"
            value="Resetujte lozinku"
            :disabled="!validate(form)"
        />
        </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  set,
  validate
} from "vue-val";

export default {
  name: "ResetPasswordEmail",
  data() {
    return {
      data: {
        password: null,
        password_confirmation: null,
      },
      set,
      validate,
      form: {
        password: {
          valid: false,
          error: null,
          constraints: [required]
        },
        password_confirmation: {
          valid: false,
          error: null,
          constraints: [required]
        }
      }
    };
  },

  methods: {
    async resetPassword() {
      // try {
      //   let data = {
      //     email: this.$store.getters.user.email,
      //     token: this.$route.params.token,
      //     password: this.data.password,
      //    password_confirmation: this.data.password_confirmation
      //   };
      //   let response = await this.$store.dispatch("resetPasswordJWT", data);
      //   if (parseInt(response.status) === 200) {
      //     this.$swal({
      //      type: "success",
      //       title: "Password successfully reset",
      //       text: "You can now login to your account"
      //     }).then(function(result) {
      //       window.location.href = "/#/login";
      //    });
      //   }
      // } catch (error) {
      //   if (parseInt(error.response.status) === 400) {
      //     this.$swal({
      //       type: "error",
      //      title: "Oops...",
      //      text: error.response.data.message
      //    }).then(function(result) {
      //      window.location.href = "/#/register";
      //    });
      //   }
      //   if (parseInt(error.response.status) === 401) {
      //    this.$swal({
      //      type: "error",
      //      title: "Oops...",
      //      text: error.response.data.message
      //     });
      //   }
      // }

      try {
        let data = {
          password: this.data.password,
          password_confirmation: this.data.password_confirmation,
          token: this.$route.params.token,
          userId: this.$route.params.id
        };

        let response = await this.$store.dispatch("resetForgotPassword", data);
        if (parseInt(response.status) === 200) {
          this.$swal({
            type: "success",
            title: "Šifra uspešno promenjena",
            text: "Sada možete da se ulogujete na Vaš nalog."
          }).then(function() {
            window.location.href = "/#/admin/login";
          });
        }
      } catch (error) {
        this.$swal({
          type: "error",
          title: "Greška!",
          text: error && error.response? error.response.data.error : 'Došlo je do greške!'
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.error-text {
    color: $red;
    display: block;
    margin-top: 15px;
    text-align: center;
}
.reset-password {
    width: 100%;
    max-width: 325px;
    margin: 0 auto;
    padding: 20px;
    .input-row {
        margin-bottom: 20px;
        label {
            margin-bottom: 15px;
            font-size: 18px;
            display: block;
        }
        input {
            padding: 10px;
            width: 300px;
        }
    }
    .btn {
        margin-top: 20px;
        display: block;
    }
}
</style>