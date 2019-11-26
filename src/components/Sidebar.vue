<template>
  <div class="sidebar" :style="{ background: `url(${sidebarBg}) no-repeat` }">
    <a v-if="mainLogo !== ''" href="/">
      <img class="sidebar__logo" :src="mainLogo" alt="logo" />
    </a>
    <SocialIcons />
    <ContactInfo />
    <img class="sidebar__logo" :src="logo1" />
    <img class="sidebar__logo" :src="logo2" alt="logo" />
  </div>
</template>

<script>
import SocialIcons from "./SocialIcons";
import ContactInfo from "./ContactInfo";
import sidebarBg from "../assets/img/sidebar-bg.jpg";

export default {
  name: "Sidebar",
  components: {
    SocialIcons,
    ContactInfo
  },
  data: function() {
    return {
      sidebarBg: sidebarBg
    };
  },
mounted() {
  this.$store.dispatch('fetchSettings')
},
  computed: {
    settings() {
      return this.$store.getters.getSettings;
    },
    mainLogo() {
      if (this.settings.length && this.settings[0].value) {
        return (
          process.env.VUE_APP_MEDIA_BASE_URL + "/" + this.settings[0].value
        );
      }
      return "";
    },
    logo1() {
      if (this.settings.length && this.settings[1].value) {
        return (
          process.env.VUE_APP_MEDIA_BASE_URL + "/" + this.settings[1].value
        );
      }
      return "";
    },
    logo2() {
      if (this.settings.length && this.settings[2].value) {
        return (
          process.env.VUE_APP_MEDIA_BASE_URL + "/" + this.settings[2].value
        );
      }
      return "";
    }
  }
};
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
  box-shadow: inset 0 0 0 160px rgba(#2910bf, 0.6);
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
