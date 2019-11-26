<template>
  <div>
    <Sidebar />
    <div class="reset-password">
        <div class="input-row">
            <label for="password">Lozinka</label>
            <ValidationProvider name="Password" vid="password" v-slot="{ errors }">
            <!--  rules="required|lengthBetween:8,26|verify_password" -->
                <input
                    name="password"
                    class="form-control"
                    v-model="data.password"
                    type="password"
                    value
                    placeholder="* * * * * * *"
                />
                <span class="error-text">
                    <ul>
                        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                    </ul>
                </span>
            </ValidationProvider>
        </div>

        <div class="input-row">
            <label for="password_confirmation">Ponovite lozinku</label>
            <ValidationProvider
            name="Password confirmation"
            rules="required|confirmed:password"
            v-slot="{ errors }"
            >
            <input
                name="password_confirmation"
                class="form-control"
                v-model="data.password_confirmation"
                type="password"
                value
                placeholder="* * * * * * *"
            />
            <span class="error-text">
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </span>
            </ValidationProvider>
        </div>

        <div>
        <input
            @click.prevent="resetPassword"
            class="btn btn-main btn__purple btn__large"
            type="submit"
            value="Resetujte lozinku"
        />
        </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "verifyEmail",
  components: {
    ValidationProvider,
    Sidebar
  },

  data() {
    return {
      data: {
        password: null,
        password_confirmation: null
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
          }).then(function(result) {
            window.location.href = "/#/admin/login";
          });
        }
      } catch (error) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: error.response.data.error
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
    padding: 20px;
    .input-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        label {
            margin-bottom: 15px;
            font-size: 18px;
        }
        input {
            padding: 10px;
            width: 300px;
        }
    }
    .btn {
        margin: 20px auto 0;
        display: block;
    }
}
</style>