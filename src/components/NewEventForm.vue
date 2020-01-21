<template>
  <div class="new-event--wrapper">
    <div class="client-form" v-if="events">
      <h2>Zahtevi</h2>

      <Accordion :events="this.pendingEvents" :formValid="validate(form)" />

      <p v-if="events.length === 0">Nema novih zahteva...</p>
    </div>
    <div class="admin-form">
      <h2>Kreiranje novog događaja</h2>

      <div class="form-wrapper">
        <ol>
          <li class="inputfield-row">
            <span>Naziv programa</span>
            <input
              v-on:keyup="() => set('title', event.title, form)"
              v-model="event.title"
              type="text"
            />
            <span v-if="form.title.error" class="error">{{
              form.title.error
            }}</span>
          </li>

          <li class="inputfield-row">
            <span>Opis programa</span>
            <input
              v-on:keyup="() => set('description', event.description, form)"
              v-model="event.description"
              type="text"
            />
            <span v-if="form.description.error" class="error">{{
              form.description.error
            }}</span>
          </li>

          <li class="inputfield-row">
            <span>Kontakt e-mail</span>
            <input
              v-on:keyup="() => set('contactEmail', event.contactEmail, form)"
              v-model="event.contactEmail"
              type="text"
            />
            <span v-if="form.contactEmail.error" class="error">{{
              form.contactEmail.error
            }}</span>
          </li>

          <li class="inputfield-row">
            <span>Logo organizacije</span>
            <input
              @change="logoChange($event) || validate($event)"
              type="file"
              v-on:change="() => set('logo', event.logo, form)"
            />
            <span v-if="form.logo.error" class="error">{{
              form.logo.error
            }}</span>
          </li>

          <li class="inputfield-row">
            <span>Slika</span>
            <input
              @change="imageChange($event) || validate($event)"
              type="file"
              v-on:change="() => set('picture', event.picture, form)"
            />
            <span v-if="form.picture.error" class="error">{{
              form.picture.error
            }}</span>
          </li>

          <li class="inputfield-row">
            <span>Status programa</span>
            <select
              v-model="event.type"
              v-on:change="e => set('type', e.target.value, form)"
            >
              <option value="otvorenbp"
                >Otvoren program (slobodan ulaz bez prijave)</option
              >
              <option value="otvorensp"
                >Otvoren program (slobodan ulaz sa prijavom)</option
              >
              <option value="zatvoren">Zatvoren program</option>
            </select>
            <span v-if="form.type.error" class="error">{{
              form.type.error
            }}</span>
          </li>

          <li class="inputfield-row">
            <span>Da li ovaj događaj treba da se nalazi na javnom kalendaru?</span>
            <select
              v-model="event.public"
              v-on:change="e => set('public', e.target.value, form)"
            >
              <option value="1">Da</option>
              <option value="0">Ne</option>
            </select>
            <span v-if="form.public.error" class="error">{{
              form.public.error
            }}</span>
          </li>

          <li class="inputfield-row">
            <span>Da li se događaj naplaćuje</span>
            <select
              v-model="event.price"
              v-on:change="e => set('price', e.target.value, form)"
            >
              <option value="1">Da</option>
              <option value="0">Ne</option>
            </select>
            <span v-if="form.price.error" class="error">{{
              form.price.error
            }}</span>
          </li>

          <li class="inputfield-row">
            <span>Kategorija programa</span>
            <select
              v-model="event.category"
              v-on:change="e => set('category', e.target.value, form)"
            >
              <option value="izlozba">Izložba</option>
              <option value="muzickiprogram">Muzički program</option>
              <option value="igranka">Igranka</option>
              <option value="audiovideo">Audio-vizuelni program</option>
              <option value="predstava">Predstava</option>
              <option value="festival">Festival</option>
              <option value="predavanja">Predavanje</option>
              <option value="radionica">Radionica</option>
              <option value="drugo">Drugo</option>
            </select>
            <span v-if="form.category.error" class="error">{{
              form.category.error
            }}</span>
            <input
              v-if="event.category == 'drugo'"
              type="text"
              v-model="categoryOther"
            />
          </li>
          <li class="inputfield-row">
            <span>Planirani prostor za Vaš program</span>
            <select
              v-model="event.space"
              v-on:change="e => set('space', e.target.value, form)"
            >
              <option value="velikasala">Velika sala</option>
              <option value="malasala">Mala sala</option>
              <option value="dvoriste">Dvorište</option>
              <option value="teren">Sportski tereni sa tribinama</option>
              <option value="drucentar">Društveni centar</option>
              <option value="plato">Plato</option>
              <option value="drugo">Drugo</option>
            </select>
            <span v-if="form.space.error" class="error">{{
              form.space.error
            }}</span>
            <input
              v-if="event.space == 'drugo'"
              type="text"
              v-model="spaceOther"
            />
          </li>
          <li class="inputfield-row">
            <span>Link ka dogadjaju na društvenim mrežama</span>
            <input
              v-model="event.socialMedia"
              type="text"
              v-on:keyup="e => set('socialMedia', e.target.value, form)"
            />
            <span v-if="form.socialMedia.error" class="error">{{
              form.socialMedia.error
            }}</span>
          </li>
          <li class="inputfield-row">
            <span>Očekivani uzrast publike</span>
            <select
              v-model="event.age"
              v-on:change="e => set('age', e.target.value, form)"
            >
              <option value="deca">Deca</option>
              <option value="mladi">Mladi</option>
              <option value="odrasli">Odrasli</option>
              <option value="stariji">Starija publika</option>
              <option value="profesionalna">Profesionalna publika</option>
              <option value="svi">Svi</option>
            </select>
            <span v-if="form.age.error" class="error">{{
              form.age.error
            }}</span>
          </li>
          <li class="inputfield-row">
            <span>Datum početka programa (npr: 29.11.2019.)</span>
            <input
              v-model="startDate"
              type="text"
              v-on:keyup="() => set('startDate', startDate, form)"
            />
            <span v-if="form.startDate.error" class="error">{{
              form.startDate.error
            }}</span>
          </li>
          <li class="inputfield-row">
            <span>Vreme početka programa (npr: 20:00)</span>
            <input
              v-model="startTime"
              type="text"
              v-on:keyup="() => set('startTime', startTime, form)"
            />
            <span v-if="form.startTime.error" class="error">{{
              form.startTime.error
            }}</span>
          </li>
          <li class="inputfield-row">
            <span>Datum kraja programa (npr: 29.11.2019.)</span>
            <input
              v-model="endDate"
              type="text"
              v-on:keyup="() => set('endDate', endDate, form)"
            />
            <span v-if="form.endDate.error" class="error">{{
              form.endDate.error
            }}</span>
          </li>
          <li class="inputfield-row">
            <span>Vreme kraja programa (npr: 22:00)</span>
            <input
              v-model="endTime"
              type="text"
              v-on:keyup="() => set('endTime', endTime, form)"
            />
            <span v-if="form.endTime.error" class="error">{{
              form.endTime.error
            }}</span>
          </li>
        </ol>
      </div>
      <button
        @click="createEvent"
        class="btn btn__blue btn__large mt-20"
        type="submit"
        :disabled="!validate(form)"
      >
        Sačuvaj
      </button>
    </div>
  </div>
