<template>
  <div>
    <header class="header">
      <div class="header__left-part">
        <h1>Kalendar događaja</h1>
        <DatePicker />
      </div>
      <div class="header__right-part">
        <SearchField />
        <button
          class="btn btn__purple btn__large"
          type="button"
          @click="showUserCreateEventModal"
        >+ Dodaj događaj</button>
      </div>
    </header>
    <modal name="userCreateEventModal" height="700">
      <div class="tc-modal">
        <h1>Upitnik za prijavu programa u kulturnoj stanici Eđšeg</h1>
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
        </div>
        <div class="tc-modal__bottom">
          <input
            class="tc-modal-checkbox"
            id="tc-modal-checkbox"
            type="checkbox"
            v-model="terms1accepted"
          />
          <label for="tc-modal-checkbox">Prihvatam uslove</label>
          <button class="btn btn__purple btn__large">Dalje</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import SearchField from "./SearchField.vue";
import DatePicker from "./DatePicker.vue";

export default {
  name: "Header",
  components: {
    SearchField,
    DatePicker
  },
  methods: {
    showUserCreateEventModal() {
      this.$modal.show("userCreateEventModal");
    }
  },
  data: function() {
    return {
      terms1accepted: false,
      terms2accepted: false
    };
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.header {
  width: 100%;
  background-color: transparent;
  padding: 22px 0 22px 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include breakpoint(desk-xl) {
    padding-left: 0;
  }
  &__left-part {
    display: flex;
    @include breakpoint(desk-) {
      flex-direction: column;
    }
    h1 {
      margin-right: 35px;
    }
  }
  &__right-part {
    display: flex;
    align-items: center;
    @include breakpoint(desk-xl) {
      flex-direction: column;
      align-items: flex-end;
    }
  }
}

.tc-modal {
  padding: 30px;
  h1 {
    margin-bottom: 40px;
  }
  &__text {
    max-height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
    p {
      padding-bottom: 20px;
    }
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 25px;
  }
  .tc-modal-checkbox {
    position: absolute;
    opacity: 0;
  }
  .tc-modal-checkbox:checked + label:after {
    content: "";
    position: absolute;
    left: 3px;
    top: 7px;
    background: $purple;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white,
      4px -6px 0 white, 4px -8px 0 white;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  label {
    position: relative;
    cursor: pointer;
    padding: 0;
    margin-top: 17px;
  }
  label {
    &:before {
      content: "";
      margin-right: 10px;
      display: inline-block;
      vertical-align: text-top;
      width: 15px;
      height: 15px;
      background: $purple;
      border: 1px solid $gray;
      border-radius: 2px;
    }
  }
}
</style>
