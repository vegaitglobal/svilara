<template>
  <div>
    <Sidebar/>
    <MainEvent/>
    <MainEvent/>
    <MainEvent/>
    <MainEvent/>
    <MainEvent/>
    <MainEvent/>
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar.vue'
import MainEvent from '../components/MainEvent.vue'

export default {
  components: {
    Sidebar,
    MainEvent
  }
};

</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
</style>
