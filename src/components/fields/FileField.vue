<template>
  <div class="question">
    <h5>{{index+1}}. {{question.text}}<span v-if="question.mandatory"> *</span></h5>
    <input type="file" accept="image/*" @change="uploadImage($event)" />
  </div>
</template>

<script>
export default {
  name: "FileField",
  props: ["name", "question", "index", "constraints"],
  methods: {
    uploadImage(event) {
      this.$store.dispatch("answerQuestion", {
        question: this.question,
        answers: event.target.files[0]
      });

      this.$store.dispatch("setImage", event.target.files[0]);
      this.$emit("validate", !!event.target.files[0]);
    }
  }
};
</script>