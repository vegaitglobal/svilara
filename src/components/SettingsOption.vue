<template>
  <div>
    <input :disabled="true" type="text" v-model="loaclOption.key" />
    <input
      v-if="
        loaclOption.id != 1 &&
          loaclOption.id != 2 &&
          loaclOption.id != 3 &&
          loaclOption.id != 13
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
  </div>
</template>

<script>
export default {
  name: "SettingsOption",
  props: ["option"],
  data() {
    return {
      editing: false,
      loaclOption: { ...this.option }
    };
  },

  methods: {
    async save() {
      const form = new FormData();
      for (var prop in this.loaclOption) {
        form.append(prop, this.loaclOption[prop]);
      }
      let formIdObject = { id: this.loaclOption.id, form: form };

      await this.$store.dispatch("updateSettings", formIdObject);

      this.editing = false;
    },
    logoChange(event) {
      this.loaclOption.value = event.target.files[0];
    }
  }
};
</script>
