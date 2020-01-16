<template>
  <div class="question">
    <h5>{{index+1}}. {{question.text}}<span v-if="question.mandatory"> *</span></h5>
    <div class="inputfield-row">
      <input type="text" v-model="questionData" @keyup="onChange" />
      <span class="error">{{ errorMessage }}</span>
      <span
        class="hint-text"
        v-if="question.name=='question25'"
      >* Plaforme su tematski povezani kulturno-umetnički programi koji se organizuju od strane Fondacije Evropske prestonice kulture Novi Sad 2021.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputField",
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

      this.errorMessage = fieldValidationObject.valid ? null : fieldValidationObject.message;
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
.inputfield-row {
  list-style-type: none;
  margin-bottom: 10px;
  span {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 16px;
  }
  input {
    display: block;
    width: 400px;
    padding: 10px;
    @include breakpoint(mob) {
      width: 300px;
    }
    @include breakpoint(mob-sm) {
      width: 235px;
    }
  }
  select {
    width: 420px;
    display: block;
    padding: 10px;
    & + input {
      margin-top: 15px;
    }
  }
  span,
  input,
  select {
    font-size: 16px;
  }
  input[type="text"],
  select {
    border: 1px solid $gray;
  }
  input[type="file"] {
    border: 0;
    cursor: pointer;
  }
  .hint-text {
    font-size: 13px;
    margin-top: 10px;
  }
  textarea {
    max-width: 400px;
  }
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: url("../../assets/img/arrow-down.svg");
  background-repeat: no-repeat;
  background-size: 4%;
  background-position: 98% 50%;
  cursor: pointer;
}
.error {
  color: $red;
  margin: 5px 0 10px !important;
  font-size: 14px !important;
  display: block;
}
.question {
  h5 span {
    color: $red;
  }
}
</style>