<template>
  <div>
    <header class="header">
      <a class="header__link" href="/">
        <img class="header__logo" src="../assets/img/svilara-logo.jpg" alt="logo"/>
      </a>
      <div class="header__left-part">
        <h1 v-if="['Welcome','Admin'].includes($route.name)">Kalendar događaja</h1>
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
            type="button"
            @click="showUserCreateEventModal"
            v-if="['Welcome'].includes($route.name)"
          >+ Dodaj događaj</button>
          <router-link
            to="/admin/new-event"
            class="btn btn__purple btn__large"
            type="button"
            tag="button"
            v-if="['Admin'].includes($route.name)"
          >Zahtevi</router-link>
          <router-link
            to="/admin/all-events"
            class="btn btn__purple btn__large"
            type="button"
            tag="button"
            v-if="['Admin'].includes($route.name)"
          >Događaji</router-link>
          <router-link
            to="/admin/settings"
            class="btn btn__purple btn__large"
            type="button"
            tag="button"
            v-if="['Admin'].includes($route.name)"
          >Podešavanja</router-link>
          <button
            @click="$router.go(-1)"
            class="btn btn__purple btn__large"
            type="button"
            v-if="['NewEvent','AllEvents','Editor', 'Settings', 'ForgotPassword'].includes($route.name)"
          >Nazad</button>
          <button
            @click="logout"
            class="btn btn__purple btn__large"
            type="button"
            v-if="['Admin'].includes($route.name)"
          >Odjavi se</button>
          <button
            @click="$router.go(-1)"
            class="btn btn__purple btn__large"
            type="button"
            v-if="['EventPage'].includes($route.name)"
          >Nazad</button>
        </div>
      </div>
    </header>
    <modal name="userCreateEventModal" height="600" width="700" overlayTransition="overlay-fade" @opened="disableScroll()" @before-close="enableScroll()">
      <button type="button" class="btn btn__close" @click="closeModal();"></button>
      <div class="tc-modal" v-if="page==1">
        <h1>Upitnik za prijavu programa u kulturnoj stanici Eđšeg / Application form for organising an event in the 'Egység' Cultural Station</h1>
        <div class="tc-modal__text">
          <p>Popunjavanjem ovog formulara aplicirate za korišćenje prostora Kulturne stanice Eđšeg i pristajete na uslove i pravila korišćenja iste.</p>

          <p>Prijave se vrše najkasnije do 15. u mesecu pre onog u kome bi se Vaš događaj održavao. Slanjem formulara u ovom roku realizacija Vašeg događaja nije prihvaćena, već to znači da formulari poslati nakon ovog roka za naredni mesec neće biti razmatrani.</p>

          <p>Da bi događaj Vaše organizacije bio uvršten u naš raspored, vaš zahtev mora odobriti tim Kulturne stanice Eđšeg. Ukoliko imate više različitih događaja koje biste želeli da uvrstimo u program Eđšega, morate popuniti formular za svaki od njih posebno.</p>

          <p>Prihvatanjem realizacije željenog događaja, predlagač automatski prihvata Pravilnik o radu KS Eđšeg i potvrđuje da je sa njim upoznat.</p>

          <p>Popunjavanjem ovog formulara, predlagač programa za priređivanje izložbe u KS prihvata činjenicu da je izlagački prostor multifunkcionalan i da se u njemu održavaju različiti događaji u periodu trajanja izložbe, na način da ne ugroze postavku ili oštete dela.</p>

          <p>
            KS može da organizuje koje se dogovaraju na pripremnim sastancima.
            Izvođački programi imaju prednost u odnosu na probe/sastanke i pripreme programa, te je najpoželjnije uneti u željene termine rezervni datum.
          </p>

          <p>Prilikom održavanja događaja u kulturnoj stanici Eđšeg biće fotografisanja i snimanja prisutnih u cilju promocije programa Fondacije „Novi Sad 2021 - Evropska prestonica kulture" i u skladu sa Zakonom o zaštiti podataka o ličnosti i Zakona o javnom informisanju, ovo se smatra pristanakom na eventualno objavljivanje predmetnih fotografija i video-zapisa na društvenim mrežama, sajtu Fondacije i kulturne stanice.</p>

          <p>Popunjavanjem upitnika potvrđujete verodostojnost i tačnost unetih podataka.</p>
          <hr>

          <p>By filling in this application form you are applying to use facilities of the 'Egység' Cultural Station and you agree to its terms and conditions.</p>

          <p>The applications have to be submitted by 15th of the month which precedes the month in which your event is taking place (e.g. if your event takes place in May, you have to submit your application by 15 April). Applications that do not meet this condition will not be taken into consideration.</p>

          <p>In order to include your organisation’s event into our schedule, it needs to be approved by the team of the 'Egység' Cultural Station. In case you have more than one event that you wish to be included in the programme of 'Egység' CS, you need to fill in a form for each the events separately.</p>

          <p>By accepting the organisation of the event, the applicant automatically accepts the Rules of Procedure of the 'Egység' Cultural Station and confirms that he / she is familiar with them.

          <p>By filling in this application form, the applicant of the exhibition accepts the fact that the Cultural Station is a multi-functional facility and that events of various types may take place during the exhibition, though in such a way that they do not endanger the exhibition or damage it.</p>

          <p>The Cultural Station can offer commercial services that are discussed during preparatory meetings.</p>
            Performances have advantage over rehearsals/meetings and preparatory activities, therefore you are advised to enter alternative dates.</p>

          <p>During the events organised in the 'Egység' Cultural Station, we usually photograph and record events in order to promote the programme of the 'Novi Sad 2021 - European Capital of Culture' Foundation in accordance with the Law on Personal Data Protection and Law on Public Information, and this application is deemed acceptance to possible publication of the said photographs and video recordings on social networks and websites of the Foundation and Cultural Station.</p>

          <p>By filling in this application form you confirm that the data entered are true and correct.</p>

        </div>
        <div class="tc-modal__bottom">
          <input
            class="tc-modal-checkbox"
            id="tc-modal-checkbox"
            type="checkbox"
            v-model="terms1accepted"
          />
          <label for="tc-modal-checkbox">Pročitao sam i prihvatam sve uslove pravilnika. / I read the Rules of Procerure and I accept them.</label>
          <input
            class="tc-modal-checkbox"
            id="tc-modal-checkbox-2"
            type="checkbox"
            v-model="terms2accepted"
          />
          <label for="tc-modal-checkbox-2">Potvrđujem verodostojnost i tačnost unetih podataka. / I confirm that the data entered are true and correct.</label>
        </div>
        <div class="text-center">
          <button class="btn btn__purple btn__large" @click="goNext">Dalje</button>
        </div>
      </div>
      <div class="tc-modal" v-if="page==2">
        <h1>Upitnik za prijavu programa u kulturnoj stanici Eđšeg</h1>
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
  data: function() {
    return {
      terms1accepted: false,
      terms2accepted: false,
      page: 1,
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
        document.body.style.overflow = 'hidden'
    },
    enableScroll() {
        document.body.style.overflow = 'auto'
    },
    goNext() {
      if (!this.terms1accepted || !this.terms2accepted) {
        this.$swal.fire({
          type: "info",
          title: "Informacija",
          text: "Neophodno je da prihvatite sve uslove pravilnika i tačnost unešenih podataka. To bi značilo i Vama i nama, da na najlakši mogući način organizujemo događaj. Hvala! "
        });
        return;
      }
      this.page = 2;
    },
    logout(){
      this.$store.dispatch("logout");
      this.$router.push({ path: '/admin/login' })
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
  }
  .button-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-end;
    @include breakpoint(mob) {
        justify-content: center;
    }
    button {
      margin: 5px 0 0 10px;
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
    box-shadow: 2px 0 0 $purple, 4px 0 0 $purple, 4px -2px 0 $purple, 4px -4px 0 $purple,
      4px -6px 0 $purple, 4px -8px 0 $purple;
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
