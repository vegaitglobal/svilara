<template>
  <div v-if="question" class="questions-form">
    <div class="input-wrapper">
      <!-- {{question}} -->
      <input
        :disabled="!editing"
        type="text"
        v-model="question.text"
        v-on:keyup="() => set('text', question.text, form)"
      />
      <span v-if="form.text.error" class="error">{{form.text.error}}</span>
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
      @click="deleteQuestion"
      >
      Obriši
      </button>
    </div>
  </div>
</template>

<script>
import {
  required,
  set,
  validate
} from "vue-val";

export default {
  name: "Question",
  props: ["question"],
  data() {
    return {
      editing: false,
      set,
      validate,
      form: {
        text: {
          valid: false,
          error: null,
          constraints: [required]
        }
      }
    };
  },

  methods: {
    save() {
      this.$store.dispatch("updateQuestion", this.question)
      .then(() => {
      this.editing = false;
      })
      .catch(error => {
        console.log('usao je')
        this.$swal.fire({
            type: "error",
            title: "Greška",
            text: error.response.data.error
          });
      });
    },
    deleteQuestion() {
      this.$store.dispatch("deleteQuestion", this.question.id);
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
