<template>
  <div>
    <h5>{{question.order}}. {{question.text}}</h5>
    <ValidationProvider
      name="Password"
      id="password"
      :rules="isRequired"
      v-slot="{errors}"
    >
      <input type="file" />
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "FileField",
  props: ["name", "question", "values", "mandatory"],
  components: {
      ValidationProvider
  },
  computed: {
      isRequired(){
          if(this.mandatory) return 'required'
      }
  },


};
</script>

<style scoped>
</style>