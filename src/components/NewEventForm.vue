<template>
  <div class="new-event--wrapper">
    <div class="client-form" v-if="events">
      <h2>Zahtevi</h2>

      <Accordion :events="this.pendingEvents" :formFilled="formFilled" />

      <p v-if="events.length === 0">Nema novih zahteva...</p>
    </div>
    <ValidationObserver ref="observer">
      <div class="admin-form" slot-scope="{ valid }">
        <h2>Kreiranje novog događaja</h2>

        <div class="form-wrapper">
          <ol>
            <ValidationProvider
              name="Polje naziv"
              rules="required"
              v-slot="{ errors }"
            >
              <li class="inputfield-row">
                <span>Naziv programa</span>
                <input v-model="event.title" type="text" />
                <span v-if="errors[0]">{{ errors[0] }}</span>
              </li>
            </ValidationProvider>
            <ValidationProvider
              name="Polje opis"
              rules="required"
              v-slot="{ errors }"
            >
              <li class="inputfield-row">
                <span>Opis programa</span>
                <input v-model="event.description" type="text" />
                <span v-if="errors[0]">{{ errors[0] }}</span>
              </li>
            </ValidationProvider>
            <ValidationProvider
              name="Polje logo"
              rules="required"
              v-slot="{ validate, errors }"
            >
              <li class="inputfield-row">
                <span>Logo organizacije</span>
                <input
                  @change="logoChange($event) || validate($event)"
                  type="file"
                />
                <span v-if="errors[0]">{{ errors[0] }}</span>
              </li>
            </ValidationProvider>
            <ValidationProvider
              name="Polje slika"
              rules="required"
              v-slot="{ validate, errors }"
            >
              <li class="inputfield-row">
                <span>Slika</span>
                <input
                  @change="imageChange($event) || validate($event)"
                  type="file"
                />
                <span v-if="errors[0]">{{ errors[0] }}</span>
              </li>
            </ValidationProvider>
            <ValidationProvider
              name="Polje status"
              rules="required"
              v-slot="{ errors }"
            >
              <li class="inputfield-row">
                <span>Status programa</span>
                <select v-model="event.type">
                  <option>Otvoren program (slobodan ulaz bez prijave)</option>
                  <option>Otvoren program (slobodan ulaz sa prijavom)</option>
                  <option>Zatvoren program</option>
                </select>
                <span v-if="errors[0]">{{ errors[0] }}</span>
              </li>
            </ValidationProvider>
            <li class="inputfield-row">
              <span>Da li se događaj naplaćuje</span>
              <select v-model="event.price">
                <option value="1">Da</option>
                <option value="0">Ne</option>
              </select>
            </li>
            <li class="inputfield-row">
              <span>Kategorija programa</span>
              <select v-model="event.category">
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
              <input
                v-if="event.category == 'drugo'"
                type="text"
                v-model="categoryOther"
              />
            </li>
            <li class="inputfield-row">
              <span>Planirani prostor za Vaš program</span>
              <select v-model="event.space">
                <option>Velika sala</option>
                <option>Mala sala</option>
                <option>Dvorište</option>
                <option>Sportski tereni sa tribinama</option>
                <option>Društveni centar</option>
                <option>Plato</option>
                <option>Drugo</option>
              </select>
              <input
                v-if="event.space == 'Drugo'"
                type="text"
                v-model="spaceOther"
              />
            </li>
            <ValidationProvider
              name="Polje link"
              rules="required"
              v-slot="{ errors }"
            >
              <li class="inputfield-row">
                <span>Link ka dogadjaju na društvenim mrežama</span>
                <input v-model="event.socialMedia" type="text" />
                <span v-if="errors[0]">{{ errors[0] }}</span>
              </li>
            </ValidationProvider>
            <li class="inputfield-row">
              <span>Očekivani uzrast publike</span>
              <select v-model="event.age">
                <option>Deca</option>
                <option>Mladi</option>
                <option>Odrasli</option>
                <option>Starija publika</option>
                <option>Profesionalna publika</option>
                <option>Svi</option>
              </select>
            </li>
            <ValidationProvider
              name="Polje datum pocetka"
              rules="required|date_format"
              v-slot="{ errors }"
            >
              <li class="inputfield-row">
                <span>Datum početka programa (npr: 29.11.2019.)</span>
                <input v-model="startDate" type="text" />
              </li>
              <span v-if="errors[0]">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              name="Polje vreme pocetka"
              rules="required|time_format"
              v-slot="{ errors }"
            >
              <li class="inputfield-row">
                <span>Vreme početka programa (npr: 20:00)</span>
                <input v-model="startTime" type="text" />
                <span v-if="errors[0]">{{ errors[0] }}</span>
              </li>
            </ValidationProvider>
            <ValidationProvider
              name="Polje datum kraja"
              rules="required|date_format"
              v-slot="{ errors }"
            >
              <li class="inputfield-row">
                <span>Datum kraja programa (npr: 29.11.2019.)</span>
                <input v-model="endDate" type="text" />
                <span v-if="errors[0]">{{ errors[0] }}</span>
              </li>
            </ValidationProvider>
            <ValidationProvider
              name="Polje vreme kraja"
              rules="required|time_format"
              v-slot="{ errors }"
            >
              <li class="inputfield-row">
                <span>Vreme kraja programa (npr: 22:00)</span>
                <input v-model="endTime" type="text" />
                <span v-if="errors[0]">{{ errors[0] }}</span>
              </li>
            </ValidationProvider>
          </ol>
        </div>
        <button
          @click="createEvent"
          class="btn btn__purple btn__large mt-20"
          type="submit"
          v-if="valid"
        >
          Sačuvaj
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
Event;
import Accordion from "./Accordion";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  name: "NewEvent",
  components: {
    Accordion,
    ValidationProvider,
    ValidationObserver
  },

  data() {
    return {
      event: {
        id: "",
        title: "",
        description: "",
        type: "otvorenbp",
        price: "0",
        category: "izlozba",
        space: "velikasala",
        socialMedia: "",
        age: "mladi",
        startTime: "",
        endTime: "",
        picture: "",
        logo: ""
      },
      pendingEvents: [],
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      spaceOther: "",
      categoryOther: ""
    };
  },

  created() {
    this.$store.dispatch("fetchAdminEvents").then(data => {
      let pendingEvents = [];
      for (let i = 0; i < data.data.data.length; i++) {
        if (data.data.data[i].status == "pending") {
          pendingEvents.push(data.data.data[i]);
        }
      }
      this.pendingEvents = pendingEvents;
    });
  },
  computed: {
    events() {
      return this.$store.getters.getAdminEvents;
    },
    formFilled() {
      if (this.event) {
         let e = this.event;
        if (e.title && e.description &&
          e.logo &&
          e.picture &&
          e.type &&
          e.price &&
          e.category &&
          e.space &&
          e.socialMedia &&
          e.age &&
          this.startDate &&
          this.endDate &&
          this.startTime &&
          this.endTime) {
            return true}
      }
      return false;
    }
  },

  methods: {
    async createEvent() {
      
      let arrayEndDate = this.endDate.split(".");
      let arrayEndTime = this.endTime.split(":");
      let arrayStartDate = this.startDate.split(".");
      let arrayStartTime = this.startTime.split(":");

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

      let eventCopy = { ...this.event };
      if (eventCopy.category === "drugo") {
        eventCopy.category = this.categoryOther;
      }

      if (eventCopy.space === "Drugo") {
        eventCopy.space = this.spaceOther;
      }

      try {
        const form = new FormData();
        for (var prop in eventCopy) {
          form.append(prop, eventCopy[prop]);
        }
        const res = await this.axios.post(
          `${process.env.VUE_APP_BASE_URL}/admin/event`,
          form
        );
        if (res.data.success) {
          this.$swal.fire({
            type: "success",
            title: "Događaj je kreiran!"
          });
        } else {
          this.$swal.fire({
            type: "warning",
            title: "Greška",
            text: `${res.data.error.msg}`
          });
        }
      } catch (err) {
        this.$swal.fire({
          type: "error",
          title: "Greška",
          text: err.response.data.error
        });
      }
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
      width: 300px;
    }
    @include breakpoint(desk) {
      width: 200px;
    }
  }
  .form-wrapper {
    .inputfield-row {
      list-style-type: decimal;
    }
  }
}
</style>
