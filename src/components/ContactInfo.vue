<template>
  <div class="contact-info">
      <span class="contact-info--address">Đorđa Rajkovića 6b, Novi Sad</span>
      <a class="contact-info--website" target="__blank" href="https://www.google.rs/maps/place/Svilara+-+Kulturna+stanica/@45.2627104,19.8471025,17z/data=!3m1!4b1!4m5!3m4!1s0x475b114ec1ca6fa5:0x39a729f07fee9308!8m2!3d45.2627066!4d19.8492912?hl=en">Kulturna stanica na mapi</a>
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
    text-align: center;
  }
  &--website {
    color: $white;
  }
}
</style>
