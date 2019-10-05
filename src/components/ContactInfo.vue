<template>
  <div class="contact-info">
      <span class="contact-info--address">Đorđa Rajkovića 6b, Novi Sad</span>
      <a class="contact-info--website" href="www.google.com">Sajt kulturne stanice</a>
      <span class="contact-info--phone">0038164123456</span>
  </div>
</template>

<script>

export default {
    name: "ContactInfo"
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
    &--address,
    &--phone,
    &--website {
        display: block;
        margin-bottom: 10px;
    }
    &--website {
        color: $white;
    }
}
</style>
