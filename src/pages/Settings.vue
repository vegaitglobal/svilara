<template>
  <div>
    <Sidebar />
    <h3>Opšta podešavanja</h3>
    <div class="settings-input">
      <SettingsOption
        v-for="(option, index) in settings"
        :key="index"
        :option="option"
      />
      <h3>Podešavanja pitanja u formularu</h3>
      <button @click="showModalQuestionText" class="btn btn__purple settings-button">
        Dodaj pitanje gde je odgovor tekst
      </button>
      <button @click="showModalQuestionPicture" class="btn btn__purple settings-button">
        Dodaj pitanje gde je odgovor slika
      </button>
      <!-- {{questions}} -->
      <Question
        v-for="question in questions"
        :key="`${question.id}a`"
        :question="question"
      />
    </div>
    <modal
      name="adminCreateQuestionText"
      height="300"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
    >
      <h2>Unesite pitanje:</h2>
      <input type="text" v-model="data" />
      <button @click="saveInputText" class="btn btn__purple btn__large">Sačuvaj</button>
    </modal>
    <modal
      name="adminCreateQuestionPicture"
      height="300"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
    >
      <h2>Unesite pitanje:</h2>
      <input type="text" v-model="data" />
      <button @click="saveInputFile" class="btn btn__purple btn__large">Sačuvaj</button>
    </modal>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import SettingsOption from "../components/SettingsOption.vue";
import Question from "../components/Question.vue";

export default {
  name: "Settings",
  components: {
    Sidebar,
    SettingsOption,
    Question
  },
  data(){
    return {
      data: ''
    }
  },
  created() {
    this.$store.dispatch("fetchSettings");
    this.$store.dispatch("fetchQuestions");
  },

  computed: {
    settings() {
      return this.$store.getters.getSettings;
    },
    questions() {
      return this.$store.getters.getQuestions;
    }
  },
  methods: {
    showModalQuestionText() {
      this.$modal.show("adminCreateQuestionText");
    },
    showModalQuestionPicture() {
      this.$modal.show("adminCreateQuestionPicture");
    },
    saveInputText(){
        let question = {
            text: this.data,
            fieldType: 'input',
            values: "",
            order: this.questions.length + 1,
            mandatory: false,
            name: `question${this.questions[this.questions.length-1].id + 1}`
        }
        this.$store.dispatch("addQuestion", question);
        this.$modal.hide("adminCreateQuestionText");
        this.data = '';
    },
    saveInputFile(){
        let question = {
            text: this.data,
            fieldType: 'file',
            values: "",
            order: this.questions.length + 1,
            mandatory: false,
             name: `question${this.questions[this.questions.length-1].id + 1}`
        }
        this.$store.dispatch("addQuestion", question);
        this.$modal.hide("adminCreateQuestionPicture");
        this.data = '';

    }
  }
};
</script>

<style lang="scss">
h3 {
  margin: 20px 0 10px;
}
.settings-input {
  div {
    margin-bottom: 10px;
    display: flex;
    input {
      margin-right: 10px;
      width: 90%;
      padding: 10px;
    }
    button {
      margin-right: 10px;
    }
    .btn.btn__red {
      font-size: 13px;
    }
    .btn.btn__green {
      font-size: 13px;
    }
  }
}
.settings-button {
    margin: 10px 20px 15px 0;
}
.modal__create-question {
    .v--modal {
        text-align: center;
        h2 {
            font-weight: normal;
            margin-bottom: 30px;
        }
        input {
            margin-right: 10px;
            padding: 12px;
            width: 300px;
        }
        .btn {
            display: block;
            margin: 20px auto 0;
        }
    }
}
</style>
