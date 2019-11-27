<template>
  <div id="app">
    <div class="wrapper">
      <div class="top-bar"></div>
      <Sidebar/>
      <div class="content--wrapper">
        <Header />
        <div class="content">
          <router-view />
        </div>
        <Footer />
      </div>
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
  max-width: 1421px;
  padding: 33px 20px 50px;
  margin: 0 auto 0 340px;
  @include breakpoint(htab) {
    margin-left: 220px;
  }
  @include breakpoint(mob) {
    margin-left: 0;
    padding: 0;
  }
  .content {
    background-color: $white;
    padding: 37px;
    border-radius: 10px;
    flex-wrap: wrap;
    display: flex;
    min-height: 200px;
    @include breakpoint(mob) {
      padding-bottom: 560px;
    }
    > div {
      width: 100%;
    }
  }
}
</style>
