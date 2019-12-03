<template>
  <div class="contact-info">
      <span>Đorđa Rajkovića 6b, Novi Sad</span>
      <a target="__blank" href="https://www.google.rs/maps/place/Svilara+-+Kulturna+stanica/@45.2627104,19.8471025,17z/data=!3m1!4b1!4m5!3m4!1s0x475b114ec1ca6fa5:0x39a729f07fee9308!8m2!3d45.2627066!4d19.8492912?hl=en">Kulturna stanica na mapi</a>
      <span>0038164123456</span>
      <a target="__blank" href="">Sajt kulturne stanice</a>
      <a target="__blank" href="https://www.coworker.com/serbia/novi-sad">Coworking</a>
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
  span,
  a {
    display: block;
    margin-bottom: 10px;
    text-align: center;
    color: $white;
  }
}
</style>
