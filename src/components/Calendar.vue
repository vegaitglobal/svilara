<template>
  <div>
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :events="events"
      @eventClick="eventClicked"
      locale="sr"
    />

    <modal name="modalEventEdit" height="600" class="new-event-modal">
      <div class="modal-wrapper">
        <ol>
          <li class="inputfield-row">
            <span>Naziv programa</span>
            <input type="text" v-model="name" placeholder="Unesi naziv prostora" />
          </li>
          <li class="inputfield-row">
            <span>Opis programa</span>
            <input type="text" v-model="description" placeholder="Unesi opis prostora" />
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
            <select v-model="type">
              <option value="otvorenbp">Otvoren program (slobodan ulaz bez prijave)</option>
              <option value="otvorensp">Otvoren program (slobodan ulaz sa prijavom)</option>
              <option value="zatvoren">Zatvoren program</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Da li se događaj naplaćuje</span>
            <select v-model="price">
              <option value="1">Da</option>
              <option value="0">Ne</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Kategorija programa</span>
            <select v-model="category">
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
            <select v-model="space">
              <option value="velikasala">Velika sala</option>
              <option value="malasala">Mala sala</option>
              <option value="dvoriste">Dvorište</option>
              <option value="teren">Sportski tereni sa tribinama</option>
              <option value="drucentar">Društveni centar</option>
              <option value="plato">Plato</option>
              <option value="drugo">Drugo</option>
            </select>

            <input type="text" v-if="space=='drugo'" placeholder="Unesi ime prostora" />
          </li>
          <li class="inputfield-row">
            <span>Link ka dogadjaju na društvenim mrežama</span>
            <input type="text" v-model="socialMedia" placeholder="Unesi link" />
          </li>
          <li class="inputfield-row">
            <span>Očekivani uzrast publike</span>
            <select v-model="age">
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
            <input type="datetime-local" v-model="startTime" />
          </li>
          <li class="inputfield-row">
            <span>Vreme kraja programa</span>
            <input type="datetime-local" v-model="endTime" />
          </li>
        </ol>
      </div>
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
      events: [
        { title: "event 1", date: "2019-10-01" },
        { title: "event 2", date: "2019-10-03" }
      ],
      name: "",
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
    };
  },
  methods: {
    eventClicked(info) {
      console.log(info);
      this.$modal.show("modalEventEdit");
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/calendar.scss";

.v--modal-overlay {
  .v--modal-box {
    padding: 30px;
    max-width: 100%;
  }
  ol,
  ul {
    list-style: decimal;
    list-style-position: inside;
  }
  .inputfield-row {
    margin-bottom: 25px;
  }
}

.v--modal-overlay.new-event-modal {
  .v--modal-box {
    overflow: auto;
  }
}
</style>