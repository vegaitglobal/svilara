<template>
  <div v-if="question">
    <!-- {{question}} -->
    <input :disabled="!editing" type="text" v-model="question.text" />
    <!-- <input type="text" :disabled="!editing" v-model="option.value" /> -->
    <button
      v-if="deleteUpdateOption()"
      class="btn btn__red btn__small"
      @click="editing = !editing"
    >
      Izmeni
    </button>
    <button
      v-if="deleteUpdateOption()"
      :disabled="!editing"
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
</template>

<script>
export default {
  name: "Question",
  props: ["question"],
  data() {
    return {
      editing: false
    };
  },

  methods: {
    save() {
      this.$store.dispatch("updateQuestion", this.question);
      this.editing = false;
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