</template>

<script>

import Accordion from "./Accordion";
import {
  required,
  isTime,
  isDate,
  isValue,
  isUrl,
  set,
  validate, isEmail
} from "vue-val";

export default {
  name: "NewEvent",
  components: {
    Accordion
  },
  data() {
    return {
      event: {
        id: "",
        title: "",
        description: "",
        type: "",
        price: "",
        public: "",
        category: "",
        space: "",
        socialMedia: "",
        age: "",
        startTime: "",
        endTime: "",
        picture: "",
        logo: "",
        contactEmail: ""
      },
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      spaceOther: "",
      categoryOther: "",
      set,
      validate,
      form: {
        title: {
          valid: false,
          error: null,
          constraints: [required]
        },
        description: {
          valid: false,
          error: null,
          constraints: [required]
        },
        logo: {
          valid: false,
          error: null,
          constraints: [required]
        },
        picture: {
          valid: false,
          error: null,
          constraints: [required]
        },
        type: {
          valid: false,
          error: null,
          constraints: [
            required,
            isValue(["otvorenbp", "otvorensp", "zatvoren"])
          ]
        },
        price: {
          valid: false,
          error: null,
          constraints: [required, isValue(["1", "0"])]
        },
        public: {
          valid: false,
          error: null,
          constraints: [required, isValue(["1", "0"])]
        },
        category: {
          valid: false,
          error: null,
          constraints: [
            required,
            isValue([
              "izlozba",
              "muzickiprogram",
              "igranka",
              "audiovideo",
              "predstava",
              "festival",
              "predavanja",
              "radionica",
              "drugo"
            ])
          ]
        },
        space: {
          valid: false,
          error: null,
          constraints: [
            required,
            isValue([
              "velikasala",
              "malasala",
              "dvoriste",
              "teren",
              "drucentar",
              "plato",
              "drugo"
            ])
          ]
        },
        socialMedia: {
          valid: false,
          error: null,
          constraints: [required, isUrl]
        },
        age: {
          valid: false,
          error: null,
          constraints: [
            required,
            isValue([
              "deca",
              "mladi",
              "odrasli",
              "stariji",
              "profesionalna",
              "svi"
            ])
          ]
        },
        startTime: {
          valid: false,
          error: null,
          constraints: [required, isTime]
        },
        endTime: {
          valid: false,
          error: null,
          constraints: [required, isTime]
        },
        startDate: {
          valid: false,
          error: null,
          constraints: [required, isDate]
        },
        endDate: {
          valid: false,
          error: null,
          constraints: [required, isDate]
        },
        contactEmail: {
          valid: false,
          error: null,
          constraints: [required, isEmail]
        }
      }
    };
  },
  created() {
    this.$store.dispatch("fetchAdminEvents");
  },
  computed: {
    events() {
      return this.$store.getters.getAdminEvents;
    },
    pendingEvents() {
      if (this.events) {
        let pendingEvents = this.events.filter((event) => event.status == "pending");
        return pendingEvents;
      }
      return [];
    }
  },
  methods: {
    async createEvent() {
      let arrayEndDate = this.endDate.split(".");
      let arrayEndTime = this.endTime.split(":");
      let arrayStartDate = this.startDate.split(".");
      let arrayStartTime = this.startTime.split(":");

      try {
        this.event.startTime = new Date(
          arrayStartDate[2],
          arrayStartDate[1] - 1,
          arrayStartDate[0],
          arrayStartTime[0],
          arrayStartTime[1]
        ).toISOString();
        this.event.endTime = new Date(
          arrayEndDate[2],
          arrayEndDate[1] - 1,
          arrayEndDate[0],
          arrayEndTime[0],
          arrayEndTime[1]
        ).toISOString();
      } catch (err) {
        this.$swal.fire({
          type: "warning",
          title: "Upozorenje",
          text: `Unesite validan datum`
        });
      }

      let eventCopy = { ...this.event };
      if (eventCopy.category === "drugo") {
        eventCopy.category = this.categoryOther;
      }

      if (eventCopy.space.toLowerCase() === "drugo") {
        eventCopy.space = this.spaceOther;
      }
      const form = new FormData();
      for (var prop in eventCopy) {
        form.append(prop, eventCopy[prop]);
      }
      this.$store
        .dispatch("addEvent", form)
        .then(() => { 
          this.$swal.fire({
            type: "success",
            title: "Događaj je kreiran!"
          });
        this.event = {
        id: "",
        title: "",
        description: "",
        type: "",
        price: "",
        category: "",
        space: "",
        socialMedia: "",
        age: "",
        startTime: "",
        endTime: "",
        picture: "",
        logo: "",
        contactEmail: "",
        public: ""
        };
      this.startDate = "";
      this.startTime = "";
      this.endDate = "";
      this.endTime = "";
      this.spaceOther = "";
      this.categoryOther = "";
      }
        )
        .catch(err => {
           this.$swal.fire({
            type: "error",
            title: "Greška",
            text: err && err.response ? err.response.data.error : 'Došlo je do greške!'
          })
          }
        );
    },

    logoChange(event) {
      this.event.logo = event.target.files[0];
    },

    imageChange(event) {
      this.event.picture = event.target.files[0];
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.new-event--wrapper {
  display: flex;
  flex-direction: row;
  @include breakpoint(vtab) {
    flex-direction: column;
  }
  h2 {
    margin-bottom: 55px;
    text-align: center;
  }
  .btn {
    margin-top: 20px;
  }
  .client-form,
  .admin-form {
    width: 50%;
    border-radius: 10px;
    border: 2px solid $purple-lighter;
    padding: 20px;
    @include breakpoint(vtab) {
      width: 100%;
    }
  }
  .client-form {
    margin-right: 20px;
    @include breakpoint(vtab) {
      margin: 0 0 20px 0;
    }
  }
  input,
  select {
    @include breakpoint(desk-xl) {
      width: 85%;
    }
  }
  .form-wrapper {
    .inputfield-row {
      list-style-type: decimal;
    }
  }
}
</style>
