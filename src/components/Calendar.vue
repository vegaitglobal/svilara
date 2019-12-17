<template>
  <div>
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :events="events"
      @eventClick="eventClicked"
      locale="sr-ME"
      :displayEventEnd="true"
      :firstDay="1"
      :fixedWeekCount="false"
      :buttonText="{ today: 'Danas' }"
    />
    <!--timeZone=UTC-->
    <modal
      name="modalEventEdit"
      height="600"
      width="700"
      class="new-event-modal"
      overlayTransition="overlay-fade"
      @opened="openModal()"
      @before-close="enableScroll()"
    >
      <button type="button" class="btn btn__close" @click="closeModal"></button>
      <div class="modal-wrapper">
        <h1>Promeni informacije o programu</h1>
        <ol>
          <li class="inputfield-row">
            <span>Naziv programa</span>
            <input
              type="text"
              v-model="selectedEvent.title"
              v-on:keyup="() => set('title', selectedEvent.title, form)"
            />
            <span v-if="form.title.error" class="error">{{ form.title.error }}</span>
          </li>

          <li class="inputfield-row">
            <span>Opis programa</span>
            <input
              type="text"
              v-model="selectedEvent.description"
              v-on:keyup="() => set('description', selectedEvent.description, form)"
            />
            <span v-if="form.description.error" class="error">{{ form.description.error }}</span>
          </li>

          <li class="inputfield-row">
            <span>Logo organizacije</span>
            <div class="input-file-wrapper">
                <div>
                    <label for="attachment-logo" class="upload-btn">
                        Dodaj fajl
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      @change="logoChange($event) || validate($event)"
                      v-on:change="() => set('logo', selectedEvent.logo, form)"
                      id="attachment-logo"
                      name="attachment-logo"
                      class="upload-btn-hidden"
                    />
                </div>
                <div>
                    <span v-if="selectedEvent.logo">{{ selectedEvent.logo }}</span>
                    <span v-else>Fajl nije dodat</span>
                </div>

                <span v-if="form.logo.error" class="error">{{ form.logo.error }}</span>
            </div>
          </li>

          <li class="inputfield-row">
            <span>Slika</span>
            <div class="input-file-wrapper">
                <div>
                    <label for="attachment-picture" class="upload-btn">
                        Dodaj fajl
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      @change="imageChange($event) || validate($event)"
                      v-on:change="() => set('picture', selectedEvent.picture, form)"
                      id="attachment-picture"
                      name="attachment-picture"
                      class="upload-btn-hidden"
                    />
                </div>
                <div>
                    <span v-if="selectedEvent.picture">{{ selectedEvent.picture }}</span>
                    <span v-else>Fajl nije dodat</span>
                </div>

                <span v-if="form.picture.error" class="error">{{ form.picture.error }}</span>
            </div>
          </li>

          <li class="inputfield-row">
            <span>Status programa</span>
            <select
              v-model="selectedEvent.type"
              v-on:change="e => set('type', e.target.value, form)"
            >
              <option value="otvorenbp">Otvoren program (slobodan ulaz bez prijave)</option>
              <option value="otvorensp">Otvoren program (slobodan ulaz sa prijavom)</option>
              <option value="zatvoren">Zatvoren program</option>
            </select>
            <span v-if="form.type.error" class="error">{{ form.type.error }}</span>
          </li>

          <li class="inputfield-row">
            <span>Da li se događaj naplaćuje</span>
            <select
              v-model="selectedEvent.price"
              v-on:change="e => set('price', e.target.value, form)"
            >
              <option value="1">Da</option>
              <option value="0">Ne</option>
            </select>
            <span v-if="form.price.error" class="error">{{ form.price.error }}</span>
          </li>

          <li class="inputfield-row">
            <span>Kategorija programa</span>
            <select
              v-model="selectedEvent.category"
              v-on:change="e => set('category', e.target.value, form)"
            >
              <option value="izlozba">Izložba</option>
              <option value="muzicki">Muzički program</option>
              <option value="igranka">Igranka</option>
              <option value="audiovideo">Audio-vizuelni program</option>
              <option value="predstava">Predstava</option>
              <option value="festival">Festival</option>
              <option value="predavanja">Predavanje</option>
              <option value="radionica">Radionica</option>
              <option value="drugo">Drugo</option>
            </select>
            <span v-if="form.category.error" class="error">{{ form.category.error }}</span>
            <input v-if="selectedEvent.category == 'drugo'" type="text" v-model="categoryOther" />
          </li>

          <li class="inputfield-row">
            <span>Planirani prostor za Vaš program</span>
            <select
              v-model="selectedEvent.space"
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
            <span v-if="form.space.error" class="error">{{ form.space.error }}</span>
            <input type="text" v-if="selectedEvent.space == 'drugo'" v-model="spaceOther" />
          </li>

          <li class="inputfield-row">
            <span>Link ka dogadjaju na društvenim mrežama</span>
            <input
              type="text"
              v-model="selectedEvent.socialMedia"
              v-on:keyup="e => set('socialMedia', e.target.value, form)"
            />
            <span v-if="form.socialMedia.error" class="error">{{ form.socialMedia.error }}</span>
          </li>

          <li class="inputfield-row">
            <span>Očekivani uzrast publike</span>
            <select v-model="selectedEvent.age" v-on:change="e => set('age', e.target.value, form)">
              <option value="deca">Deca</option>
              <option value="mladi">Mladi</option>
              <option value="odrasli">Odrasli</option>
              <option value="stariji">Starija publika</option>
              <option value="profesionalna">Profesionalna publika</option>
              <option value="svi">Svi</option>
            </select>
            <span v-if="form.age.error" class="error">{{ form.age.error }}</span>
          </li>

          <li class="inputfield-row">
            <span>Datum početka programa (npr: 29.11.2019.)</span>
            <input
              type="text"
              v-model="startDate"
              v-on:keyup="() => set('startDate', startDate, form)"
            />
            <span v-if="form.startDate.error" class="error">{{ form.startDate.error }}</span>
          </li>

          <li class="inputfield-row">
            <span>Vreme početka programa (npr: 20:00)</span>
            <input
              type="text"
              v-model="startTime"
              v-on:keyup="() => set('startTime', startTime, form)"
            />
            <span v-if="form.startTime.error" class="error">{{ form.startTime.error }}</span>
          </li>

          <li class="inputfield-row">
            <span>Datum kraja programa (npr: 29.11.2019)</span>
            <input type="text" v-model="endDate" v-on:keyup="() => set('endDate', endDate, form)" />
            <span v-if="form.endDate.error" class="error">{{ form.endDate.error }}</span>
          </li>

          <li class="inputfield-row">
            <span>Vreme kraja programa (npr: 22:00)</span>
            <input type="text" v-model="endTime" v-on:keyup="() => set('endTime', endTime, form)" />
            <span v-if="form.endTime.error" class="error">{{ form.endTime.error }}</span>
          </li>
        </ol>
      </div>

      <button
        @click="updateEvent"
        class="btn btn__purple btn__large"
        :disabled="!validate(form)"
      >Sačuvaj</button>
    </modal>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  required,
  isTime,
  isDate,
  isValue,
  isUrl,
  set,
  validate,
  messages,
  notNull,
  notUndefined
} from "vue-val";

