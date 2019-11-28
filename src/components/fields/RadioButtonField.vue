<template>
  <div class="question">
    <h5>{{ index + 1 }}. {{ question.text }}</h5>
    <ValidationProvider
      :name="`Polje ${index + 1}`"
      id="password"
      :rules="isRequired"
      v-slot="{ errors }"
    >
      <ul>
        <li
          class="radio-btn"
          v-for="(value, index) in JSON.parse(question.values)"
          :key="index"
        >
          <input
            v-if="value.toLowerCase() !== 'other:'"
            type="radio"
            @change="onChange($event)"
            :name="question.id"
            :id="value"
            v-model="data"
            :value="value"
          />
          <label :for="value">{{ value }}</label>
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
  props: ["name", "question", "values", "mandatory", "index"],
  components: {
    ValidationProvider
  },
  data() {
    return {
      data:""
    };
  },
  computed: {
    isRequired() {
      if (this.question.mandatory) return "required";
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
