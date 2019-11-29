<template>
  <div>
  <ValidationObserver ref="observer" >
  <div slot-scope="{ valid }">
    <component
      v-for="(question, index) in questions"
      :key="index"
      :question="question"
      :is="mapToType(question.fieldType)"
      :index="index"
    ></component>
    <button v-if="valid" class="btn btn__purple btn__large" @click="submit">Pošalji</button>
    </div>
    </ValidationObserver>
  </div>
</template>

<script>
import {ValidationObserver} from "vee-validate"

export default {
  name: "Formular",
  components: {
    ValidationObserver
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
	sortQuestions() {
      this.questions.sort(function(a, b) {
        var x = a.order < b.order ? -1 : 1;
        return x;
      });
    },

    submit() {
      try {
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
      } catch (error) {
        this.$swal
          .fire({
            title: "Greška",
            text:  error.response.data.error,
            type: "error"
          })
      }
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
