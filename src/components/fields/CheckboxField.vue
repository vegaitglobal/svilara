<template>
  <div class="question">
    <h5>{{index+1}}. {{question.text}}</h5>
    <ul>
      <li class="check-box" v-for="(value, index) in JSON.parse(question.values)" :key="index">
        <input
          v-if="value.toLowerCase() !== 'other:'"
          type="checkbox"
          @change="onChange($event)"
          :name="value"
          :data-value="value"
          :id="value"
          :value="value"
          v-model="questionData"
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
  </div>
</template>

<script>
export default {
  name: "CheckboxField",
  props: ["name", "question", "index"],
  data() {
    return {
      isChecked: false,
      selectedOptions: [],
      questionData: [""]
    };
  },
  methods: {
    removeOthers() {
      for (var i = 0; i < this.selectedOptions.length; i++) {
        if (this.selectedOptions[i].startsWith("Other:")) {
          this.selectedOptions.splice(i, 1);
        }
      }
    },
    onChange(event) {
      var isChecked = event.target.checked;
      var answer = event.target.name;
      if (isChecked) {
        this.selectedOptions.push(answer);
      } else {
        this.selectedOptions = this.selectedOptions.filter(e => e !== answer);
      }
      if (event.target.type == "text") {
        this.removeOthers();
        this.selectedOptions.push(`Other: ${event.target.value}`);
      }
    }
  },
  watch: {
    selectedOptions() {
      this.$store.dispatch("answerQuestion", {
        question: this.question,
        answers: this.selectedOptions
      });
    }
  }
};
</script>

<style lang="scss">
.check-box {
  list-style-type: none;
  margin-bottom: 5px;
  input {
    margin-right: 10px;
  }
}
</style>