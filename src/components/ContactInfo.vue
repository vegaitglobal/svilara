<template>
  <div v-if="setting" class="contact-info">
      <span v-if="!setting.keyShown">{{setting.value}}</span>
      <a v-if="setting.keyShown" target="__blank" :href="setting.value">{{setting.key}}</a>
  </div>
</template>

<script>

export default {
    name: "ContactInfo",
    props: ["setting"]
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.contact-info {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  color: $white;
  align-items: center;
  span,
  a {
    display: block;
    text-align: center;
    color: $white;
  }
}
</style>
