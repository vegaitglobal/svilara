<template>
  <div class="settings-form">
    <div class="input-wrapper">
      <input
        :disabled="!loaclOption.sidebar || !editing"
        type="text"
        v-model="loaclOption.key"
      />
      <input
        v-if="
          loaclOption.id != 1 &&
            loaclOption.id != 2 &&
            loaclOption.id != 3 &&
            loaclOption.id != 13 &&
            loaclOption.id != 16 &&
            loaclOption.id != 17
        "
        type="text"
        :disabled="!editing"
        v-model="loaclOption.value"
      />

      <input
        :disabled="!editing"
        v-if="
          loaclOption.id == 1 ||
            loaclOption.id == 2 ||
            loaclOption.id == 3 ||
            loaclOption.id == 13
        "
        type="file"
        @change="logoChange($event)"
      />
      <textarea
        v-if="loaclOption.id == 16 || loaclOption.id == 17"
        :disabled="!editing"
        v-model="loaclOption.value"
        cols="70"
        rows="8"
      />
    </div>

    <div class="button-wrapper">
      <button class="btn btn__red btn__small" @click="editing = !editing">
        Izmeni
      </button>
      <button
        :disabled="!editing"
        class="btn btn__green btn__small"
        @click="save"
      >
        Sačuvaj
      </button>
      <button
        v-if="loaclOption.sidebar"
        class="btn btn__red btn__small"
        @click="showModalSettingsDelete(option.id)"
      >
        Obriši
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsOption",
  props: ["option", "showModalSettingsDeleteProp"],

  data() {
    return {
      editing: false,
      loaclOption: { ...this.option }
    };
  },
  methods: {
    showModalSettingsDelete(id){
      this.showModalSettingsDeleteProp(id);
    },
    async save() {
      const form = new FormData();
      for (var prop in this.loaclOption) {
        form.append(prop, this.loaclOption[prop]);
      }
      let formIdObject = { id: this.loaclOption.id, form: form };

      this.$store
        .dispatch("updateSettings", formIdObject)
        .then(() => { this.editing = false; })
        .catch(error => {
          this.$swal.fire({
            type: "error",
            title: "Greška",
            text: error && error.response? error.response.data.error: 'Došlo je do greške!'
          });
        });

     
    },
    logoChange(event) {
      this.loaclOption.value = event.target.files[0];
    }
  }
};
</script>
