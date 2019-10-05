<template>
  <div class="sidebar" :style="{background: `url(${sidebarBg})` }">
    <img class="sidebar__logo" src="../assets/img/svilara-logo.jpg" alt="logo">
    <SocialIcons/>
    <ContactInfo/>
  </div>
</template>

<script>
import SocialIcons from './SocialIcons'
import ContactInfo from './ContactInfo'
import sidebarBg from "../assets/img/sidebar-bg.jpg"

export default {
  name: 'Sidebar',
  components: {
    SocialIcons,
    ContactInfo
  },
  data: function() {
    return {
      sidebarBg: sidebarBg
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

.sidebar {
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top left;
  z-index: 2;
  margin: 0;
  height: 100vh;
  width: 305px;
  top: 0;
  left: 0;
  box-shadow:inset 0 0 0 160px rgba(41, 16, 191, .6);
  padding: 26px 20px;
  &__logo {
    margin: 0 auto 30px;
    display: block;
    z-index: 3;
  }
}
</style>