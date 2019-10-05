<template>
  <div class="sidebar">
    <div class="sidebar__bg" style="background:url('/img/sidebar-bg.jpg') no-repeat center;height:auto;width:305px;"></div>
    <img class="sidebar__logo" src="../assets/img/svilara-logo.jpg" alt="logo">
    <SocialIcons/>
  </div>
</template>

<script>
import SocialIcons from './SocialIcons'

export default {
  name: 'Sidebar',
  components: {
    SocialIcons
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

.sidebar {
  position: absolute;
  z-index: 2;
  margin: 0;
  height: 100vh;
  width: 305px;
  top: 0;
  left: 0;
  box-shadow:inset 0 0 0 160px rgba($black,.5);
  padding: 26px 20px;
  &__logo {
    margin: 0 auto 30px;
    display: block;
    z-index: 3;
  }
}
</style>