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
         <!--<p>Ponuđeni odgovori:</p>
      <input v-if="deleteUpdateOption()" v-for="(option, index) in JSON.parse(question.values)" v-model="question.values[index]"/>-->
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
    showModalQuestionDelete(id) {
      this.showModalQuestionDeleteProp(id);
    },
    save() {
      this.$store
        .dispatch("updateQuestion", this.question)
        .then(() => {
          this.editing = false;
        })
        .catch(error => {
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
