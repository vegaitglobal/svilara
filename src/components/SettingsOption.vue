<template>
  <div>
    <input :disabled="!editing" type="text" v-model="option.key" />
    <input v-if="option.id!=1 && option.id!=2 && option.id!=3" type="text" :disabled="!editing" v-model="option.value" />
    <input :disabled="!editing" v-if="option.id==1 || option.id==2 || option.id==3"type="file"  @change="logoChange($event)"/>
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
         const form = new FormData()
          for (var prop in this.option){
              form.append(prop, this.option[prop])
          }
          let formIdObject = {id: this.option.id, form: form}
          this.$store.dispatch('updateSettings', formIdObject)
          this.editing = false;
      },
      logoChange(event){
        this.option.value = event.target.files[0];
        console.log(this.option.value )
      }
  }
};
</script>