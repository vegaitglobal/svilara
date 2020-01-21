<template>
  <div id="app">
    <div class="wrapper">
      <div class="top-bar" :style="{backgroundColor: backgroundColor}"></div>
      <Sidebar/>
      <div class="content--wrapper">
        <Header />
        <div class="content">
          <router-view />
        </div>
        <Footer />
      </div>
    </div>

    <div class="loader">
      <img src="../src/assets/img/spinning-circles.svg" alt="" />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Sidebar from "./components/Sidebar.vue";
import axios from "axios";
export default {
  name: "app",
  components: {
    Header,
    Footer,
    Sidebar
  },
  beforeCreate(){
    this.$store.dispatch("fetchSettings");
  },
  mounted() {
    axios.get(`${process.env.VUE_APP_BASE_URL}/admin/scripts`).then(data => {
      let scriptsArrayOfString = data.data.data;
      var head = document.getElementsByTagName("head")[0];

      let scriptsArray = [];
      for (let i = 0; i < scriptsArrayOfString.length; i++) {
        let script = this.stringToHtml(scriptsArrayOfString[i].value);
        scriptsArray.push(script[0]);
      }

      for (let j = scriptsArray.length - 1; j >= 0; j--) {
        head.prepend(scriptsArray[j]);
      }
    });
  },
  computed: {
    settings: {
      get: function() {
        return this.$store.getters.getSettings();
      }
    },
    backgroundColor() {
      if (this.settings.length && this.settings[19].value) {
        return  this.settings[19].value;
      }
      return "";
    },
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
@import "assets/scss/reset.scss";
@import "assets/scss/variables.scss";
@import "assets/scss/base.scss";
@import "assets/scss/swal-popup.scss";

body {
  background-color: $blue-light;
}

#app {
  font-family: $font-primary;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-color;
  min-height: 100vh;
  position: relative;
}

.wrapper {
  height: 100%;
  width: 100%;
}

.top-bar {
  height: 275px;
  background-color: $purple-lighter;
  position: absolute;
  width: 100%;
  z-index: -1;
  @include breakpoint(mob) {
    height: 400px;
  }
}

.content--wrapper {
  max-width: calc(100% - 305px);
  margin: 0 0 0 auto;
  padding: 33px 35px 50px;
  @include breakpoint(htab) {
    max-width: calc(100% - 220px);
    padding: 33px 20px 50px;
  }
  @include breakpoint(mob) {
    max-width: none;
    padding: 0;
    margin: 0;
  }
  .content {
    background-color: $white;
    padding: 37px;
    border-radius: 10px;
    flex-wrap: wrap;
    display: flex;
    min-height: 200px;
    > div {
      width: 100%;
    }
  }
}

.loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #c4c0c0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 80px;
    }
}
</style>
