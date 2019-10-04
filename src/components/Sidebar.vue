<template>
  <div class="sidebar">
    <img class="sidebar" src="../assets/img/sidebar-bg.jpg" />
    <p>Lorem ipsum</p>
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

<style scoped>
    .sidebar {
        margin: 0;
        height: 100vh;
        width: 350px;
    }
</style>