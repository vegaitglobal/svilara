<template>
  <div>
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
    <h3>Dodavanje skripte</h3>
    <div class="script-input">
        <p>Dodaj skriptu za Google Analytics:</p>
        <textarea rows="10" cols="90" v-model="firstScript"></textarea>
        <button @click="addFirstScript" class="btn btn__purple">Dodaj skriptu</button>
    </div>
    <div class="script-input">
        <p>Dodaj skriptu za Google Tag Manager:</p>
        <textarea rows="10" cols="90" v-model="secondScript"></textarea>
        <button @click="addSecondScript" class="btn btn__purple">Dodaj skriptu</button>
    </div>
    <modal
    name="adminCreateQuestionText"
    height="300"
    width="600"
    overlayTransition="overlay-fade"
    class="modal__create-question"
    @opened="disableScroll()"
    @before-close="enableScroll()"
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
      @opened="disableScroll()"
      @before-close="enableScroll()"
    >
        <h2>Unesite pitanje:</h2>
        <input type="text" v-model="data" />
        <button @click="saveInputFile" class="btn btn__purple btn__large">Sačuvaj</button>
    </modal>
  </div>
</template>

<script>
import SettingsOption from "../components/SettingsOption.vue";
import Question from "../components/Question.vue";
import axios from "axios";

export default {
  name: "Settings",
  components: {
    SettingsOption,
    Question
  },
  data() {
    return {
      data: "",
      firstScript: "",
      secondScript: ""
    };
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
    disableScroll() {
        document.body.style.overflow = 'hidden'
    },
    enableScroll() {
        document.body.style.overflow = 'auto'
    },
    saveInputText() {
      let question = {
        text: this.data,
        fieldType: "input",
        values: "",
        order: this.questions.length + 1,
        mandatory: false,
        name: `question${this.questions[this.questions.length - 1].id + 1}`
      };

      this.$store.dispatch("addQuestion", question);
      this.$modal.hide("adminCreateQuestionText");
      this.data = "";
    },
    saveInputFile() {
      let question = {
        text: this.data,
        fieldType: "file",
        values: "",
        order: this.questions.length + 1,
        mandatory: false,
        name: `question${this.questions[this.questions.length - 1].id + 1}`
      };

      this.$store.dispatch("addQuestion", question);
      this.$modal.hide("adminCreateQuestionPicture");
      this.data = "";
    },
    addFirstScript() {
      var head = document.getElementsByTagName("head")[0];
      var html = this.stringToHtml(this.firstScript);
      head.prepend(html[0]);
      let script = { value: this.firstScript };
      axios.post(`${process.env.VUE_APP_BASE_URL}/admin/script`, script);
    },
    addSecondScript() {
      var head = document.getElementsByTagName("head")[0];

      var html = this.stringToHtml(this.secondScript);

      var children = head.children;
      let numberOfScriptUnderHeadTag = 0;
      for (let i = 0; i < children.length; i++) {
        if (children[i].tagName === "SCRIPT") {
          numberOfScriptUnderHeadTag = numberOfScriptUnderHeadTag + 1;
        } else break;
      }

      head.insertBefore(html[0], head.children[numberOfScriptUnderHeadTag]);
      let script = { value: this.secondScript };
      axios.post(`${process.env.VUE_APP_BASE_URL}/admin/script`, script);
    },
    stringToHtml(str) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(str, "text/html");
      return doc.head.children;
    }
  }
};
</script>

<style lang="scss">
h3 {
  margin: 20px 0 10px;
}
.settings-input {
  margin-bottom: 40px;
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
.script-input {
    p {
        margin-bottom: 10px;
    }
    .btn {
        display: block;
        margin: 30px 0;
    }
    textarea {
        resize: none;
        overflow: auto;
    }
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
