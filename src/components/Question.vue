<template>
  <div v-if="question">
    <!-- {{question}} -->
    <input :disabled="!editing" type="text" v-model="question.text" />
    <!-- <input type="text" :disabled="!editing" v-model="option.value" /> -->
    <button @click="editing = !editing">Edit</button>
    <button @click="save">Save</button>
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