<template>
  <div>
    <header class="header">
      <a v-if="mainLogo !== ''" class="header__link" href="/">
        <img
          class="header__logo"
          :src="mainLogo"
          alt="logo"
        />
      </a>
      <div class="header__left-part">
        <h1 v-if="['Welcome', 'Admin'].includes($route.name)">
          Kalendar događaja
        </h1>
        <h1 v-if="['NewEvent'].includes($route.name)">Kreiraj događaj</h1>
        <h1 v-if="['AllEvents'].includes($route.name)">Svi događaji</h1>
        <h1 v-if="['Settings'].includes($route.name)">Podešavanja</h1>
        <h1 v-if="['Editor'].includes($route.name)">Kreiraj stranicu</h1>
        <h1 v-if="['EventPage'].includes($route.name)">Opis događaja</h1>
        <DatePicker v-if="['Welcome'].includes($route.name)" />
      </div>
      <div class="header__right-part">
        <SearchField v-if="['Welcome'].includes($route.name)" />
        <div class="button-wrapper">
          <button
            class="btn btn__purple btn__large"
            :style="{backgroundColor: backgroundColor}"
            type="button"
            @click="showUserCreateEventModal"
            v-if="['Welcome'].includes($route.name)"
          >
            + Dodaj događaj
          </button>
          <router-link
            to="/admin/new-event"
            class="btn btn__purple btn__large"
            type="button"
            tag="button"
            v-if="['Admin'].includes($route.name)"
            >Zahtevi</router-link
          >
          <router-link
            to="/admin/all-events"
            class="btn btn__purple btn__large"
            type="button"
            tag="button"
            v-if="['Admin'].includes($route.name)"
            >Događaji</router-link
          >
          <router-link
            to="/admin/settings"
            class="btn btn__purple btn__large"
            type="button"
            tag="button"
            v-if="['Admin'].includes($route.name)"
            >Podešavanja</router-link
          >
          <router-link
            to="/admin"
            class="btn btn__purple btn__large"
            v-if="['NewEvent', 'AllEvents', 'Settings'].includes($route.name)"
          >
            Nazad
          </router-link>
          <router-link
            to="/admin/all-events"
            class="btn btn__purple btn__large"
            v-if="['Editor'].includes($route.name)"
          >
            Nazad
          </router-link>
          <router-link
            to="/"
            class="btn btn__purple btn__large"
            v-if="['EventPage'].includes($route.name)"
          >
            Nazad
          </router-link>
          <button
            @click="logout"
            class="btn btn__purple btn__large"
            type="button"
            v-if="['ForgotPassword'].includes($route.name)"
          >
            Nazad
          </button>
          <button
            @click="logout"
            class="btn btn__purple btn__large"
            type="button"
            v-if="['Admin'].includes($route.name)"
          >
            Odjavi se
          </button>
        </div>
      </div>
    </header>
    <modal
      name="userCreateEventModal"
      height="600"
      width="700"
      overlayTransition="overlay-fade"
      @opened="disableScroll()"
      @before-close="enableScroll()"
    >
      <button
        type="button"
        class="btn btn__close"
        @click="closeModal()"
      ></button>
      <div class="tc-modal" v-if="page == 1">
        <h1>{{ title }}</h1>
        <div class="tc-modal__text">
          <p v-for="(paragraph, index) in textSerbian"  :key="`${index}c`">{{paragraph}}</p>
          <hr />
           <p v-for="(paragraph, index) in textEnglish"  :key="`${index}d`">{{paragraph}}</p>
        </div>
        <div class="tc-modal__bottom">
          <input
            class="tc-modal-checkbox"
            id="tc-modal-checkbox"
            type="checkbox"
            v-model="terms1accepted"
          />
          <label for="tc-modal-checkbox"
            >Pročitao sam i prihvatam sve uslove pravilnika. / I read the Rules
            of Procerure and I accept them.</label
          >
          <input
            class="tc-modal-checkbox"
            id="tc-modal-checkbox-2"
            type="checkbox"
            v-model="terms2accepted"
          />
          <label for="tc-modal-checkbox-2"
            >Potvrđujem verodostojnost i tačnost unetih podataka. / I confirm
            that the data entered are true and correct.</label
          >
        </div>
        <div class="text-center">
          <button class="btn btn__purple btn__large" :style="{backgroundColor: backgroundColor}" @click="goNext">
            Dalje
          </button>
        </div>
      </div>
      <div class="tc-modal" v-if="page == 2">
        <h1>{{userFormTitle}}</h1>
        <Formular />
      </div>
    </modal>
  </div>
</template>

<script>
import SearchField from "./SearchField.vue";
import DatePicker from "./DatePicker.vue";
import Formular from "./Formular.vue";

