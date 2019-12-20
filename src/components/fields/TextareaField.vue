<template>
  <div class="question">
    <h5>{{index+1}}. {{question.text}}</h5>
    <div class="inputfield-row">
      <textarea v-model="questionData" @keyup="onChange" cols="55" rows="5" />
    </div>
    <span class="error">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: "TextareaField",
  props: ["name", "question", "index", "constraints"],
  data() {
    return {
      questionData: "",
      errorMessage: null
    };
  },
  methods: {
    onChange() {
      let fieldValidationObject = {
        valid: true,
        message: null
      };

      for (let j = 0; j < this.constraints.length; j++) {
        fieldValidationObject = this.constraints[j](this.questionData);

        if (!fieldValidationObject.valid) break;
      }

      this.errorMessage = fieldValidationObject.valid
        ? null
        : fieldValidationObject.message;
      this.$emit("validate", fieldValidationObject.valid);

      this.$store.dispatch("answerQuestion", {
        question: this.question,
        answers: this.questionData
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/variables.scss";

textarea {
  @include breakpoint(mob) {
    max-width: 235px;
  }
}
</style>