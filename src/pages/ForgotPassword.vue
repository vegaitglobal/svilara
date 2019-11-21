<template>
  <div id="login">
    <Sidebar />
    <h1>Forgot password</h1>
    <input type="text" name="email" v-model="credentials.email" placeholder="Email" />
    <button type="button" class="btn btn__purple btn__large" @click.prevent="sendEmail">Reset password</button>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "ForgotPassword",
  components: {
    Sidebar
  },
  data() {
    return {
      credentials: {
        email: ""
      }
    };
  },
  methods: {
    async sendEmail() {
      try {
        let vm = this;
        let response = await this.$store.dispatch("forgot", vm.credentials);
        //console.log(JSON.stringify(response))
        if (parseInt(response.status) === 200) {
          console.log('forgot successful')
           this.$swal({
            type: "success",
            title: "Uspešno...",
            text: "Molimo Vas da pogledate Vaš mejl i da kliknete na poslati link da biste nastavili."
          });
        }
      } catch (err) {
       if (parseInt(err.response.status) === 404){
           console.log(err.response.data.error);
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
    },
  }
};
</script>