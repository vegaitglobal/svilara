<template>
  <div>
    <h3>Opšta podešavanja</h3>
    <div class="settings-input">
      <button
        @click="showModalSettingsLink()"
        class="btn btn__purple settings-button"
      >
        Dodaj link u sidebar
      </button>
      <button
        @click="showModalSettingsText()"
        class="btn btn__purple settings-button"
      >
        Dodaj tekst u sidebar
      </button>
      <SettingsOption
        v-for="(option, index) in settings"
        :key="index"
        :option="option"
      />
      <h3>Podešavanja pitanja u formularu</h3>
      <button
        @click="showModalQuestionText"
        class="btn btn__purple settings-button"
      >
        Dodaj pitanje gde je odgovor tekst
      </button>
      <button
        @click="showModalQuestionPicture"
        class="btn btn__purple settings-button"
      >
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
      <button @click="addFirstScript" class="btn btn__purple">
        Dodaj skriptu
      </button>
    </div>
    <div class="script-input">
      <p>Dodaj skriptu za Google Tag Manager:</p>
      <textarea rows="10" cols="90" v-model="secondScript"></textarea>
      <button @click="addSecondScript" class="btn btn__purple">
        Dodaj skriptu
      </button>
    </div>
    <modal
      name="adminCreateQuestionText"
      height="400"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
      @opened="disableScroll()"
      @before-close="enableScroll()"
    >
      <h2>Unesite pitanje:</h2>
      <input type="text" v-model="data1.text" />
      <p>Da li je odgovor obavezan?</p>
      <select v-model="data1.mandatory">
        <option value="1">Da</option>
        <option value="0">Ne</option>
      </select>
      <button @click="saveInputText" class="btn btn__purple btn__large">
        Sačuvaj
      </button>
    </modal>
    <modal
      name="adminCreateQuestionPicture"
      height="400"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
      @opened="disableScroll()"
      @before-close="enableScroll()"
    >
      <h2>Unesite pitanje:</h2>
      <input type="text" v-model="data2.text" />
      <p>Da li je odgovor obavezan?</p>
      <select v-model="data2.mandatory">
        <option value="1">Da</option>
        <option value="0">Ne</option>
      </select>
      <button @click="saveInputFile" class="btn btn__purple btn__large">
        Sačuvaj
      </button>
    </modal>
    <modal
      name="adminCreateSettingsText"
      height="400"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
      @opened="disableScroll()"
      @before-close="enableScroll()"
    >
      <h2>Naslov teksta:</h2>
      <input type="text" v-model="newSetting.keyText" />
      <h2>Unesite tekst:</h2>
      <input type="text" v-model="newSetting.valueText" />

      <button @click="addSettings(0)" class="btn btn__purple btn__large">
        Sačuvaj
      </button>
    </modal>
    <modal
      name="adminCreateSettingsLink"
      height="400"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
      @opened="disableScroll()"
      @before-close="enableScroll()"
    >
      <h2>Naslov linka:</h2>
      <input type="text" v-model="newSetting.keyText" />
      <h2>Unesite link:</h2>
      <input type="text" v-model="newSetting.valueText" />

      <button @click="addSettings(1)" class="btn btn__purple btn__large">
        Sačuvaj
      </button>
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
      data1: {
        text: "",
        mandatory: ""
      },
      data2: {
        text: "",
        mandatory: ""
      },
      newSetting:{
        keyText:"",
        valueText:""
      },
      firstScript: "",
      secondScript: "",
    };
  },
  created() {
    this.$store.dispatch("fetchSettings");
    this.$store.dispatch("fetchQuestions");
  },

  computed: {
    settings: {
      get: function() {
        return this.$store.getters.getSettings();
      }
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
    showModalSettingsText() {
      this.$modal.show("adminCreateSettingsText");
    },
    showModalSettingsLink() {
      this.$modal.show("adminCreateSettingsLink");
    },
    disableScroll() {
        document.body.style.overflowY = 'scroll';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    },
    enableScroll() {
        document.body.style.overflowY = 'auto';
        document.body.style.position = 'static';
    },
    addSettings(keyShown){
      let setting = {
        key: this.newSetting.keyText,
        value: this.newSetting.valueText,
        keyShown: keyShown,
        sidebar: "1"
      }
      this.$store.dispatch("addSetting", setting);
      this.$modal.hide("adminCreateSettingsText");
      this.$modal.hide("adminCreateSettingsLink");
      this.newSetting.keyText = "";
      this.newSetting.valueText = "";
    },
    saveInputText() {
      let question = {
        text: this.data1.text,
        fieldType: "input",
        values: "",
        order: this.questions.length + 1,
        mandatory: this.data1.mandatory,
        name: `question${this.questions[this.questions.length - 1].id + 1}`
      };

      this.$store.dispatch("addQuestion", question);
      this.$modal.hide("adminCreateQuestionText");
      this.data1.text = "";
      this.data1.mandatory = "";
    },
    saveInputFile() {
      let question = {
        text: this.data2.text,
        fieldType: "file",
        values: "",
        order: this.questions.length + 1,
        mandatory: this.data2.mandatory,
        name: `question${this.questions[this.questions.length - 1].id + 1}`
      };

      this.$store.dispatch("addQuestion", question);
      this.$modal.hide("adminCreateQuestionPicture");
      this.data2.text = "";
      this.data2.mandatory = "";
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
      margin-bottom: 20px;
    }
    input {
      margin-right: 10px;
      padding: 12px;
      width: 300px;
      margin-bottom: 20px;
    }
    .btn {
      display: block;
      margin: 20px auto 0;
    }
    p {
      margin-bottom: 20px;
      font-size: 16px;
    }
    select {
      width: 200px;
      padding: 10px;
      background-size: 9%;
    }
  }
}
</style>
