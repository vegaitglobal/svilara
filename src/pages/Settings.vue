<template>
  <div>

    <tabs transitionName="fade">
        <tab :title="'Opšta podešavanja'">
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
                    v-for="option in settings"
                    :key="`${option.id}b`"
                    :option="option"
                    :showModalSettingsDeleteProp="showModalSettingsDelete"
                />
            </div>
        </tab>
        <tab :title="'Podešavanja pitanja'">
            <div class="settings-input">
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
                    :showModalQuestionDeleteProp="showModalQuestionDelete"
                />
                </div>
        </tab>
        <tab :title="'Dodavanje skripte'">
            <div class="script-input">
                <h3>Dodaj skriptu za Google Tag Manager:</h3>
                <textarea
                    rows="10"
                    cols="90"
                    v-model="firstScript"
                    v-on:keyup="() => set('firstScript', firstScript, analyticsForm)"
                ></textarea>

                <button
                    :disabled="!validate(analyticsForm)"
                    @click="addFirstScript"
                    class="btn btn__purple"
                >
                    Dodaj skriptu
                </button>
            </div>

            <div class="script-input">
                <h3>Dodaj skriptu za Google Analytics:</h3>
                <textarea
                    rows="10"
                    cols="90"
                    v-model="secondScript"
                    v-on:keyup="() => set('secondScript', secondScript, gtmForm)"
                ></textarea>

                <button
                    :disabled="!validate(gtmForm)"
                    @click="addSecondScript"
                    class="btn btn__purple"
                >
                    Dodaj skriptu
                </button>
            </div>
        </tab>
        <tab v-if="user.type=='superadmin'" :title="'Dodavanje admina'">
            <div class="admin-settings">
                <input
                type="text"
                v-model="admin.email"
                placeholder="E-mail"
                v-on:keyup="() => set('email', admin.email, adminForm)"
                />
                <span v-if="adminForm.email.error" class="error">{{ adminForm.email.error }}</span>

                <input
                type="text"
                v-model="admin.password"
                placeholder="Šifra"
                v-on:keyup="() => set('password', admin.password, adminForm)"
                />
                <span v-if="adminForm.password.error" class="error">{{ adminForm.password.error }}</span>

                <input
                type="text"
                v-model="admin.emailFrom"
                placeholder="E-mail koji želite da se pojavi u 'od' sekciji E-mail-a"
                v-on:keyup="() => set('emailFrom', admin.emailFrom, adminForm)"
                />
                <span v-if="adminForm.emailFrom.error" class="error">{{ adminForm.emailFrom.error }}</span>

                <input
                type="text"
                v-model="admin.nameFrom"
                placeholder="Naziv koji želite da se pojavi u 'od' sekciji E-mail-a"
                v-on:keyup="() => set('nameFrom', admin.nameFrom, adminForm)"
                />
                <span v-if="adminForm.nameFrom.error" class="error">{{ adminForm.nameFrom.error }}</span>

                <button
                @click="saveAdmin"
                class="btn btn__purple"
                :disabled="!validate(adminForm)">
                Dodaj admina
                </button>
            </div>
        </tab>
    </tabs>

    <modal
      name="adminCreateQuestionText"
      height="500"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
      @opened="cleanNewTextQuestion() && disableScroll()"
      @before-close="enableScroll()"
    >
      <div class="question-wrapper">
        <h2>Unesite pitanje:</h2>
        <input
          type="text"
          v-model="data1.text"
          v-on:keyup="() => set('text', data1.text, newTextQuestionForm)"
        />
        <span v-if="newTextQuestionForm.text.error" class="error">{{
          newTextQuestionForm.text.error
        }}</span>
      </div>

      <div class="question-wrapper">
        <p>Da li je odgovor obavezan?</p>
        <select
          v-model="data1.mandatory"
          v-on:change="
            e => set('mandatory', e.target.value, newTextQuestionForm)
          "
        >
          <option value="1">Da</option>
          <option value="0">Ne</option>
        </select>
        <span v-if="newTextQuestionForm.mandatory.error" class="error">{{
          newTextQuestionForm.mandatory.error
        }}</span>
      </div>

      <button
        :disabled="!validate(newTextQuestionForm)"
        @click="saveInputText"
        class="btn btn__purple btn__large"
      >
        Sačuvaj
      </button>
    </modal>

    <modal
      name="adminCreateQuestionPicture"
      height="500"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
      @opened="cleanNewImageQuestion() && disableScroll()"
      @before-close="enableScroll()"
    >
      <div class="question-wrapper">
        <h2>Unesite pitanje:</h2>
        <input
          type="text"
          v-model="data2.text"
          v-on:keyup="() => set('text', data2.text, newImageQuestionForm)"
        />
        <span v-if="newImageQuestionForm.text.error" class="error">{{
          newImageQuestionForm.text.error
        }}</span>
      </div>

      <div class="question-wrapper">
        <p>Da li je odgovor obavezan?</p>
        <select
          v-model="data2.mandatory"
          v-on:change="
            e => set('mandatory', e.target.value, newImageQuestionForm)
          "
        >
          <option value="1">Da</option>
          <option value="0">Ne</option>
        </select>
        <span v-if="newImageQuestionForm.mandatory.error" class="error">{{
          newImageQuestionForm.mandatory.error
        }}</span>
      </div>

      <button
        :disabled="!validate(newImageQuestionForm)"
        @click="saveInputFile"
        class="btn btn__purple btn__large"
      >
        Sačuvaj
      </button>
    </modal>

    <modal
      name="adminCreateSettingsText"
      height="500"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
      @opened="cleanNewSettingText() && disableScroll()"
      @before-close="enableScroll()"
    >
      <div class="question-wrapper">
        <h2>Naziv tekstualnog polja:</h2>
        <input
          type="text"
          v-model="newSettingText.keyText"
          v-on:keyup="e => set('key', e.target.value, textModalForm)"
        />
        <span v-if="textModalForm.key.error" class="error">{{
          textModalForm.key.error
        }}</span>
      </div>

      <div class="question-wrapper">
        <h2>Unesite tekst:</h2>
        <input
          type="text"
          v-model="newSettingText.valueText"
          v-on:keyup="e => set('value', e.target.value, textModalForm)"
        />
        <span v-if="textModalForm.value.error" class="error">{{
          textModalForm.value.error
        }}</span>
      </div>

      <button
        :disabled="!validate(textModalForm)"
        @click="addSettingsText()"
        class="btn btn__purple btn__large"
      >
        Sačuvaj
      </button>
    </modal>

    <modal
      name="adminCreateSettingsLink"
      height="450"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
      @opened="cleanNewSettingLink() && disableScroll()"
      @before-close="enableScroll()"
    >
      <div class="question-wrapper">
        <h2>Naslov linka:</h2>
        <input
          type="text"
          v-model="newSettingLink.keyText"
          v-on:keyup="e => set('key', e.target.value, linkModalForm)"
        />
        <span v-if="linkModalForm.key.error" class="error">{{
          linkModalForm.key.error
        }}</span>
      </div>

      <div class="question-wrapper">
        <h2>Unesite link:</h2>
        <input
          type="text"
          v-model="newSettingLink.valueText"
          v-on:keyup="e => set('value', e.target.value, linkModalForm)"
        />
        <span v-if="linkModalForm.value.error" class="error">{{
          linkModalForm.value.error
        }}</span>
      </div>

      <button
        :disabled="!validate(linkModalForm)"
        @click="addSettingsLink()"
        class="btn btn__purple btn__large"
      >
        Sačuvaj
      </button>
    </modal>
    <modal
      name="deleteQuestion"
      height="450"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
    >
      <div class="question-wrapper">
        <h2>Da li ste sigurni da želite da obrišete ovo pitanje?</h2>
      </div>
      <button
        @click="hideModalQuestionDelete"
        class="btn btn__purple btn__large"
      >
        Odustani
      </button>
      <button @click="deleteQuestion" class="btn btn__purple btn__large">
        Obriši
      </button>
    </modal>
    <modal
      name="deleteSettings"
      height="450"
      width="600"
      overlayTransition="overlay-fade"
      class="modal__create-question"
    >
      <div class="question-wrapper">
        <h2>Da li ste sigurni da želite da obrišete ovo podešavanje?</h2>
      </div>
      <button
        @click="hideModalSettingsDelete"
        class="btn btn__purple btn__large"
      >
        Odustani
      </button>
      <button @click="deleteSettings" class="btn btn__purple btn__large">
        Obriši
      </button>
    </modal>
  </div>
