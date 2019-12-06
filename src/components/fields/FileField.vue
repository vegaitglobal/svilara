<template>
  <div class="question">
    <h5>{{index+1}}. {{question.text}}</h5>
    <input type="file" accept="image/*" @change="uploadImage($event)" />
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
      this.$store.dispatch("answerQuestion", {
        question: this.question,
        answers: event.target.files[0]
      });
      this.$store.dispatch("setImage", event.target.files[0]);
    }
  }
};
</script>