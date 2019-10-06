<template>
  <div class="new-event--wrapper">
      <div class="client-form" v-if="events">
            <h2>Zahtevi</h2>
            <Accordion v-if="event.status === 'pending'" v-for="(event, index) in events" :key="index" :event="event"/>
            <p v-if="events.length === 0">Nema novih zahteva...</p>
      </div>
      <div class="admin-form">
            <h2>Kreiranje novog događaja</h2>
            <div class="form-wrapper">
                <ol>
                    <li class="inputfield-row">
                        <span>Naziv programa</span>
                        <input type="text" />
                    </li>
                    <li class="inputfield-row">
                        <span>Opis programa</span>
                        <input type="text" />
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
                        <select>
                        <option>Otvoren program (slobodan ulaz bez prijave)</option>
                        <option>Otvoren program (slobodan ulaz sa prijavom)</option>
                        <option>Zatvoren program</option>
                        </select>
                    </li>
                    <li class="inputfield-row">
                        <span>Da li se događaj naplaćuje</span>
                        <select>
                        <option>Da</option>
                        <option>Ne</option>
                        </select>
                    </li>
                    <li class="inputfield-row">
                        <span>Kategorija programa</span>
                        <select>
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
                        <select>
                        <option>Velika sala</option>
                        <option>Mala sala</option>
                        <option>Dvorište</option>
                        <option>Sportski tereni sa tribinama</option>
                        <option>Društveni centar</option>
                        <option>Plato</option>
                        <option>Drugo</option>
                        </select>
                        <input type="text"/>
                    </li>
                    <li class="inputfield-row">
                        <span>Link ka dogadjaju na društvenim mrežama</span>
                        <input type="text" />
                    </li>
                    <li class="inputfield-row">
                        <span>Očekivani uzrast publike</span>
                        <select>
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
                        <input type="datetime-local" />
                    </li>
                    <li class="inputfield-row">
                        <span>Vreme kraja programa</span>
                        <input type="datetime-local" />
                    </li>
                </ol>
            </div>
            <button @click="save" class="btn btn__purple btn__large mt-20" type="submit">Sačuvaj</button>
      </div>
  </div>
</template>
    
<script>
import Accordion from "./Accordion"

export default {
  name: "NewEvent",
  components: {
      Accordion
  },

  created(){
      this.$store.dispatch('fetchAdminEvents')
  },
  computed:{
      events(){
          return this.$store.getters.getAdminEvents
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
        border: 2px solid #e6e9f9;
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
    select{
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
            margin-bottom: 20px;
        }
    }
}

</style>