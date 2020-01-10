<template>
  <div>
    <component
      v-for="(question, index) in questions"
      :key="question.name"
      :question="question"
      :is="mapToType(question.fieldType)"
      :constraints="question.mandatory ? [required] : []"
      @validate="(isValid) => setQuestion(question.name, isValid)"
      :index="index"
    ></component>
    <button :disabled="!isFormValid" class="btn btn__purple btn__large" @click="submit">Pošalji</button>
  </div>
</template>

<script>
import InputField from "./fields/InputField";
import CheckBoxField from "./fields/CheckboxField";
import FileField from "./fields/FileField";
import RadioButtonField from "./fields/RadioButtonField";
import TextareaField from "./fields/TextareaField";
import { required } from "vue-val";

export default {
  name: "Formular",
  components: {
    InputField,
    CheckBoxField,
    FileField,
    RadioButtonField,
    TextareaField
  },
  data() {
    return {
      required,
      questions: [],
      answers: [],
      isFormValid: false
    };
  },
  async created() {
    this.questions = await this.$store.dispatch("fetchQuestions");
    this.sortQuestions();
  },
  methods: {
    setQuestion(questionName, isValid) {
      this.questions.map(question => {
        if (question.name == questionName) question.isValid = isValid;
      });

      this.validateQuestions();
    },
    validateQuestions() {
      const questionValidity = this.questions.map(q =>
        !q.mandatory ? true : q.isValid ? true : false
      );

      this.isFormValid = questionValidity.every(valid => valid == true);
    },
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
        case "textarea":
          return "TextareaField";
      }
    },
    sortQuestions() {
      this.questions.sort(function(a, b) {
        var x = a.order < b.order ? -1 : 1;
        return x;
      });
    },
    async submit() {
      this.$store
        .dispatch("submitEvent")
        .then(response => {
          if (response.data.success) {
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
          } else {
            this.$swal.fire({
              title: "Upozorenje",
              text: response.data.error.msg,
              type: "warning"
            });
          }
        })
        .catch(error => {
          this.$swal.fire({
            title: "Greška",
            text: error && error.response? error.response.data.error.msg : 'Došlo je do greške!',
            type: "error"
          });
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
      left: 0 !important;
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
      top: 30px;
      right: 30px;
      @include breakpoint(vtab) {
        top: 12px;
        right: 15px;
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
