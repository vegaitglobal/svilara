<template>
  <div class="sidebar">
    <div class="sidebar__bg" style="background:url('/img/sidebar-bg.jpg') no-repeat center;height:auto;width:305px;"></div>
    <img class="sidebar__logo" src="../assets/img/svilara-logo.jpg" alt="logo">
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    msg: String
  }

}
</script>

<style scoped lang="scss">
    .sidebar {
        position: absolute;
        z-index: 2;
        margin: 0;
        height: 100vh;
        width: 305px;
        top: 0;
        left: 0;
        box-shadow:inset 0 0  0 160px rgba(0,0,0,.5);
        &__logo {
            position: absolute;
            z-index: 3;
            top: 26px;
            left: 25px;
        }
    }
</style>