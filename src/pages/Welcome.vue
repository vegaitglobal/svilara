<template>
  <div>
    <Sidebar/>
    <MainEvent/>
    <EventHeadline/>
    <DailyEvent/>
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar.vue'
import MainEvent from '../components/MainEvent.vue'
import DailyEvent from '../components/DailyEvent.vue'
import EventHeadline from '../components/EventHeadline.vue'

export default {
  components: {
    Sidebar,
    MainEvent,
    DailyEvent,
    EventHeadline
  }
};

</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
</style>
