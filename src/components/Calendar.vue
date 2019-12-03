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
      @opened="disableScroll()"
      @before-close="enableScroll()"
    >
      <button type="button" class="btn btn__close" @click="closeModal"></button>
      <div class="modal-wrapper">
        <h1>Promeni informacije o programu</h1>
        <ol>
          <li class="inputfield-row">
            <span>Naziv programa</span>
            <input type="text" v-model="selectedEvent.title" />
          </li>
          <li class="inputfield-row">
            <span>Opis programa</span>
            <input type="text" v-model="selectedEvent.description" />
          </li>

          <li class="inputfield-row">
            <span>Logo organizacije</span>
            <input type="file" accept="image/*" @change="logoChange"/>
          </li>

          <li class="inputfield-row">
            <span>Slika</span>
            <input type="file" accept="image/*" @change="imageChange"/>
          </li>

          <li class="inputfield-row">
            <span>Status programa</span>
            <select v-model="selectedEvent.type">
              <option value="otvorenbp"
                >Otvoren program (slobodan ulaz bez prijave)</option
              >
              <option value="otvorensp"
                >Otvoren program (slobodan ulaz sa prijavom)</option
              >
              <option value="zatvoren">Zatvoren program</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Da li se događaj naplaćuje</span>
            <select v-model="selectedEvent.price">
              <option value="1">Da</option>
              <option value="0">Ne</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Kategorija programa</span>
            <select v-model="selectedEvent.category">
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
            <input v-if="selectedEvent.category == 'drugo'" type="text" v-model="categoryOther"/>
          </li>
          <li class="inputfield-row">
            <span>Planirani prostor za Vaš program</span>
            <select v-model="selectedEvent.space">
              <option value="velikasala">Velika sala</option>
              <option value="malasala">Mala sala</option>
              <option value="dvoriste">Dvorište</option>
              <option value="teren">Sportski tereni sa tribinama</option>
              <option value="drucentar">Društveni centar</option>
              <option value="plato">Plato</option>
              <option value="drugo">Drugo</option>
            </select>

            <input type="text" v-if="selectedEvent.space == 'drugo'" v-model="spaceOther"/>
          </li>
          <li class="inputfield-row">
            <span>Link ka dogadjaju na društvenim mrežama</span>
            <input type="text" v-model="selectedEvent.socialMedia" />
          </li>
          <li class="inputfield-row">
            <span>Očekivani uzrast publike</span>
            <select v-model="selectedEvent.age">
              <option value="deca">Deca</option>
              <option value="mladi">Mladi</option>
              <option value="odrasli">Odrasli</option>
              <option value="stariji">Starija publika</option>
              <option value="profesionalna">Profesionalna publika</option>
              <option value="svi">Svi</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Datum početka programa (npr: 29.11.2019.)</span>
            <input type="text" v-model="startDate" />
          </li>
          <li class="inputfield-row">
            <span>Vreme početka programa (npr: 20:00)</span>
            <input type="text" v-model="startTime" />
          </li>
          <li class="inputfield-row">
            <span>Datum kraja programa (npr: 29.11.2019)</span>
            <input type="text" v-model="endDate" />
          </li>
          <li class="inputfield-row">
            <span>Vreme kraja programa (npr: 22:00)</span>
            <input type="text" v-model="endTime" />
          </li>
        </ol>
      </div>
      <button @click="updateEvent" class="btn btn__purple btn__large">
        Sačuvaj
      </button>
    </modal>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
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
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      categoryOther: "",
      spaceOther:""
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
      if (cat !== 'izlozba' && cat !== 'muzicki' && cat !== 'igranka' && cat !== 'audiovideo' && cat !== 'predstava' 
      && cat !== 'festival'&& cat !== 'predavanja' && cat !== 'radionica'){
        this.categoryOther = cat;
        this.selectedEvent.category = 'drugo';

      }
      let space = this.selectedEvent.space;
      if (space !== 'velikasala' && space !== 'malasala' && space !== 'dvoriste' && space !== 'teren'
      && space !== 'drucentar' && space !== 'plato'){
        this.spaceOther = space;
        this.selectedEvent.space = 'drugo';
      }

      let dateStart = new Date(this.selectedEvent.startTime);
      let dateEnd = new Date(this.selectedEvent.endTime);
      this.startDateTime = dateStart.toLocaleString('sr-ME');
      let arraystartDateTime = this.startDateTime.split(" ");
      this.startDate = arraystartDateTime[0];
      this.startTime = arraystartDateTime[1];
      let startTime = this.startTime.split(":");
      this.startTime = startTime[0] + ":" + startTime[1]

      this.endDateTime = dateEnd.toLocaleString('sr-ME');
      let arrayEndDateTime = this.endDateTime.split(" ");
      this.endDate = arrayEndDateTime[0];
      this.endTime = arrayEndDateTime[1];
      let endTime = this.endTime.split(":");
      this.endTime = endTime[0] + ":" + endTime[1]

      this.$modal.show("modalEventEdit");
    },
    closeModal() {
      this.$modal.hide("modalEventEdit");
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
    async updateEvent() {
      let arrayEndDate =  this.endDate.split(".");
      let arrayEndTime = this.endTime.split(":");
      let arrayStartDate = this.startDate.split(".");
      let arrayStartTime = this.startTime.split(":");
      this.selectedEvent.startTime = new Date(arrayStartDate[2], arrayStartDate[1] - 1, arrayStartDate[0], arrayStartTime[0], arrayStartTime[1] ).toISOString();
      this.selectedEvent.endTime = new Date(arrayEndDate[2], arrayEndDate[1] - 1, arrayEndDate[0], arrayEndTime[0], arrayEndTime[1]).toISOString();

      let eventCopy = {...this.selectedEvent};
      if (eventCopy.category === 'drugo'){
        eventCopy.category = this.categoryOther;
      }

      if (eventCopy.space === 'drugo'){
        eventCopy.space = this.spaceOther;
      }

      try {
        const form = new FormData();
        for (var prop in eventCopy) {
          form.append(prop, eventCopy[prop]);
        }
        const res = await this.axios.put(
          `${process.env.VUE_APP_BASE_URL}/admin/event/${this.selectedEvent.id}`,
          form
        );
        if (res.data.success) {
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
          text: "Nešto nije u redu. Probajte ponovo!"
        });
      }
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
</style>
