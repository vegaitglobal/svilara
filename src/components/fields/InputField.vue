<template>
  <div>
    <h5>{{question.order}}. {{question.text}} -- {{question.mandatory}}</h5>
    <ValidationProvider name="Field" id="password" :rules="isRequired" v-slot="{errors}">
      <input type="text" v-model="data" @change="onChange" />
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "InputField",
  props: ["name", "question", "values", "mandatory"],
  components: {
    ValidationProvider
  },

  data(){
    return {
      data: ''
    }
  },
  computed: {
    isRequired() {
      if (this.question.mandatory) return "required";
      return "";  
    }
  },

  methods: {
    onChange(event) {
      this.$store.dispatch('answerQuestion', {question: this.question, answers: this.data})
    }
  }
};
</script>

<style scoped>
</style>