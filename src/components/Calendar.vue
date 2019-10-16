<template>
  <div>
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :events="events"
      @eventClick="eventClicked"
      locale="sr"
      :displayEventEnd="true"
    />

    <modal name="modalEventEdit" height="600" width="830" class="new-event-modal">
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
            <input type="file" />
          </li>

          <li class="inputfield-row">
            <span>Slika</span>
            <input type="file" />
          </li>

          <li class="inputfield-row">
            <span>Status programa</span>
            <select v-model="selectedEvent.type">
              <option value="otvorenbp">Otvoren program (slobodan ulaz bez prijave)</option>
              <option value="otvorensp">Otvoren program (slobodan ulaz sa prijavom)</option>
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

            <input type="text" v-if="selectedEvent.space=='drugo'" />
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
            <span>Vreme početka programa</span>
            <input type="datetime-local" v-model="selectedEvent.startTime" />
          </li>
          <li class="inputfield-row">
            <span>Vreme kraja programa</span>
            <input type="datetime-local" v-model="selectedEvent.endTime" />
          </li>
        </ol>
      </div>
      <button @click="updateEvent" class="btn btn__purple btn__large">Sačuvaj</button>
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
      }
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
      this.selectedEvent = JSON.parse(JSON.stringify(info.event.extendedProps)) ;
      this.$modal.show("modalEventEdit");
    },

    async updateEvent(){
      try {
        const form = new FormData()
          for (var prop in this.selectedEvent){
              form.append(prop, this.selectedEvent[prop])
          }
        const res = await this.axios.put(`${process.env.VUE_APP_BASE_URL}/admin/event/${this.selectedEvent.id}`, form);
        if (res.data.success) {
          this.$swal.fire({
            type: "success",
            title: "Success",
            text: "Event created!"
          }).then(res => {
            if(res.value){
              this.$modal.hide("modalEventEdit");
              this.$store.dispatch('fetchAdminEvents')
            }
          });
        } else{
           this.$swal.fire({
            type: "warning",
            title: "Error",
            text: `${res.data.error.msg}`
          });
        }
      } catch(err){
        this.$swal.fire({
          type: "error",
          title: 'Error',
          text: 'Something went wrong! Try again!'
        })
      }
    },
    logoChange(event){
        this.event.logo = event.target.files[0]
    },

    imageChange(event){
        this.event.picture = event.target.files[0]
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
  .v--modal-box {
    overflow: auto;
    .inputfield-row {
      list-style-type: decimal;
      margin-bottom: 20px;
      span {
        display: inline-block;
        margin-bottom: 10px;
        font-size: 16px;
      }
      input {
        display: block;
        width: 400px;
        padding: 5px 10px;
      }
      select {
        width: 420px;
        display: block;
      }
      span,
      input,
      select {
        font-size: 16px;
        border: 0;
      }
      input[type="text"],
      select {
        border: 0;
        border-bottom: 1px solid $gray;
      }
    }
  }
}
</style>