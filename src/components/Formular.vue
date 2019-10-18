<template>
  <div>
    <component
      v-for="(question, index) in questions"
      :key="index"
      :question="question"
      :is="mapToType(question.fieldType)"
    ></component>
    <button class="btn btn__purple btn__large" @click="submit">Submit</button>
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

      this.$swal
        .fire({
          title: "Događaj poslat.",
          text: "Predlog događaja poslat je administratorima na procenu.",
          type: "success"
        })
        .then(result => {
          if (result.value) {
            this.$modal.hide("userCreateEventModal");
          }
        });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.v--modal-overlay {
  .v--modal-box {
    padding: 60px;
    max-width: 100%;
    overflow-y: auto !important;
    overflow-x: hidden;
    @include breakpoint(vtab) {
      padding: 35px 30px;
    }
    @include breakpoint(mob-sm) {
      top: 0 !important;
    }
    h5 {
      line-height: 23px;
    }
    .question {
      margin-bottom: 20px;
      h5 {
        margin-bottom: 15px;
      }
    }
    input[type="checkbox"],
    input[type="radio"] {
      list-style-type: none !important;
    }
    .btn__close {
      position: absolute;
      top: 20px;
      right: 30px;
      @include breakpoint(vtab) {
        top: 12px;
        right: 20px;
      }
    }
  }
  ol,
  ul {
    list-style: decimal;
    list-style-position: inside;
  }
}
</style>