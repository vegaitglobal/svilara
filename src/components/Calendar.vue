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
            <input type="text" v-model="name" />
          </li>
          <li class="inputfield-row">
            <span>Opis programa</span>
            <input type="text" v-model="description" />
          </li>
          <!--
          <li class="inputfield-row">
            <span>Logo organizacije</span>
            <input type="file" v-model="logo" />
          </li>
          -->
          <!--
          <li class="inputfield-row">
            <span>Slika</span>
            <input type="file" v-model="picture" />
          </li>
          -->
          <li class="inputfield-row">
            <span>Status programa</span>
            <select v-model="type">
              <option>Otvoren program (slobodan ulaz bez prijave)</option>
              <option>Otvoren program (slobodan ulaz sa prijavom)</option>
              <option>Zatvoren program</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Da li se događaj naplaćuje</span>
            <select v-model="price">
              <option>Da</option>
              <option>Ne</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Kategorija programa</span>
            <select v-model="category">
              <option>Izložba</option>
              <option>Muzički program</option>
              <option>Igranka</option>
              <option>Audio-vizuelni program</option>
              <option>Predstava</option>
              <option>Festival</option>
              <option>Predavanje</option>
              <option>Radionica</option>
              <option>Drugo</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Planirani prostor za Vaš program</span>
            <select v-model="space">
              <option>Velika sala</option>
              <option>Mala sala</option>
              <option>Dvorište</option>
              <option>Sportski tereni sa tribinama</option>
              <option>Društveni centar</option>
              <option>Plato</option>
              <option>Drugo</option>
            </select>

            <input type="text" />
          </li>
          <li class="inputfield-row">
            <span>Link ka dogadjaju na društvenim mrežama</span>
            <input type="text" v-model="socialMedia" />
          </li>
          <li class="inputfield-row">
            <span>Očekivani uzrast publike</span>
            <select v-model="age">
              <option>Deca</option>
              <option>Mladi</option>
              <option>Odrasli</option>
              <option>Starija publika</option>
              <option>Profesionalna publika</option>
              <option>Svi</option>
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
      type: "",
      price: "",
      category: "",
      space: "",
      socialMedia: "",
      age: "",
      startTime: "",
      endTime: ""
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
  }
  ol,
  ul {
    list-style: decimal;
  }
}

.v--modal-overlay.new-event-modal {
  .v--modal-box {
    overflow: auto;
  }
}
</style>