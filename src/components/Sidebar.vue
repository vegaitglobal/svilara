<template>
  <div class="sidebar" :style="{ background: `url(${sidebarBg}) no-repeat` }">
    <a href="/">
      <img class="sidebar__logo" :src="mainLogo" alt="logo" />
    </a>
    <a v-if="logo1 !== ''" href="/">
      <img class="sidebar__logo" :src="logo1" />
    </a>
    <a v-if="logo2 !== ''" href="/">
      <img class="sidebar__logo" :src="logo2" alt="logo" />
    </a>
    <SocialIcons />
    <ContactInfo />
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
      sidebarBg: sidebarBg,
      mainLogo: "",
      logo1: "",
      logo2: ""
    };
  },
  async mounted() {
    try {
      const res = await this.axios.get(
        `${process.env.VUE_APP_BASE_URL}/admin/settings`
      );
      if (res.data.data[0].value) {
        this.mainLogo =
          process.env.VUE_APP_MEDIA_BASE_URL + "/" + res.data.data[0].value;
      }
      if (res.data.data[1].value) {
        this.logo1 =
          process.env.VUE_APP_MEDIA_BASE_URL + "/" + res.data.data[1].value;
      }
      if (res.data.data[2].value) {
        this.logo2 =
          process.env.VUE_APP_MEDIA_BASE_URL + "/" + res.data.data[2].value;
      }
    } catch (err) {
      
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
