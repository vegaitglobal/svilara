<template>
  <div class="question">
    <h5>{{question.order}}. {{question.text}}</h5>
    <ValidationProvider name="Password" id="password" :rules="isRequired" v-slot="{errors}">
      <input type="file" @change="uploadImage($event)" />
    </ValidationProvider>
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
      console.log(typeof event.target.files[0]);
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