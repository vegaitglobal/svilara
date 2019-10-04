 <template>
  <div class="register">
    <form>
      <label for="name">Name</label>
      <input
        class="form-control"
        v-model="data.name"
        @keyup.enter="submit"
        type="text"
        value
        placeholder="e.g. John Doe"
        name="name"
      />
      <label for="email">Email</label>
      <ValidationProvider name="Email" rules="required|email" v-slot="{errors}">
        <input
          class="form-control"
          v-model="data.email"
          @keyup.enter="submit"
          type="text"
          value
          placeholder="e.g. johndoe@example.com"
          name="email"
        />
        <span style="color:red">
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </span>
      </ValidationProvider>

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
    </form>

    <div>
      <input @click.prevent="submit" class="btn btn-main" type="submit" value="Sign up today" />
    </div>

    <div>
      <a
        data-toggle="modal"
        data-target="#resetPasswordModal"
        class="btn btn-link"
        href="#"
      >Forgot Your Password?</a>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "register",
  components: {
    ValidationProvider
  },
  data() {
    return {
      data: {
        email: null,
        password: null,
        password_confirmation: null,
        name: null
      },
      be_errors: []
    };
  },
  mounted() {
    const isUnique = value => {
      return new Promise(resolve => {
        this.axios
          .post(`${process.env.VUE_APP_API_BASE_URL}/auth/validate/email`, {
            email: this.data.email
          })
          .then(res => {
            console.log(res.data);
            resolve(res.data);
          })
          .catch(err => {});
      });
    };
  },
  methods: {
    async submit() {
      let vm = this;
      this.be_errors = [];
      try {
        let response = await this.$store.dispatch("register", vm.data);
        if (parseInt(response.status) === 200) {
          await this.$swal({
            type: "success",
            title: "Registration successfull!",
            text: "You have successfully registered! Verification mail sent."
          });
          this.$router.push("/login");
        }
      } catch (err) {
        this.be_errors = err.response.data.errors;
        if (parseInt(err.response.status) === 500) {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        }
        if (parseInt(err.response.status) === 400) {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: err.response.data.message
          });
        }
        console.log(err.response);
      }
    }
  }
};
</script>