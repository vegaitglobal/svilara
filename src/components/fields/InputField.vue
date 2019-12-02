<template>
  <div class="question">
    <h5>{{index+1}}. {{question.text}}</h5>
    <li class="inputfield-row">
      <input
        type="text"
        v-model="questionData"
        @change="onChange"
        v-on:keyup="e => set('questionData', e.target.value, form)"
      />
      <span v-if="form.questionData.error" class="error">{{ form.questionData.error }}</span>
      <span
        class="hint-text"
        v-if="question.name=='question25'"
      >* Plaforme su tematski povezani kulturno-umetnički programi koji se organizuju od strane Fondacije Evropske prestonice kulture Novi Sad 2021.</span>
    </li>
  </div>
</template>

<script>
import { set, required, messages } from "vue-val";

export default {
  name: "InputField",
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
</style>