</template>

<script>
import SettingsOption from "../components/SettingsOption.vue";
import Question from "../components/Question.vue";
import axios from "axios";
import { required, set, validate, isUrl, isEmail } from "vue-val";

export default {
  name: "Settings",
  components: {
    SettingsOption,
    Question
  },
  data() {
    return {
      user: {},
      idDelete: "",
      settingsIdDelete: "",
      data1: {
        text: "",
        mandatory: ""
      },
      data2: {
        text: "",
        mandatory: ""
      },
      newSettingText: {
        keyText: "",
        valueText: ""
      },
      newSettingLink: {
        keyText: "",
        valueText: ""
      },
      admin: {
        password: "",
        email: "",
        emailFrom: "",
        nameFrom: ""
      },
      firstScript: "",
      secondScript: "",
      set,
      validate,
      textModalForm: {
        key: {
          valid: false,
          constraints: [required]
        },
        value: {
          valid: false,
          constraints: [required]
        }
      },
      linkModalForm: {
        key: {
          valid: false,
          constraints: [required]
        },
        value: {
          valid: false,
          constraints: [required, isUrl]
        }
      },
      analyticsForm: {
        firstScript: {
          valid: false,
          constraints: [required]
        }
      },
      gtmForm: {
        secondScript: {
          valid: false,
          constraints: [required]
        }
      },
      newTextQuestionForm: {
        text: {
          valid: false,
          constraints: [required]
        },
        mandatory: {
          valid: false,
          constraints: [required]
        }
      },
      newImageQuestionForm: {
        text: {
          valid: false,
          constraints: [required]
        },
        mandatory: {
          valid: false,
          constraints: [required]
        }
      },
      form: {
        firstScript: {
          valid: false,
          constraints: [required]
        },
        secondScript: {
          valid: false,
          constraints: [required]
        },
        value: {
          valid: false,
          error: null,
          constraints: [required, isUrl]
        },
        key: {
          valid: false,
          error: null,
          constraints: [required]
        }
      },
      adminForm: {
        email: {
          valid: false,
          error: null,
          constraints: [required, isEmail]
        },
        emailFrom: {
          valid: false,
          error: null,
          constraints: [required, isEmail]
        },
        nameFrom: {
          valid: false,
          error: null,
          constraints: [required]
        },
        password: {
          valid: false,
          error: null,
          constraints: [required]
        }
      }
    };
  },
  created() {
    this.$store.dispatch("fetchSettings");
    this.$store.dispatch("fetchQuestions").catch(err => {});
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString)
    this.user = user;
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
    showModalSettingsDelete(id) {
      this.settingsIdDelete = id;
      this.$modal.show("deleteSettings");
    },
    hideModalSettingsDelete() {
      this.$modal.hide("deleteSettings");
    },
    deleteSettings() {
      this.$store
        .dispatch("deleteSettingsOption", this.settingsIdDelete)
        .then(() => this.hideModalSettingsDelete());
    },
    showModalQuestionDelete(id) {
      this.idDelete = id;
      this.$modal.show("deleteQuestion");
    },
    hideModalQuestionDelete() {
      this.$modal.hide("deleteQuestion");
    },
    deleteQuestion() {
      this.$store
        .dispatch("deleteQuestion", this.idDelete)
        .then(() => this.hideModalQuestionDelete());
    },
    showModalQuestionText() {
      this.$modal.show("adminCreateQuestionText");
    },
    cleanNewSettingText() {
      this.newSettingText.keyText = "";
      this.newSettingText.valueText = "";

      this.textModalForm = {
        key: {
          valid: false,
          constraints: [required]
        },
        value: {
          valid: false,
          constraints: [required]
        }
      };

      this.linkModalForm = {
        key: {
          valid: false,
          constraints: [required]
        },
        value: {
          valid: false,
          constraints: [required, isUrl]
        }
      };
    },
    cleanNewSettingLink() {
      this.newSettingLink.keyText = "";
      this.newSettingLink.valueText = "";

      this.textModalForm = {
        key: {
          valid: false,
          constraints: [required]
        },
        value: {
          valid: false,
          constraints: [required]
        }
      };

      this.linkModalForm = {
        key: {
          valid: false,
          constraints: [required]
        },
        value: {
          valid: false,
          constraints: [required, isUrl]
        }
      };
    },
    cleanNewTextQuestion() {
      this.data1.text = "";
      this.data1.mandatory = "";

      this.newTextQuestionForm = {
        text: {
          valid: false,
          constraints: [required]
        },
        mandatory: {
          valid: false,
          constraints: [required]
        }
      };
    },
    cleanNewImageQuestion() {
      this.data2.text = "";
      this.data2.mandatory = "";

      this.newImageQuestionForm = {
        text: {
          valid: false,
          constraints: [required]
        },
        mandatory: {
          valid: false,
          constraints: [required]
        }
      };
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
      document.body.style.overflowY = "scroll";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    },
    enableScroll() {
      document.body.style.overflowY = "auto";
      document.body.style.position = "static";
    },
    addSettingsText() {
      let setting = {
        key: this.newSettingText.keyText,
        value: this.newSettingText.valueText,
        keyShown: 0,
        sidebar: 1
      };
      this.$store
        .dispatch("addSetting", setting)
        .then(() => {
          this.$modal.hide("adminCreateSettingsText");
          this.newSettingText.keyText = "";
          this.newSettingText.valueText = "";
        })
        .catch(error => {
          this.$swal.fire({
            type: "error",
            title: "Greška",
            text: error && error.response ? error.response.data.error : 'Došlo je do greške!'
          });
        });
    },
    addSettingsLink() {
      let setting = {
        key: this.newSettingLink.keyText,
        value: this.newSettingLink.valueText,
        keyShown: 1,
        sidebar: 1
      };
      this.$store
        .dispatch("addSetting", setting)
        .then(() => {
          this.$modal.hide("adminCreateSettingsLink");
          this.newSettingLink.keyText = "";
          this.newSettingLink.valueText = "";
        })
        .catch(error => {
          this.$swal.fire({
            type: "error",
            title: "Greška",
            text: error && error.response ? error.response.data.error : 'Došlo je do greške!'
          });
        });
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

      this.$store
        .dispatch("addQuestion", question)
        .then(() => {
          this.$modal.hide("adminCreateQuestionText");
          this.data1.text = "";
          this.data1.mandatory = "";
        })
        .catch(error => {
          this.$swal.fire({
            type: "error",
            title: "Greška!",
            text: error && error.response ? error.response.data.error : 'Došlo je do greške!'
          });
        });
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

      this.$store
        .dispatch("addQuestion", question)
        .then(() => {
          this.$modal.hide("adminCreateQuestionPicture");
          this.data2.text = "";
          this.data2.mandatory = "";
        })
        .catch(error => {
          this.$swal.fire({
            type: "error",
            title: "Greška!",
            text: error && error.response ? error.response.data.error : 'Došlo je do greške!'
          });
        });
    },
    validateScript(script) {
      if (script.substring(0, 8) !== "<script>") {
        this.$swal.fire({
          title: "Greška!",
          text: "Skripta nije dobro unešena!",
          type: "error"
        });
        return false;
      }
      return true;
    },
    addFirstScript() {
      let valid = this.validateScript(this.firstScript);
      if (!valid) return;
      var head = document.getElementsByTagName("head")[0];
      var html = this.stringToHtml(this.firstScript);
      head.prepend(html[0]);
      let script = { value: this.firstScript };
      axios
        .post(`${process.env.VUE_APP_BASE_URL}/admin/script`, script)
        .then(() => {
          this.$swal.fire({
            title: "Poslato!",
            text: "Skripta je uspešno unešena.",
            type: "success"
          });
        })
        .catch(error => {
          this.$swal.fire({
            title: "Greška!",
            text: error && error.response ? error.response.data.error : 'Došlo je do greške!',
            type: "error"
          });
        });
    },
    addSecondScript() {
      let valid = this.validateScript(this.secondScript);
      if (!valid) return;
      var head = document.getElementsByTagName("head")[0];

      var html = this.stringToHtml(this.secondScript);

      var children = head.children;
      let numberOfScriptUnderHeadTag = 0;
      for (let i = 0; i < children.length; i++) {
        if (children[i].tagName === "SCRIPT") {
          numberOfScriptUnderHeadTag = numberOfScriptUnderHeadTag + 1;
        } else break;
      }

      if (html[0]) {
        head.insertBefore(html[0], head.children[numberOfScriptUnderHeadTag]);
      }
      let script = { value: this.secondScript };
      axios
        .post(`${process.env.VUE_APP_BASE_URL}/admin/script`, script)
        .then(() => {
          this.$swal.fire({
            title: "Poslato!",
            text: "Skripta je uspešno unešena.",
            type: "success"
          });
        })
        .catch(error => {
          this.$swal.fire({
            title: "Greška!",
            text: error && error.response ? error.response.data.error : 'Došlo je do greške!',
            type: "error"
          });
        });
    },
    stringToHtml(str) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(str, "text/html");
      return doc.head.children;
    },
    saveAdmin() {
      axios
      .post(`${process.env.VUE_APP_BASE_URL}/auth/registration`, this.admin)
      .then(() => {
          this.$swal.fire({
            title: "Poslato!",
            text: "Admin je uspešno registrovan.",
            type: "success"
          });
          this.admin.email = "";
          this.admin.password = "";
          this.admin.emailFrom = "";
          this.admin.nameFrom = "";
        })
        .catch(error => {
          this.$swal.fire({
            title: "Greška!",
            text: error && error.response ? error.response.data.error : 'Došlo je do greške!',
            type: "error"
          });
        });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.settings-heading {
  margin-top: 50px;
}
.settings-input {
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
.settings-form,
.questions-form {
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 20px;
  input {
    padding: 10px;
    margin: 0 10px 10px 0;
  }
}
.settings-form {
  input {
    width: 48%;
  }
  textarea {
    margin-bottom: 10px;
  }
}
.questions-form {
  input {
    width: 97%;
  }
  .input-wrapper {
    flex-direction: column;
  }
}
.input-wrapper {
  max-width: 85%;
  margin: 0;
  display: flex;
  @include breakpoint(desk) {
    max-width: none;
  }
}
.button-wrapper {
  width: 100%;
}
.settings-button {
  margin: 10px 20px 25px 0;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .question-wrapper {
      margin-bottom: 20px;
    }
    h2 {
      font-weight: normal;
      margin-bottom: 10px;
    }
    input {
      margin: 0 10px 3px 0;
      padding: 12px;
      width: 300px;
    }
    .btn {
      display: block;
      margin: 10px auto 0;
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
.admin-settings {
    input {
        padding: 10px;
        display: block;
        margin-bottom: 10px;
        min-width: 355px;

        & + .btn {
            margin-top: 10px;
        }
    }
}
.vue-tabs__nav {
    margin-bottom: 60px;
}
.vue-tabs__nav-item {
    border: 0;
    background: rgba($purple-lighter, 0.7);
    border: 1px solid $purple-lighter;
    border-top: 1px solid $purple-lighter;
    padding: 10px;
    position: relative;
    &:hover,
    &:active,
    &.--active {
        &::before {
            position: absolute;
            display: block;
            content: '';
            width: calc(100% + 2px);
            height: 2px;
            background: $main;
            top: -1px;
            left: -1px;
        }
    }
    &.--active {
        border-bottom: 0;
        background: $white;
    }
}
.vue-tabs__panel {
    outline: 0;
}
</style>
