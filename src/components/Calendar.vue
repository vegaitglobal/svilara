<template>
  <div>
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :events="events"
      @eventClick="eventClicked"
    />

    <modal name="modalEventEdit" height="600">
      <div class="modal-wrapper">
        <div class="inputfield-row">
          <span>1. Naziv programa</span>
          <input type="text" />
        </div>
        <div class="inputfield-row">
          <span>2. Lokacija programa</span>
          <input type="text" />
        </div>
        <div class="inputfield-row">
          <span>3. Opis programa</span>
          <input type="text" />
        </div>
        <div class="inputfield-row">
          <span>4. Logo</span>
          <input type="file" />
        </div>
        <div class="inputfield-row">
          <span>5. Slika</span>
          <input type="file" />
        </div>
        <div class="inputfield-row">
          <span>6. Status programa</span>
          <select>
            <option>Otvoren program (slobodan ulaz bez prijave)</option>
            <option>Otvoren program (slobodan ulaz sa prijavom)</option>
            <option>Zatvoren program</option>
          </select>
        </div>
        <div class="inputfield-row">
          <span>7. Kategorija programa</span>
          <select>
            <option>Izložba</option>
            <option>Muzički program</option>
            <option>Igranka</option>
            <option>Audio-vizuelni program</option>
            <option>Predstava</option>
            <option>Festival</option>
            <option>Predavanje</option>
            <option>Radionica</option>
          </select>
        </div>
        <div class="inputfield-row">
          <span>8. Tip</span>
          <select>
            <option>Tip 1</option>
            <option>Tip 2</option>
          </select>
        </div>
        <div class="inputfield-row">
          <span>9. Planirani prostor za Vaš program</span>
          <select>
            <option>Velika sala</option>
            <option>Mala sala</option>
            <option>Igranka</option>
            <option>Dvorište</option>
            <option>Sportski tereni sa tribinama</option>
            <option>Drugo</option>
          </select>

          <input type="text" />
        </div>
        <div class="inputfield-row">
          <span>10. Profil organizacije na društvenim mrežama (link)</span>
          <input type="text"/>
        </div>
        <div class="inputfield-row">
          <span>11. Da li ste zainteresovani za gostovanja u medijima</span>
          <select>
            <option>Da</option>
            <option>Ne</option>
          </select>
        </div>
        <div class="inputfield-row">
          <span>12. Očekivani uzrast publike</span>
          <select>
            <option>Deca</option>
            <option>Mladi</option>
            <option>Odrasli</option>
            <option>Starija publika</option>
            <option>Profesionalna publika</option>
            <option>Svi</option>
          </select>
        </div>
        <div class="inputfield-row">
          <span>12. Vreme početka programa</span>
          <input type="time" />
        </div>
        <div class="inputfield-row">
          <span>13. Vreme kraja programa</span>
          <input type="time" />
        </div>

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
      ]
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
    overflow: auto;
    padding: 30px;
  }

  .inputfield-row {
    margin-bottom: 25px;
    span {
      display: block;
      margin-bottom: 10px;
      font-size: 16px;
    }
    input {
      min-width: 400px;
      padding: 5px 10px;
    }
    select {
      min-width: 420px;
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
</style>