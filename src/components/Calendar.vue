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
            <span>Naziv programa - The event name</span>
            <input type="text" v-model="name" />
          </li>
          <li class="inputfield-row">
            <span>Opis programa - The event description</span>
            <input type="text" v-model="description" />
          </li>

          <li class="inputfield-row">
            <span>Logo organizacije - Logo</span>
            <input type="file" />
          </li>

          <li class="inputfield-row">
            <span>Slika - Image</span>
            <input type="file" />
          </li>

          <li class="inputfield-row">
            <span>Status programa - The event status</span>
            <select v-model="type">
              <option value="otvorenbp">Otvoren program (slobodan ulaz bez prijave) - Open event (Visitors do not need to apply beforehand)</option>
              <option value="otvorensp">Otvoren program (slobodan ulaz sa prijavom) - Open event (Visitors need to apply beforehand)</option>
              <option value="zatvoren">Zatvoren program - Closed event</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Da li se događaj besplatan - Is the event free</span>
            <select v-model="price">
              <option value="1">Da / Yes</option>
              <option value="0">Ne / No</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Kategorija programa - Event category</span>
            <select v-model="category">
              <option value="izlozba">Izložba - Exhibition</option>
              <option value="muzicki">Muzički program - Musical event</option>
              <option value="igranka">Igranka - Dance</option>
              <option value="audiovideo">Audio-vizuelni program - Audio-visual event</option>
              <option value="predstava">Predstava - Play</option>
              <option value="festival">Festival - Festival</option>
              <option value="predavanja">Predavanje - Lecture, Seminar</option>
              <option value="radionica">Radionica - Workshop</option>
              <option value="drugo">Drugo</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Planirani prostor za Vaš program - Prefered space for your event</span>
            <select v-model="space">
              <option value="velikasala">Velika sala - Grand Hall</option>
              <option value="malasala">Mala sala - Small hall</option>
              <option value="dvoriste">Dvorište - Courtyard</option>
              <option value="teren">Sportski tereni sa tribinama - The sports court</option>
              <option value="drucentar">Društveni centar - Social center</option>
              <option value="plato">Plato - Plateau</option>
              <option value="drugo">Drugo - Other</option>
            </select>

            <input type="text" v-if="space=='drugo'"/>
          </li>
          <li class="inputfield-row">
            <span>Link ka dogadjaju na društvenim mrežama - Link to the event on social media</span>
            <input type="text" v-model="socialMedia" />
          </li>
          <li class="inputfield-row">
            <span>Očekivani uzrast publike - The expected age of visitors</span>
            <select v-model="age">
              <option value="deca">Deca - Children</option>
              <option value="mladi">Mladi - Youth</option>
              <option value="odrasli">Odrasli - Adults</option>
              <option value="stariji">Starija publika - Elderly</option>
              <option value="profesionalna">Profesionalna publika - Professionals</option>
              <option value="svi">Svi - All of the above</option>
            </select>
          </li>
          <li class="inputfield-row">
            <span>Vreme početka programa -  Start time of the event</span>
            <input type="datetime-local" v-model="startTime" />
          </li>
          <li class="inputfield-row">
            <span>Vreme kraja programa - End time of the event</span>
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
  }
  ol,
  ul {
    list-style: decimal;
    list-style-position: inside;
  }
}

.v--modal-overlay.new-event-modal {
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
          border-bottom: 1px solid #939393;
        }
      }
  }
}
</style>