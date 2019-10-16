<template>
  <div class="question">
    <h5>{{question.order}}. {{question.text}}</h5>
    <ValidationProvider name="Password" id="password" :rules="isRequired" v-slot="{errors}">
        <li class="inputfield-row">
          <input type="text" v-model="data" @change="onChange" />
          <span>{{ errors[0] }}</span>
        </li>
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

<style lang="scss">
@import "../../assets/scss/variables.scss";

.inputfield-row {
  list-style-type: none;
  span {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 16px;
  }
  input {
    display: block;
    width: 400px;
    padding: 5px 10px;
    @include breakpoint(mob) {
      width: 300px;
    }
    @include breakpoint(mob-sm) {
      width: 240px;
    }
  }
  select {
    width: 420px;
    display: block;
  }
  span,
  input,
  select {
    font-size: 16px;
    border: 0;
  }
  input[type="text"],
  select {
    border: 0;
    border-bottom: 1px solid $gray;
  }
}
</style>