export default {
  name: "Header",
  components: {
    SearchField,
    DatePicker,
    Formular
  },
  computed: {
    settings: {
      get: function() {
        return this.$store.getters.getSettings();
      }
    },
    backgroundColor() {
      if (this.settings.length && this.settings[22].value) {
        return this.settings[22].value;
      }
      return "";
    },
     mainLogo() {
      if (this.settings.length && this.settings[0].value) {
        return (
          process.env.VUE_APP_MEDIA_BASE_URL + "/" + this.settings[0].value
        );
      }
      return "";
    },
    title() {
      if (this.settings.length && this.settings[14]) {
        return this.settings[14].value;
      }
      return "";
    },
    textSerbian() {
      if (this.settings.length && this.settings[15]) {
        let arrayOftext = this.settings[15].value.split("\n");
        return arrayOftext;
      }
      return "";
    },
    textEnglish() {
      if (this.settings.length && this.settings[16]) {
        let arrayOftext = this.settings[16].value.split("\n");
        return arrayOftext;
      }
      return "";
    },
    userFormTitle() {
      if (this.settings.length && this.settings[17]) {
        return this.settings[17].value;
      }
      return "";
    }
  },
  data: function() {
    return {
      terms1accepted: false,
      terms2accepted: false,
      page: 1
    };
  },
  methods: {
    showUserCreateEventModal() {
      this.page = 1;
      this.terms1accepted = false;
      this.terms2accepted = false;
      this.$modal.show("userCreateEventModal");
    },
    closeModal() {
      this.$modal.hide("userCreateEventModal");
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
    goNext() {
      if (!this.terms1accepted || !this.terms2accepted) {
        this.$swal.fire({
          type: "info",
          title: "Informacija",
          text:
            "Neophodno je da prihvatite sve uslove pravilnika i tačnost unešenih podataka. To bi značilo i Vama i nama, da na najlakši mogući način organizujemo događaj. Hvala! "
        });
        return;
      }
      this.page = 2;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ path: "/admin/login" });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.header {
  width: 100%;
  background-color: transparent;
  padding: 25px 0 25px 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include breakpoint(desk-xl) {
    padding-left: 0;
    align-items: flex-start;
  }
  @include breakpoint(mob) {
    flex-direction: column;
    align-items: center;
  }
  &__link {
    display: none;
    @include breakpoint(mob) {
      display: inline-block;
    }
  }
  &__logo {
    width: 150px;
    margin-bottom: 15px;
  }
  &__left-part {
    display: flex;
    @include breakpoint(desk-xl) {
      flex-direction: column;
    }
    @include breakpoint(mob) {
      max-width: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 30px;
    }
    h1 {
      margin-right: 35px;
      @include breakpoint(desk-xl) {
        margin: 5px 0 25px 0;
      }
      @include breakpoint(mob) {
        padding-left: 0;
        font-size: 21px;
        margin-bottom: 40px;
      }
    }
  }
  &__right-part {
    display: flex;
    align-items: center;
    @include breakpoint(desk-xl) {
      flex-direction: column;
      align-items: flex-end;
    }
    @include breakpoint(mob) {
      flex-direction: initial;
      align-items: center;
      justify-content: center;
      margin: 20px 20px 0;
      flex-wrap: wrap;
    }
    .search-field {
      @include breakpoint(mob) {
        margin: 0;
      }
      @include breakpoint(mob-sm) {
        margin-bottom: 20px;
      }
    }
    .button-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: flex-end;
      @include breakpoint(mob) {
        justify-content: center;
      }
      button,
      a {
        margin: 0 0 10px 10px;
      }
    }
  }
}
.tc-modal {
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  h1 {
    margin-bottom: 40px;
  }
  &__text {
    p {
      padding-bottom: 20px;
    }
  }
  &__bottom {
    padding-top: 25px;
    display: grid;
  }
  .btn__purple {
    margin-top: 20px;
  }
  .tc-modal-checkbox {
    position: absolute;
    opacity: 0;
  }
  .tc-modal-checkbox:checked + label:after {
    content: "";
    position: absolute;
    left: 3px;
    top: 9px;
    background: $white;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 $main, 4px 0 0 $main, 4px -2px 0 $main,
      4px -4px 0 $main, 4px -6px 0 $main, 4px -8px 0 $main;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  label {
    position: relative;
    cursor: pointer;
    padding: 0;
    margin-top: 17px;
    font-size: 14px;
    line-height: 20px;
  }
  label {
    &:before {
      content: "";
      margin-right: 10px;
      display: inline-block;
      vertical-align: text-top;
      width: 15px;
      height: 15px;
      background: $white;
      border: 1px solid $gray;
      border-radius: 2px;
    }
  }
  .radio-btn,
  .check-box {
    label {
      &::before {
        display: none;
      }
      & + input {
        margin-left: 10px;
        padding: 10px;
      }
    }
  }
  .text-center .btn {
    margin-bottom: 40px;
  }
}
</style>
