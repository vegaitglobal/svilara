<template>
  <div v-if="question">
    <!-- {{question}} -->
    <input :disabled="!editing" type="text" v-model="question.text" />
    <!-- <input type="text" :disabled="!editing" v-model="option.value" /> -->
    <button class="btn btn__red btn__small" @click="editing = !editing">Edit</button>
    <button class="btn btn__green btn__small" @click="save">Save</button>
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
  }
};
</script>

<style scoped>
</style>