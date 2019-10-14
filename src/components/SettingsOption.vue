<template>
  <div>
    <input :disabled="!editing" type="text" v-model="option.key" />
    <input type="text" :disabled="!editing" v-model="option.value" />
    <button class="btn btn__red btn__small" @click="editing = !editing">Edit</button>
    <button class="btn btn__green btn__small" @click="save">Save</button>
  </div>
</template>

<script>
export default {
  name: "SettingsOption",
  props: ["option"],
  data() {
    return {
      editing: false
    };
  },

  methods:{
      async save(){
          this.$store.dispatch('updateSettings', this.option)
          this.editing = false;
      }
  }
};
</script>