<template>
  <div class="question">
    <h5>{{index+1}}. {{question.text}}</h5>
    <input type="file" accept="image/*" @change="uploadImage($event)" />
    <span class="error">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: "FileField",
  data() {
    return {
      errorMessage: null
    };
  },
  props: ["name", "question", "index", "constraints"],
  methods: {
    uploadImage(event) {
      let fieldValidationObject = {
        valid: true,
        message: null
      };

      for (let j = 0; j < this.constraints.length; j++) {
		fieldValidationObject = this.constraints[j](event.target.files[0]);
		console.log(fieldValidationObject);

        if (!fieldValidationObject.valid) break;
      }

      this.errorMessage = fieldValidationObject.valid
        ? null
        : fieldValidationObject.message;
      this.$emit("validate", fieldValidationObject.valid);

      this.$store.dispatch("answerQuestion", {
        question: this.question,
        answers: event.target.files[0]
      });
      this.$store.dispatch("setImage", event.target.files[0]);
    }
  }
};
</script>