export default {
  name: "Calendar",
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin],
      selectedEvent: {
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
        logo: ""
      },
      set,
      validate,
      form: {
        title: {
          valid: true,
          error: null,
          constraints: [required]
        },
        description: {
          valid: true,
          error: null,
          constraints: [required]
        },
        logo: {
          valid: true,
          error: null,
          constraints: [required]
        },
        picture: {
          valid: true,
          error: null,
          constraints: [required]
        },
        type: {
          valid: true,
          error: null,
          constraints: [
            required,
            isValue(["otvorenbp", "otvorensp", "zatvoren"])
          ]
        },
        price: {
          valid: true,
          error: null,
          constraints: [notNull, notUndefined]
        },
        category: {
          valid: true,
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
          valid: true,
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
          valid: true,
          error: null,
          constraints: [required, isUrl]
        },
        age: {
          valid: true,
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
          valid: true,
          error: null,
          constraints: [required, isTime]
        },
        endTime: {
          valid: true,
          error: null,
          constraints: [required, isTime]
        },
        startDate: {
          valid: true,
          error: null,
          constraints: [required, isDate]
        },
        endDate: {
          valid: true,
          error: null,
          constraints: [required, isDate]
        }
      },
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
      categoryOther: "",
      spaceOther: ""
    };
  },
  created() {
    this.$store.dispatch("fetchAdminEvents");
    this.$store.dispatch("fetchSettings");
  },
  computed: {
    events() {
      return this.$store.getters.getCalendarEvents;
    }
  },
  methods: {
    eventClicked(info) {
      this.selectedEvent = JSON.parse(JSON.stringify(info.event.extendedProps));
      let cat = this.selectedEvent.category;
      if (
        cat !== "izlozba" &&
        cat !== "muzicki" &&
        cat !== "igranka" &&
        cat !== "audiovideo" &&
        cat !== "predstava" &&
        cat !== "festival" &&
        cat !== "predavanja" &&
        cat !== "radionica"
      ) {
        this.categoryOther = cat;
        this.selectedEvent.category = "drugo";
      }
      let space = this.selectedEvent.space;
      if (
        space !== "velikasala" &&
        space !== "malasala" &&
        space !== "dvoriste" &&
        space !== "teren" &&
        space !== "drucentar" &&
        space !== "plato"
      ) {
        this.spaceOther = space;
        this.selectedEvent.space = "drugo";
      }

      let dateStart = new Date(this.selectedEvent.startTime);
      let dateEnd = new Date(this.selectedEvent.endTime);
      this.startDateTime = dateStart.toLocaleString("sr-ME");
      let arraystartDateTime = this.startDateTime.split(" ");
      this.startDate = arraystartDateTime[0];
      this.startTime = arraystartDateTime[1];
      let startTime = this.startTime.split(":");
      this.startTime = startTime[0] + ":" + startTime[1];

      this.endDateTime = dateEnd.toLocaleString("sr-ME");
      let arrayEndDateTime = this.endDateTime.split(" ");
      this.endDate = arrayEndDateTime[0];
      this.endTime = arrayEndDateTime[1];
      let endTime = this.endTime.split(":");
      this.endTime = endTime[0] + ":" + endTime[1];

      this.$modal.show("modalEventEdit");
    },
    openModal() {
      this.disableScroll();
      this.checkForm();
    },
    closeModal() {
      this.$modal.hide("modalEventEdit");
    },
    checkForm() {
      for (let key in this.form) {
        for (let constraintIndex in this.form[key].constraints) {
          const constraint = this.form[key].constraints[constraintIndex];

          const validationResult = {};
          if (["startDate", "endDate", "startTime", "endTime", "categoryOther", "spaceOther"].includes(key)) {
            validationResult = constraint(this[key]);
          } else {
            validationResult = constraint(this.selectedEvent[key]);
          }

          if (validationResult.valid) {
            this.form[key].valid = true;
            this.form[key].error = null;
          } else {
            this.form[key].valid = false;
            this.form[key].error = validationResult.message;

            break;
          }
        }
      }
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
    async updateEvent() {
      let arrayEndDate = this.endDate.split(".");
      let arrayEndTime = this.endTime.split(":");
      let arrayStartDate = this.startDate.split(".");
      let arrayStartTime = this.startTime.split(":");
      this.selectedEvent.startTime = new Date(
        arrayStartDate[2],
        arrayStartDate[1] - 1,
        arrayStartDate[0],
        arrayStartTime[0],
        arrayStartTime[1]
      ).toISOString();
      this.selectedEvent.endTime = new Date(
        arrayEndDate[2],
        arrayEndDate[1] - 1,
        arrayEndDate[0],
        arrayEndTime[0],
        arrayEndTime[1]
      ).toISOString();

      let eventCopy = { ...this.selectedEvent };
      if (eventCopy.category === "drugo") {
        eventCopy.category = this.categoryOther;
      }

      if (eventCopy.space === "drugo") {
        eventCopy.space = this.spaceOther;
      }

      const form = new FormData();
      for (var prop in eventCopy) {
        form.append(prop, eventCopy[prop]);
      }
      await this.axios
        .put(
          `${process.env.VUE_APP_BASE_URL}/admin/event/${this.selectedEvent.id}`,
          form
        )
        .then(() => {
          this.$swal
            .fire({
              type: "success",
              title: "Događaj je promenjen!"
            })
            .then(res => {
              if (res.value) {
                this.$modal.hide("modalEventEdit");
                this.$store.dispatch("fetchAdminEvents");
              }
            });
        })
        .catch(err => {
          this.$swal.fire({
            type: "error",
            title: "Greška",
            text: err.response.data.error
          });
        });
    },
    logoChange(event) {
      this.selectedEvent.logo = event.target.files[0];
    },
    imageChange(event) {
      this.selectedEvent.picture = event.target.files[0];
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/calendar.scss";

.modal-wrapper {
  h1 {
    margin-bottom: 40px;
  }
}
.new-event-modal {
  .inputfield-row {
    list-style-type: decimal;
    margin-bottom: 20px;
  }
}
.input-file-wrapper {
  display: flex;
  margin-top: 15px;
}
.inputfield-row .upload-btn-hidden {
  display: none;
}
.upload-btn {
  border: 1px solid $gray;
  padding: 10px;
  cursor: pointer;
  margin-right: 10px;
  background: $gray-light;
}
</style>
