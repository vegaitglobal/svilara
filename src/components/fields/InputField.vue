<template>
  <div class="question">
    <h5>{{index+1}}. {{question.text}}</h5>
    <ValidationProvider :name="`Polje ${index+1}`" id="password" :rules="isRequired" v-slot="{errors}">
        <li class="inputfield-row">
          <input type="text" v-model="data" @change="onChange" />
          <span class="error">{{ errors[0] }}</span>
        </li>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "InputField",
  props: ["name", "question", "values", "mandatory", "index"],
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
  margin-bottom: 10px;
  span {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 16px;
  }
  input {
    display: block;
    width: 400px;
    padding: 10px;
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
    padding: 10px;
    & + input {
        margin-top: 15px;
    }
  }
  span,
  input,
  select {
    font-size: 16px;
  }
  input[type="text"],
  select {
    border: 1px solid $gray;
  }
  input[type="file"] {
    border: 0;
    cursor: pointer;
  }
}
select {
  -moz-appearance:none;
  -webkit-appearance:none;
  appearance:none;
  background: url('../../assets/img/arrow-down.svg');
  background-repeat: no-repeat;
  background-size: 4%;
  background-position: 98% 50%;
  cursor: pointer;
}
.error {
  color: $red;
  margin: 5px 0 10px !important;
  font-size: 14px !important;
  display: block;
}
</style>