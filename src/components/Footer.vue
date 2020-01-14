<template>
  <footer class="footer">
    <SocialIcons />
    <ContactInfo />
    <img v-if="logo1 !== ''" class="footer__logo--small" :src="logo1" />
    <img v-if="logo2 !== ''" class="footer__logo--small" :src="logo2" alt="logo" />
  </footer>
</template>

<script>
import SocialIcons from "./SocialIcons";
import ContactInfo from "./ContactInfo";

export default {
  name: "Footer",
  components: {
    SocialIcons,
    ContactInfo
  },
  computed: {
    settings() {
      return this.$store.getters.getSettings();
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
  },
  methods: {
    stringToHtml(str) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(str, "text/html");
      return doc.head.children;
    }
  }
};
</script>


<style lang="scss">
@import "../assets/scss/variables.scss";

.footer {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $main;
  display: none;
  padding: 10px 0;
  @include breakpoint(mob) {
    display: block;
  }
  &__logo--small {
    margin: 0 auto 30px;
    max-width: 50%;
    display: block;
  }
}
</style>