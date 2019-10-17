<template>
  <div class="question">
    <h5>{{question.order}}. {{question.text}}</h5>
    <ValidationProvider name="Password" id="password" :rules="isRequired" v-slot="{errors}">
      <ul>
        <li class="radio-btn" v-for="(value, index) in JSON.parse(question.values)" :key="index">
          <input
            v-if="value.toLowerCase() !== 'other:'"
            type="radio"
            @change="onChange($event)"
            :name="question.id"
            :id="value"
          />
          <label :for="value">{{value}}</label>
          <input
            v-if="value.toLowerCase() == 'other:'"
            type="text"
            @change="onChange($event)"
            :name="value"
          />
        </li>
      </ul>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "RadioButton",
  props: ["name", "question", "values", "mandatory"],
  components: {
    ValidationProvider
  },
  computed: {
    isRequired() {
      if (this.mandatory) return "required";
    }
  },
  methods: {
    onChange(event) {
      var isChecked = event.target.checked;
      var answer = event.target.id;

      if (event.target.type == "text") {
        answer = event.target.value;
      }

      this.$store.dispatch("answerQuestion", {
        question: this.question,
        answers: answer
      });
    }
  }
};
</script>

<style lang="scss">
  .radio-btn {
    list-style-type: none;
    margin-bottom: 5px;
    input {
        margin-right: 10px;
    }
  }
</style>