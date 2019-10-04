<template>
  <div>
    <label for="password">Password</label>
      <ValidationProvider
        name="Password"
        vid="password"
        rules="required|lengthBetween:8,26|verify_password"
        v-slot="{errors}"
      >
        <input
          name="password"
          class="form-control"
          v-model="data.password"
          @keyup.enter="submit"
          type="password"
          value
          placeholder="*******"
        />
        <span style="color:red">
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </span>
      </ValidationProvider>

      <label for="password_confirmation">Password Confirmation</label>
      <ValidationProvider
        name="Password confirmation"
        rules="required|confirmed:password"
        v-slot="{errors}"
      >
        <input
          name="password_confirmation"
          class="form-control"
          v-model="data.password_confirmation"
          @keyup.enter="submit"
          type="password"
          value
          placeholder="*******"
        />
        <span style="color:red">
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </span>
      </ValidationProvider>

    <div>
      <input @click.prevent="resetPassword" class="btn btn-main" type="submit" value="Reset" />
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "verifyEmail",
  components: {
    ValidationProvider
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
      try {
        let data = {
          email: this.$store.getters.user.email,
          token: this.$route.params.token,
          password: this.data.password,
          password_confirmation: this.data.password_confirmation
        };
        let response = await this.$store.dispatch("resetPasswordJWT", data);
        if (parseInt(response.status) === 200) {
          this.$swal({
            type: "success",
            title: "Password successfully reset",
            text: "You can now login to your account"
          }).then(function(result) {
            window.location.href = "/#/login";
          });
        }
      } catch (error) {
        if (parseInt(error.response.status) === 400) {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: error.response.data.message
          }).then(function(result) {
            window.location.href = "/#/register";
          });
        }
        if (parseInt(error.response.status) === 401) {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: error.response.data.message
          });
        }
      }
    }
  }
};
</script>
