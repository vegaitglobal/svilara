<template>
  <div id="app">
    <div class="wrapper">
      <div class="top-bar"></div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "assets/scss/variables.scss";
@import "assets/scss/reset.scss";

.wrapper {
  background-color: $white;
}

.top-bar {
  height: 275px;
  background-color: $purple-lighter;
}
</style>
