<template>
  <div class="new-event--wrapper">
    <div class="client-form" v-if="events">
      <h2>Zahtevi</h2>
      <Accordion
        v-if="event.status === 'pending'"
        v-for="(event, index) in events"
        :key="index"
        :event="event"
      />
      <p v-if="events.length === 0">Nema novih zahteva...</p>
    </div>
    <div class="admin-form">
      <h2>Kreiranje novog događaja</h2>
      <div class="form-wrapper">
        <ol>
          <li class="inputfield-row">
            <span>Naziv programa</span>
            <input v-model="event.title" type="text" />
          </li>
          <li class="inputfield-row">
            <span>Opis programa</span>
            <input v-model="event.description" type="text" />
          </li>
          <li class="inputfield-row">
            <span>Logo organizacije</span>
            <input @change="logoChange($event)" type="file" />
          </li>
          <li class="inputfield-row">
            <span>Slika</span>
            <input @change="imageChange($event)" type="file" />
          </li>
          <li class="inputfield-row">
            <span>Status programa</span>
            <select v-model="event.status">
              <option>Otvoren program (slobodan ulaz bez prijave)</option>
              <option>Otvoren program (slobodan ulaz sa prijavom)</option>
              <option>Zatvoren program</option>
            </select>
          </li>
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
            <input type="text" />
          </li>
          <li class="inputfield-row">
            <span>Link ka dogadjaju na društvenim mrežama</span>
            <input v-model="event.socialMedia" type="text" />
          </li>
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
          <li class="inputfield-row">
            <span>Vreme početka programa</span>
            <input v-model="event.startTime" type="datetime-local" />
          </li>
          <li class="inputfield-row">
            <span>Vreme kraja programa</span>
            <input v-model="event.endTime" type="datetime-local" />
          </li>
        </ol>
      </div>
      <button @click="createEvent" class="btn btn__purple btn__large mt-20" type="submit">Sačuvaj</button>
    </div>
  </div>
</template>

<script>Event
import Accordion from "./Accordion";

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
      }
    };
  },

  created() {
    this.$store.dispatch("fetchAdminEvents");
  },
  computed: {
    events() {
      return this.$store.getters.getAdminEvents;
    }
  },

  methods: {
    async createEvent() {
      try {
          const form = new FormData()
          for (var prop in this.event){
              console.log(prop)
              form.append(prop, this.event[prop])
          }
        const res = await this.axios.post(
          `${process.env.VUE_APP_BASE_URL}/admin/event`,
          form
        );
        if (res.data.success) {
          this.$swal.fire({
            type: "success",
            title: "Success",
            text: "Event created!"
          });
        }else{
           this.$swal.fire({
            type: "warning",
            title: "Error",
            text: `${res.data.error.msg}`
          });
        }
      } catch (err) {
        this.$swal.fire({
          type: "error",
          title: "Error",
          text: "Something went wrong! Try again!"
        });
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