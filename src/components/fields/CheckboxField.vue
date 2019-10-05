<template>
  <div>
    <h5>{{question.order}}. {{question.text}}</h5>
    <ValidationProvider name="Password" id="password" :rules="isRequired" v-slot="{errors}">
      <ul>
        <li v-for="(value, index) in JSON.parse(question.values)" :key="index">
          <input type="checkbox" @change="onChange($event)" :name="value" :data-value="value" />
          {{value}}
        </li>
      </ul>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "CheckboxField",
  props: ["name", "question", "mandatory"],
  components: {
    ValidationProvider
  },

  data() {
    return {
      isChecked: false,
      selectedOptions: []
    };
  },

  created() {
    for (var i = 0; i < this.question.values; i++) {
      console.log(this.question.values[i]);
    }
  },
  computed: {
    isRequired() {
      if (this.mandatory) return "required";
    }
  },
  methods: {
    onChange(event) {
      var isChecked = event.target.checked
      var answer = event.target.name

      if (isChecked){
        this.selectedOptions.push(answer)
      }else{
        this.selectedOptions = this.selectedOptions.filter(e => e !== answer)
      }
    },
  },

  watch:{
    selectedOptions(){
      this.$store.dispatch('answerQuestion', {question: this.question, answers: this.selectedOptions})
    }
  }
};
</script>

<style scoped>
</style>