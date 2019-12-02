<template>
  <div class="question">
    <h5>{{index+1}}. {{question.text}}</h5>
    <li class="inputfield-row">
      <textarea
        v-model="questionData"
        @change="onChange"
        cols="55"
        rows="5"
        v-on:keyup="e => set('questionData', e.target.value, form)"/>
      <span v-if="form.questionData.error" class="error">{{ form.questionData.error }}</span>
    </li>
  </div>
</template>

<script>
import { set, required, messages } from "vue-val";

export default {
  name: "TextareaField",
  props: ["name", "question", "index"],
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
  methods: {
    onChange(event) {
      this.$store.dispatch("answerQuestion", {
        question: this.question,
        answers: this.questionData
      });
    }
  }
};

messages.required = () => `Polje je obavezno.`;
</script>

<style lang="scss">
@import "../../assets/scss/variables.scss";

textarea {
  @include breakpoint(mob) {
    max-width: 235px;
  }
}
</style>