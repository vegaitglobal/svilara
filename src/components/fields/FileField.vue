<template>
  <div class="question">
    <h5>{{index+1}}. {{question.text}}</h5>
    <input
      type="file"
      accept="image/*"
      @change="uploadImage($event) || validate($event)"
      v-on:change="e => set('questionData', e.target.value, form)"
    />
  </div>
</template>

<script>
import { set, required, messages } from "vue-val";

export default {
  name: "FileField",
  data() {
    return {
      questionData: "",
      set,
      form: {
        questionData: {
          valid: false,
          error: null,
          constraints: [required]
        }
      }
    };
  },
  props: ["name", "question", "index"],
  methods: {
    uploadImage(event) {
      this.$store.dispatch("answerQuestion", {
        question: this.question,
        answers: event.target.files[0]
      });
      this.$store.dispatch("setImage", event.target.files[0]);
    }
  }
};
</script>