<template>
  <div>
    <div v-if="question" class="questions-form">
      <div class="input-wrapper">
        <!-- {{question}} -->
        <input
          :disabled="!editing"
          type="text"
          v-model="question.text"
          v-on:keyup="() => set('text', question.text, form)"
        />
        <span v-if="form.text.error" class="error">{{ form.text.error }}</span>
        <div class="answers" v-if="deleteUpdateOption() && question.name == 'question16'">
          <p>Ponuđeni odgovori:</p>
          <input
            :disabled="!editing"
            v-for="(option, index) in values"
            v-model="values[index]"
            v-bind:key="option"
          />
        </div>
      </div>
      <div class="button-wrapper">
        <button
          v-if="deleteUpdateOption()"
          class="btn btn__red btn__small"
          @click="editing = !editing"
        >
          Izmeni
        </button>

        <button
          v-if="deleteUpdateOption()"
          :disabled="!editing || !validate(form)"
          class="btn btn__green btn__small"
          @click="save"
        >
          Sačuvaj
        </button>
        <button
          v-if="deleteUpdateOption()"
          class="btn btn__red btn__small"
          @click="showModalQuestionDelete(question.id)"
        >
          Obriši
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, set, validate } from "vue-val";

export default {
  name: "Question",
  props: ["question", "showModalQuestionDeleteProp"],
  data() {
    return {
      values: [],
      editing: false,
      set,
      validate,
      form: {
        text: {
          valid: true,
          error: null,
          constraints: [required]
        }
      }
    };
  },
  mounted() {
    if (this.question.values) {
      this.values = JSON.parse(this.question.values);
    }
  },
  methods: {
    showModalQuestionDelete(id) {
      this.showModalQuestionDeleteProp(id);
    },
    save() {
      if (this.question.name == "question16") {
        this.question.values = JSON.stringify(this.values);
      }
      this.$store
        .dispatch("updateQuestion", this.question)
        .then(() => {
          this.editing = false;
        })
        .catch(error => {
          console.log(error)
          this.$swal.fire({
            type: "error",
            title: "Greška",
            text: error.response.data.error
          });
        });
    },
    deleteUpdateOption() {
      if (
        this.question.name == "email" ||
        this.question.name == "title" ||
        this.question.name == "category" ||
        this.question.name == "type" ||
        this.question.name == "space"
      ) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

.answers {
  margin-left: 20px;
  p {
    font-size: 16px;
    margin: 5px 0 10px;
  }
}
</style>
