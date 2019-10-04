<template>
  <div>
    <Sidebar/>
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
