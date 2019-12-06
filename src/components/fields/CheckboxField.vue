<template>
  <div class="question">
    <h5>{{index+1}}. {{question.text}}</h5>
    <ul>
      <li class="check-box" v-for="(value, index) in JSON.parse(question.values)" :key="index">
        <input
          type="checkbox"
          @change="onChange($event)"
          :name="value"
          :id="value + question.id"
          :value="value"
        />
        <label :for="value + question.id">{{value}}</label>
      </li>
      <li class="check-box">
        <input
          v-if="answers && includeOtherData"
          @keyup="onOtherChange($event)"
          type="text"
          v-model="otherData"
          class="other-input"
        />
        <span class="error radio-error" v-if="includeOtherData">{{ errorMessage }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { required } from "vue-val";

export default {
  name: "CheckboxField",
  props: ["name", "question", "index"],
  data() {
    return {
      oldOtherData: null,
      otherData: null,
      includeOtherData: false,
      answers: [],
      errorMessage: 'Polje je obavezno.'
    };
  },
  methods: {
    onChange(event) {
      let isChecked = event.target.checked;
      let answer = event.target.name;

      if(answer == 'Other:') {
        this.includeOtherData = isChecked;

        return;
      }

      if (isChecked) {
        this.answers.push(answer);
      } else {
        this.answers = this.answers.filter(e => e !== answer);
      }
    },
    onOtherChange() {
      const validationResult = required(this.otherData);
        console.log(validationResult);
      this.errorMessage = validationResult.valid ? null : validationResult.message;

      if(this.oldOtherData) {
        this.answers = this.answers.filter(e => e !== this.oldOtherData);
      }

      if(this.otherData) {
        this.answers.push(this.otherData);
      }

      this.oldOtherData = this.otherData;
    }
  },
  watch: {
    answers() {
      this.$store.dispatch("answerQuestion", {
        question: this.question,
        answers: this.answers
      });
    }
  }
};
</script>

<style lang="scss">
.check-box {
  list-style-type: none;
  margin-bottom: 5px;
  input {
    margin-right: 10px;
  }
}
</style>