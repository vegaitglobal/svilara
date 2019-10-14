<template>
  <div class="sidebar" :style="{background: `url(${sidebarBg}) no-repeat` }">
    <a href="/">
        <img class="sidebar__logo" src="../assets/img/svilara-logo.jpg" alt="logo">
    </a>
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
  position: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top left;
  z-index: 2;
  margin: 0;
  height: 100%;
  width: 305px;
  top: 0;
  left: 0;
  box-shadow:inset 0 0 0 160px rgba(41, 16, 191, .6);
  padding: 26px 20px;
  @include breakpoint(htab) {
    width: 220px;
  }
  @include breakpoint(mob) {
    display: none;
  }
  &__logo {
    margin: 0 auto 30px;
    display: block;
    z-index: 3;
  }
}
</style>