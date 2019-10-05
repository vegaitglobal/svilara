<template>
  <div id="app">
    <div class="wrapper">
      <div class="top-bar"></div>
      <div class="content--wrapper">
        <Header/>
        <div class="content">
            <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: "app",
  components: {
    Header
  }
}
</script>

<style lang="scss">
@import "assets/scss/reset.scss";
@import "assets/scss/variables.scss";
@import "assets/scss/base.scss";

#app {
  font-family: $font-primary;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-color;
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
}

.content--wrapper {
  max-width: 1421px;
  padding: 33px 20px 0;
  margin: 0 auto 0 340px;

  .content {
    background-color: $white;
    padding: 37px;
    border-radius: 10px;
  }
}
</style>
