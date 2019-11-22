<template>
  <div v-if="question">
    <!-- {{question}} -->
    <input :disabled="!editing" type="text" v-model="question.text" />
    <!-- <input type="text" :disabled="!editing" v-model="option.value" /> -->
    <button class="btn btn__red btn__small" @click="editing = !editing">Izmeni</button>
    <button class="btn btn__green btn__small" @click="save" >Sačuvaj</button>
    <button class="btn btn__red btn__small" @click="deleteQuestion">
      Obriši
    </button>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: ["question"],
  data(){
      return {
          editing: false
      }
  },

  methods:{
    save(){
        this.$store.dispatch('updateQuestion', this.question);
        this.editing = false;
    },
    deleteQuestion(){
      this.$store.dispatch('deleteQuestion', this.question.id);
    }
  }
};
</script>