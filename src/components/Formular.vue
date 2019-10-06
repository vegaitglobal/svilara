<template>
  <div>
    {{answers}}
    <component
      v-for="(question, index) in questions"
      :key="index"
      :question="question"
      :is="mapToType(question.fieldType)"
    ></component>
    <button @click="submit">Submit</button>
  </div>
</template>

<script>
import InputField from "./fields/InputField";
import CheckBoxField from "./fields/CheckboxField";
import FileField from "./fields/FileField";
import RadioButtonField from "./fields/RadioButtonField";

export default {
  name: "Formular",
  components: {
    InputField,
    CheckBoxField,
    FileField,
    RadioButtonField
  },
  data() {
    return {
      questions: [],
      answers: []
    };
  },
  async created() {
    this.questions = await this.$store.dispatch("fetchQuestions");
    this.sortQuestions();
  },

  methods: {
    mapToType(questionFieldType) {
      switch (questionFieldType) {
        case "input":
          return "InputField";
        case "checkbox":
          return "CheckBoxField";
        case "file":
          return "FileField";
        case "radiobutton":
          return "RadioButtonField";
      }
    },

    sortQuestions() {
      this.questions.sort(function(a, b) {
        var x = a.order < b.order ? -1 : 1;
        return x;
      });
    },

    submit() {
      this.$store.dispatch("submitEvent");
      // this.answers = this.$store.getters.getEvents;
    }
  }
};
</script>

<style lang="scss">
.v--modal-overlay .v--modal-box {
  overflow-y: scroll !important;
  overflow-x: hidden;
  h5 {
    line-height: 23px;
  }
  .question {
    margin-bottom: 25px;
  }
  input[type="checkbox"],
  input[type="radio"] {
    list-style-type: none !important;
  }
}
</style>