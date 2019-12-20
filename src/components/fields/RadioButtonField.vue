<template>
  <div class="question">
    <h5>{{ index + 1 }}. {{ question.text }}</h5>
    <ul>
      <li class="radio-btn" v-for="(value, index) in JSON.parse(question.values)" :key="index">
        <input
          type="radio"
          @change="onChange($event)"
          v-model="answer"
          :name="question.id"
          :id="value + question.id"
          :value="value"
        />
        <label :for="value + question.id">{{ value }}</label>
      </li>
      <li class="radio-btn">
        <input
          v-if="answer == 'Drugo / Other'"
          @keyup="onChange($event)"
          type="text"
          v-model="otherData"
          class="other-input"
        />
      </li>
    </ul>
    <span class="error radio-error">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: "RadioButton",
  props: ["name", "question", "index", "constraints"],
  data() {
    return {
      otherData: null,
      answer: null,
      errorMessage: null
    };
  },
  methods: {
    onChange() {
      let finalAnswer = this.answer;

      if (this.answer == "Drugo / Other") {
        finalAnswer = this.otherData;
      }
      let fieldValidationObject = {
        valid: true,
        message: null
      };

      for (let j = 0; j < this.constraints.length; j++) {
        fieldValidationObject = this.constraints[j](finalAnswer);

        if (!fieldValidationObject.valid) break;
      }

      this.errorMessage = fieldValidationObject.valid ? null : fieldValidationObject.message;

      this.$emit("validate", fieldValidationObject.valid);

      this.$store.dispatch("answerQuestion", {
        question: this.question,
        answers: finalAnswer
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/variables.scss";

.radio-btn {
  list-style-type: none;
  margin-bottom: 5px;
  input {
    margin-right: 10px;
  }
}
.other-input {
  margin-left: 25px;
  padding: 10px;
}
.radio-error {
  padding-left: 25px;
  display: block;
  color: $main;
}
</style>