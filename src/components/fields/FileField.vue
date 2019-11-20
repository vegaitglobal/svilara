<template>
  <div class="question">
    <h5>{{question.order}}. {{question.text}}</h5>
    <!--<ValidationProvider name="Password" id="password" :rules="isRequired" v-slot="{errors}">-->
      <input type="file" accept="image/*" @change="uploadImage" />
    <!--</ValidationProvider>-->
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "FileField",
  props: ["name", "question", "values", "mandatory"],
  components: {
    ValidationProvider
  },
  computed: {
    isRequired() {
      if (this.mandatory) return "required";
    }
  },

  methods: {
    uploadImage(event) {
      //console.log(event.target.files[0]);
      this.$store.dispatch("answerQuestion", {
        question: this.question,
        answers: event.target.files[0]
      });
      this.$store.dispatch("setImage", event.target.files[0]);
    }
  }
};
</script>

<style>
</style>